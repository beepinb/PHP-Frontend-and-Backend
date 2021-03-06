// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  REST_API_BASE:"The URL of the Backend REST API prefix",
  REST_API_REGISTER_UESR: "The relative URL to register a new user",
  REST_API_LOGIN_USER: "The relative URL to login a user",
  TOKEN_STORAGE_KEY:"The name of the key used by the token in the browser localstorage"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
