import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'avaliacaoFilter'
})
export class FiltrarAvaliacoesPipe implements PipeTransform {

	transform(colaboradores:Array<any>, arrayFilter:Array<any>): any {

		console.log('filtrado?');

		let lista = colaboradores;

	}

}
