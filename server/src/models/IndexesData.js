import mongoose from 'mongoose';

const indexesDataSchema = new mongoose.Schema({
  data: { type: String, required: true }, // Example field, add more as needed
  username: { type: String, required: true, ref: 'User' },
}, { timestamps: true });

const IndexesData = mongoose.model('IndexesData', indexesDataSchema);
export default IndexesData;
