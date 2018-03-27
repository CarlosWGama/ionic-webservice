import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ListaPage } from '../lista/lista';
import { UsuarioProvider } from '../../providers/usuario/usuario';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 
  usuario: {login: string, senha: string} = {
    login: "",
    senha: ""
  };

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
  private usuarioProvider: UsuarioProvider) {
  }

  logar() {
    this.usuarioProvider.logar(this.usuario).then((dados: string) => {
      this.usuarioProvider.setJWT(dados);

      this.navCtrl.setRoot(ListaPage);
    }).catch((erros) => {
      if (erros.status == 404) {
        this.alertCtrl.create({
          title: "Falha ao logar",
          message: "Usuário ou Senha Incorreta"
        }).present();
      } else {
        this.alertCtrl.create({
          title: "Falha ao logar",
          message: "Erro no servidor"
        }).present();
      }
    });
    
      //this.navCtrl.setRoot(ListaPage);
      
    
    
  }

}
