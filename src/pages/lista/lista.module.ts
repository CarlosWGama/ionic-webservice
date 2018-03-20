import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaPage } from './lista';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ListaPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaPage),
    PipesModule
  ],
})
export class ListaPageModule {}
