import { Component, OnInit, Input } from "@angular/core";
import { Rental } from "../shared/rental.model";

@Component({
  selector: "bwm-rental-list-item",
  templateUrl: "./rental-list-item.component.html",
  styleUrls: ["./rental-list-item.component.scss"]
})

// This component is created for each loop inside rental-list-component.html because of tag <bwm-rental-list-item>
export class RentalListItemComponent implements OnInit {
  @Input() // will receive input from each loop and store it in rental
  rental: Rental;

  constructor() {}

  ngOnInit() {}
}
