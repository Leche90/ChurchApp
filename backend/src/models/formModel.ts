import mongoose, { Schema, Document } from 'mongoose';

// Placeholder for MongoDB schema
export interface IForm extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  password: string;
}

const FormSchema: Schema = new Schema ({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IForm>('Form', FormSchema);
