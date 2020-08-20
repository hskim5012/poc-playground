import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { FundsComponent } from './funds/funds.component';
import { PreferencesComponent } from './settings/preferences/preferences.component';
import { PreferenceEditGuard } from './settings/preferences/preference-edit.guard';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UserInformationComponent } from './manage-users/user-information/user-information.component';
import { RemittancesComponent } from './Data-Management/remittances/remittances.component';

const routes: Routes = [
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'funds',
    component: FundsComponent
  },
  {
    path: 'preferences',
    canDeactivate: [PreferenceEditGuard],
    component: PreferencesComponent
  },
  {
    path: 'manage-users',
    component: ManageUsersComponent,
    pathMatch: 'full'
  },

  {
    path: 'user-information',
    component: UserInformationComponent
  },
  {
    path: 'data-management',
    component: RemittancesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderPayRouting { }
