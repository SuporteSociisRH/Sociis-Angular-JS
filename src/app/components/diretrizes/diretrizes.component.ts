import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormArray } from '@angular/forms';
import { AbstractControl, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { CargoService } from '../../Services/cargo.service';

@Component({
  selector: 'sc-diretrizes',
  templateUrl: './diretrizes.component.html',
  styleUrls: ['./diretrizes.component.css']
})
export class DiretrizesComponent implements OnInit {

  public empresa_cargo_id : number = null;

  public competencias : FormArray;

  public cadastroCompetencia : FormGroup = this.formBuilder.group({
    competencia: ['', Validators.required]
  });


  public navBarControleNovoCompetencia : boolean = false;

  constructor(private cargo: CargoService, private formBuilder: FormBuilder, private route: ActivatedRoute) {

    // Obtem o id da empresa passado por parametro da URL
    this.route.params.subscribe(params => {
        // recebe o id do empregos_cargos
        this.empresa_cargo_id = params['id'];
    });
  }

  ngOnInit() { }

  adicionarCompetencia()
  {
    this.navBarControleNovoCompetencia = true;
  }

  // cadastrarCompetencia()
  // {

  //   this.cargo.salvarCompetencia(this.empresa_cargo_id, this.cadastroCompetencia).subscribe(
  //     response => {

  //       if( response.success == true )
  //       {
  //           let competencias = this.competencias as FormArray;
  //           let competencia = this.cadastroCompetencia.get('competencia').value;

  //          // competencias.push( competencia );
  //       }

  //         this.navBarControleNovoCompetencia = false;
  //     }
  //   );
  // }

}
