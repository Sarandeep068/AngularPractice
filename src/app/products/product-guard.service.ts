import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TOASTR_TOKEN, ToastrService } from '../shared/toastr.service';

@Injectable()
export class ProductGuardService implements CanActivate {

  constructor(private _router: Router,
    @Inject(TOASTR_TOKEN) private _toastrService: ToastrService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const id = +route.url[1].path;
    if (isNaN(id) || id < 1) {
      this._router.navigate(['/products']);
      this._toastrService.info('The product you are trying to view is no longer available');
      return false;
    }
    return true;
  }
}
