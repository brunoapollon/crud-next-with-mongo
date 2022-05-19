import { mongoose } from '../lib/dbConnection';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  country: {
    type: String,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
