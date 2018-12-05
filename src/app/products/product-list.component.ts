import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { TOASTR_TOKEN, ToastrService } from '../shared/toastr.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];
    products: IProduct[] = [];
    selectProductCode: string;

    constructor(
        private _productService: ProductService,
        private _router: Router,
        private _route: ActivatedRoute,
        @Inject(TOASTR_TOKEN) private _toastrService: ToastrService
    ) {

    }
    onProductSelected(event, productCode) {
        this.selectProductCode = productCode;
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
              product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this._productService.getProducts()
                .subscribe(products => {
                    this.products = products;
                    this.filteredProducts = this.listFilter
                    ? this.performFilter(this.listFilter)
                    : this.products;
                },
                    error => this._toastrService.error(error));

        this._route.queryParamMap.subscribe(
            queryParams => {
                this.showImage = queryParams.get('showImage') === 'true';
                this.listFilter = queryParams.get('listFilter');
            }
        );
    }

    deleteProduct(id: number) {
        const filteredProducts = this.filteredProducts;
        let deletedProduct: IProduct;
        this.filteredProducts = this.filteredProducts.filter(item => {
            if (item.productId === id) {
                deletedProduct = item;
            }
            return item.productId !== id;
        });
        this._productService.deleteProduct(id)
            .subscribe(
                () => this._toastrService.success(`${deletedProduct.productName} deleted successfully`),
                error => {
                    this.errorMessage = <any>error;
                    this.filteredProducts = filteredProducts;
                    this._toastrService.error(error);
                }
            );
    }

    navigateToProductDetail(id: number) {
        const queryStringsParams = {
            showImage: this.showImage,
            listFilter: this.listFilter };

        this._router.navigate(['/products', id], { queryParams : queryStringsParams });
    }

    editProduct(id: number) {
        this._router.navigate(['/editProduct', id]);
    }
}
