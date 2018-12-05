import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { ProductGuardService } from './product-guard.service';
import { ProductService } from './product.service';
import { SharedModule } from './../shared/shared.module';
import { ProductEditComponent } from './product-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductResolverService } from './product-resolver.service';

@NgModule({
  imports: [
    RouterModule.forChild([
        {
          path: 'products',
          component: ProductListComponent
        },
        {
          path: 'products/:id',
          canActivate: [ ProductGuardService ],
          component: ProductDetailComponent,
          resolve: {
            data: ProductResolverService
          }
        },
        {
          path: 'addProduct/:id',
          component: ProductEditComponent
        },
        {
          path: 'editProduct/:id',
          component: ProductEditComponent,
          resolve: {
            data: ProductResolverService
          }
        }
    ]),
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
    ProductEditComponent
  ],
  providers: [
    ProductService,
    ProductGuardService
  ]
})
export class ProductModule { }
