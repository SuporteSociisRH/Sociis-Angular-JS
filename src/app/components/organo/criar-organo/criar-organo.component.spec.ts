import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarOrganoComponent } from './criar-organo.component';

describe('CriarOrganoComponent', () => {
  let component: CriarOrganoComponent;
  let fixture: ComponentFixture<CriarOrganoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarOrganoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarOrganoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
