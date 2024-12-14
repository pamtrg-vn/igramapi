export interface MusicRepositoryGlobalSearchResponseRootObject {
    items: MusicRepositoryGlobalSearchResponseItemsItem[];
    page_info: MusicRepositoryGlobalSearchResponsePageInfo;
    alacorn_session_id: string;
    music_reels: null;
    dark_banner_message: null;
    inform_module: null;
    licensed_music_eligibility_state: string;
    status: string;
}

export interface MusicRepositoryGlobalSearchResponseItemsItem {
    track: MusicRepositoryGlobalSearchResponseTrack;
    metadata: MusicRepositoryGlobalSearchResponseMetadata;
}

export interface MusicRepositoryGlobalSearchResponseTrack {
    audio_cluster_id: string;
    id: string;
    title: string;
    sanitized_title: null;
    subtitle: string;
    display_artist: string;
    artist_id: null;
    cover_artwork_uri: string;
    cover_artwork_thumbnail_uri: string;
    progressive_download_url: string;
    fast_start_progressive_download_url: string;
    web_30s_preview_download_url: null;
    reactive_audio_download_url: null;
    highlight_start_times_in_ms: number[];
    is_explicit: boolean;
    dash_manifest: string;
    has_lyrics: boolean;
    audio_asset_id: string;
    duration_in_ms: number;
    dark_message: null;
    allows_saving: boolean;
    ig_username: null;
    is_eligible_for_audio_effects: boolean;
    is_eligible_for_vinyl_sticker: boolean;
    lyrics: null;
}

export interface MusicRepositoryGlobalSearchResponseMetadata {
    is_bookmarked: boolean;
    allow_media_creation_with_music: boolean;
    is_trending_in_clips: boolean;
    trend_rank: null;
    previous_trend_rank: null;
    formatted_clips_media_count: string;
    display_labels: null;
    display_media_id: null;
}

export interface MusicRepositoryGlobalSearchResponsePageInfo {
    next_max_id: string;
    more_available: boolean;
}
