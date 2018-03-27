import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { ListaPage } from '../pages/lista/lista';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, usuarioProvider: UsuarioProvider) {
    platform.ready().then(() => {
      usuarioProvider.getJWT().then((dados) => {
        this.rootPage = ListaPage;
        statusBar.styleDefault();
        splashScreen.hide();

      }).catch((error) => {
        statusBar.styleDefault();
        splashScreen.hide();
      });
      
    });
  }
}

