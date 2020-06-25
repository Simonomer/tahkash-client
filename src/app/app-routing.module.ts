import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormCreatorComponent} from "./components/form-creator/form-creator.component";


const routes: Routes = [
  { path: 'form/:formId', component: FormCreatorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
