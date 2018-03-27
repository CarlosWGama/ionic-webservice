import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { ListaProvider } from '../../providers/lista/lista';
import { Tarefa } from '../../models/Tarefa';
import { LoginPage } from '../login/login';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  tarefas: Tarefa[] = [];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public listaProvider: ListaProvider) {
  }

  ionViewDidLoad() {
    this.listaProvider.listar().then((tarefas: Tarefa[]) => {
      console.log(tarefas);
      this.tarefas = tarefas;
    }).catch((erro) => {
      if (erro.status == 403)
        this.navCtrl.setRoot(LoginPage);
      else
        this.alertCtrl.create({message: erro.message}).present();
    });
  }

  adicionar() {
    this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: "Nova Tarefa",
      message: "Informar os dados da sua tarefa",
      inputs: [
        {label: "Título", type: "text", name: "titulo"},
        {label: "Data", type: "date", name: "data"}
      ],
      buttons: [
        {text: "Cadastrar", handler: (dados) => {
          this.listaProvider.cadastrar(dados).then((tarefas: Tarefa[]) => {
            console.log(tarefas);
            this.tarefas = tarefas;
          }).catch((erro) => {
            if (erro.status == 403)
              this.navCtrl.setRoot(LoginPage);
            else
              this.alertCtrl.create({message: "Erro ao cadastrar"}).present();
          });
        }},
        {text: "Cancelar", role: "cancel"}
      ]
    }).present();
  }


  editar(tarefa: Tarefa) {
    this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: "Editar Tarefa - " + tarefa.titulo ,
      message: "Informar os dados da sua tarefa",
      inputs: [
        {label: "Título", type: "text", name: "titulo", value: tarefa.titulo},
        {label: "Data", type: "date", name: "data", value: tarefa.data}
      ],
      buttons: [
        {text: "Atualizar", handler: (dados) => {
          dados.id = tarefa.id; 
          this.listaProvider.atualizar(dados).then((tarefas: Tarefa[]) => {
            console.log(tarefas);
            this.tarefas = tarefas;
          }).catch((erro) => {
            if (erro.status == 403)
              this.navCtrl.setRoot(LoginPage);
            else
              this.alertCtrl.create({message: "Erro ao cadastrar"}).present();
          });
        }},
        {text: "Cancelar", role: "cancel"}
      ]
    }).present();
  }

  excluir(tarefa) {
    this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: "Remover Tarefa - " + tarefa.titulo ,
      message: "Deseja realmente marcar tarefa como concluída? Ela será removida da sua lista e não terá como recuperá-la",
      buttons: [
        {text: "OK", handler: () => {
          this.listaProvider.deletar(tarefa.id).then((tarefas: Tarefa[]) => {
            console.log(tarefas);
            this.tarefas = tarefas;
          }).catch((erro) => {
            if (erro.status == 403)
              this.navCtrl.setRoot(LoginPage);
            else
              this.alertCtrl.create({message: "Erro ao cadastrar"}).present();
          });
        }},
        {text: "Cancelar", role: "cancel"}
      ]
    }).present();
  }

}
