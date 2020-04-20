import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpartenaireComponent } from './listpartenaire.component';

describe('ListpartenaireComponent', () => {
  let component: ListpartenaireComponent;
  let fixture: ComponentFixture<ListpartenaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListpartenaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
