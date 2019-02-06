import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgCardIndComponent } from './org-card-ind.component';

describe('OrgCardIndComponent', () => {
  let component: OrgCardIndComponent;
  let fixture: ComponentFixture<OrgCardIndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgCardIndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgCardIndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
