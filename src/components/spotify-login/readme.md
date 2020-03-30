# Spotify Login

Web Component for Spotify Login

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                           | Type     | Default     |
| -------------- | --------------- | ----------------------------------------------------- | -------- | ----------- |
| `clientId`     | `client-id`     | Client ID for Spotify OAuth application               | `string` | `undefined` |
| `redirectUri`  | `redirect-uri`  | Registered redirect URI for Spotify OAuth application | `string` | `undefined` |
| `responseType` | `response-type` | Scope for Spotify OAuth application                   | `string` | `"token"`   |
| `scope`        | `scope`         | Scope for Spotify OAuth application                   | `string` | `undefined` |


## Events

| Event       | Description       | Type               |
| ----------- | ----------------- | ------------------ |
| `completed` | Call with success | `CustomEvent<any>` |
| `fail`      | Call with error   | `CustomEvent<any>` |
| `request`   | Call with request | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
