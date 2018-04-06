import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ElectronService} from './providers/electron.service';
import {WebviewDirective} from './directives/webview.directive';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {RouterModule, Routes} from "@angular/router";
import {ChatComponent} from './components/chat/chat.component';
import {AuthService} from "./services/auth.service";
import {ChatService} from "./services/chat.service";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'chat', component: ChatComponent},
]
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    ChatComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ElectronService,
    AuthService,
    ChatService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
