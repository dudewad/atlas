import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './containers';
import { NotFoundPageComponent } from './containers';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
