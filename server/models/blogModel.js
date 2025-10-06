import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);


// ⬅️ נוסיף גם TTL כאן (סעיף 2)
blogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 });


export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
