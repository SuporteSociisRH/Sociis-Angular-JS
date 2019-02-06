import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { ColaboradoresService } from '../../Services/colaboradores.service';
import { STORAGE_API } from '../../sociis.api';

import { ModalsComponent } from '../../shared/modals/modals.component';

@Component({
    selector: 'sc-colaborador',
    templateUrl: './colaborador.component.html',
    styleUrls: ['./colaborador.component.css']
})
export class ColaboradorComponent implements OnInit {

    @ViewChild(ModalsComponent) modal : ModalsComponent;

    public sect = {
        nome: 'Colaborador',
        sect: ''
    };

    public baseUrlApi = STORAGE_API;
    public dataSource: any;
    public displayedColumns: string[] = ['id', 'imagem', 'nome','cargo_id','empresa_id', 'acoes'];

    constructor(
        private colaboradorService: ColaboradoresService
    ) { }


    ngOnInit()
    {
        this.dataSource = this.colaboradorService.buscaColaboradores();
    }


    removerColaborador(id:number)
    {
        this.colaboradorService.remover(id).subscribe(
            response => console.log(response)
        );
    }

    /**
  	* Chama modal para confirmar ação de remover item
  	* @author Adão Dias
  	*
  	**/
    ConfirmarDeleteColaborador(element)
    {
      let id = element.id;

  		this.modal.deleteItem(id);
    }

    /**
  	* Chama webservice para remover item.
  	* @author Adão Dias
  	*
  	**/
  	remover(id: number)
  	{

      this.colaboradorService.remover( id ).subscribe(
  			response =>
  			{

  				if(response.success == true)
  				{
  					this.modal.successOnRemove();

  					this.dataSource = this.colaboradorService.buscaColaboradores();
  				}
  				else
  					this.modal.errorOnRemove();

  			});
  	}

}
