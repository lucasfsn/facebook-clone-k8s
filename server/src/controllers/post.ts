import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { Types } from 'mongoose';
import PostModel from '../models/post';
import ReactionModel from '../models/reaction';
import UserModel from '../models/user';

interface PostBody {
  content: string;
  images?: string[];
  userId: string;
  type: 'profile' | 'cover' | 'post' | 'details';
}

interface EditPostBody {
  content?: string;
  images?: string[];
  audience?: 'public' | 'friends' | 'private';
}

interface CommentBody {
  comment: string;
  image?: string;
  postId: string;
  userId: string;
}

function getPosts(query: Record<string, unknown>) {
  return PostModel.find(query)
    .populate('user', 'firstName lastName picture username cover')
    .populate('comments.author', 'firstName lastName picture username cover')
    .sort({ createdAt: -1 });
}

// If you want to use aggregate instead of populate, you can use this function
/* function getPosts(query: Record<string, unknown>) {
  return PostModel.aggregate([
    { $match: query },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$user' },
    { $unwind: { path: '$comments', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'users',
        localField: 'comments.author',
        foreignField: '_id',
        as: 'comments.authorDetails',
      },
    },
    {
      $unwind: {
        path: '$comments.authorDetails',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        'comments.author': '$comments.authorDetails',
      },
    },
    {
      $group: {
        _id: '$_id',
        type: { $first: '$type' },
        images: { $first: '$images' },
        content: { $first: '$content' },
        user: { $first: '$user' },
        key: { $first: '$key' },
        audience: { $first: '$audience' },
        comments: { $push: '$comments' },
        createdAt: { $first: '$createdAt' },
        updatedAt: { $first: '$updatedAt' },
      },
    },
    {
      $project: {
        'user.password': 0,
        'user.__v': 0,
        'user.search': 0,
        'user.gender': 0,
        'user.birthDay': 0,
        'user.birthMonth': 0,
        'user.birthYear': 0,
        'user.friends': 0,
        'user.friendRequests': 0,
        'user.details': 0,
        'user.sentFriendRequests': 0,
        'user.createdAt': 0,
        'user.updatedAt': 0,
        'user.email': 0,
        'comments.authorDetails': 0,
        'comments.author.password': 0,
        'comments.author.__v': 0,
        'comments.author.search': 0,
        'comments.author.gender': 0,
        'comments.author.birthDay': 0,
        'comments.author.birthMonth': 0,
        'comments.author.birthYear': 0,
        'comments.author.friends': 0,
        'comments.author.friendRequests': 0,
        'comments.author.details': 0,
        'comments.author.sentFriendRequests': 0,
        'comments.author.createdAt': 0,
        'comments.author.updatedAt': 0,
        'comments.author.email': 0,
      },
    },
    {
      $project: {
        _id: 1,
        type: 1,
        images: 1,
        content: 1,
        user: 1,
        key: 1,
        audience: 1,
        comments: {
          $filter: {
            input: '$comments',
            as: 'comment',
            cond: { $ne: ['$$comment', {}] },
          },
        },
        createdAt: 1,
        updatedAt: 1,
      },
    },
    { $sort: { createdAt: -1 } },
  ]);
} */

export const createPost: RequestHandler<
  unknown,
  unknown,
  PostBody,
  unknown
