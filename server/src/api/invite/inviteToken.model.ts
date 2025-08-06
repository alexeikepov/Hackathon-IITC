import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface IInviteToken {
  token: string;
  email?: string;
  used: boolean;
  expiresAt: Date;
}

const inviteTokenSchema = new Schema<IInviteToken>({
  token: { type: String, required: true, unique: true },
  email: { type: String }, // optional: to bind to email
  used: { type: Boolean, default: false },
  expiresAt: { type: Date, default: () => Date.now() + 1000 * 60 * 60 * 24 } // 24 hours
});

export default mongoose.model("InviteToken", inviteTokenSchema);