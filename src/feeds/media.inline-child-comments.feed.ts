import { Feed } from '../core/feed';
import { Expose } from 'class-transformer';
import {
  MediaInlineChildCommentsFeedResponseChildCommentsItem,
  MediaInlineChildCommentsFeedResponseRootObject,
} from '../responses/media.inline-child-comments.feed.response';
import { MediaInlineChildCommentsFeedOptions } from '../types/feed.options';

export class MediaInlineChildCommentsFeed extends Feed<
  MediaInlineChildCommentsFeedResponseRootObject,
  MediaInlineChildCommentsFeedResponseChildCommentsItem
> {
  private mediaId: string;
  private commentId: string;
  @Expose()
  protected nextMaxId: string;
  @Expose()
  protected nextMinId?: string;

  protected set state(state: MediaInlineChildCommentsFeedResponseRootObject) {
    this.moreAvailable = !!state.next_max_child_cursor;
    this.nextMaxId = state.next_max_child_cursor;
    this.nextMinId = undefined;
  }

  public setOptions(options: Partial<MediaInlineChildCommentsFeedOptions>) {
    this.mediaId = options?.mediaId || this.mediaId;
    this.commentId = options?.commentId || this.commentId;
    this.nextMaxId = options?.nextMaxId || this.nextMaxId;
    this.nextMinId = options?.nextMinId || this.nextMinId;
    return this;
  }

  public setNextMaxId(nextMaxId: string) {
    this.nextMaxId = nextMaxId;
    return this;
  }

  public setNextMinId(nextMinId: string) {
    this.nextMinId = nextMinId;
    return this;
  }

  public setMediaId(mediaId: string) {
    this.mediaId = mediaId;
    return this;
  }

  public setCommentId(commentId: string) {
    this.commentId = commentId;
    return this;
  }

  public async request(): Promise<MediaInlineChildCommentsFeedResponseRootObject> {
    const { body } = await this.client.request.send({
      url: `/api/v1/media/${this.mediaId}/comments/${this.commentId}/inline_child_comments/`,
      qs: {
        min_id: this.nextMinId,
        max_id: this.nextMaxId,
      },
    });
    this.state = body;
    return body;
  }

  public async items(): Promise<MediaInlineChildCommentsFeedResponseChildCommentsItem[]> {
    const req = await this.request();
    return req.child_comments;
  }
}
