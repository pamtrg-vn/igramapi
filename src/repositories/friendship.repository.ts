import { Repository } from '../core/repository';
import {
  FriendshipRepositoryRootResponseObject,
  FriendshipRepositoryShowResponseObject,
  FriendshipRepositorySetBestiesResponseRootObject,
  FriendshipRepositoryShowManyResponseObject,
  FriendshipRepositoryActionOptions,
  FriendshipRepositoryBlockOptions,
  FriendshipRepositoryUnBlockOptions,
  FriendshipRepositoryCreateDestroyOptions,
  FriendshipRepositoryBlockResponse,
  FriendshipRepositoryUnBlockResponse,
} from '../responses';
import { SetBestiesInput } from '../types';

export class FriendshipRepository extends Repository {
  async show(id: string | number, isExternalDeeplinkProfileView: boolean = false) {
    const { body } = await this.client.request.send<FriendshipRepositoryShowResponseObject>({
      url: `/api/v1/friendships/show/${id}/`,
      qs: {
        is_external_deeplink_profile_view: isExternalDeeplinkProfileView,
      },
    });
    return body;
  }

  async showMany<T extends string | number>(userIds: T[], includeFollowedBy: boolean = true) {
    const { body } = await this.client.request.send<{
      friendship_statuses: Record<T, FriendshipRepositoryShowManyResponseObject>;
    }>({
      url: `/api/v1/friendships/show_many/`,
      method: 'POST',
      form: {
        include_followed_by: includeFollowedBy,
        user_ids: userIds.join(),
        _uuid: this.client.state.uuid,
      },
    });
    return body.friendship_statuses;
  }

  async block(id: string | number, options?: FriendshipRepositoryBlockOptions) {
    return this.action<FriendshipRepositoryBlockResponse>('block', id, {
      user_id: String(id),
      is_auto_block_enabled: String(options?.is_auto_block_enabled || true),
      surface: options?.surface || 'profile',
      container_module: options?.container_module || 'profile',
    });
  }

  async unblock(id: string | number, options?: FriendshipRepositoryUnBlockOptions) {
    return this.action<FriendshipRepositoryUnBlockResponse>('unblock', id, {
      user_id: String(id),
      container_module: options?.container_module || 'profile',
    });
  }

  async create(id: string | number, options?: FriendshipRepositoryCreateDestroyOptions) {
    return this.action('create', id, {
      include_follow_friction_check: String(Number(options?.include_follow_friction_check || true)) as any,
      user_id: String(id),
      radio_type: this.client.state.radioType,
      device_id: this.client.state.deviceId,
      container_module: options?.container_module || 'profile',
      ...(options?.nav_chain && {
        nav_chain: options.nav_chain,
      }),
    });
  }

  async destroy(id: string | number, options?: FriendshipRepositoryCreateDestroyOptions) {
    return this.action('destroy', id, {
      include_follow_friction_check: String(Number(options?.include_follow_friction_check || true)) as any,
      user_id: String(id),
      radio_type: this.client.state.radioType,
      device_id: this.client.state.deviceId,
      container_module: options?.container_module || 'profile',
      ...(options?.nav_chain && {
        nav_chain: options.nav_chain,
      }),
    });
  }

  /**
   * @todo Test approve requested frindship
   * @deprecated This method is un-tested!
   */
  async approve(id: string | number, options?: any) {
    return this.action('approve', id, options);
  }

  /**
   * @todo Test ignore requested frindship
   * @deprecated This method is un-tested!
   */
  async deny(id: string | number, options?: any) {
    return this.action('ignore', id, options);
  }

  async removeFollower(id: string | number, options?: FriendshipRepositoryCreateDestroyOptions) {
    return this.action('remove_follower', id, {
      include_follow_friction_check: String(Number(options?.include_follow_friction_check || false)) as any,
      user_id: String(id),
      radio_type: this.client.state.radioType,
      device_id: this.client.state.deviceId,
      container_module: options?.container_module || 'self_followers',
      ...(options?.nav_chain && {
        nav_chain: options.nav_chain,
      }),
    });
  }

  private async action<T = any>(
    action: string,
    id: string | number,
    options?: FriendshipRepositoryActionOptions,
  ): Promise<T> {
    const { body } = await this.client.request.send({
      url: `/api/v1/friendships/${action}/${id}/`,
      method: 'POST',
      form: this.client.request.sign({
        _uid: this.client.state.igUserId,
        _uuid: this.client.state.uuid,
        ...options,
      }),
    });
    return body.friendship_status;
  }

  /**
   * @todo Test set frindship bestie
   * @deprecated This method is un-tested!
   */
  async setBesties(input: SetBestiesInput = {}) {
    const { body } = await this.client.request.send<FriendshipRepositorySetBestiesResponseRootObject>({
      url: `/api/v1/friendships/set_besties/`,
      method: 'POST',
      form: this.client.request.sign({
        _csrftoken: this.client.state.cookieCsrfToken,
        _uid: this.client.state.cookieUserId,
        device_id: this.client.state.deviceId,
        _uuid: this.client.state.uuid,
        module: 'favorites_home_list',
        source: 'audience_manager',
        add: input.add,
        remove: input.remove,
      }),
    });

    return body.friendship_statuses;
  }

  /**
   * @todo Refactor
   * @deprecated This method is un-tested!
   */
  mutePostsOrStoryFromFollow(options: {
    mediaId?: string;
    targetReelAuthorId?: string;
    targetPostsAuthorId?: string;
  }): Promise<FriendshipRepositoryRootResponseObject> {
    return this.changeMuteFromFollow('mute', {
      media_id: options.mediaId,
      target_reel_author_id: options.targetReelAuthorId,
      target_posts_author_id: options.targetPostsAuthorId,
    });
  }

  /**
   * @todo Refactor
   * @deprecated This method is un-tested!
   */
  unmutePostsOrStoryFromFollow(options: {
    targetReelAuthorId?: string;
    targetPostsAuthorId?: string;
  }): Promise<FriendshipRepositoryRootResponseObject> {
    return this.changeMuteFromFollow('unmute', {
      target_reel_author_id: options.targetReelAuthorId,
      target_posts_author_id: options.targetPostsAuthorId,
    });
  }

  /**
   * @todo Refactor
   */
  private async changeMuteFromFollow(mode: 'mute' | 'unmute', options: Record<string, any>) {
    const { body } = await this.client.request.send({
      url: `/api/v1/friendships/${mode}_posts_or_story_from_follow/`,
      method: 'POST',
      form: {
        _csrftoken: this.client.state.cookieCsrfToken,
        _uid: this.client.state.cookieUserId,
        _uuid: this.client.state.uuid,
        ...options,
      },
    });
    return body;
  }
}
