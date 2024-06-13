import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminApi } from '../../../shared/admin.api';
import { environment } from '../../../../../env/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from 'rxjs';
import { NzModalComponent } from 'ng-zorro-antd/modal';
import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { NzUploadXHRArgs } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  @ViewChild('productModal') productModal: NzModalComponent;

  public uploadRequest = (item: NzUploadXHRArgs) => {
    const formData = new FormData();
    formData.append('file', item.file as any);
    formData.append('upload_preset', 'online_shop_preset');
    const req = new HttpRequest('POST', environment.UPLOAD_URL, formData)
    return this.http.request(req).subscribe((event: HttpEvent<any>) => {
      item.onProgress!(event, item.file!);
      if (event instanceof HttpResponse) {
        this.uploadedImgUrl.setValue(event.body.url);
        item.onSuccess!(event.body, item.file!, event);
      }
    },
      (error) => {
        item.onError!(error, item.file!);
      }
    )
  }

  uploadUrl = environment.UPLOAD_URL;
  editCategoryModalVisible = false;
  addCategoryModalVisible = false;
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

  newCategoryNameControl = new FormControl()
  addCategoryControl = new FormControl()
  uploadedImgUrl = new FormControl('')
  editCategoryId: number = 0;
  categories: any[] = []

  constructor(
    private http: HttpClient,
    private adminApi: AdminApi,
    private message: NzMessageService,
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

  editCategory_onClick(category: any) {
    this.editCategoryId = category.categoryId;
    this.newCategoryNameControl.setValue(category.categoryName);
    this.editCategoryModalVisible = true;
  }

  editCategory_onConfirm() {
    const model = {
      categoryId: this.editCategoryId,
      categoryName: this.newCategoryNameControl.value,
      imageUrl: this.uploadedImgUrl.value

    }
    this.adminApi.editCategory(model).subscribe(({ success }: any) => {
      if (success) {
        this.uploadedImgUrl.reset()
        this.editCategoryModalVisible = false;
        this.newCategoryNameControl.reset();
        this.getCategories();
        this.message.create('success', this.translate.instant('actionDone'))
      }
    })
  }

  addCategory_onConfirm() {
    const model = {
      imageUrl: this.uploadedImgUrl.value,
      categoryName: this.addCategoryControl.value
    }
    this.adminApi.addCategory(model).subscribe(({ success }: any) => {
      if (success) {
        this.uploadedImgUrl.reset()
        this.message.create('success', this.translate.instant('actionDone'))
        this.addCategoryModalVisible = false
        this.addCategoryControl.reset()
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
}
