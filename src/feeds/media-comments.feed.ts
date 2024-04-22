import { Expose } from 'class-transformer';
import { Feed } from '../core/feed';
import { MediaCommentsFeedResponse, MediaCommentsFeedResponseCommentsItem } from '../responses/';
import { MediaCommentsFeedOptions } from '../types/feed.options';

export class MediaCommentsFeed extends Feed<MediaCommentsFeedResponse, MediaCommentsFeedResponseCommentsItem> {
  id: string;
  @Expose()
  private nextMaxId: string;
  @Expose()
  private nextMinId: string;

  protected set state(body: MediaCommentsFeedResponse) {
    this.moreAvailable = !!body.next_max_id || !!body.next_min_id;
    this.nextMaxId = body.next_max_id;
    this.nextMinId = body.next_min_id;
  }

  public setOptions(options: Partial<MediaCommentsFeedOptions>) {
    this.id = options?.id || this.id;
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

  async request() {
    const { body } = await this.client.request.send<MediaCommentsFeedResponse>({
      url: `/api/v1/media/${this.id}/comments/`,
      qs: {
        can_support_threading: true,
        max_id: this.nextMaxId,
        min_id: this.nextMinId,
      },
    });
    this.state = body;
    return body;
  }

  async items() {
    const response = await this.request();
    return response.comments;
  }
}
