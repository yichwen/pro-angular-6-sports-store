import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StoreComponent } from './store/store.component';

@Injectable()
export class StoreFirstGuard {
  private firstNavigation = true;

  constructor(
    private router: Router
  ) { }

  // The implementation of this method uses the context objects that Angular provides that describe the
  // route that is about to be navigated to and checks to see whether the target component is a StoreComponent
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.firstNavigation) {
      this.firstNavigation = false;
      if (route.component != StoreComponent) {
        this.router.navigateByUrl('/');
        return false;
      }
    }
    return true;
  }
}