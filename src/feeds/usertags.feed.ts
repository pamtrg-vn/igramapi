import { Feed } from '../core/feed';
import { Expose } from 'class-transformer';
import { UsertagsFeedResponseItemsItem, UsertagsFeedResponseRootObject } from '../responses';
import { UsertagsFeedOptions } from 'src/types';

export class UsertagsFeed extends Feed<UsertagsFeedResponseRootObject, UsertagsFeedResponseItemsItem> {
    id: number | string;
    @Expose()
    private nextMaxId: string;

    public setOptions(options: Partial<UsertagsFeedOptions>) {
        this.id = options.id || this.id;
        this.nextMaxId = options.nextMaxId || this.nextMaxId;
        return this;
    }

    public setNextMaxId(nextMaxId: string) {
        this.nextMaxId = nextMaxId;
        return this;
    }

    public setId(id: string | number) {
        this.id = id;
        return this;
    }
    protected set state(body: UsertagsFeedResponseRootObject) {
        this.moreAvailable = body.more_available;
        this.nextMaxId = body.next_max_id;
    }

    async request() {
        const { body } = await this.client.request.send<UsertagsFeedResponseRootObject>({
            url: `/api/v1/usertags/${this.id}/feed/`,
            qs: {
                max_id: this.nextMaxId,
            },
        });
        this.state = body;
        return body;
    }

    async items() {
        const body = await this.request();
        return body.items;
    }
}
