import { Feed } from '../core/feed';
import { Expose } from 'class-transformer';
import { LikedFeedResponseItemsItem, LikedFeedResponseRootObject } from '../responses';
import { LikedFeedOptions } from '../types/feed.options';

export class LikedFeed extends Feed<LikedFeedResponseRootObject, LikedFeedResponseItemsItem> {
    @Expose()
    private maxId: string;

    public setOptions(options: Partial<LikedFeedOptions>) {
        this.maxId = options?.maxId || this.maxId;
        return this;
    }

    public setMaxId(maxId: string) {
        this.maxId = maxId;
        return this;
    }

    async items(): Promise<LikedFeedResponseItemsItem[]> {
        const res = await this.request();
        return res.items;
    }

    async request(): Promise<LikedFeedResponseRootObject> {
        const { body } = await this.client.request.send({
            url: `/api/v1/feed/liked/`,
            method: 'GET',
            qs: {
                max_id: this.maxId,
            },
        });
        this.state = body;
        return body;
    }

    protected set state(response: LikedFeedResponseRootObject) {
        this.moreAvailable = response.more_available;
        this.maxId = response.next_max_id?.toString();
    }
}
