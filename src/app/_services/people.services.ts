import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment.development";

@Injectable({
  providedIn: "root",
})

export class PeopleService {
  apiRoot = environment.api;
  peopleObs = new Subject();
  detailPeopleObs = new Subject();

  constructor(private http: HttpClient) {}

  people(page:number) {
    this.http
      .get(this.apiRoot + "people/?page="+page, {})
      .subscribe(
        (res) => {
          this.peopleObs.next(res);
        },
        (err) => {
          console.log("err", err);
          alert('oops something wrong')
        }
      );
  }

  getPeople(page:number){
    this.peopleObs = new Subject();
    this.people(page);
    return this.peopleObs.asObservable();
  }

  detailPeople(id:number) {
    this.http
      .get(this.apiRoot + "people/"+id+"/", {})
      .subscribe(
        (res) => {
          this.detailPeopleObs.next(res);
        },
        (err) => {
          console.log("err", err);
          alert('oops something wrong')
        }
      );
  }

  getDetailPeople(id:number){
    this.detailPeopleObs = new Subject();
    this.detailPeople(id);
    return this.detailPeopleObs.asObservable();
  }

}