import { Feed } from '../core/feed';
import { IgAppModule } from '../types/common.types';
import { MusicGenreFeedResponseItemsItem, MusicGenreFeedResponseRootObject } from '../responses';
import { Expose } from 'class-transformer';
import { MusicGenreFeedOptions } from '../types/feed.options';

export class MusicGenreFeed extends Feed<MusicGenreFeedResponseRootObject, MusicGenreFeedResponseItemsItem> {
  @Expose()
  protected nextCursor?: string;

  @Expose()
  public product: IgAppModule;
  @Expose()
  public id: number | string;

  async items(): Promise<MusicGenreFeedResponseItemsItem[]> {
    const response = await this.request();
    return response.items;
  }

  public setOptions(options: Partial<MusicGenreFeedOptions>) {
    this.id = options?.id || this.id;
    this.product = options?.product || this.product;
    this.nextCursor = options?.nextCursor || this.nextCursor;
    return this;
  }

  public setNextCursor(nextCursor: string) {
    this.nextCursor = nextCursor;
    return this;
  }

  async request(): Promise<MusicGenreFeedResponseRootObject> {
    const { body } = await this.client.request.send<MusicGenreFeedResponseRootObject>({
      url: `/api/v1/music/genres/${this.id}/`,
      method: 'POST',
      form: {
        cursor: this.nextCursor || '0',
        _csrftoken: this.client.state.cookieCsrfToken,
        product: this.product,
        _uuid: this.client.state.uuid,
        browse_session_id: this.client.state.clientSessionId,
      },
    });
    this.state = body;
    return body;
  }

  protected set state(response: MusicGenreFeedResponseRootObject) {
    this.nextCursor = response.page_info.next_max_id;
    this.moreAvailable = response.page_info.more_available;
  }

  isMoreAvailable(): boolean {
    return this.moreAvailable;
  }
}
