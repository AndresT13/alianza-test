import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { ClientModalComponent } from './clients/client-modal/client-modal.component';
import { NavMenuComponent } from './clients/nav-menu/nav-menu.component';
import { ClientSearchComponent } from './clients/search/search.component';

const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'clients', component: ClientsComponent },
  { path: 'nav', component: NavMenuComponent },
  { path: 'modal', component: ClientModalComponent },
  { path: 'search', component: ClientSearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
