import { Expose, plainToClassFromExist } from 'class-transformer';
import { Feed } from '../core/feed';
import { PendingFriendshipsFeedResponse, PendingFriendshipsFeedResponseUsersItem } from '../responses';
import { PendingFriendshipsFeedOptions } from '../types/feed.options';

export class PendingFriendshipsFeed extends Feed<
    PendingFriendshipsFeedResponse,
    PendingFriendshipsFeedResponseUsersItem
> {
    @Expose()
    private nextMaxId: string;

    protected set state(body: PendingFriendshipsFeedResponse) {
        this.moreAvailable = !!body.next_max_id;
        this.nextMaxId = body.next_max_id;
    }

    public setOptions(options: Partial<PendingFriendshipsFeedOptions>) {
        this.nextMaxId = options?.nextMaxId || this.nextMaxId;
        return this;
    }

    public setNextMaxId(nextMaxId: string) {
        this.nextMaxId = nextMaxId;
        return this;
    }

    async request() {
        const { body } = await this.client.request.send<PendingFriendshipsFeedResponse>({
            url: `/api/v1/friendships/pending`,
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
        return body.users.map(user =>
            plainToClassFromExist(new PendingFriendshipsFeedResponseUsersItem(this.client), user),
        );
    }
}
