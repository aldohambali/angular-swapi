import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './pages/people/people.component';
import { PeopleDetailComponent } from './pages/people-detail/people-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PeopleComponent,
    data: {
      title: 'People'
    }
  },
  {
    path: 'detail/:id',
    component: PeopleDetailComponent,
    data: {
      title: 'People Detail'
    }
  },
  { 
    path: '**', 
    redirectTo: '/' 
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
