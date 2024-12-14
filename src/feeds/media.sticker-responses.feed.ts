import { MediaStickerResponsesFeedOptions } from '../types/feed.options';
import { Feed } from '../core/feed';
import { Expose } from 'class-transformer';

export class MediaStickerResponsesFeed<T, I> extends Feed<T, I> {
    private name: string;
    private rootName: string;
    private itemName: string;

    private stickerId: string;
    private mediaId: string;
    @Expose()
    private maxId: string = undefined;

    public setOptions(options: Partial<MediaStickerResponsesFeedOptions>) {
        this.name = options?.name || this.name;
        this.rootName = options?.rootName || this.rootName;
        this.itemName = options?.itemName || this.itemName;
        this.mediaId = options?.mediaId || this.mediaId;
        this.stickerId = options?.stickerId || this.stickerId;
        this.maxId = options?.maxId || this.stickerId;
        return this;
    }

    public setMaxId(maxId: string) {
        this.maxId = maxId;
        return this;
    }
    public setName(name: string) {
        this.name = name;
        return this;
    }
    public setRootName(rootName: string) {
        this.rootName = rootName;
        return this;
    }
    public setItemName(itemName: string) {
        this.itemName = itemName;
        return this;
    }
    public setStickerId(stickerId: string) {
        this.stickerId = stickerId;
        return this;
    }
    public setMediaId(mediaId: string) {
        this.mediaId = mediaId;
        return this;
    }

    async items(): Promise<I[]> {
        const response = await this.request();
        return response[this.rootName][this.itemName];
    }

    async request(): Promise<T> {
        const { body } = await this.client.request.send({
            url: `/api/v1/media/${this.mediaId}/${this.stickerId}/${this.name}/`,
            method: 'GET',
            qs: {
                max_id: this.maxId || void 0,
            },
        });
        this.state = body;
        return body;
    }

    protected set state(response: T) {
        this.maxId = response[this.rootName].max_id;
        this.moreAvailable = response[this.rootName].more_available;
    }
}
