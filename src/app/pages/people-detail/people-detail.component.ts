import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apicallService } from 'src/app/_services/apicall.services';
import { environment } from 'src/environments/environment';

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
    private apicallServices: apicallService,
    private http:HttpClient,
	) {}
	ngOnInit(): void {
		this.getId = this.route.snapshot.paramMap.get('id');

    this.getDetail()
	}
  getDetail(){
    if(this.getId){
      this.loading=true
      this.apicallServices.getData(environment.api+'/people/'+this.getId+'').subscribe((res:any) => {
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
      },
      (err:any) => {
        alert('Opps something wrong, please try again later.')
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
          this.apicallServices.getData(e).subscribe((res:any) => {
            res?.title && this.films.push(res.title)
          });
        });
        
        break;
      case 'vehicles':
        res.forEach( (e:any) => {      
          this.apicallServices.getData(e).subscribe((res:any) => {
            res?.name && this.vehicles.push(res.name)
          });
        });
        
        break;
      case 'species':
        res.forEach( (e:any) => { 
          this.apicallServices.getData(e).subscribe((res:any) => {
            res?.name && this.species.push(res.name)
          });
        });
        
        break;

      case 'starships':
        res.forEach( (e:any) => {     
          this.apicallServices.getData(e).subscribe((res:any) => {
            res?.name && this.starships.push(res.name)
          });
        });
        break;   
      case 'homeworld':
         this.apicallServices.getData(res).subscribe((res:any) => {
          this.homeworld =  res.name ? res.name :''
        });
        break;                               
    }

  }
}
