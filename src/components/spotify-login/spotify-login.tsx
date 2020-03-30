import {
  Component,
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
   * Scope for Spotify OAuth application
   */
  @Prop() scope: string;

  /**
   * Registered redirect URI for Spotify OAuth application
   */
  @Prop() redirectUri: string;

  /**
   * Scope for Spotify OAuth application
   */
  @Prop() responseType: string = "token";

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
    const urlParams = `client_id=${this.clientId}&scope=${this.scope}&redirect_uri=${this.redirectUri}&response_type=${this.responseType}`;

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
