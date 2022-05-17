import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI);

mongoose.Promise = global.Promise;

export { mongoose };
