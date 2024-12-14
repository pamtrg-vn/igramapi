import { Repository } from '../core/repository';
import {
    MusicRepositoryGenresResponseRootObject,
    MusicRepositoryMoodsResponseRootObject,
    MusicRepositoryLyricsResponseRootObject,
    MusicRepositoryGlobalSearchResponseRootObject,
} from '../responses';
import { IgAppModule } from '../types/common.types';

export class MusicRepository extends Repository {
    public async moods(product?: IgAppModule): Promise<MusicRepositoryMoodsResponseRootObject> {
        product = product || 'story_camera_music_overlay_post_capture';
        const { body } = await this.client.request.send<MusicRepositoryMoodsResponseRootObject>({
            url: '/api/v1/music/moods/',
            method: 'POST',
            form: {
                _csrftoken: this.client.state.cookieCsrfToken,
                product,
                _uuid: this.client.state.uuid,
                browse_session_id: this.client.state.clientSessionId,
            },
        });
        return body;
    }

    public async genres(product?: IgAppModule): Promise<MusicRepositoryGenresResponseRootObject> {
        product = product || 'story_camera_music_overlay_post_capture';
        const { body } = await this.client.request.send<MusicRepositoryGenresResponseRootObject>({
            url: '/api/v1/music/genres/',
            method: 'POST',
            form: {
                _csrftoken: this.client.state.cookieCsrfToken,
                product,
                _uuid: this.client.state.uuid,
                browse_session_id: this.client.state.clientSessionId,
            },
        });
        return body;
    }

    public async audioGlobalSearch(query: string): Promise<MusicRepositoryGlobalSearchResponseRootObject> {
        const { body } = await this.client.request.send<MusicRepositoryGlobalSearchResponseRootObject>({
            url: '/api/v1/music/audio_global_search/',
            method: 'GET',
            qs: {
                _csrftoken: this.client.state.cookieCsrfToken,
                query,
                browse_session_id: this.client.state.clientSessionId,
            },
        });
        return body;
    }

    public async lyrics(trackId: number | string): Promise<MusicRepositoryLyricsResponseRootObject> {
        const { body } = await this.client.request.send<MusicRepositoryLyricsResponseRootObject>({
            url: `/api/v1/music/track/${trackId}/lyrics/`,
            method: 'GET',
        });
        return body;
    }
}
