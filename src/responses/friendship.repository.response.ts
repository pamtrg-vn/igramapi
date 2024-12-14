export interface FriendshipRepositorFriendshipStatusResponseObject {
    blocking: boolean;
    followed_by: boolean;
    following: boolean;
    incoming_request: boolean;
    is_bestie: boolean;
    is_eligible_to_subscribe: boolean;
    is_feed_favorite: boolean;
    is_private: boolean;
    is_restricted: boolean;
    muting: boolean;
    outgoing_request: boolean;
    subscribed: boolean;
}

export interface FriendshipRepositoryRootResponseObject {
    friendship_status: FriendshipRepositorFriendshipStatusResponseObject;
    status: string;
}

export interface FriendshipRepositoryBlockResponse extends FriendshipRepositorFriendshipStatusResponseObject {}
export interface FriendshipRepositoryUnBlockResponse extends FriendshipRepositorFriendshipStatusResponseObject {}
