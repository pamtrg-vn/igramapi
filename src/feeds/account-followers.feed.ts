import { Expose, plainToClassFromExist } from 'class-transformer';
import { Feed } from '../core/feed';
import { AccountFollowersFeedResponse, AccountFollowersFeedResponseUsersItem } from '../responses';
import { AccountFollowersFeedOptions } from '../types/feed.options';

export class AccountFollowersFeed extends Feed<AccountFollowersFeedResponse, AccountFollowersFeedResponseUsersItem> {
  searchSurface?: string;
  /**
   * only 'default' seems to work
   */
  order?: 'default' = 'default';
  query = '';
  enableGroups = true;

  id: number | string;
  @Expose()
  private nextMaxId: string;

  protected set state(body: AccountFollowersFeedResponse) {
    this.moreAvailable = !!body.next_max_id;
    this.nextMaxId = body.next_max_id;
  }

  public setOptions(options: Partial<AccountFollowersFeedOptions>) {
    this.id = options?.id || this.id;
    this.nextMaxId = options?.nextMaxId || this.nextMaxId;
    this.searchSurface = options?.searchSurface || this.searchSurface;
    this.order = options?.order || this.order;
    this.query = options?.query || this.query;
    this.enableGroups = options?.enableGroups || this.enableGroups;
    return this;
  }

  public setNextMaxId(nextMaxId: string) {
    this.nextMaxId = nextMaxId;
    return this;
  }

  public setQuery(query: string) {
    this.query = query;
    return this;
  }

  public setSearchSurface(searchSurface: string) {
    this.searchSurface = searchSurface;
    return this;
  }

  async request() {
    const { body } = await this.client.request.send<AccountFollowersFeedResponse>({
      url: `/api/v1/friendships/${this.id}/followers/`,
      qs: {
        max_id: this.nextMaxId,
        search_surface: this.searchSurface,
        order: this.order,
        query: this.query,
        enable_groups: this.enableGroups,
      },
    });
    this.state = body;
    return body;
  }

  async items() {
    const body = await this.request();
    return body.users.map(user => plainToClassFromExist(new AccountFollowersFeedResponseUsersItem(this.client), user));
  }
}
