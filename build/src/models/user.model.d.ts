import mongoose from 'mongoose';
import IUser from '../interfaces/user';
declare const UserModal: mongoose.Model<IUser, {}, {}, {}>;
export default UserModal;
