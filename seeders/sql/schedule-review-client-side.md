import { NextRequest, NextResponse } from 'next/server';
import { resolveSession } from '@/lib/auth';

// Interface for scheduled review request
interface ScheduleReviewRequest {
  position: string;
  reviewType: string;
  title: string;
  description?: string;
  scheduledDate: string;
  scheduledTime: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  sendReminder: boolean;
  reminderDaysBefore: number;
}

// Interface for scheduled review stored data
interface ScheduledReview {
  id: string;
  position: string;
  reviewType: string;
  title: string;
  description?: string;
  scheduledDateTime: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  sendReminder: boolean;
  reminderDaysBefore: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// In-memory store for scheduled reviews (replace with database in production)
const scheduledReviewsStore: Map<string, ScheduledReview> = new Map();

// Generate a unique ID
function generateId(): string {
  return `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// POST - Schedule a new review
export async function POST(request: NextRequest) {
  try {
    // Check authentication using custom session
    const session = await resolveSession(request);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in to schedule a review.' },
        { status: 401 }
      );
    }

    // Parse request body
    const body: ScheduleReviewRequest = await request.json();
    const {
      position,
      reviewType,
      title,
      description,
      scheduledDate,
      scheduledTime,
      assignee,
      priority,
      sendReminder,
      reminderDaysBefore,
    } = body;

    // Validate required fields
    if (!position || !reviewType || !title || !scheduledDate) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: position, reviewType, title, and scheduledDate are required.' },
        { status: 400 }
      );
    }

    // Validate title length
    if (title.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: 'Review title must be at least 3 characters long.' },
        { status: 400 }
      );
    }

    // Validate scheduled date is in the future
    const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime || '09:00'}`);
    const now = new Date();
    if (scheduledDateTime <= now) {
      return NextResponse.json(
        { success: false, error: 'Scheduled date and time must be in the future.' },
        { status: 400 }
      );
    }

    // Validate reminder days
    if (sendReminder && (reminderDaysBefore < 1 || reminderDaysBefore > 30)) {
      return NextResponse.json(
        { success: false, error: 'Reminder days must be between 1 and 30.' },
        { status: 400 }
      );
    }

    // Create scheduled review
    const reviewId = generateId();
    const scheduledReview: ScheduledReview = {
      id: reviewId,
      position,
      reviewType,
      title: title.trim(),
      description: description?.trim(),
      scheduledDateTime: scheduledDateTime.toISOString(),
      assignee: assignee || position,
      priority: priority || 'medium',
      sendReminder: sendReminder ?? true,
      reminderDaysBefore: reminderDaysBefore || 1,
      status: 'scheduled',
      createdBy: session.email || String(session.user_id),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    // Store the scheduled review
    scheduledReviewsStore.set(reviewId, scheduledReview);

    // In production, you would:
    // 1. Save to database
    // 2. Create calendar event if integrated
    // 3. Schedule reminder notifications
    // 4. Send confirmation email to assignee

    console.log(`[Reviews Schedule API] Review scheduled:`, {
      id: reviewId,
      title: scheduledReview.title,
      scheduledFor: scheduledReview.scheduledDateTime,
      assignee: scheduledReview.assignee,
    });

    return NextResponse.json({
      success: true,
      message: 'Review scheduled successfully',
      data: {
        id: scheduledReview.id,
        title: scheduledReview.title,
        reviewType: scheduledReview.reviewType,
        scheduledDateTime: scheduledReview.scheduledDateTime,
        assignee: scheduledReview.assignee,
        priority: scheduledReview.priority,
        status: scheduledReview.status,
        sendReminder: scheduledReview.sendReminder,
        reminderDaysBefore: scheduledReview.reminderDaysBefore,
      },
    });
  } catch (error) {
    console.error('[Reviews Schedule API] Error scheduling review:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while scheduling the review.' },
      { status: 500 }
    );
  }
}

// GET - Retrieve scheduled reviews
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await resolveSession(request);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in to view scheduled reviews.' },
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const position = searchParams.get('position');
    const status = searchParams.get('status');
    const upcoming = searchParams.get('upcoming');

    // Filter reviews
    let reviews = Array.from(scheduledReviewsStore.values());

    // Filter by position if provided
    if (position) {
      reviews = reviews.filter(r => r.position === position);
    }

    // Filter by status if provided
    if (status) {
      reviews = reviews.filter(r => r.status === status);
    }

    // Filter for upcoming reviews if requested
    if (upcoming === 'true') {
      const now = new Date();
      reviews = reviews.filter(r => new Date(r.scheduledDateTime) > now && r.status === 'scheduled');
    }

    // Sort by scheduled date (earliest first)
    reviews.sort((a, b) => new Date(a.scheduledDateTime).getTime() - new Date(b.scheduledDateTime).getTime());

    return NextResponse.json({
      success: true,
      count: reviews.length,
      data: reviews.map(review => ({
        id: review.id,
        position: review.position,
        reviewType: review.reviewType,
        title: review.title,
        description: review.description,
        scheduledDateTime: review.scheduledDateTime,
        assignee: review.assignee,
        priority: review.priority,
        status: review.status,
        sendReminder: review.sendReminder,
        reminderDaysBefore: review.reminderDaysBefore,
        createdAt: review.createdAt,
      })),
    });
  } catch (error) {
    console.error('[Reviews Schedule API] Error fetching scheduled reviews:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while fetching scheduled reviews.' },
      { status: 500 }
    );
  }
}

// PUT - Update a scheduled review
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const session = await resolveSession(request);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in to update a scheduled review.' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Review ID is required.' },
        { status: 400 }
      );
    }

    // Find the review
    const existingReview = scheduledReviewsStore.get(id);
    if (!existingReview) {
      return NextResponse.json(
        { success: false, error: 'Scheduled review not found.' },
        { status: 404 }
      );
    }

    // Update the review
    const updatedReview: ScheduledReview = {
      ...existingReview,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    scheduledReviewsStore.set(id, updatedReview);

    return NextResponse.json({
      success: true,
      message: 'Review updated successfully',
      data: {
        id: updatedReview.id,
        title: updatedReview.title,
        status: updatedReview.status,
        scheduledDateTime: updatedReview.scheduledDateTime,
      },
    });
  } catch (error) {
    console.error('[Reviews Schedule API] Error updating scheduled review:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while updating the scheduled review.' },
      { status: 500 }
    );
  }
}

// DELETE - Cancel/delete a scheduled review
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const session = await resolveSession(request);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in to cancel a scheduled review.' },
        { status: 401 }
      );
    }

    // Get review ID from query params
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Review ID is required.' },
        { status: 400 }
      );
    }

    // Find and delete the review
    const existingReview = scheduledReviewsStore.get(id);
    if (!existingReview) {
      return NextResponse.json(
        { success: false, error: 'Scheduled review not found.' },
        { status: 404 }
      );
    }

    scheduledReviewsStore.delete(id);

    return NextResponse.json({
      success: true,
      message: 'Scheduled review cancelled successfully',
    });
  } catch (error) {
    console.error('[Reviews Schedule API] Error deleting scheduled review:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while cancelling the scheduled review.' },
      { status: 500 }
    );
  }
}
