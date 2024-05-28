# Igramapi - Instagram API client

<p align="center">
  <a href="https://github.com/nsmle/igramapi/" target="blank"><img src="https://raw.githubusercontent.com/nsmle/igramapi/master/tools/images/igramapi.png" width="120" alt="Igramapi" /></a>
</p>


<p align="center">NodeJS Instagram private API client, Interact with Instagram like real devices.</p>
<p align="center">
  <a href="https://www.npmjs.com/package/igramapi" target="_blank"><img src="https://img.shields.io/npm/v/igramapi.svg?style=for-the-badge&logo=npm" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/igramapi" target="_blank"><img src="https://img.shields.io/github/v/release/nsmle/igramapi?style=for-the-badge&logo=github" alt="Github Version" /></a>
  <a href="https://github.com/nsmle/igramapi?tab=License-1-ov-file"><img src="https://img.shields.io/npm/l/igramapi.svg?style=for-the-badge&color=22a900" alt="Package License" /></a>
  <a href="https://www.npmjs.com/package/igramapi" target="_blank"><img src="https://img.shields.io/npm/dm/igramapi.svg?style=for-the-badge&logo=npm&color=0079a9" alt="NPM Downloads" /></a>
  <br>
  <a href="https://saweria.co/nsmle" target="_blank"><img src="https://img.shields.io/badge/Support_with_Saweria-704e37.svg?style=for-the-badge&logo=data:image/png;base64,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" alt="Support with Saweria"/></a>
  <a href="https://paypal.me/nsmle" target="_blank"><img src="https://img.shields.io/badge/Support_with_PayPal-253BBF.svg?style=for-the-badge&logo=paypal" alt="Support with PayPal"/></a>
  <a href="https://github.com/sponsors/nsmle" target="_blank"><img src="https://img.shields.io/badge/Support_with_Github-3f3976.svg?style=for-the-badge&logo=github" alt="Support with Github"/></a>
</p>

