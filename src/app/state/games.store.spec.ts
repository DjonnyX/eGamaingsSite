import { TestBed } from '@angular/core/testing';

import { GamesStore } from './games.store';

describe('GamesStoreService', () => {
  let service: GamesStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
