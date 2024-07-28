import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})

export class apicallService {
  dataObs = new Subject();

  constructor(private http: HttpClient) {}

  getData(url:string) {
    return this.http.get<any>(url);    
  }
  

}