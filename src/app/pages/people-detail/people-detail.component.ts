import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from 'src/app/_services/people.services';

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.scss']
})
export class PeopleDetailComponent {
  getId:any
  result:any
  loading:boolean=false

  starships:any=[]
  vehicles:any=[]
  species:any=[]
  homeworld:any=[]
  
  films:any=[]

	constructor(
    private route: ActivatedRoute,
		private peopleServices: PeopleService,
    private http:HttpClient,
	) {}
	ngOnInit(): void {
		this.getId = this.route.snapshot.paramMap.get('id');

    this.getDetail()
	}
  getDetail(){
    if(this.getId){
      this.loading=true
      this.peopleServices.getDetailPeople(this.getId).subscribe((res:any) => {
        console.log('res : ',res)
        this.loading=false
        if(res?.name){
          this.result = res
          
          if(this.result.starships.length > 0){
            this.loadTitleDetail('starships',this.result.starships)
          }
          if(this.result.films.length > 0){
            this.loadTitleDetail('films',this.result.films)
          }
          if(this.result.vehicles.length > 0){
            this.loadTitleDetail('vehicles',this.result.vehicles)
          }
          if(this.result.species.length > 0){
            this.loadTitleDetail('species',this.result.species)
          }
          if(this.result.homeworld){
            this.loadTitleDetail('homeworld',this.result.homeworld)
          }

        }
      });
    } 
  }

  getDataTitle(url:string): Promise<any> {
    return this.http.get(url).toPromise();
  }

  loadTitleDetail(type:string,res:any){
     switch (type) {
      case 'films':
        res.forEach( (e:any) => {           
          this.getDataTitle(e).then((data) => {
           this.films.push(data.title)
          })
          .catch((error) => {
            console.log("Promise rejected with " + JSON.stringify(error));
          });
        });
        
        break;
      case 'vehicles':
        res.forEach( (e:any) => {           
          this.getDataTitle(e).then((data) => {
           this.vehicles.push(data.name)
          })
          .catch((error) => {
            console.log("Promise rejected with " + JSON.stringify(error));
          });
        });
        
        break;
      case 'species':
        res.forEach( (e:any) => {           
          this.getDataTitle(e).then((data) => {
           this.species.push(data.name)
          })
          .catch((error) => {
            console.log("Promise rejected with " + JSON.stringify(error));
          });
        });
        
        break;

      case 'starships':
        res.forEach( (e:any) => {           
          this.getDataTitle(e).then((data) => {
           this.starships.push(data.name)
          })
          .catch((error) => {
            console.log("Promise rejected with " + JSON.stringify(error));
          });
        });
        break;   
      case 'homeworld':
        this.getDataTitle(res).then((data) => {
          this.homeworld = data.name
         })
         .catch((error) => {
           console.log("Promise rejected with " + JSON.stringify(error));
         });
        break;                               
    }

  }
}
