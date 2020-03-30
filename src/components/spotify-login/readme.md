# Spotify Login

Web Component for Spotify Login

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                           | Type      | Default     |
| -------------- | --------------- | ------------------------------------------------------------------------------------- | --------- | ----------- |
| `clientId`     | `client-id`     | Client ID for Spotify OAuth application                                               | `string`  | `undefined` |
| `redirectUri`  | `redirect-uri`  | The URI to redirect to after the user grants or denies permission.                    | `string`  | `undefined` |
| `responseType` | `response-type` | Scope for Spotify OAuth application                                                   | `string`  | `"token"`   |
| `scope`        | `scope`         | Scope for Spotify OAuth application                                                   | `string`  | `undefined` |
| `showDialog`   | `show-dialog`   | Whether or not to force the user to approve the app again if they’ve already done so. | `boolean` | `undefined` |
| `state`        | `state`         | The state can be useful for correlating requests and responses                        | `string`  | `undefined` |


## Events

| Event       | Description       | Type               |
| ----------- | ----------------- | ------------------ |
| `completed` | Call with success | `CustomEvent<any>` |
| `fail`      | Call with error   | `CustomEvent<any>` |
| `request`   | Call with request | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
