import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Tarefa } from '../../models/Tarefa';

@Injectable()
export class ListaProvider {

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello ListaProvider Provider');
  }

  cadastrar(tarefa: {titulo: string, data: string}) {
    return this.storage.get("jwt").then((jwt) => {
      
      return this.http.post('http://ionic.carloswgama.com.br/api/tarefa',
          tarefa,
          {headers: {"Authorization": jwt}}
        ).toPromise();
    });
  }

  listar() {
    return this.storage.get("jwt").then((jwt) => {
      
      return this.http.get('http://ionic.carloswgama.com.br/api/tarefa',
          {headers: {"Authorization": jwt}}
        ).toPromise();
    });
  }

  atualizar(tarefa: Tarefa) {
    return this.storage.get("jwt").then((jwt) => {
      
      return this.http.put('http://ionic.carloswgama.com.br/api/tarefa/' + tarefa.id ,
          tarefa,
          {headers: {"Authorization": jwt}}
        ).toPromise();
    });
  }

  deletar(id: number) {
    return this.storage.get("jwt").then((jwt) => {
      
      return this.http.delete('http://ionic.carloswgama.com.br/api/tarefa/' + id ,
          {headers: {"Authorization": jwt}}
        ).toPromise();
    });
  }



}
