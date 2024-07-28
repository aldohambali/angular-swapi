import { Component } from '@angular/core';
import { apicallService } from 'src/app/_services/apicall.services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent {

  loading:boolean=false
  currentpage:number=1
  limit:number=10
  totalpage:any=0
  results:any=[]
  hasprev:boolean=false
  hasnext:boolean=false
  totalAll:number=0
  valCurrentPage:number=1
	constructor(
    private apicallServices: apicallService
	) {}
	ngOnInit(): void {

    if(localStorage.getItem("currentpage")){
      this.currentpage = Number(localStorage.getItem("currentpage"))
      this.valCurrentPage = Number(localStorage.getItem("currentpage"))
    }
    this.getPeople()
	}
  getPeople(){
    this.loading=true
    this.apicallServices.getData(environment.api+'/people/?page='+this.currentpage+'').subscribe((res:any) => {
      console.log('res : ',res)
      this.loading=false
      if(res?.results){
        this.results = res?.results
        this.totalAll = res?.count
        this.loadPaging()
      }
    },
    (err:any) => {
      alert('Opps something wrong, please try again later.')
    });
  }
  getId(url:string){
    var getIdByUrl:any= []
    var res = ''
    if(url.split('/')){
      getIdByUrl = url.split('/')
      if(getIdByUrl[5]){
        res = getIdByUrl[5]
      }
    }

    return res
     
  }
  loadPaging(){
    var gettotal = Math.ceil(this.totalAll/this.limit)
    if(this.currentpage==gettotal){
      this.hasnext=false
    } else {
      this.hasnext=true
    }

    if(this.currentpage==1){
      this.hasprev=false
    } else {
      this.hasprev=true
    }

    this.totalpage = gettotal

    if(this.totalpage==0){
      this.hasnext=false
    }
  }

  gotopage(page:any){
    this.currentpage=page
    this.valCurrentPage = page
    localStorage.setItem("currentpage",page)
    this.getPeople()
  }
  godirect(page:any){
    if(page<=this.totalpage && page>0){
      this.gotopage(page)
    } else {
      alert('Page must between 1 to '+this.totalpage+'')
    }
  }
}
