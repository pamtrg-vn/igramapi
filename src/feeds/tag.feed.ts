import { Expose } from 'class-transformer';
import { Feed } from '../core/feed';
import { TagFeedResponse, TagFeedResponseItemsItem } from '../responses';
import { TagFeedOptions } from '../types';

export class TagFeed extends Feed<TagFeedResponse, TagFeedResponseItemsItem> {
  tag: string;
  @Expose()
  private nextMaxId: string;

  public setOptions(options: Partial<TagFeedOptions>) {
    this.tag = options?.tag || this.tag;
    this.nextMaxId = options?.nextMaxId || this.nextMaxId;
    return this;
  }

  public setTag(tag: string) {
    this.tag = tag;
    return this;
  }

  public setNextMaxId(nextMaxId: string) {
    this.nextMaxId = nextMaxId;
    return this;
  }

  set state(body: TagFeedResponse) {
    this.moreAvailable = body.more_available;
    this.nextMaxId = body.next_max_id;
  }

  async request() {
    const { body } = await this.client.request.send<TagFeedResponse>({
      url: `/api/v1/feed/tag/${encodeURI(this.tag)}/`,
      qs: {
        rank_token: this.rankToken,
        max_id: this.nextMaxId,
      },
    });
    this.state = body;
    return body;
  }

  async items() {
    const response = await this.request();
    return response.items;
  }
}
