import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'sc-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css'],
  providers: [MessageService]
})
export class ModalsComponent implements OnInit {

  constructor( private messageService: MessageService ) { }

  ngOnInit() { }

  public idItemRemoved : number;

  @Output() delete : EventEmitter<number> = new EventEmitter();

  /**
	* Mostra modal para confirmação de exclusão de item
	* @author Adão Dias
	* @param {number} id - id do item no db que será removido.
	*
	**/
  public deleteItem(id: number)
	{
		this.idItemRemoved = id;
		this.messageService.clear();
		this.messageService.add({key: 'modal', sticky: true, severity:'error', summary:'Tem certeza?', detail:'confirme para continuar'});
	}

  /**
	* Executa após confirmação do usuário que o item será deletado.
	* @author Adão Dias
	* @param {number} id - id do item no db que será removido.
	*
	**/
  confirmDelete()
  {
    this.messageService.clear('modal');

    this.delete.emit(this.idItemRemoved);
  }

  /**
	* Executa após Cancelamento do usuário que o item será deletado.
	* @author Adão Dias
	*
	**/
  cancelDelete()
  {

    this.messageService.clear();

    this.idItemRemoved = null;

    this.messageService.add({severity:'error', summary: '', detail: 'Item não removido'});
  }

  /**
	* Mensagem de sucesso se o procedimento ocorrer certo.
	* @author Adão Dias
	*
	**/
  successOnRemove()
  {
    this.messageService.add({severity:'error', summary: '', detail: 'Item removido'});
  }

  /**
	* Mensagem de sucesso se o procedimento ocorrer certo.
	* @author Adão Dias
	*
	**/
  errorOnRemove()
  {
    this.messageService.add({severity:'error', summary: '', detail: 'Ocorreu um problema'});
  }


}
