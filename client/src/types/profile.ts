import { SinglePost } from "./posts";

export type RelationshipType =
  | "Single"
  | "In a relationship"
  | "Engaged"
  | "Married"
  | "In a civil union"
  | "In a domestic partnership"
  | "In an open relationship"
  | "It's complicated"
  | "Separated"
  | "Divorced"
  | "Widowed";

export interface Details {
  bio?: string;
  workplace?: string;
  highschool?: string;
  college?: string;
  currentCity?: string;
  hometown?: string;
  relationship?: RelationshipType;
}

export interface Friend {
  _id: string;
  firstName: string;
  lastName: string;
  picture: string;
  username: string;
  friends?: string[];
}

export interface SingleProfile {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  picture: string;
  cover?: string;
  gender: string;
  birdthDay: number;
  birdthMonth: number;
  birdthYear: number;
  friends: Friend[];
  friendRequests: string[];
  sentFriendRequests: string[];
  search: string[];
  details: Details;
  createdAt: Date | string;
  updatedAt: Date | string;
  userPosts: SinglePost[];
  images: string[];
}
