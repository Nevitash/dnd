import {TestBed} from '@angular/core/testing';

import {AddTrackedEntryFormService} from './add-tracked-entry-form.service';
import {
  AttributeWithModifierComponent
} from '../../components/inputs/attribute-with-modifier/attribute-with-modifier.component';
import {SharedTestingModule} from '../../shared-testing-module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('AddTrackedEntryFormService', () => {
  let service: AddTrackedEntryFormService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        SharedTestingModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []},
      ]
    }).compileComponents();
    service = TestBed.inject(AddTrackedEntryFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
