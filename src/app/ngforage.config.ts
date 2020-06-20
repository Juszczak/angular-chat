import { ValueProvider } from '@angular/core';
import { DEFAULT_CONFIG } from 'ngforage';
import { environment } from 'src/environments/environment';

export const NGFORAGE_CONFIG_PROVIDER: ValueProvider = {
  provide: DEFAULT_CONFIG,
  useValue: environment.ngforage,
};
