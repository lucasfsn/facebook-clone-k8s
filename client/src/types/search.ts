export interface SearchUser {
  _id: string;
  firstName: string;
  lastName: string;
  picture: string;
  username: string;
}

export interface SearchGet {
  _id: string;
  user: SearchUser;
  createdAt: string;
}
