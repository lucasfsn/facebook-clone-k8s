import { InferSchemaType, model, Schema } from 'mongoose';

const reactionSchema = new Schema(
  {
    reaction: {
      type: String,
      enum: ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry'],
      required: true,
    },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    by: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

type Reaction = InferSchemaType<typeof reactionSchema>;

export default model<Reaction>('Reaction', reactionSchema);
