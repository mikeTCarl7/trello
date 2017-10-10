import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAndDeleteCardComponent } from './edit-and-delete-card.component';

describe('EditAndDeleteCardComponent', () => {
  let component: EditAndDeleteCardComponent;
  let fixture: ComponentFixture<EditAndDeleteCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAndDeleteCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAndDeleteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
