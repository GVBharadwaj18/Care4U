import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { Patient } from '@/models/Patient';
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
    const userDoc = await User.findById(user.userId);
    let profile: any = userDoc?.toJSON();

    if (user.role === 'patient') {
      const patientData = await Patient.findOne({ userId: user.userId });
      profile.patientData = patientData;
    }

    return NextResponse.json(
      {
        success: true,
        user: profile,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch profile',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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

    const { firstName, lastName, phone, dateOfBirth, gender, address } = body;

    const userDoc = await User.findByIdAndUpdate(
      user.userId,
      {
        firstName,
        lastName,
        phone,
        dateOfBirth,
        gender,
        address,
      },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        user: userDoc?.toJSON(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update profile',
      },
      { status: 500 }
    );
  }
}
