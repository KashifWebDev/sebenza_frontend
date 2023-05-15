import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import {RoleGuard} from "./core/guard/role.guard";
import {UserRole} from "./core/roles/UserRole";


const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  { path:'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'administrator',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        data: { roles: [UserRole.Admin] },
        canActivate: [RoleGuard],
        path: 'dashboard',
        loadChildren: () => import('./views/pages/administrator/administrator.module').then(m => m.AdministratorModule)
      },
    ]
  },
  {
    path: 'user',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        data: { roles: [UserRole.User] },
        canActivate: [RoleGuard],
        path: 'dashboard',
        loadChildren: () => import('./views/pages/user/user.module').then(m => m.UserModule)
      },
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
