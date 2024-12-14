import { Repository } from '../core/repository';

export class ZrRepository extends Repository {
    public tokenResult() {
        return this.client.request.send({
            url: '/api/v1/zr/token/result/',
            qs: {
                device_id: this.client.state.deviceId,
                token_hash: '',
                custom_device_id: this.client.state.uuid,
                fetch_reason: 'token_expired',
            },
        });
    }

    public async dualTokens(normalTokenHash: string = '') {
        const result = await this.client.request.send({
            url: '/api/v1/zr/dual_tokens/',
            method: 'POST',
            form: {
                normal_token_hash: normalTokenHash,
                device_id: this.client.state.deviceId,
                custom_device_id: this.client.state.uuid,
                fetch_reason: 'token_expired',
            },
        });

        return result;
    }
}
