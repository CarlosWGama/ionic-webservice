import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ListaPage } from '../lista/lista';

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

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }

  logar() {
    if (this.usuario.login == "teste@teste.com" && this.usuario.senha == "123456") {
      this.navCtrl.setRoot(ListaPage);
    } else {
      this.alertCtrl.create({
        title: "Falha ao logar",
        message: "Usuário ou Senha Incorreta"
      }).present();
    }
  }

  cadastrar() {
    this.alertCtrl.create({
      title: "Cadastrar novo usuário",
      inputs: [
        {name: "email", placeholder: "E-mail", type: "email"},
        {name: "senha", placeholder: "Senha", type: "password"}
      ],
      buttons: [
        {text:"Cancelar", role:"cancel"},
        {text: "Cadastrar", handler: (dados) => {
          
          this.alertCtrl.create({
            title: "Novo usuário cadastrado",
            message: "Email: " + dados.email + " <br/> Senha: " + dados.senha
          }).present();
        }}
      ]
    }).present();
  }

}
