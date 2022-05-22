import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import IUser from '../interfaces/user';
import config from 'config';
import { InventorySchema } from './inventory.model';

// const UserSchema: Schema = new Schema({
//   uid: {
//     type: String,
//     unique: true
//   },
//   name: { type: String }
// });

// export default mongoose.model<IUser>('User', UserSchema);

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function (next) {
  let user = this as IUser;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));

  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as IUser;

  return bcrypt.compare(candidatePassword, user.password).catch((error) => false);
};

const UserModal = mongoose.model<IUser>('User', userSchema);
export default UserModal;