> = async (req, res) => {
  try {
    if (
      req.body.content.length >= 0 &&
      req.body.content.trim().length === 0 &&
      req.body.type === 'post' &&
      req.body.images.length === 0
    )
      throw createHttpError(400, 'Content cannot be only whitespace');

    let newPost = await PostModel.create(req.body);
    newPost = await newPost.populate(
      'user',
      'firstName lastName picture username'
    );

    res.json({
      message: 'Post created successfully',
      post: newPost,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const allPosts: RequestHandler<
  unknown,
  unknown,
  unknown,
  { userId: string }
> = async (req, res) => {
  try {
    const userId = req.query.userId;
    const { friends } = await UserModel.findById(userId).select('friends');

    const friendsPostsPromises = friends.map(friend =>
      getPosts({ user: friend, audience: 'friends' })
    );

    const friendsPosts = (await Promise.all(friendsPostsPromises)).flat();

    const publicPosts = await getPosts({ audience: 'public' });

    const userPosts = await getPosts({ user: new Types.ObjectId(userId) });

    const posts = [...friendsPosts, ...publicPosts, ...userPosts]
      .filter(
        (post, index, self) =>
          index ===
          self.findIndex(p => p._id.toString() === post._id.toString())
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    res.json({
      posts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost: RequestHandler<
  { id: string },
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await PostModel.findById(id);

    if (!post) throw createHttpError(404, 'Post not found');

    await ReactionModel.deleteMany({ post: post._id });

    await PostModel.deleteOne({ _id: id });

    res.json({
      deletedPostId: id,
      message: 'Post has been successfully deleted',
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const editPost: RequestHandler<
  { id: string },
  unknown,
  EditPostBody,
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, images, audience } = req.body;

    const post = await PostModel.findById(id).select('content images audience');
    if (!post) throw createHttpError(404, 'Post not found');

    if (content.length >= 0 && content.trim().length === 0)
      throw createHttpError(400, 'Content cannot be only whitespace');

    if (content) post.content = content;
    if (images) post.images = images;
    if (audience) post.audience = audience;

    const updatedPost = await post.save();

    res.json({
      message: 'Post updated successfully',
      post: updatedPost,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const commentPost: RequestHandler<
  unknown,
  unknown,
  CommentBody,
  unknown
> = async (req, res) => {
  try {
    const { comment, image, postId, userId } = req.body;

    if (comment.length >= 0 && comment.trim().length === 0)
      throw createHttpError(400, 'Content cannot be only whitespace');

    const post = await PostModel.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            comment,
            image,
            author: userId,
            commentDate: new Date(),
          },
        },
      },
      { new: true }
    ).populate('comments.author', 'picture firstName lastName username');

    res.json({
      message: 'Comment added successfully',
      comments: post.comments,
      postId,
    });

    // If you want to use aggregate instead of populate, you can use this code
    /* await PostModel.findByIdAndUpdate(postId, {
      $push: {
        comments: {
          comment,
          image,
          author: userId,
          commentDate: new Date(),
        },
      },
    });

    const post = await PostModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(postId),
        },
      },
      {
        $unwind: {
          path: '$comments',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'comments.author',
          foreignField: '_id',
          as: 'comments.author',
        },
      },
      {
        $unwind: {
          path: '$comments.author',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          type: { $first: '$type' },
          images: { $first: '$images' },
          content: { $first: '$content' },
          user: { $first: '$user' },
          key: { $first: '$key' },
          audience: { $first: '$audience' },
          comments: { $push: '$comments' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
        },
      },
      {
        $project: {
          'comments.authorDetails': 0,
          'comments.author.password': 0,
          'comments.author.__v': 0,
          'comments.author.search': 0,
          'comments.author.gender': 0,
          'comments.author.birthDay': 0,
          'comments.author.birthMonth': 0,
          'comments.author.birthYear': 0,
          'comments.author.friends': 0,
          'comments.author.friendRequests': 0,
          'comments.author.details': 0,
          'comments.author.sentFriendRequests': 0,
          'comments.author.createdAt': 0,
          'comments.author.updatedAt': 0,
          'comments.author.email': 0,
        },
      },
      {
        $project: {
          comments: {
            $filter: {
              input: '$comments',
              as: 'comment',
              cond: { $ne: ['$$comment', {}] },
            },
          },
        },
      },
    ]);

    res.json({
      message: 'Comment added successfully',
      comments: post[0].comments,
      postId,
    }); */
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteComment: RequestHandler<
  { id: string },
  unknown,
  unknown,
  { commentId: string }
> = async (req, res) => {
  try {
    const { id } = req.params;
    const commentId = req.query.commentId;

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    ).populate('comments.author', 'picture firstName lastName username');

    if (!updatedPost) throw createHttpError(404, 'Post not found');

    res.json({
      message: 'Comment deleted successfully',
      comments: updatedPost.comments,
    });

    // If you want to use aggregate instead of populate, you can use this code
    /* const post = await PostModel.findByIdAndUpdate(id, {
      $pull: { comments: { _id: commentId } },
    });

    if (!post) throw createHttpError(404, 'Post not found');

    const updatedPost = await PostModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
        },
      },
      {
        $unwind: {
          path: '$comments',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'comments.author',
          foreignField: '_id',
          as: 'comments.author',
        },
      },
      {
        $unwind: {
          path: '$comments.author',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          type: { $first: '$type' },
          images: { $first: '$images' },
          content: { $first: '$content' },
          user: { $first: '$user' },
          key: { $first: '$key' },
          audience: { $first: '$audience' },
          comments: { $push: '$comments' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
        },
      },
      {
        $project: {
          'comments.authorDetails': 0,
          'comments.author.password': 0,
          'comments.author.__v': 0,
          'comments.author.search': 0,
          'comments.author.gender': 0,
          'comments.author.birthDay': 0,
          'comments.author.birthMonth': 0,
          'comments.author.birthYear': 0,
          'comments.author.friends': 0,
          'comments.author.friendRequests': 0,
          'comments.author.details': 0,
          'comments.author.sentFriendRequests': 0,
          'comments.author.createdAt': 0,
          'comments.author.updatedAt': 0,
          'comments.author.email': 0,
        },
      },
      {
        $project: {
          comments: {
            $filter: {
              input: '$comments',
              as: 'comment',
              cond: { $ne: ['$$comment', {}] },
            },
          },
        },
      },
    ]);

    res.json({
      message: 'Comment deleted successfully',
      comments: updatedPost[0].comments,
    }); */
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
