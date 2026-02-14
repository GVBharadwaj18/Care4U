import mongoose from 'mongoose';

interface IDoctor {
  userId: mongoose.Types.ObjectId;
  specialization: string;
  licenseNumber: string;
  hospitalId?: mongoose.Types.ObjectId;
  yearsOfExperience: number;
  qualifications: string[];
  consultationFee: number;
  availability: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  rating: number;
  totalRatings: number;
  bio?: string;
  languages: string[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const doctorSchema = new mongoose.Schema<IDoctor>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
    },
    yearsOfExperience: {
      type: Number,
      required: true,
    },
    qualifications: [String],
    consultationFee: {
      type: Number,
      required: true,
    },
    availability: [
      {
        day: String,
        startTime: String,
        endTime: String,
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    bio: String,
    languages: [String],
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Doctor =
  mongoose.models.Doctor ||
  mongoose.model<IDoctor>('Doctor', doctorSchema);
