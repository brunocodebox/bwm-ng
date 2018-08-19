import { Injectable } from "@angular/core";
import { Observable } from "../../../../node_modules/rxjs/Observable";
import { Rental } from "./rental.model";

@Injectable()
export class RentalService {
  private rentals: Rental[] = [
    {
      id: "1",
      title: "Central Apartment",
      city: "New York",
      street: "Times Square",
      category: "apartment",
      image: "http://via.placeholder.com/350x250",
      bedrooms: 3,
      description: "Very nice apartment",
      dailyRate: 34,
      shared: false,
      createdAt: "16/08/2018"
    },
    {
      id: "2",
      title: "Central Apartment 2",
      city: "San Francisco",
      street: "Main street",
      category: "condo",
      image: "http://via.placeholder.com/350x250",
      bedrooms: 2,
      description: "Very nice condo",
      dailyRate: 12,
      shared: true,
      createdAt: "16/08/2018"
    },
    {
      id: "3",
      title: "Central Apartment 3",
      city: "Bratislava",
      street: "Hlavna",
      category: "condo",
      image: "http://via.placeholder.com/350x250",
      bedrooms: 2,
      description: "Very nice condo",
      dailyRate: 334,
      shared: true,
      createdAt: "16/08/2018"
    },
    {
      id: "4",
      title: "Central Apartment 4",
      city: "Prague",
      street: "Argentiska",
      category: "apartment",
      image: "http://via.placeholder.com/350x250",
      bedrooms: 1,
      description: "Very nice apartment",
      dailyRate: 50,
      shared: false,
      createdAt: "16/08/2018"
    }
  ];

  // Explained in Section 3, Lecture 48 - Get Rental Data from Service
  public getRentalById(rentalId: string): Observable<Rental> {
    return new Observable<Rental>(observer => {
      setTimeout(() => {
        const foundRental = this.rentals.find(rental => {
          return rental.id == rentalId;
        });

        // Be aware that the data will be returned in 500 ms so can't be displayed
        // immediately in the html file. So an ngIf statement will be necessary.
        observer.next(foundRental);
      }, 500);
    });
  }

  public getRentals(): Observable<Rental[]> {
    return new Observable<Rental[]>(observer => {
      setTimeout(() => {
        observer.next(this.rentals);
      }, 500);
    });
  }
}
