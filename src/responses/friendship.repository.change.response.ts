export interface FriendshipRepositoryActionOptions {
    source?: 'profile' | 'self_followers' | 'audience_manager';
    container_module?: 'profile' | 'self_followers' | 'favorites_home_list';
    surface?: 'profile' | 'self_followers';
    is_auto_block_enabled?: string; // String of boolean
    include_follow_friction_check?: '1' | '0';
    nav_chain?: string;
    user_id?: string | number;
    device_id?: string;
    radio_type?: string;
}

export interface FriendshipRepositoryBlockOptions {
    is_auto_block_enabled?: boolean;
    surface?: 'profile' | 'self_followers';
    container_module?: 'profile' | 'self_followers' | 'favorites_home_list';
}

export interface FriendshipRepositoryUnBlockOptions {
    container_module?: 'profile' | 'self_followers' | 'favorites_home_list';
}

export interface FriendshipRepositoryCreateDestroyOptions {
    include_follow_friction_check?: boolean;
    container_module?: 'profile' | 'self_followers' | 'favorites_home_list';
    nav_chain?: string;
}
