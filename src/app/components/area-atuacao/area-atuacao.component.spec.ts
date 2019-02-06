import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaAtuacaoComponent } from './area-atuacao.component';

describe('AreaAtuacaoComponent', () => {
  let component: AreaAtuacaoComponent;
  let fixture: ComponentFixture<AreaAtuacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaAtuacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaAtuacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
