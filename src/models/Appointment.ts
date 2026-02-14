import mongoose from 'mongoose';

interface IAppointment {
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  hospitalId: mongoose.Types.ObjectId;
  appointmentDate: Date;
  timeSlot: string;
  reasonForVisit: string;
  symptoms?: string[];
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  prescription?: string;
  followUpDate?: Date;
  consultationMode: 'in-person' | 'online' | 'phone';
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new mongoose.Schema<IAppointment>(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
      index: true,
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    reasonForVisit: {
      type: String,
      required: true,
    },
    symptoms: [String],
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
      default: 'scheduled',
    },
    notes: String,
    prescription: String,
    followUpDate: Date,
    consultationMode: {
      type: String,
      enum: ['in-person', 'online', 'phone'],
      default: 'in-person',
    },
  },
  {
    timestamps: true,
  }
);

export const Appointment =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>('Appointment', appointmentSchema);
