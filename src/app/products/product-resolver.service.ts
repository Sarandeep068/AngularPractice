import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<IProduct> {

  constructor(private _productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): Observable<IProduct> {
    return this._productService.getProduct(1);
  }

}
