import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemuserComponent } from './itemuser.component';

describe('ItemuserComponent', () => {
  let component: ItemuserComponent;
  let fixture: ComponentFixture<ItemuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
