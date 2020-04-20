import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcompteComponent } from './listcompte.component';

describe('ListcompteComponent', () => {
  let component: ListcompteComponent;
  let fixture: ComponentFixture<ListcompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
