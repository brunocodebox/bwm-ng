import { NgModule } from "@angular/core";
import { AgmCoreModule } from "@agm/core";
// Section 5, Lecture 76 - Display Error When Location is Not found
import { CommonModule } from "@angular/common";

import { MapComponent } from "./map.component";
// Created from Section 5, Lecture 72 - Introduce Caching
import { CamelizePipe } from "ngx-pipes";
// Created from Section 5, Lecture 71 - Display location of Rental on Map
import { MapService } from "./map.service";

@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBoQrd5iOIW1W6kZuofUdrdlYU2GxqB5f8"
    }),
    CommonModule
  ],
  providers: [
    // Created from Section 5, Lecture 71 - Display location of Rental on Map
    MapService,
    CamelizePipe
  ]
})
export class MapModule {}
