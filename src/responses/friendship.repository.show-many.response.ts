export interface FriendshipRepositoryShowManyResponseRootObject {
  following: boolean;
  incoming_request: boolean;
  is_bestie: boolean;
  is_private: boolean;
  is_restricted: boolean;
  outgoing_request: boolean;
  is_feed_favorite: boolean;
}

export interface FriendshipRepositoryShowManyResponseFollowedByObject
  extends FriendshipRepositoryShowManyResponseRootObject {
  followed_by: boolean;
}

export type FriendshipRepositoryShowManyResponseObject =
  | FriendshipRepositoryShowManyResponseRootObject
  | FriendshipRepositoryShowManyResponseFollowedByObject;
