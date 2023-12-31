import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndexComponent } from './index/index.component';
import { ProfilComponent } from './profil/profil.component';
import { UserGaleryComponent } from './user-galery/user-galery.component';
import { NftDetailComponent } from './Nft/detail/nft-detail.component';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { ReportComponent } from './report/report.component';
import { AddNftComponent } from './add-nft/add-nft.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'profil',
        component: ProfilComponent,
      },
      {
        path: 'user-galery',
        component: UserGaleryComponent,
      },
      {
        path: 'nft/add',
        component: AddNftComponent,
      },
      {
        path: 'nft/:id',
        component: NftDetailComponent,
      },
      {
        path: 'report',
        component: ReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
