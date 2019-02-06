import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvalDesempenhoService {

  private colaborador_id : BehaviorSubject<number>;

  constructor() 
  { 
    this.colaborador_id = new BehaviorSubject<number>(0);
  }


  public setColaboradorId(colaborador_id: number)
  {
    return this.colaborador_id.next(colaborador_id);
  }

  public getColaboradorId()
  {
    return this.colaborador_id;
  }

}
