import { Injectable } from "@angular/core";
import { Observable } from "../../../../node_modules/rxjs/Observable";
//import { Rental } from "./rental.model";
// Added from Section 5, Lecture 63 - Get Rentals from Node Server
import { HttpClient } from "@angular/common/http";

@Injectable()
export class RentalService {
  // Added from Section 5, Lecture 63 - Get Rentals from Node Server
  constructor(private http: HttpClient) {}

  // Explained in Section 3, Lecture 48 - Get Rental Data from Service
  // Explained in Section 5, Lecture 63 - Get Rentals from Node Server
  public getRentalById(rentalId: string): Observable<any> {
    return this.http.get("/api/v1/rentals/" + rentalId); // Sends reqwuest to localhost:4200 (default)
  }

  public getRentals(): Observable<any> {
    return this.http.get("/api/v1/rentals"); // Sends request to localhost:4200 (default)
  }
}
