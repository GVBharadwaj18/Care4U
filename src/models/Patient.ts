import mongoose from 'mongoose';

interface IPatient {
  userId: mongoose.Types.ObjectId;
  medicalHistory: string[];
  allergies: string[];
  currentMedications: {
    name: string;
    dosage: string;
    frequency: string;
    startDate: Date;
    endDate?: Date;
  }[];
  bloodType: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  insuranceProvider?: string;
  insuranceNumber?: string;
  medicalReports: {
    reportId: mongoose.Types.ObjectId;
    type: string;
    date: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const patientSchema = new mongoose.Schema<IPatient>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    medicalHistory: [String],
    allergies: [String],
    currentMedications: [
      {
        name: String,
        dosage: String,
        frequency: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    bloodType: String,
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
    },
    insuranceProvider: String,
    insuranceNumber: String,
    medicalReports: [
      {
        reportId: mongoose.Schema.Types.ObjectId,
        type: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Patient =
  mongoose.models.Patient ||
  mongoose.model<IPatient>('Patient', patientSchema);
