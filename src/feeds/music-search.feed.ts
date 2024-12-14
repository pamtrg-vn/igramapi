import { Feed } from '../core/feed';
import { IgAppModule } from '../types/common.types';
import { MusicSearchFeedResponseItemsItem, MusicSearchFeedResponseRootObject } from '../responses';
import { Expose } from 'class-transformer';
import { MusicSearchFeedOptions } from '../types/feed.options';

export class MusicSearchFeed extends Feed<MusicSearchFeedResponseRootObject, MusicSearchFeedResponseItemsItem> {
    @Expose()
    protected nextCursor?: string;

    @Expose()
    public product: IgAppModule;
    @Expose()
    public query: string;
    @Expose()
    public searchSessionId: string;

    public setOptions(options: Partial<MusicSearchFeedOptions>) {
        this.query = options?.query || this.query;
        this.product = options?.product || this.product;
        this.nextCursor = options?.nextCursor || this.nextCursor;
        this.searchSessionId = options?.searchSessionId || this.query;
        return this;
    }

    public setNextCursor(nextCursor: string) {
        this.nextCursor = nextCursor;
        return this;
    }

    async items(): Promise<MusicSearchFeedResponseItemsItem[]> {
        const response = await this.request();
        return response.items;
    }

    async request(): Promise<MusicSearchFeedResponseRootObject> {
        const { body } = await this.client.request.send<MusicSearchFeedResponseRootObject>({
            url: '/api/v1/music/search/',
            method: 'POST',
            form: {
                cursor: this.nextCursor || '0',
                _csrftoken: this.client.state.cookieCsrfToken,
                product: this.product,
                _uuid: this.client.state.uuid,
                browse_session_id: this.client.state.clientSessionId,
                search_session_id: this.searchSessionId,
                q: this.query,
            },
        });
        this.state = body;
        return body;
    }

    protected set state(response: any) {
        this.nextCursor = response.page_info.next_max_id;
        this.moreAvailable = response.page_info.more_available;
    }

    isMoreAvailable(): boolean {
        return this.moreAvailable;
    }
}
