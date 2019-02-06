import { Component, Inject, Optional } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsuarioDoSistema } from  '../../../Interfaces/usuario-acesso';

@Component({
    selector: 'dialog-novo-usuario-sistema',
    templateUrl: 'modal-dialog-novo-usuario-sistema.html',
})
export class DialogNovoUsuarioParaAcessarSistema {

    constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogNovoUsuarioParaAcessarSistema>, @Optional() @Inject(MAT_DIALOG_DATA) public usuario: UsuarioDoSistema) { }

    public listaAcessoSistema = this.fb.group({
        nome:  ['', Validators.required],
        email: ['', Validators.required],
        senha: ['', Validators.required]
    }); 

    closeDialog() {
        this.dialogRef.close();
        this.usuario.nome = '';
        this.usuario.email = '';
        this.usuario.senha = '';
    }

}
