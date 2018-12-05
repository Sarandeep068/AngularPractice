import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable()
export class ProductService {
  private _productUrl = 'api/products';
  private _productId = 10;

  constructor(private _http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(this._productUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  getProduct(id: number): Observable<IProduct> {
    // return this.getProducts().pipe(
    //   map((products: IProduct[]) => products.find(p => p.productId === id)));
    return this._http.get<IProduct>(`${this._productUrl}/${id}`)
     .pipe(
       tap((data) => console.log(data)),
       catchError(this.handleError)
     );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  deleteProduct(id: number) {
    return this._http.delete(`${this._productUrl}/${id}`)
      .pipe(
        tap( data => console.log(data)),
        catchError(this.handleError)
      );
  }

  addProduct(newProduct: IProduct) {
    return this._http.post(`${this._productUrl}`, newProduct)
    .pipe(
      tap((product: IProduct) => {
        product.id = ++this._productId;
        product.productId = product.id;
        console.log(product);
      }
      ),
      catchError(this.handleError)
    );
  }

  editProduct(product: IProduct) {
    return this._http.put(`${this._productUrl}/${product.id}`, product)
    .pipe(
      tap(
        updatedProduct => console.log(updatedProduct)
      ),
      catchError(this.handleError)
    );
  }
}
