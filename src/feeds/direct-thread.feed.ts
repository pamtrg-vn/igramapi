import { Expose } from 'class-transformer';
import { Feed } from '../core/feed';
import { DirectThreadFeedResponse, DirectThreadFeedResponseItemsItem } from '../responses';
import { DirectThreadFeedOptions } from '../types/feed.options';

export class DirectThreadFeed extends Feed<DirectThreadFeedResponse, DirectThreadFeedResponseItemsItem> {
  public id: string;
  public seqId: number;

  @Expose()
  public cursor: string;

  protected set state(body: DirectThreadFeedResponse) {
    this.cursor = body.thread.oldest_cursor;
    this.moreAvailable = body.thread.has_older;
  }

  public setOptions(options: Partial<DirectThreadFeedOptions>) {
    this.cursor = options?.cursor || this.cursor;
    this.seqId = options?.seqId;
    return this;
  }

  public setCursor(cursor: string) {
    this.cursor = cursor;
    return this;
  }

  public setSeqId(seqId: number) {
    this.seqId = seqId;
    return this;
  }

  async request() {
    const { body } = await this.client.request.send<DirectThreadFeedResponse>({
      url: `/api/v1/direct_v2/threads/${this.id}/`,
      qs: {
        visual_message_return_type: 'unseen',
        cursor: this.cursor,
        direction: 'older',
        seq_id: this.seqId,
        limit: 10,
      },
    });
    this.state = body;
    return body;
  }

  async items() {
    const response = await this.request();
    return response.thread.items;
  }
}
