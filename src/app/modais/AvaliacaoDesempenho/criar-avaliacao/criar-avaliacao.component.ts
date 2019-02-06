import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { EmpresasService } from '../../../Services/empresas.service';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_CHECKBOX_CLICK_ACTION } from '@angular/material';


export interface ModalNovaAvaliacao {
  lista_colaboradores: []
  , lista_cargos: []
}

@Component({
  selector: 'sc-criar-avaliacao',
  providers: [
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop' }
  ],
  templateUrl: './criar-avaliacao.component.html',
  styleUrls: ['./criar-avaliacao.component.css'],

})
export class DialogNovaAvaliacaoComponent implements OnInit {

  public colaboradores = null;
  public colaboradores_copia = null;

  public filtro_setores = null;

  public setores = ['Recursos Humanos', 'Administrativo', 'Comércio', 'Finanças', 'T.I'];

  public cargos = [];

  public filtro_cargos: number[] = [];

  public tipo_avaliacao = new FormGroup({
    'tipo_avaliacao': new FormControl('')
  });


  public para_quem = new FormGroup({
    'lista_participantes': new FormArray([])
  });

  public configuracao_avaliacao = new FormGroup({
    'data_inicio': new FormControl(''),
    'data_fim': new FormControl(''),
  });

  public isLinear: boolean = true;

  constructor(private fb: FormBuilder, private empresaService: EmpresasService, public dialogRef: MatDialogRef<ModalNovaAvaliacao>, @Optional() @Inject(MAT_DIALOG_DATA) public data: ModalNovaAvaliacao) {

    this.cargos = this.data.lista_cargos;
    this.colaboradores = this.data.lista_colaboradores;
    this.colaboradores_copia = this.colaboradores;

  }

  buildFiltroSetores() {
    const setores = this.setores.map(v => new FormControl(false));
    return this.fb.array(setores);
  }

  checkValue(event) {
 
    this.colaboradores_copia = this.colaboradores;

    if (event.target.checked) {
      //true, adicionamos ao array.
      this.filtro_cargos.push(event.target.value);
    }
    else {
      const index: number = this.filtro_cargos.indexOf(event.target.value);

      this.filtro_cargos.splice(index, 1);
    }

    this.colaboradores_copia = this.colaboradores_copia.filter( colab => this.filtro_cargos.some( (item, index) => colab.cargo_id == item) );
    
    console.log(this.colaboradores_copia);
  }

  ngOnInit() { }

}
