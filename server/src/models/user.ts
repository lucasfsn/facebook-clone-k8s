import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true, text: true },
    lastName: { type: String, required: true, trim: true, text: true },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      text: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: true },
    picture: {
      type: String,
      default:
        'https://res.cloudinary.com/dhpga2rn0/image/upload/v1702139212/fvvdti7ojiigh9ekivvk.png',
    },
    cover: { type: String, trim: true },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
      trim: true,
    },
    birthDay: { type: Number, required: true, trim: true },
    birthMonth: { type: Number, required: true, trim: true },
    birthYear: { type: Number, required: true, trim: true },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    sentFriendRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    search: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        createdAt: {
          type: Date,
          required: true,
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highschool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: [
          'Single',
          'In a relationship',
          'Engaged',
          'Married',
          'In a civil union',
          'In a domestic partnership',
          'In an open relationship',
          "It's complicated",
          'Separated',
          'Divorced',
          'Widowed',
        ],
      },
    },
  },
  { timestamps: true }
);

export type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema);
