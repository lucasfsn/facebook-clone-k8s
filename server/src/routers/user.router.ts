import 'dotenv/config';
import { Router } from 'express';
import * as UserController from '../controllers/user';
import { authenticateToken } from '../middlewares/auth';

export const userRouter = Router()
  .post('/signup', UserController.signUp)
  .post('/login', UserController.login)
  .get('/profile/:username', authenticateToken, UserController.getUserProfile)
  .patch('/change-password', authenticateToken, UserController.changePassword)
  .put('/change/:data', authenticateToken, UserController.changeUserInfo)
  .delete('/:id', authenticateToken, UserController.deleteUser)
  .patch(
    '/profile/updatePicture',
    authenticateToken,
    UserController.updateProfileImage
  )
  .patch(
    '/profile/updateCover',
    authenticateToken,
    UserController.updateCoverImage
  )
  .delete(
    '/profile/:id/removeCover',
    authenticateToken,
    UserController.removeCoverPhoto
  )
  .delete(
    '/profile/:id/removePicture',
    authenticateToken,
    UserController.removeProfilePicture
  )
  .patch(
    '/profile/updateDetails',
    authenticateToken,
    UserController.updateDetails
  )
  .post('/profile/:id/add', authenticateToken, UserController.addFriend)
  .put(
    '/profile/:id/cancel',
    authenticateToken,
    UserController.cancelFriendRequest
  )
  .put(
    '/profile/:id/accept',
    authenticateToken,
    UserController.acceptFriendRequest
  )
  .delete('/profile/:id/remove', authenticateToken, UserController.removeFriend)
  .delete(
    '/profile/:id/removeRequest',
    authenticateToken,
    UserController.removeFriendRequest
  )
  .get('/user/:id', authenticateToken, UserController.getUserById)
  .get('/search/:id/get', authenticateToken, UserController.searchGet)
  .post('/search/:user', authenticateToken, UserController.searchUser)
  .put('/search/:user/add', authenticateToken, UserController.searchAdd)
  .delete('/search/:user', authenticateToken, UserController.searchDelete)
  .post('/import/:userId', authenticateToken, UserController.importProfile)
  .get('/export/:userId', authenticateToken, UserController.exportProfile);
