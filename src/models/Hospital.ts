import mongoose from 'mongoose';

interface IHospital {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contactPerson: string;
  description?: string;
  logo?: string;
  totalBeds: number;
  availableBeds: number;
  departments: string[];
  facilities: string[];
  specializations: string[];
  emergencyAvailable: boolean;
  rating: number;
  totalRatings: number;
  operatingHours: {
    day: string;
    openTime: string;
    closeTime: string;
  }[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const hospitalSchema = new mongoose.Schema<IHospital>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: String,
    contactPerson: String,
    description: String,
    logo: String,
    totalBeds: {
      type: Number,
      required: true,
    },
    availableBeds: {
      type: Number,
      required: true,
    },
    departments: [String],
    facilities: [String],
    specializations: [String],
    emergencyAvailable: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    operatingHours: [
      {
        day: String,
        openTime: String,
        closeTime: String,
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Hospital =
  mongoose.models.Hospital ||
  mongoose.model<IHospital>('Hospital', hospitalSchema);
