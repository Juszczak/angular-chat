import { ValueProvider } from '@angular/core';
import { DEFAULT_CONFIG } from 'ngforage';
import { environment } from 'src/environments/environment';

/**
 * `ValueProvider` służący do konfiguracji modułu komunikacji z IndexedDB.
 * Sama konfiguracja zdefiniowana jest w pliku z `environment`.
 */
export const NGFORAGE_CONFIG_PROVIDER: ValueProvider = {
  provide: DEFAULT_CONFIG,
  useValue: environment.ngforage,
};
