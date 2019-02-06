import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarAreaAtuacaoComponent } from './criar-area-atuacao.component';

describe('CriarAreaAtuacaoComponent', () => {
  let component: CriarAreaAtuacaoComponent;
  let fixture: ComponentFixture<CriarAreaAtuacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarAreaAtuacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarAreaAtuacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
