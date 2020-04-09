import { TestBed } from '@angular/core/testing';

import { FavoriteGamesService } from './favorite-games.service';

describe('FavoriteGamesService', () => {
  let service: FavoriteGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
