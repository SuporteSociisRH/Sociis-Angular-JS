import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { ModalsComponent } from '../../shared/modals/modals.component';
import { CargoService } from '../../Services/cargo.service';

@Component({
    selector: 'sc-cargo',
    templateUrl: './cargo.component.html',
    styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements OnInit {

    @ViewChild(ModalsComponent) modal : ModalsComponent;

    public dataSource: any;
    public displayedColumns: string[] = ['id', 'cbo', 'cargo','acoes'];

    public sect = {
        nome: 'Cargo',
        sect: ''
    };


    constructor(
        private cargoService: CargoService
    ) { }


    ngOnInit()
    {
        this.cargoService.buscaCargos().subscribe(

            response => this.dataSource = response.text
        );
    }


    /**
  	* Chama modal para confirmar ação de remover item
  	* @author Adão Dias
  	*
  	**/
    ConfirmarDeleteCargo(element)
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

      this.cargoService.remover( id ).subscribe(
  			response =>
  			{

  				if(response.success == true)
  				{
  					this.modal.successOnRemove();

            this.cargoService.buscaCargos().subscribe(

                response => this.dataSource = response.text
            );
  				}
  				else
  					this.modal.errorOnRemove();

  			});
  	}


}
