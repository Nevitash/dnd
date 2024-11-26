import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeTrackerEntryComponent } from './initiative-tracker-entry.component';

describe('InitiativeTrackerEntryComponent', () => {
  let component: InitiativeTrackerEntryComponent;
  let fixture: ComponentFixture<InitiativeTrackerEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitiativeTrackerEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitiativeTrackerEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
