import { Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import("@modules/auth/login/login.component").then((m) => m.LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () => import("@modules/tasks/task-list/task-list.component").then((m) => m.TaskListComponent),
    canActivate: [AuthGuard]
  }
];
