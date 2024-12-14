import { Feed } from '../core/feed';
import { Expose } from 'class-transformer';
import { StoriesInsightsFeedResponseEdgesItem, StoriesInsightsFeedResponseRootObject } from '../responses';
import { StoriesInsightsFeedOptions } from '../types';

export class StoriesInsightsFeed extends Feed<
    StoriesInsightsFeedResponseRootObject,
    StoriesInsightsFeedResponseEdgesItem
> {
    @Expose()
    private timeframe: 'ONE_DAY' | 'ONE_WEEK' | 'TWO_WEEKS';

    @Expose()
    private nextCursor: string = null;

    @Expose()
    private count: number = 15;

    public setOptions(options: Partial<StoriesInsightsFeedOptions>) {
        this.timeframe = options?.timeframe || this.timeframe;
        this.nextCursor = options?.nextCursor || this.nextCursor;
        this.count = options?.count || this.count;
        return this;
    }

    public setNextCursor(nextCursor: string) {
        this.nextCursor = nextCursor;
        return this;
    }
    public setCount(count: number) {
        this.count = count;
        return this;
    }
    public setTimeframe(timeframe: StoriesInsightsFeedOptions['timeframe']) {
        this.timeframe = timeframe;
        return this;
    }

    async items(): Promise<StoriesInsightsFeedResponseEdgesItem[]> {
        const body = await this.request();
        return body.data.user.business_manager.stories_unit.stories.edges;
    }

    async request(): Promise<StoriesInsightsFeedResponseRootObject> {
        const body = await this.client.ads.graphQL<StoriesInsightsFeedResponseRootObject>({
            surface: { friendlyName: 'IgInsightsStoryGridSurfaceQuery' },
            documentId: '1995528257207653',
            variables: {
                count: this.count,
                cursor: this.nextCursor,
                IgInsightsGridMediaImage_SIZE: 256,
                queryParams: {
                    access_token: '',
                    id: this.client.state.cookieUserId,
                },
                timeframe: this.timeframe,
            },
        });
        this.state = body;
        return body;
    }

    protected set state(response: StoriesInsightsFeedResponseRootObject) {
        const { end_cursor, has_next_page } = response.data.user.business_manager.stories_unit.stories.page_info;
        this.nextCursor = end_cursor;
        this.moreAvailable = has_next_page;
    }
}
