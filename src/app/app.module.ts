import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { TileComponent } from './tile/tile.component';
import { TileDetailsComponent } from './tile-details/tile-details.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    TileComponent,
    TileDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
