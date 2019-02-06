import { Component, Inject, Optional } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { STORAGE_API } from '../../../sociis.api';

export interface AvaliacaoColaboradorModal {
    colaboradorInfo: any
    , gabarito: any
    , dadosAvaliacao: any
    , auto_avaliacao_respostas: any
}

@Component({
    selector: 'modal-dialog-avaliacao-colaborador',
    templateUrl: 'modal-dialog-avaliacao-colaborador.html',
    styleUrls: ['./modal-style.css'],
})

export class DialogAvaliacaoColaborador {

    public baseStorageUrl = STORAGE_API;

    constructor(public dialogRef: MatDialogRef<DialogAvaliacaoColaborador>, @Optional() @Inject(MAT_DIALOG_DATA) public data: AvaliacaoColaboradorModal) {
        console.log(data);
    }

    closeDialog() {
        this.dialogRef.close();

    }

    validaRespostas(avaliacao_id: number, diretriz_id: number, competencia_id: number): boolean {

        let bool = false;


        this.data.gabarito.forEach(function (r, indice, array) {
            if (r.avaliacoes_id == avaliacao_id) {
                if ((r.diretriz_id == diretriz_id) && (r.competencia_id == competencia_id)) {
                    bool = true;
                }
            }
        });

        return bool;
    }

    /**
     * busca a nota da competencia que o colaborador avaliou 
     * @param competencia 
     */
    validaRespostaAvaliacaoPessoal(competencia) 
    {

        let respostas = this.data.gabarito;

        let resposta_competencia = respostas.filter(resp => (resp.competencia_id == competencia.id));

        let diretrizes = this.data.dadosAvaliacao.diretrizes;

        let nota = diretrizes.filter( nota => nota.id == resposta_competencia[0].diretriz_id );

        return nota[0].peso;
    }

    /**
     * busca a nota da auto avaliação feita pelo colaborador em determinada competencia.
     * @param competencia 
     */
    validaRespostaAutoAvaliacao(competencia) {
        let respostas = this.data.auto_avaliacao_respostas;

        let resposta_competencia = respostas.filter(resp => (resp.competencia_id == competencia.id));

        let diretrizes = this.data.dadosAvaliacao.diretrizes;

        let nota = diretrizes.filter(nota => nota.id == resposta_competencia[0].diretriz_id);

        return nota[0].peso;
    }

    /**
     * Calcula a nota final da competência entre as duas partes.
     * @param competencia 
     */
    calculaNotaFinalAvaliacao(competencia) {
        //buscamos a nota que foi recebida de outro colaborador
        let respostas = this.data.gabarito;

        let resposta_competencia = respostas.filter(resp => (resp.competencia_id == competencia.id));

        let diretrizes = this.data.dadosAvaliacao.diretrizes;

        let nota_recebida = diretrizes.filter(nota => nota.id == resposta_competencia[0].diretriz_id);
        // buscamos a nota da auto avaliação
        respostas = this.data.auto_avaliacao_respostas;

        resposta_competencia = respostas.filter(resp => (resp.competencia_id == competencia.id));

        diretrizes = this.data.dadosAvaliacao.diretrizes;

        let nota_auto_avaliada = diretrizes.filter(nota => nota.id == resposta_competencia[0].diretriz_id);
        //realizamos a média das notas
        let nota_final = (nota_recebida[0].peso + nota_auto_avaliada[0].peso) / 2;

        return nota_final;



    }

}
