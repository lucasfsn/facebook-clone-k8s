import 'dotenv/config';
import { Router } from 'express';
import * as UserController from '../controllers/user';
import { getKeycloak } from '../utils/keycloak';

export const userRouter = Router()
  .post('/signup', getKeycloak().protect(), UserController.signUp)
  .post('/login', getKeycloak().protect(), UserController.login)
  .get(
    '/profile/:username',
    getKeycloak().protect(),
    UserController.getUserProfile
  )
  .patch(
    '/change-password',
    getKeycloak().protect(),
    UserController.changePassword
  )
  .put('/change/:data', getKeycloak().protect(), UserController.changeUserInfo)
  .delete('/:id', getKeycloak().protect(), UserController.deleteUser)
  .patch(
    '/profile/updatePicture',
    getKeycloak().protect(),
    UserController.updateProfileImage
  )
  .patch(
    '/profile/updateCover',
    getKeycloak().protect(),
    UserController.updateCoverImage
  )
  .delete(
    '/profile/:id/removeCover',
    getKeycloak().protect(),
    UserController.removeCoverPhoto
  )
  .delete(
    '/profile/:id/removePicture',
    getKeycloak().protect(),
    UserController.removeProfilePicture
  )
  .patch(
    '/profile/updateDetails',
    getKeycloak().protect(),
    UserController.updateDetails
  )
  .post('/profile/:id/add', getKeycloak().protect(), UserController.addFriend)
  .put(
    '/profile/:id/cancel',
    getKeycloak().protect(),
    UserController.cancelFriendRequest
  )
  .put(
    '/profile/:id/accept',
    getKeycloak().protect(),
    UserController.acceptFriendRequest
  )
  .delete(
    '/profile/:id/remove',
    getKeycloak().protect(),
    UserController.removeFriend
  )
  .delete(
    '/profile/:id/removeRequest',
    getKeycloak().protect(),
    UserController.removeFriendRequest
  )
  .get('/user/:id', getKeycloak().protect(), UserController.getUserById)
  .get('/search/:id/get', getKeycloak().protect(), UserController.searchGet)
  .post('/search/:user', getKeycloak().protect(), UserController.searchUser)
  .put('/search/:user/add', getKeycloak().protect(), UserController.searchAdd)
  .delete('/search/:user', getKeycloak().protect(), UserController.searchDelete)
  .post(
    '/import/:userId',
    getKeycloak().protect(),
    UserController.importProfile
  )
  .get(
    '/export/:userId',
    getKeycloak().protect(),
    UserController.exportProfile
  );
