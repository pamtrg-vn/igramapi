import { Expose, plainToClassFromExist } from 'class-transformer';
import { Feed } from '../core/feed';
import { AccountFollowingFeedResponse, AccountFollowingFeedResponseUsersItem } from '../responses';
import { AccountFollowingFeedOptions } from '../types/feed.options';

export class AccountFollowingFeed extends Feed<AccountFollowingFeedResponse, AccountFollowingFeedResponseUsersItem> {
  searchSurface?: string;
  order?: 'default' | 'date_followed_latest' | 'date_followed_earliest' = 'default';
  query = '';
  enableGroups = true;
  includesHashtags = true;

  id: number | string;
  @Expose()
  private nextMaxId: string;

  protected set state(body: AccountFollowingFeedResponse) {
    this.moreAvailable = !!body.next_max_id;
    this.nextMaxId = body.next_max_id;
  }

  public setOptions(options: Partial<AccountFollowingFeedOptions>) {
    this.id = options?.id || this.id;
    this.nextMaxId = options?.nextMaxId || this.nextMaxId;
    this.searchSurface = options?.searchSurface || this.searchSurface;
    this.order = options?.order || this.order;
    this.query = options?.query || this.query;
    this.enableGroups = options?.enableGroups || this.enableGroups;
    this.includesHashtags = options?.includesHashtags || this.enableGroups;
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
    const { body } = await this.client.request.send<AccountFollowingFeedResponse>({
      url: `/api/v1/friendships/${this.id}/following/`,
      qs: {
        rank_token: this.rankToken,
        max_id: this.nextMaxId,
        search_surface: this.searchSurface,
        order: this.order,
        query: this.query,
        enable_groups: this.enableGroups,
        includes_hashtags: this.includesHashtags,
      },
    });
    this.state = body;
    return body;
  }

  async items() {
    const body = await this.request();
    return body.users.map(user => plainToClassFromExist(new AccountFollowingFeedResponseUsersItem(this.client), user));
  }
}
