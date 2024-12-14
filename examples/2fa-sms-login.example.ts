/* tslint:disable:no-console */
import { IgApiClient, IgLoginTwoFactorRequiredError } from '../src';
import { authenticator } from 'otplib';
import * as Bluebird from 'bluebird';
require('dotenv').config();

// Function to handle login and two-factor authentication
async function loginWithTwoFactor(ig: IgApiClient) {
    try {
        // Attempt to log in
        await Bluebird.try(() => ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD));
    } catch (err) {
        if (err instanceof IgLoginTwoFactorRequiredError) {
            console.log('Two-factor authentication required.');
            await handleTwoFactorAuth(ig, err);
        } else {
            console.error('Error during login:', err);
            throw err;
        }
    }
}

// Function to handle two-factor authentication
async function handleTwoFactorAuth(ig: IgApiClient, err: IgLoginTwoFactorRequiredError) {
    const { username, totp_two_factor_on, two_factor_identifier } = err.response.body.two_factor_info;

    // Determine the verification method (SMS or TOTP)
    const verificationMethod = totp_two_factor_on ? '0' : '1'; // '0' for TOTP, '1' for SMS
    const verificationMessage = verificationMethod === '1' ? 'SMS' : 'TOTP';
    console.log(`Two-factor method: ${verificationMessage}`);

    // Generate the TOTP code using otplib if TOTP is enabled, or wait for SMS
    const code = totp_two_factor_on ? authenticator.generate(process.env.IG_SECRET) : await getSmsCode();

    try {
        await ig.account.twoFactorLogin({
            username,
            verificationCode: code,
            twoFactorIdentifier: two_factor_identifier,
            verificationMethod,
            trustThisDevice: '1', // Trust this device
        });
    } catch (err) {
        console.error('Error completing two-factor authentication:', err);
        throw err;
    }
}

// Function to simulate receiving an SMS code (you can replace this with actual logic)
async function getSmsCode(): Promise<string> {
    // In a real scenario, you would integrate SMS retrieval logic here
    console.log('Enter the code you received via SMS');
    return '123456'; // Replace with real logic to capture the SMS code
}

// Main entry point
(async () => {
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    ig.state.proxyUrl = process.env.IG_PROXY;

    // Log environment details
    console.log('Proxy URL:', ig.state.proxyUrl);
    console.log('Username:', process.env.IG_USERNAME);
    console.log('Secret:', process.env.IG_SECRET);

    try {
        // Log in and handle two-factor authentication if needed
        await loginWithTwoFactor(ig);

        // After login, fetch the logged-in user
        const user = await ig.account.currentUser();
        console.log('Logged in user:', user.username);

        // Fetch music
        const musics = await ig.music.audioGlobalSearch('hello');
        console.log('Music results:', musics);
        //save all the music vào file json
        const fs = require('fs');
        fs.writeFileSync('musics.json', JSON.stringify(musics));
    } catch (err) {
        console.error('An error occurred during the login or music search:', err);
    }
})();
