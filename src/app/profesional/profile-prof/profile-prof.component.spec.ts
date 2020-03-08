import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileProfComponent } from './profile-prof.component';

describe('ProfileProfComponent', () => {
  let component: ProfileProfComponent;
  let fixture: ComponentFixture<ProfileProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
