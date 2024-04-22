import { Expose, plainToClassFromExist } from 'class-transformer';
import { Feed } from '../core/feed';
import { DiscoverFeedResponseRootObject, DiscoverFeedResponseUser } from '../responses';
import { DiscoverFeedOptions } from '../types/feed.options';

export class DiscoverFeed extends Feed<DiscoverFeedResponseRootObject, DiscoverFeedResponseUser> {
  @Expose()
  private nextMaxId: string;

  protected set state(body: DiscoverFeedResponseRootObject) {
    this.moreAvailable = body.more_available;
    this.nextMaxId = body.max_id;
  }

  public setOptions(options: Partial<DiscoverFeedOptions>) {
    this.nextMaxId = options?.nextMaxId || this.nextMaxId;
    return this;
  }

  public setNexMaxId(nextMaxId: string) {
    this.nextMaxId = nextMaxId;
    return this;
  }

  async request() {
    const { body } = await this.client.request.send<DiscoverFeedResponseRootObject>({
      url: `/api/v1/discover/ayml/`,
      method: 'POST',
      form: {
        max_id: this.nextMaxId,
        phone_id: this.client.state.phoneId,
        module: 'discover_people',
        _uuid: this.client.state.uuid,
        _csrftoken: this.client.state.cookieCsrfToken,
        paginate: true,
      },
    });
    this.state = body;
    return body;
  }

  async items() {
    const body = await this.request();
    return body.suggested_users.suggestions.map(user =>
      plainToClassFromExist(new DiscoverFeedResponseUser(this.client), user),
    );
  }
}
