import {ValueProvider} from '@angular/core';
import {DEFAULT_CONFIG, Driver, NgForageOptions} from 'ngforage';

export const NGFORAGE_CONFIG_PROVIDER: ValueProvider = {
  provide: DEFAULT_CONFIG,
  useValue: {
    cacheTime: 300000,
    description: 'Entries cached by ngforage',
    driver: [
      Driver.LOCAL_STORAGE,
      Driver.INDEXED_DB,
      Driver.WEB_SQL
    ],
    name: 'CDVNgForage',
    storeName: 'CDVNgForageExample'
  } as NgForageOptions
};