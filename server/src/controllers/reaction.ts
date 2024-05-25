import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import ReactionModel from '../models/reaction';

type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';

interface AddReactionBody {
  reaction: ReactionType;
  postId: string;
  userId: string;
}

interface GetReactionParams {
  postId: string;
  userId: string;
}

export const addReaction: RequestHandler<
  unknown,
  unknown,
  AddReactionBody,
  unknown
> = async (req, res) => {
  try {
    const { reaction, postId, userId } = req.body;

    const hasReaction = await ReactionModel.findOne({
      post: postId,
      by: new mongoose.Types.ObjectId(userId),
    });

    if (hasReaction) {
      hasReaction.reaction === reaction
        ? await ReactionModel.findByIdAndDelete(hasReaction._id)
        : await ReactionModel.findByIdAndUpdate(hasReaction._id, { reaction });
    } else {
      await ReactionModel.create({
        reaction,
        post: postId,
        by: userId,
      });
    }

    res.json({
      message: 'Reaction added successfully',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

interface Reaction {
  _id: mongoose.Types.ObjectId;
  reaction: ReactionType | undefined;
  post: mongoose.Types.ObjectId;
  by: mongoose.Types.ObjectId;
}

interface Reactions {
  [key: string]: Reaction[];
}

interface ReactionUser {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
}

interface ReactionRes extends Omit<Reaction, 'by'> {
  by: ReactionUser;
  createdAt: Date;
}

export const getReaction: RequestHandler<
  GetReactionParams,
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { postId, userId } = req.params;

    const reactions = await ReactionModel.find({ post: postId }).populate(
      'by',
      'firstName lastName createdAt'
    );

    // If you want to use aggregate instead of populate, use this code
    /* const reactions = await ReactionModel.aggregate([
      {
        $match: {
          post: new mongoose.Types.ObjectId(postId),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'by',
          foreignField: '_id',
          as: 'by',
        },
      },
      {
        $unwind: '$by',
      },
      {
        $project: {
          'by.password': 0,
          'by.email': 0,
          'by.__v': 0,
          'by.gender': 0,
          'by.birthDay': 0,
          'by.birthMonth': 0,
          'by.birthYear': 0,
          'by.friends': 0,
          'by.friendRequests': 0,
          'by.sentFriendRequests': 0,
          'by.search': 0,
          'by.cover': 0,
          'by.picture': 0,
          'by.details': 0,
          'by.updatedAt': 0,
          'by.username': 0,
        },
      },
    ]); */

    const reactionsObj = reactions.reduce((prev: Reactions, curr) => {
      if (!prev[curr.reaction]) prev[curr.reaction] = [];

      prev[curr.reaction].push(curr as Reaction);
      return prev;
    }, {});

    const reactionsWithCount = [
      'like',
      'love',
      'care',
      'haha',
      'wow',
      'sad',
      'angry',
    ]
      .map(reaction => ({
        reaction,
        count: reactionsObj[reaction]?.length || 0,
        users:
          (reactionsObj[reaction] as unknown as ReactionRes[])
            ?.map((r: ReactionRes) => ({
              _id: r.by._id,
              firstName: r.by.firstName,
              lastName: r.by.lastName,
              createdAt: r.createdAt,
            }))
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) ||
          [],
      }))
      .sort((a, b) => b.count - a.count);

    const userReaction = await ReactionModel.findOne({
      post: postId,
      by: userId,
    });

    res.json({
      reactions: reactionsWithCount,
      userReaction: userReaction?.reaction,
      reactionsCount: reactions.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
