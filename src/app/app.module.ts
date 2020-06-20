import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { NGFORAGE_CONFIG_PROVIDER } from './ngforage.config';

@NgModule({
  declarations: [AppComponent, HomeComponent, ChatComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [NGFORAGE_CONFIG_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
