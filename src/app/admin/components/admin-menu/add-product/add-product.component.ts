import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminApi } from '../../../shared/admin.api';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { NzModalService } from 'ng-zorro-antd/modal';
import { CategoryModalComponent } from '../../../../shared/component/category-modal/category-modal.component';
import { Category } from '../../../../shared/model/category.model';
import { Product } from '../../../../shared/model/product.model';
import { ProductModalComponent } from '../../../../shared/component/product-modal/product-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  expandId: number | null = null;

  active_onChange(event: Category, flag: boolean) {
    if (flag) this.expandId = event.categoryId;
    else this.expandId = null;
  }

  form = new FormGroup({
    categoryId: new FormControl({ value: null, disabled: true }, Validators.required),
    title: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    amount: new FormControl(null, Validators.required),
    productId: new FormControl(null, Validators.required),
  });

  uploadedImgUrl = new FormControl('')
  dataLoading: Subscription;
  categories: any[] = []

  constructor(
    private adminApi: AdminApi,
    private message: NzMessageService,
    private modalService: NzModalService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.dataLoading = this.adminApi.getCategories()
      .subscribe(({ data }: any) => {
        this.categories = data.categories;
      })
  }

  deleteCategory_onConfirm(category: any) {
    this.adminApi.deleteCategory(category.categoryId).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
        this.getCategories()
      }
    })
  }

  deleteProduct_onConfirm(productId: number) {
    this.adminApi.deleteProduct(productId).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
        this.getCategories();
      }
    })
  }

  openCategoryModal(category?: Category) {
    this.modalService.create({
      nzFooter: null,
      nzCentered: true,
      nzClosable: false,
      nzStyle: {
        width: "500px",
        borderRadius: "6px",
      },
      nzContent: CategoryModalComponent,
      nzData: category,
      nzOnOk: () => {
      },
    }).afterClose.subscribe((result: boolean) => {
      if (result) this.getCategories()
    })
  }

  openProductModal(product: any | null, category: Category | null) {
    const nzData = {
      product,
      category
    }
    this.modalService.create({
      nzFooter: null,
      nzCentered: true,
      nzClosable: false,
      nzStyle: {
        width: "500px",
        borderRadius: "6px",
      },
      nzContent: ProductModalComponent,
      nzData,
      nzOnOk: () => {
      },
    }).afterClose.subscribe((result: boolean) => {
      this.getCategories()
    })
  }
}
