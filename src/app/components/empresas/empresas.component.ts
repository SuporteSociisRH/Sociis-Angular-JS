import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

//Services
import { EmpresasService } from '../../Services/empresas.service';

//Interface
import { Empresa } from '../../interfaces/empresa';

//Components
import { ModalsComponent } from '../../shared/modals/modals.component';




@Component({
	selector: 'sc-empresas',
	templateUrl: './empresas.component.html',
	styleUrls: ['./empresas.component.css'],

})
export class EmpresasComponent implements OnInit {


	public sect = { nome: 'Empresa', sect: ''};

	public empresas: any;
	public dataSource: any;
	public displayedColumns: string[] = ['id', 'nome_fantasia', 'razao_social', 'cnpj', 'area_atuacao_id', 'acoes'];

	@ViewChild(ModalsComponent) modal : ModalsComponent;

	constructor(private route: Router, private empresaService: EmpresasService) { }

	ngOnInit()
	{
		this.dataSource = this.empresaService.buscarEmpresas();
	}

	/**
	* Chama modal para confirmar ação de remover item
	* @author Adão Dias
	*
	**/
	ConfirmarDeleteEmpresa(element)
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

    this.empresaService.remover( id ).subscribe(
			response =>
			{

				if(response.success == true)
				{
					this.modal.successOnRemove();

					this.dataSource = this.empresaService.buscarEmpresas();
				}
				else
					this.modal.errorOnRemove();

			});
	}
}
