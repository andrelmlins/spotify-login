import {
  Component,
  Watch,
  Prop,
  State,
  Event,
  EventEmitter,
  h,
  Host
} from "@stencil/core";

@Component({
  tag: "spotify-login",
  styleUrl: "spotify-login.css",
  shadow: true
})
export class SpotifyLogin {
  /**
   * Client ID for Spotify OAuth application
   */
  @Prop() clientId: string;

  /**
   * 	The URI to redirect to after the user grants or denies permission.
   */
  @Prop() redirectUri: string;

  /**
   * Scope for Spotify OAuth application
   */
  @Prop() responseType: string = "token";

  /**
   * Scope for Spotify OAuth application
   */
  @Prop() scope: string;

  /**
   * The state can be useful for correlating requests and responses
   */
  @Prop() state: string;

  /**
   * Whether or not to force the user to approve the app again if they’ve already done so.
   */
  @Prop() showDialog: boolean;

  /**
   * Call with request
   */
  @Event() request: EventEmitter;

  /**
   * Call with success
   */
  @Event() completed: EventEmitter;

  /**
   * Call with error
   */
  @Event() fail: EventEmitter;

  @Watch("clientId")
  validateClientId(newValue: string) {
    if (!newValue) {
      throw new Error("clientId: required");
    }
  }

  @Watch("redirectUri")
  validateRedirectUri(newValue: string) {
    if (!newValue) {
      throw new Error("redirectUri: required");
    }
  }

  @Watch("responseType")
  validateResponseType(newValue: string) {
    if (!newValue) {
      throw new Error("responseType: required");
    }
  }

  @State() urlSpotify: string = "https://accounts.spotify.com/authorize";
  @State() popup: any;
  @State() interval: number = 0;

  private convertQueryParams(url) {
    const query = url.substr(1);
    const result = {};

    query.split("&").forEach(param => {
      const item = param.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });

    return result;
  }

  private close() {
    if (this.interval) {
      window.clearInterval(this.interval);
      this.interval = null;
    }

    this.popup.close();
  }

  private poll() {
    this.interval = window.setInterval(() => {
      try {
        if (!this.popup || this.popup.closed !== false) {
          this.close();
          this.fail.emit(new Error("The popup was closed"));
          return;
        }

        if (
          this.popup.location.href === this.urlSpotify ||
          this.popup.location.pathname === "blank"
        ) {
          return;
        }

        this.completed.emit(this.convertQueryParams(this.popup.location.hash));
        this.close();
      } catch (error) {
        //this.fail.emit(error);
      }
    }, 500);
  }

  private onBtnClick() {
    let urlParams = `client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=${this.responseType}`;

    if (this.scope) {
      urlParams += `&scope=${this.scope}`;
    }

    if (this.state) {
      urlParams += `&state=${this.state}`;
    }

    if (this.showDialog) {
      urlParams += `&show_dialog=${this.showDialog}`;
    }

    this.popup = window.open(
      `${this.urlSpotify}?${urlParams}`,
      "spotify-authorization",
      ""
    );

    this.request.emit();
    this.poll();
  }

  render() {
    return (
      <Host onClick={() => this.onBtnClick()}>
        <slot></slot>
      </Host>
    );
  }
}
