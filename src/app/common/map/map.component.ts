import { Component, Input, ChangeDetectorRef } from "@angular/core";
// Created in Section 5, Lecture 71 - Display location of Rental on Map
import { MapService } from "./map.service";

@Component({
  selector: "bwm-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent {
  @Input()
  location: string;
  isPositionError: boolean = false;

  lat: number = 37.77;
  lng: number = -122.41;

  constructor(private mapService: MapService, private ref: ChangeDetectorRef) {}

  // Created in Section 5, Lecture 71 - Display location of Rental on Map
  mapReadyHandler() {
    this.mapService.getGeoLocation(this.location).subscribe(
      coordinates => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
        this.ref.detectChanges();
        this.isPositionError = false; // rajoute pour reinitialiser le cas ou isPositionError = true
      },
      () => {
        this.isPositionError = true;
      }
    );
  }
}
