import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  tarefas: {titulo: string, data: string}[] = [];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
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
          this.tarefas.push(dados)
        }},
        {text: "Cancelar", role: "cancel"}
      ]
    }).present();
  }


  editar(tarefa: {titulo: string, data: string}) {
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
          let index = this.tarefas.indexOf(tarefa);
          this.tarefas[index] = dados;
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
          let index = this.tarefas.indexOf(tarefa);
          this.tarefas.splice(index, 1);
        }},
        {text: "Cancelar", role: "cancel"}
      ]
    }).present();
  }

}
