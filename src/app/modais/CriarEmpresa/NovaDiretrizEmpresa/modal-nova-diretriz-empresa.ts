import { Component, Inject, Optional } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Diretriz } from  '../../../Interfaces/diretriz';

@Component({
    selector: 'dialog-nova-diretriz-empresa',
    templateUrl: 'modal-dialog-nova-diretriz-empresa.html',
})

export class DialogNovaDiretriz {

    constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogNovaDiretriz>, @Optional() @Inject(MAT_DIALOG_DATA) public diretriz: Diretriz) { }

    public listaDiretrizes = this.fb.group({
        nome:    ['', Validators.required],
        legenda: ['', Validators.required],
        pontos:  ['', Validators.required],
        minimo:  ['', Validators.required],
        maximo:  ['', Validators.required],
    }); 

    closeDialog() {

        this.dialogRef.close();
        
        this.diretriz.nome = '';
        
        this.diretriz.legenda = '';
        
        this.diretriz.pontos = 0;
        
        this.diretriz.minimo = 0;
        
        this.diretriz.maximo = 0;
    }


}
