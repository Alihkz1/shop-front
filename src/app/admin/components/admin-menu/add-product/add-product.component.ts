import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminApi } from '../../../shared/admin.api';
import { environment } from '../../../../../env/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from 'rxjs';
import { NzModalComponent, NzModalService } from 'ng-zorro-antd/modal';
import { CategoryModalComponent } from '../../../../shared/component/category-modal/category-modal.component';
import { Category } from '../../../../shared/model/category.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  @ViewChild('productModal') productModal: NzModalComponent;

  uploadUrl = environment.UPLOAD_URL;
  productModalVisible = false;

  addLoading: Subscription;
  backTranslate: string;
  submitTranslate: string;

  form = new FormGroup({
    categoryId: new FormControl({ value: null, disabled: true }, Validators.required),
    title: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    amount: new FormControl(null, Validators.required),
    productId: new FormControl(null, Validators.required),
  });

  uploadedImgUrl = new FormControl('')
  categories: any[] = []

  constructor(
    private adminApi: AdminApi,
    private message: NzMessageService,
    private modalService: NzModalService,
    private translate: TranslateService,
  ) {
    // this.backTranslate = this.translate.instant('back');
    // this.submitTranslate = this.translate.instant('submit');
    this.backTranslate = "بازگشت"
    this.submitTranslate = "ثبت"
  }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.adminApi.getCategories().subscribe(({ data }: any) => {
      this.categories = data.categories;
    })
  }

  addProduct_onClick(category: any) {
    this.productModalVisible = true;
    this.form.get('categoryId')?.setValue(category.categoryId);
  }

  addProduct_onConfirm() {
    if (!this.form.value.productId) {
      this.addLoading = this.adminApi.addProduct(
        {
          ...this.form.value,
          imageUrl: this.uploadedImgUrl.value,
          categoryId: this.form.get('categoryId')?.value
        }
      ).subscribe(({ success }: any) => {
        if (success) {
          this.message.create('success', this.translate.instant("productAdded"))
          this.form.reset()
          this.uploadedImgUrl.reset()
          this.getCategories()
          this.productModalVisible = false;
        }
      });
    } else {
      this.addLoading = this.adminApi.editProduct(
        {
          ...this.form.value,
          imageUrl: this.uploadedImgUrl.value,
        }).subscribe(({ success }: any) => {
          if (success) {
            this.message.create('success', this.translate.instant("productAdded"))
            this.form.reset()
            this.uploadedImgUrl.reset()
            this.getCategories()
            this.productModalVisible = false;
          }
        });
    }
  }

  deleteCategory_onConfirm(category: any) {
    this.adminApi.deleteCategory(category.categoryId).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
        this.getCategories()
      }
    })
  }

  deleteProduct_onConfirm(product: any) {
    this.adminApi.deleteProduct(product.productId).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
        this.getCategories();
      }
    })
  }

  editProduct_onClick(product: any) {
    this.productModalVisible = true
    this.form.patchValue(product);
  }

  productModal_onClose() {
    this.form.reset()
  }

  openCategoryModal(category?: Category) {
    this.modalService.create({
      nzFooter: null,
      nzCentered: true,
      nzClosable: false,
      nzStyle: {
        width: "400px",
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
}
