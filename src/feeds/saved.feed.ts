import { Expose } from 'class-transformer';
import { Feed } from '../core/feed';
import { SavedFeedResponseRootObject, SavedFeedResponseMedia } from '../responses';
import { SavedFeedOptions } from '../types';

export class SavedFeed extends Feed<SavedFeedResponseRootObject, SavedFeedResponseMedia> {
  @Expose()
  private nextMaxId: string;

  set state(body: SavedFeedResponseRootObject) {
    this.moreAvailable = body.more_available;
    this.nextMaxId = body.next_max_id;
  }

  public setOptions(options: Partial<SavedFeedOptions>) {
    this.nextMaxId = options?.nextMaxId || this.nextMaxId;
    return this;
  }

  public setNextMaxId(nextMaxId: string) {
    this.nextMaxId = nextMaxId;
    return this;
  }

  async request(): Promise<SavedFeedResponseRootObject> {
    const { body } = await this.client.request.send({
      url: '/api/v1/feed/saved/',
      qs: {
        max_id: this.nextMaxId,
        include_igtv_preview: false,
      },
    });
    this.state = body;
    return body;
  }

  async items(): Promise<SavedFeedResponseMedia[]> {
    const { items } = await this.request();
    return items.map(i => i.media);
  }
}
