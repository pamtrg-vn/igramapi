import { UploadVideoOptions } from './upload.video.options';
import { MediaConfigureToReelOptions } from './media.configure-to-reel.options';

export interface PostingReelSegmentsMetadata {
  numSegments: number;
  clipsSegments: Array<{
    index: number;
    faceEffectId: string | number | null;
    speed: number;
    sourceType: string;
    durationMs: number;
    audioType: 'music_selection' | string;
    fromDraft: string;
    cameraPosition: string;
    mediaFolder: 'Download' | string;
    mediaType: 'video' | string;
    originalMediaType: 2;
    originalSegmentHash: string | null;
    isRemix: boolean;
    hasReusableTemplateAsset: boolean;
  }>;
}

export interface PostingReelMusicParamsOptions {
  audioAssetId: string;
  audioClusterId: string;
  audioAssetStartTimeInMs: number;
  derivedContentStartTimeInMs: number;
  overlapDurationInMs: number;
  browseSessionId?: string;
  product?: 'story_camera_clips_v2' | string;
  songName: string;
  artistName: string;
  alacornSessionId?: string;
}

export interface PostingReelMusicMetadataOptions {
  original: { volumeLevel: number };
  song: {
    volumeLevel: number;
    isSaved?: boolean;
    artistName?: string;
    audioAssetId?: string;
    audioClusterId?: string;
    trackName: string;
    isPickedPrecapture?: boolean;
  };
}

export interface PostingReelOptions {
  // additional options for further configuration
  uploadOptions?: Partial<UploadVideoOptions>;
  configureOptions?: Partial<MediaConfigureToReelOptions>;

  video: Buffer;
  coverImage: Buffer;

  caption?: string;
  audioMuted?: boolean;
  disableComments?: boolean;

  shareToFeed?: boolean;
  shareToFB?: boolean;
  likeAndViewCountDisable?: boolean;
  enableGift?: boolean;
  subtitlesTranslation?: boolean;
  allowDownload?: boolean;

  music?: {
    params: Partial<PostingReelMusicParamsOptions>;
    metadata: Partial<PostingReelMusicMetadataOptions>;
    additionalInfo?: { hasVoiceoverAttribution: boolean };
  };

  // default = 2000ms
  transcodeDelay?: number;
  // default = 20 ( * transcodeDelay = 40000ms = 40s)
  maxTranscodeTries?: number;
}
