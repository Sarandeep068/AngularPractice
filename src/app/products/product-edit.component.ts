/* tslint:disable */
import { Component, Inject, OnInit } from "@angular/core";
import { ProductService } from "./product.service";
import { TOASTR_TOKEN, ToastrService } from "../shared/toastr.service";
import { ActivatedRoute, Router } from "@angular/router";
import { IProduct } from "./product";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedValidator } from "../shared/shared-validator";

@Component({
    templateUrl: "./product-edit.component.html",
    styles: [`
        .header {
            color: #36A0FF;
            font-size: 27px;
            padding: 10px;
        }

        .bigicon {
            font-size: 35px;
            color: #36A0FF;
        }
        
        .search { position: relative; }
        .search input { text-indent: 30px;}
        .search .fa-search { 
        position: absolute;
        top: 24px;
        left: 7px;
        font-size: 15px;
        }
    `]
})
export class ProductEditComponent implements OnInit{

    private product: IProduct;
    pageTitle = 'Product Edit Form';
    editForm: FormGroup;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productService: ProductService,
        @Inject(TOASTR_TOKEN) private _toastrService: ToastrService,
        private fb: FormBuilder
    ){}

    get ProductName(){
        return this.editForm.get('productName');
    }

    get StarRating(){
        return this.editForm.get('starRating');
    }

    get ImageUrl(){
        return this.editForm.get('imageUrl')
    }

    get ProductCode(){
        return this.editForm.get('productCode')
    }

    get Price(){
        return this.editForm.get('price')
    }

    ngOnInit(){
        this._route.paramMap.subscribe(
            (paramsMap) => {
                const id = +paramsMap.get('id');
                if (Number.isNaN(id)) {
                    this._toastrService.error('Incorrect Product Id retrieved!! Will redirect to Product Details Page');
                    this._router.navigate(['/products']);
                    return;
                }

                if (id) {
                    this._productService.getProduct(+id)
                    .subscribe(
                        (product : IProduct) => {
                            this.product = product;
                            this.buildForm();
                        },
                        (error) => this._toastrService.error(error)
                    );
                }
                else {
                    this.pageTitle = 'Add New Product';
                    this.product = {
                        price: 0,
                        productName: '',
                        productId: 0,
                        id: 0,
                        productCode: '',
                        releaseDate: new Date().toDateString(),
                        description: '',
                        imageUrl: '',
                        starRating: 0
                    };
                    this.buildForm();
                }
            },
            error => this._toastrService.error(error)
        );
    }

    buildForm() {
        this.editForm = this.fb.group({
            productName: [this.product.productName, 
                [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
            productCode: [this.product.productCode, [Validators.required], SharedValidator.productCodeValidator],
            description: this.product.description,
            imageUrl: [this.product.imageUrl,[Validators.required]],
            price: [this.product.price || "",[Validators.required]],
            starRating: [this.product.starRating || "", SharedValidator.rangeValidator(1,5)]
        });
    }

    submit() {
        if (!this.editForm.valid) {
            this._toastrService.error("Please fill all the fields before proceeding!");
            this.editForm.get('productCode').updateValueAndValidity();
            return;
        }

        const updatedProduct = Object.assign({},this.product, this.editForm.value);

        if (this.product.id) {
            this._productService.editProduct(updatedProduct)
                .subscribe( product => {
                    this._toastrService.success(`Product with name ${updatedProduct.productName} has been added`);
                    this._router.navigate(['/products'])
                })
        }

        else {
            this._productService.addProduct(updatedProduct)
                .subscribe( product => {
                    this._toastrService.success(`Product with name ${updatedProduct.productName} has been updated`);
                    this._router.navigate(['/products']);
                })
        }
    }
}
