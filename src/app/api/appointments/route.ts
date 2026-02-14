import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Appointment } from '@/models/Appointment';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const appointments = await Appointment.find({ patientId: user.userId })
      .populate('doctorId')
      .populate('hospitalId')
      .sort({ appointmentDate: -1 });

    return NextResponse.json(
      {
        success: true,
        appointments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch appointments',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await request.json();

    const {
      doctorId,
      hospitalId,
      appointmentDate,
      timeSlot,
      reasonForVisit,
      symptoms = [],
      consultationMode = 'in-person',
    } = body;

    if (!doctorId || !hospitalId || !appointmentDate || !timeSlot || !reasonForVisit) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    const appointment = await Appointment.create({
      patientId: user.userId,
      doctorId,
      hospitalId,
      appointmentDate: new Date(appointmentDate),
      timeSlot,
      reasonForVisit,
      symptoms,
      consultationMode,
      status: 'scheduled',
    });

    return NextResponse.json(
      {
        success: true,
        appointment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create appointment',
      },
      { status: 500 }
    );
  }
}
