import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
// Added from Section 5, Lecture 63 - Get Rentals from Node Server
import { HttpClientModule } from "@angular/common/http";
// Added from Section 5, Lecture 66 - Pipes
import { NgPipesModule } from "ngx-pipes";
// Added from Section 5, Lecture 69 Create Map Component
import { MapModule } from "../common/map/map.module";

import { RentalListComponent } from "./rental-list/rental-list.component";
import { RentalListItemComponent } from "./rental-list-item/rental-list-item.component";
import { RentalComponent } from "./rental.component";

import { RentalService } from "./shared/rental.service";
import { RentalDetailComponent } from "./rental-detail/rental-detail.component";

// Added from Section 5, Lecture 67 - Custom Pipe
import { UppercasePipe } from "../common/pipes/uppercase.pipe";

const routes: Routes = [
  {
    path: "rentals",
    component: RentalComponent,
    children: [
      { path: "", component: RentalListComponent },
      { path: ":rentalId", component: RentalDetailComponent }
    ]
  }
];

@NgModule({
  declarations: [
    RentalListComponent,
    RentalListItemComponent,
    RentalComponent,
    RentalDetailComponent,
    UppercasePipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    NgPipesModule,
    MapModule
  ],
  providers: [RentalService]
})
export class RentalModule {}