# Next Major Version
> Are you lost and looking for igramapi php/laravel? 
> Now the name is [Igramavel](https://github.com/nsmle/igramavel) and it still uses the same [instagram-user-feed](https://github.com/nsmle/instagram-user-feed) lib. 
>

This package/repository could be outdated, deleted, access made private, not working as it should, or something else.
I can't guarantee its continuity, so if you experience problems please [open a new issue](https://github.com/nsmle/igramapi/issues/new/choose) or consider [instagram-private-api](https://github.com/dilame/instagram-private-api).
After [Igramapi v1.48.0](https://github.com/nsmle/igramapi/releases/tag/v1.48.0) the fork will no longer be synced with [instagram-private-api](https://github.com/dilame/instagram-private-api) and will be a standalone repository.

# Table of Contents

- [Installation](#installation)
- [Examples](#examples)
- [Basic Concepts](#basic-concepts)
  - [Feeds](#feeds)
  - [Repositories](#repositories)
  - [Services](#services)
- [Debugging](#debugging)
- [Contribution](#contribution)
- [Useful Links](#useful-links)
- [Special Thanks](#special-thanks)


# Installation

From npm

```
npm install igramapi
```
```
yarn add igramapi
```

From github

```
npm install github:nsmle/igramapi
```

This package uses [`url-regex-safe`](https://www.npmjs.com/package/url-regex-safe) ([GitHub](https://github.com/spamscanner/url-regex-safe)) to check for links when sending direct messages.
By default, the **safe** regex engine [`re2`](https://github.com/uhop/node-re2) is **not** installed.
⚠ It's highly recommended for you to install `re2` by running `npm install re2`, else you _will_ be vulnerable to [CVE-2020-7661](https://nvd.nist.gov/vuln/detail/CVE-2020-7661).

# Examples

> Note for JavaScript users:_
> As of Node v.13.5.0, there isn't support for ESModules and the 'import'-syntax.
> So you have to read the imports in the examples like this:
> `import { IgApiClient } from 'igramapi'` ➡ `const { IgApiClient } = require('igramapi')`

You can find more usage examples [here](examples).

```typescript
import { IgApiClient } from 'igramapi';
import { sample } from 'lodash';

const ig = new IgApiClient();
// You must generate device id's before login.
// Id's generated based on seed
// So if you pass the same value as first argument - the same id's are generated every time
ig.state.generateDevice(process.env.IG_USERNAME);
// Optionally you can setup proxy url
ig.state.proxyUrl = process.env.IG_PROXY;
(async () => {
  // Execute all requests prior to authorization in the real Android application
  // Not required but recommended
  await ig.simulate.preLoginFlow();
  const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  // The same as preLoginFlow()
  // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
  process.nextTick(async () => await ig.simulate.postLoginFlow());
  // Create UserFeed instance to get loggedInUser's posts
  const userFeed = ig.feed.user(loggedInUser.pk);
  const myPostsFirstPage = await userFeed.items();
  // All the feeds are auto-paginated, so you just need to call .items() sequentially to get next page
  const myPostsSecondPage = await userFeed.items();
  await ig.media.like({
    // Like our first post from first page or first post from second page randomly
    mediaId: sample([myPostsFirstPage[0].id, myPostsSecondPage[0].id]),
    moduleInfo: {
      module_name: 'profile',
      user_id: loggedInUser.pk,
      username: loggedInUser.username,
    },
    d: sample([0, 1]),
  });
})();
```

# Basic concepts

**You can find documentation in the [`docs` folder](docs)**.
Consider starting in [`IgApiClient` (`index` module)](docs/classes/index/IgApiClient.md), the root class.

You'll often see `ig` in the docs.
This just refers to the client, an instance of [`IgApiClient`](docs/classes/index/IgApiClient.md) holding the state for one user.

```typescript
import { IgApiClient } from 'igramapi';

// This is the general convention on how to name the client
//    vv
const ig = new IgApiClient();

// login, load a session etc.
```

## Repositories

Repositories implement low-level operations - every method sends exactly _one_ api-request.

- See the list of **available repositories** [here](docs/modules/repositories.md).
- See the list of **their keys** in [`IgApiClient` here](docs/classes/index/IgApiClient.md).

You access repositories on the [client (`IgApiClient`)](docs/classes/index/IgApiClient.md) by their lower-case (_camelCase_) name without the `Repository` suffix.
For example, you access the instance of [`AddressBookRepository`](docs/classes/repositories/AddressBookRepository.md) by [`ig.addressBook`](docs/classes/index/IgApiClient.md#addressbook).

## Feeds

Feeds represent paginated endpoints like a user's feed ([`UserFeed`](docs/classes/index/FeedFactory.md#user)).
Think of feeds like (async-)iterators/streams/observables (in fact feeds are [async iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) and observable (`feed.item$`)).
Every feed is accessible via `ig.feed.feedName()` (_camelCase_ name). `ig.feed` is the [`FeedFactory`](docs/classes/index/FeedFactory.md) that creates feeds for you connected to the instance of `ig`.

- See the list of **available feeds** [here](docs/modules/feeds.md).
- See the list of **their keys** in [`FeedFactory` (`ig.feed`) here](docs/classes/index/FeedFactory.md).
- See [this example](examples/account-followers.feed.example.ts) and learn how to work with library feeds.

Most of the feeds require initialization parameter(s), like a user-pk (id).

## Services

Services will help you to maintain some actions without calling a couple repository methods or perform complex things like pre and postlogin flow simulations or photo/video publishing.

- See the list of **available repositories** [here](docs/modules/services.md).
- See the list of **their keys** in [`IgApiClient` here](docs/classes/index/IgApiClient.md).

# Debugging

In order to get debug infos provided by the library, you can enable debugging.
The prefix for this library is `ig`.
To get all debug logs (_recommended_) set the namespace to `ig:*`.

#### Node

In Node you only have to set the environment variable `DEBUG` to the desired namespace.
[Further information](https://github.com/visionmedia/debug#environment-variables)

# Contribution

If you need features that is not implemented - feel free to implement and create PRs!

Plus we need some documentation, so if you are good in it - you are welcome.

Setting up your environment is described [here](.github/CONTRIBUTING.md).

# Useful Links
|| Language | Description |
|-|-|-|
| [instagram_mqtt](https://www.npmjs.com/package/instagram_mqtt) | NodeJs | instagram realtime and fbns |
| [instagram-private-api](https://www.npmjs.com/package/instagram-private-api) | NodeJs | instagram private api client |
| [instagram-id-to-url-segment](https://www.npmjs.com/package/instagram-id-to-url-segment) | NodeJs | convert the image url fragment to the media id |
| [instagram-user-feed](https://github.com/nsmle/instagram-user-feed) | PHP | instagram browser api client |
| [igramavel](https://github.com/nsmle/igramavel) | PHP | instagram restful api laravel |
|||


## Special thanks

- [Richard Hutta](https://github.com/huttarichard), original author of instagram-private-api library. Thanks to him for starting it.
- [Dmitry](https://github.com/dilame), co-author of instagram-private-api library.
- [Nerixyz](https://github.com/Nerixyz), for writing a huge amount of code for instagram-private-api library.
