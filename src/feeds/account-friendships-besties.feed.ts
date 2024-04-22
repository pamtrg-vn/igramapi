import { Expose, plainToClassFromExist } from 'class-transformer';
import { Feed } from '../core/feed';
import { BestiesFeedResponse, BestiesFeedResponseUsersItem } from '../responses';
import { BestiesFeedOptions } from '../types/feed.options';

export class BestiesFeed extends Feed<BestiesFeedResponse, BestiesFeedResponseUsersItem> {
  @Expose()
  private nextMaxId: string;

  protected set state(body: BestiesFeedResponse) {
    this.moreAvailable = !!body.next_max_id;
    this.nextMaxId = body.next_max_id;
  }

  public setOptions(options: Partial<BestiesFeedOptions>) {
    this.nextMaxId = options?.nextMaxId || this.nextMaxId;
    return this;
  }

  public setNextMaxId(nextMaxId: string) {
    this.nextMaxId = nextMaxId;
    return this;
  }

  async request() {
    const { body } = await this.client.request.send<BestiesFeedResponse>({
      url: `/api/v1/friendships/besties`,
      qs: {
        rank_token: this.rankToken,
        max_id: this.nextMaxId,
      },
    });
    this.state = body;
    return body;
  }

  async items() {
    const body = await this.request();
    return body.users.map(user => plainToClassFromExist(new BestiesFeedResponseUsersItem(this.client), user));
  }
}
