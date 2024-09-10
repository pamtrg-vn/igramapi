import { Repository } from '../core/repository';

export class BloksRepository extends Repository {
  public async attestation() {
    const result = await this.client.request.send({
      url: '/api/v1/attestation/create_android_keystore/',
      method: 'POST',
      form: {
        app_scoped_device_id: this.client.state.uuid,
        key_hash: this.client.request.signature(this.client.state.uuid, true),
      },
    });

    return result;
  }

  public tokenFetch() {
    return this.client.request.send({
      url: '/api/v1/bloks/apps/com.bloks.www.caa.login.oauth.token.fetch.async/',
      method: 'POST',
      headers: {
        'X-IG-Nav-Chain': `com.bloks.www.caa.login.aymh.screen_query:com.bloks.www.caa.login.aymh.screen_query:1:button:${(
          Date.now() / 1000
        ).toFixed(3)}::`,
      },
      form: {
        params: JSON.stringify({
          client_input_params: { username_input: '', lois_settings: { lois_token: '', lara_override: '' } },
          server_params: {
            is_from_logged_out: 0,
            layered_homepage_experiment_group: null,
            family_device_id: null,
            device_id: null,
            offline_experiment_group: null,
            INTERNAL_INFRA_THEME: 'harm_f',
            waterfall_id: null,
            access_flow_version: 'LEGACY_FLOW',
            is_from_logged_in_switcher: 0,
            is_platform_login: 0,
          },
        }),
        bk_client_context: JSON.stringify({
          bloks_version: this.client.state.bloksVersionId,
          styles_id: 'instagram',
        }),
        bloks_versioning_id: this.client.state.bloksVersionId,
      },
    });
  }

  public login(username: string, enc_password: string) {
    return this.client.request.send({
      url: '/api/v1/bloks/apps/com.bloks.www.bloks.caa.login.async.send_login_request/',
      method: 'POST',
      headers: {
        'X-IG-Nav-Chain': `com.bloks.www.caa.login.aymh.screen_query:com.bloks.www.caa.login.aymh.screen_query:1:button:${(
          Date.now() / 1000
        ).toFixed(3)}::`,
      },
      form: {
        params: JSON.stringify({
          client_input_params: {
            device_id: this.client.state.deviceId,
            sim_phones: [],
            login_attempt_count: 1,
            secure_family_device_id: '',
            machine_id: this.client.state.mid,
            accounts_list: [],
            auth_secure_device_id: '',
            has_whatsapp_installed: 0,
            password: enc_password,
            sso_token_map_json_string: '',
            family_device_id: '',
            fb_ig_device_id: [],
            device_emails: [],
            try_num: 1,
            lois_settings: { lois_token: '', lara_override: '' },
            event_flow: 'login_manual',
            event_step: 'home_page',
            headers_infra_flow_id: '',
            openid_tokens: {},
            client_known_key_hash: '',
            contact_point: username,
            encrypted_msisdn: '',
          },
          server_params: {
            should_trigger_override_login_2fa_action: 0,
            is_from_logged_out: 0,
            should_trigger_override_login_success_action: 0,
            login_credential_type: 'none',
            server_login_source: 'login',
            waterfall_id: null,
            login_source: 'Login',
            is_platform_login: 0,
            // INTERNAL__latency_qpl_marker_id: 36707139,
            offline_experiment_group: null,
            is_from_landing_page: 0,
            password_text_input_id: 'l0jfo9:87',
            is_from_empty_password: 0,
            ar_event_source: 'login_home_page',
            username_text_input_id: 'l0jfo9:86',
            layered_homepage_experiment_group: null,
            should_show_nested_nta_from_aymh: 1,
            device_id: null,
            // INTERNAL__latency_qpl_instance_id: 1.27069647300212e14,
            reg_flow_source: 'cacheable_aymh_screen',
            is_caa_perf_enabled: 1,
            credential_type: 'password',
            is_from_password_entry_page: 0,
            caller: 'gslr',
            family_device_id: null,
            INTERNAL_INFRA_THEME: 'harm_f',
            access_flow_version: 'LEGACY_FLOW',
            is_from_logged_in_switcher: 0,
          },
        }),
        bk_client_context: JSON.stringify({
          bloks_version: this.client.state.bloksVersionId,
          styles_id: 'instagram',
        }),
        bloks_versioning_id: this.client.state.bloksVersionId,
      },
    });

    return { body: { logged_in_user: {} } } as any;
  }

  //   public async processClientDataAndRedirect() {
  //     const { body } = await this.client.request.send({
  //       url: '/api/v1/bloks/apps/com.bloks.www.bloks.caa.login.process_client_data_and_redirect/',
  //       baseUrl: 'https://b.i.instagram.com/',
  //       method: 'POST',
  //       form: {
  //         params: {
  //           is_from_logged_out: false,
  //           logged_out_user: '',
  //           qpl_join_id: '237d57a5-053f-49f5-89fc-d42eba1819c2',
  //           family_device_id: null,
  //           device_id: this.client.state.uuid,
  //           offline_experiment_group: 'caa_iteration_v3_perf_ig_4',
  //           waterfall_id: this.client.state.adid,
  //           show_internal_settings: false,
  //           last_auto_login_time: 0,
  //           disable_auto_login: false,
  //           qe_device_id: this.client.state.adid,
  //           is_from_logged_in_switcher: false,
  //           switcher_logged_in_uid: '',
  //           account_list: [],
  //           blocked_uid: [],
  //           INTERNAL_INFRA_THEME: 'HARMONIZATION_F',
  //           launched_url: '',
  //         },
  //         bk_client_context: {
  //           bloks_version: this.client.state.bloksVersionId,
  //           styles_id: 'instagram',
  //         },
  //         bloks_versioning_id: this.client.state.bloksVersionId,
  //       },
  //     });

  //     return body;
  //   }
}
