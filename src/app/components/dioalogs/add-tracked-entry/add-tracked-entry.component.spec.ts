import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrackedEntryComponent } from './add-tracked-entry.component';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogContainer
} from '@angular/material/dialog';

describe('AddTrackedEntryComponent', () => {
  let component: AddTrackedEntryComponent;
  let fixture: ComponentFixture<AddTrackedEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTrackedEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTrackedEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
