import { Driver, NgForageOptions } from 'ngforage';

export const ngForageConfig: NgForageOptions = {
  cacheTime: 300000,
  description: 'Entries cached by ngforage',
  driver: [
    Driver.INDEXED_DB,
    Driver.WEB_SQL,
    Driver.LOCAL_STORAGE,
  ],
  name: 'CDVNgForage',
  storeName: 'CDVNgForageExample',
};
