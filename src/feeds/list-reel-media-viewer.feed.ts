import { ListReelMediaViewerFeedOptions } from '../types/feed.options';
import { Feed } from '../core/feed';
import { ListReelMediaViewerFeedResponseRootObject, ListReelMediaViewerFeedResponseUsersItem } from '../responses';
import { Expose } from 'class-transformer';

export class ListReelMediaViewerFeed extends Feed<
    ListReelMediaViewerFeedResponseRootObject,
    ListReelMediaViewerFeedResponseUsersItem
> {
    @Expose()
    private mediaId: string;
    @Expose()
    private nextMaxId?: string = undefined;

    public setOptions(options: Partial<ListReelMediaViewerFeedOptions>) {
        this.nextMaxId = options?.nextMaxId || this.nextMaxId;
        this.mediaId = options?.mediaId || this.mediaId;
        return this;
    }

    public setNextMaxId(nextMaxId: string) {
        this.nextMaxId = nextMaxId;
        return this;
    }

    async items(): Promise<ListReelMediaViewerFeedResponseUsersItem[]> {
        const res = await this.request();
        return res.users;
    }

    protected set state(response: ListReelMediaViewerFeedResponseRootObject) {
        this.nextMaxId = response.next_max_id;
    }

    async request(): Promise<ListReelMediaViewerFeedResponseRootObject> {
        const { body } = await this.client.request.send<ListReelMediaViewerFeedResponseRootObject>({
            url: `/api/v1/media/${this.mediaId}/list_reel_media_viewer`,
            method: 'GET',
            qs: {
                supported_capabilities_new: this.client.state.supportedCapabilities,
                max_id: this.nextMaxId,
            },
        });
        this.state = body;
        return body;
    }

    isMoreAvailable(): boolean {
        return this.nextMaxId !== null;
    }
}
