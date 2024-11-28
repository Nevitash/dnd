import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeWithModifierComponent } from './attribute-with-modifier.component';

describe('AttributeWithModifierComponent', () => {
  let component: AttributeWithModifierComponent;
  let fixture: ComponentFixture<AttributeWithModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttributeWithModifierComponent]
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
