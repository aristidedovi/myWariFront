import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcompteComponent } from './detailcompte.component';

describe('DetailcompteComponent', () => {
  let component: DetailcompteComponent;
  let fixture: ComponentFixture<DetailcompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailcompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailcompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
