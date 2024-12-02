import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AttributeWithModifierComponent} from './attribute-with-modifier.component';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAccordion, MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatList, MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {SharedTestingModule} from '../../../shared-testing-module';

describe('AttributeWithModifierComponent', () => {
  let component: AttributeWithModifierComponent;
  let fixture: ComponentFixture<AttributeWithModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AttributeWithModifierComponent,
      ],
      imports: [
        SharedTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AttributeWithModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
