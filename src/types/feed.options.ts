import { IgAppModule } from './common.types';
import { PostsInsightsFeedOptions } from './insights.options';
import { TimelineFeedReason } from './timeline-feed.types';

export interface AccountFollowersFeedOptions {
  id: number | string;
  nextMaxId: string;
  searchSurface: string;
  order: 'default';
  query: string;
  enableGroups: boolean;
}
export interface AccountFollowingFeedOptions extends Omit<AccountFollowersFeedOptions, 'order'> {
  order: 'default' | 'date_followed_latest' | 'date_followed_earliest';
  includesHashtags: boolean;
}
export interface BestiesFeedOptions {
  nextMaxId: string;
}
export interface PendingFriendshipsFeedOptions {
  nextMaxId: string;
}
export interface BlockedUsersFeedOptions {
  nextMaxId: string;
}
export interface DirectThreadFeedOptions {
  cursor: string;
  seqId: number;
}
export interface DirectInboxFeedOptions {
  cursor: string;
  seqId: number;
}
export interface DirectPendingInboxFeedOptions {
  cursor: string;
  seqId: number;
}
export interface DiscoverFeedOptions {
  nextMaxId: string;
}
export interface IgtvBrowseFeedOptions {
  maxId: string;
  isPrefetch: boolean;
}
export interface IgtvChannelFeedOptions {
  maxId: string;
  channelId: string;
}
export interface LikedFeedOptions {
  maxId: string;
}
export interface ListReelMediaViewerFeedOptions {
  mediaId: string;
  nextMaxId: string;
}
export interface LocationFeedOptions {
  nextMaxId: string;
  nextPage: number;
  nextMediaIds: string[];
}
export interface MediaCommentsFeedOptions {
  id: string;
  nextMaxId: string;
  nextMinId: string;
}
export interface MediaInlineChildCommentsFeedOptions {
  id: string;
  mediaId: string;
  commentId: string;
  nextMaxId: string;
  nextMinId: string;
}
export interface MediaStickerResponsesFeedOptions {
  name: string;
  rootName: string;
  itemName: string;
  stickerId: string;
  mediaId: string;
  maxId: string;
}
export interface MusicFeedOptions {
  nextCursor: string;
  product: IgAppModule;
  id: number | string;
}
export interface MusicGenreFeedOptions {
  nextCursor: string;
  product: IgAppModule;
  id: number | string;
}
export interface MusicMoodFeedOptions {
  nextCursor: string;
  product: IgAppModule;
  id: number | string;
}
export interface MusicSearchFeedOptions {
  nextCursor: string;
  product: IgAppModule;
  query: string;
  searchSessionId: string;
}
export interface MusicTrendingFeedOptions {
  nextCursor: string;
  product: IgAppModule;
}

export interface NewsFeedOptions {
  nextMaxId: string;
}

export interface PostsInsightsFeedOptionOptions {
  options: PostsInsightsFeedOptions;
  nextCursor: string;
}

export interface ReelsMediaFeedOptions {
  userIds: Array<number | string>;
  source: IgAppModule;
}

export interface ReelsTrayFeedOptions {
  reason: 'cold_start' | 'pull_to_refresh';
}

export interface SavedFeedOptions {
  nextMaxId: string;
}

export interface StoriesInsightsFeedOptions {
  timeframe: 'ONE_DAY' | 'ONE_WEEK' | 'TWO_WEEKS';
  nextCursor: string;
  count: number;
}

export interface TagFeedOptions {
  tag: string;
  nextMaxId: string;
}

export interface TagsFeedOptions {
  tag: string;
  tab: 'top' | 'recent' | 'places';
  nextMaxId: string;
  nextPage: number;
  nextMediaIds: string[];
}

export interface TimelineFeedOptions {
  tag: string;
  nextMaxId: string;
  reason: TimelineFeedReason;
}

export interface TopicalExploreFeedOptions {
  module: IgAppModule;
  lat?: string | number;
  lng?: string | number;
  clusterId: 'explore_all:0' | string;
  nextMaxId: string;
}

export interface UserStoryFeedOptions {
  userId: string | number;
}

export interface UserFeedOptions {
  id: string | number;
  nextMaxId: string;
}
export interface UsertagsFeedOptions {
  id: string | number;
  nextMaxId: string;
}
