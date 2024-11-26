import { TestBed } from '@angular/core/testing';

import { AddTrackedEntryFormService } from './add-tracked-entry-form.service';

describe('AddTrackedEntryFormService', () => {
  let service: AddTrackedEntryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTrackedEntryFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
