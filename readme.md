# Spotify Login - [DEMO](https://spotify-login.netlify.com/)

[![npm version](https://badge.fury.io/js/spotify-login.svg)](https://www.npmjs.com/package/spotify-login) &bull; [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/andrelmlins/spotify-login/blob/master/LICENSE) &bull; [![Build Status](https://travis-ci.com/andrelmlins/spotify-login.svg?branch=master)](https://travis-ci.com/andrelmlins/spotify-login) &bull; [![Dependencies](https://david-dm.org/andrelmlins/spotify-login.svg)](https://david-dm.org/andrelmlins/spotify-login) &bull; [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/andrelmlins/spotify-login.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/andrelmlins/spotify-login/context:javascript)

## How to install

It is possible to install with npm:

```
npm i spotify-login
// OR
yarn add spotify-login
```

Or import the script through the unpkg project:

```html
<script src="https://unpkg.com/spotify-login/dist/spotify-login.js"></script>
```

## How to usage

An example of how to use the webcomponent with html:

```html
<spotify-login
  client-id="XXX"
  scope="user-read-email"
  redirect-uri="http://localhost:8000"
>
  <button>Login with Spotify</button>
</spotify-login>

<script>
  const spotifyLoginElement = document.querySelector("spotify-login");

  spotifyLoginElement.addEventListener("completed", e => {
    console.log(e.details);
  });
  spotifyLoginElement.addEventListener("fail", e => {
    console.log(e);
  });
</script>
```

With JSX:

```jsx
<spotify-login onCompleted={e => console.log(e)} onError={e => console.log(e)}>
  <button>Login with Spotify</button>
</spotify-login>
```

## Properties

| Property       | Attribute       | Description                                                                           | Type      | Default     |
| -------------- | --------------- | ------------------------------------------------------------------------------------- | --------- | ----------- |
| `clientId`     | `client-id`     | Client ID for Spotify OAuth application                                               | `string`  | `undefined` |
| `redirectUri`  | `redirect-uri`  | The URI to redirect to after the user grants or denies permission.                    | `string`  | `undefined` |
| `responseType` | `response-type` | Grant type the application wants to use                                               | `string`  | `"token"`   |
| `scope`        | `scope`         | A space-delimited list of permissions that the application requires                   | `string`  | `undefined` |
| `showDialog`   | `show-dialog`   | Whether or not to force the user to approve the app again if they’ve already done so. | `boolean` | `undefined` |
| `state`        | `state`         | The state can be useful for correlating requests and responses                        | `string`  | `undefined` |

## Events

| Event       | Description       | Type               |
| ----------- | ----------------- | ------------------ |
| `completed` | Call with success | `CustomEvent<any>` |
| `fail`      | Call with error   | `CustomEvent<any>` |
| `request`   | Call with request | `CustomEvent<any>` |

## NPM Statistics

Download stats for this NPM package.

[![NPM](https://nodei.co/npm/spotify-login.png)](https://nodei.co/npm/spotify-login/)

## License

Spotify Login is open source software [licensed as MIT](https://github.com/andrelmlins/spotify-login/blob/master/LICENSE).
