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

const User = mongoose.model('User', UserSchema);

export { User };
