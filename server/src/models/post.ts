import { InferSchemaType, model, Schema } from 'mongoose';

const commentSchema = new Schema({
  comment: { type: String },
  image: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  commentDate: { type: Date, required: true },
});

const postSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['profile', 'cover', 'post', 'details'],
      default: 'post',
    },
    images: { type: Array },
    content: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    key: { type: String },
    audience: {
      type: String,
      enum: ['public', 'friends', 'private'],
      default: 'public',
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

type Comment = InferSchemaType<typeof commentSchema>;
type Post = InferSchemaType<typeof postSchema> & { comments: Comment[] };

export default model<Post>('Post', postSchema);
