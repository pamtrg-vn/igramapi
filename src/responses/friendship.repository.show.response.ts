export interface FriendshipRepositoryShowResponseRootObject {
    blocking: boolean;
    followed_by: boolean;
    following: boolean;
    incoming_request: boolean;
    is_bestie: boolean;
    is_blocking_reel: boolean;
    is_eligible_to_subscribe: boolean;
    is_feed_favorite: boolean;
    is_guardian_of_viewer: boolean;
    is_muting_media_notes: boolean;
    is_muting_notes: boolean;
    is_muting_reel: boolean;
    is_private: boolean;
    is_restricted: boolean;
    is_supervised_by_viewer: boolean;
    is_viewer_unconnected: boolean;
    muting: boolean;
    outgoing_request: boolean;
    status: string;
    subscribed: boolean;
}

export interface FriendshipRepositoryShowResponseExternalDeeplinkProfileObject
    extends FriendshipRepositoryShowResponseRootObject {
    should_show_profile_upsell: boolean;
    is_banner_profile_upsell: boolean;
}

export type FriendshipRepositoryShowResponseObject =
    | FriendshipRepositoryShowResponseRootObject
    | FriendshipRepositoryShowResponseExternalDeeplinkProfileObject;
