import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutelinkComponent } from './routelink.component';

describe('RoutelinkComponent', () => {
  let component: RoutelinkComponent;
  let fixture: ComponentFixture<RoutelinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutelinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutelinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
