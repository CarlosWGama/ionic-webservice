import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class UsuarioProvider {

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello UsuarioProvider Provider');
  }

  public setJWT(jwt: string) {
    this.storage.set('jwt', jwt);
  }

  public getJWT() {
    return this.storage.get("jwt");
  }
  
  public logar(usuario) {
    return this.http.post('http://ionic.carloswgama.com.br/api/login', usuario)
      .toPromise();
  }

}
