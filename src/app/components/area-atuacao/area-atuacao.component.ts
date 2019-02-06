import {  Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { ModalsComponent } from '../../shared/modals/modals.component';
import { AreaAtuacaoService } from '../../Services/area-atuacao.service';
@Component({
	selector: 'sc-area-atuacao',
	templateUrl: './area-atuacao.component.html',
	styleUrls: ['./area-atuacao.component.css']
})
export class AreaAtuacaoComponent implements OnInit {

    dataSource: any;
    displayedColumns: string[] = ['id', 'area','acoes'];

	@ViewChild(ModalsComponent) modal : ModalsComponent;

	public sect = {
		nome: 'Área de atuação',
		sect: ''
	};

	constructor(
		private areaService: AreaAtuacaoService
	) {
		this.areaService.buscaTodosAreaAtuacao().subscribe(
			response => {
				this.dataSource = response.text;
			}
		);
	 }

	ngOnInit()
	{
		
	}

	/**
	* Chama modal para confirmar ação de remover item
	* @author Adão Dias
	*
	**/
	ConfirmarDeleteArea(element)
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

		this.areaService.remover( id ).subscribe(
			response =>
			{

				if(response.success == true)
				{
					this.modal.successOnRemove();

					this.areaService.buscaTodosAreaAtuacao().subscribe(
						response => {
							this.dataSource = response.text;
						}
					);
				}
				else
					this.modal.errorOnRemove();

			});
	}

}
