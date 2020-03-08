import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProfComponent } from './main-prof.component';

describe('MainProfComponent', () => {
  let component: MainProfComponent;
  let fixture: ComponentFixture<MainProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
