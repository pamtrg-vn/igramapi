export interface MediaConfigureToReelOptions {
  upload_id: string;
  length: number;
  extra: { source_width: number; source_height: number };
  caption?: string;
  clips?: Array<{ length: number; source_type: '3' | '4'; camera_position: 'front' | 'back' }>;
  audio_muted?: boolean;
  poster_frame_index?: number;
  timezone_offset?: string;
  source_type?: '3' | '4';
  device?: {
    manufacturer: string;
    model: string;
    android_version: number;
    android_release: string;
  };

  clips_share_preview_to_feed?: '1' | '0';
  is_shared_to_fb?: '1' | '0';
  is_clips_edited?: '1' | '0';
  like_and_view_counts_disabled?: '1' | '0';
  is_created_with_sound_sync?: '1' | '0';
  is_gifting_enabled?: '1' | '0';
  disable_comments?: '1' | '0';
  video_subtitles_enabled?: '1' | '0';
  video_subtitles_translations_enabled?: '1' | '0';
  contains_music_lyrics?: '1' | '0';
  clips_creation_entry_point: 'clips' | string;
  capture_type: 'clips_v2' | string;
  audience: 'default' | string;
  include_e2ee_mentioned_user_list?: '1' | '0';
  third_party_downloads_enabled?: '1' | '0';
  is_creator_requesting_mashup?: '1' | '0';
  is_template_disabled?: '1' | '0';
  // internal
  retryContext?: { num_step_auto_retry: number; num_reupload: number; num_step_manual_retry: number };

  additional_audio_info?: { has_voiceover_attribution?: '1' | '0' };
  music_params?: {
    audio_asset_id: string;
    audio_cluster_id: string;
    audio_asset_start_time_in_ms: number;
    derived_content_start_time_in_ms: number;
    overlap_duration_in_ms: number;
    browse_session_id?: string;
    product: 'story_camera_clips_v2' | string;
    song_name: string;
    artist_name: string;
    alacorn_session_id: string;
  };
  clips_audio_metadata?: {
    original: { volume_level: number };
    song: {
      volume_level: number;
      is_saved: '1' | '0';
      artist_name: string;
      audio_asset_id: string;
      audio_cluster_id: string;
      track_name: string;
      is_picked_precapture: '1' | '0';
    };
  };
}
