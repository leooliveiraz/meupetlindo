// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  GOOGLE_OAUTH2: '860566026552-hgk6p95nk83ns12skuh6dd4r279jcemf.apps.googleusercontent.com',
  OAUTH2_REDIRECT: 'http://localhost:4200',
  APP_URL: 'http://localhost:4200/',
  API_URL: 'http://localhost:8081/',
  VAPID_PUBLIC_KEY: "BJIEHJOP5D2qNYFVA23FXzd6yLGvG3mRh7lr5mq8HjNvlucsIDo_AeIP-xc-IfBLiFHZkuEWMehY6XapWJsaG8k",
  APP_BASE_HREF: '/',  
  APP_VERSION: "1.0.4"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
