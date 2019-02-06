import { Component, Inject, Optional } from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


export interface competenciaDataModal {
  cargo_id: number,
  competencia: string
  tipo_indicador: number
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal-dialog-nova-competencia.html',
})
export class DialogNovaCompetenciaComponent {


  constructor(public dialogRef: MatDialogRef<DialogNovaCompetenciaComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: competenciaDataModal) { }

  closeDialog()
  {
    this.dialogRef.close();
    this.data.competencia = '';
    this.data.tipo_indicador = null;
  }

}
