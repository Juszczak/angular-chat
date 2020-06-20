// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    projectId: 'cdv-angular-chat',
    appId: '1:990476008730:web:5312a567cb32b7694c80a3',
    databaseURL: 'https://cdv-angular-chat.firebaseio.com',
    storageBucket: 'cdv-angular-chat.appspot.com',
    apiKey: 'AIzaSyDb3FGFxY6cKDe_8-puRCUl3P3Ykky1TgE',
    authDomain: 'cdv-angular-chat.firebaseapp.com',
    messagingSenderId: '990476008730',
    measurementId: 'G-CFLYK1MP2L',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
