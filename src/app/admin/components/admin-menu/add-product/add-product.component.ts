import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../shared/admin.service';
import { environment } from '../../../../../env/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from 'rxjs';
import { NzModalComponent } from 'ng-zorro-antd/modal';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  @ViewChild('productModal') productModal: NzModalComponent;

  public uploadRequest = (item: any) => {
    const formData = new FormData();
    formData.append('file', item.file as any);
    formData.append('upload_preset', 'online_shop_preset');
    return this.uploadLoading = this.http.post(environment.UPLOAD_URL, formData)
      .subscribe(({ url }: any) => {
        this.uploadedImgUrl.setValue(url)
      })
  }

  uploadUrl = environment.UPLOAD_URL;
  editCategoryModalVisible = false;
  addCategoryModalVisible = false;
  productModalVisible = false;

  addLoading: Subscription;
  uploadLoading: Subscription;

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
    private adminService: AdminService,
    private http: HttpClient,
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
    this.adminService.getCategories().subscribe(({ data }: any) => {
      this.categories = data.categories;
    })
  }

  addProduct_onClick(category: any) {
    this.productModalVisible = true;
    this.form.get('categoryId')?.setValue(category.categoryId);
  }

  addProduct_onConfirm() {
    if (!this.form.value.productId) {
      this.addLoading = this.adminService.addProduct(
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
        else this.message.create('error', this.translate.instant("error"))
      });
    } else {
      this.addLoading = this.adminService.editProduct(
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
          else this.message.create('error', this.translate.instant("error"))
        });
    }
  }

  deleteCategory_onConfirm(category: any) {
    this.adminService.deleteCategory(category.categoryId).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
        this.getCategories()
      } else this.message.create('error', this.translate.instant('error'))

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
    this.adminService.editCategory(model).subscribe(({ success }: any) => {
      if (success) {
        this.uploadedImgUrl.reset()
        this.editCategoryModalVisible = false;
        this.newCategoryNameControl.reset();
        this.getCategories();
        this.message.create('success', this.translate.instant('actionDone'))
      } else this.message.create('error', this.translate.instant('error'))
    })
  }

  addCategory_onConfirm() {
    const model = {
      imageUrl: this.uploadedImgUrl.value,
      categoryName: this.addCategoryControl.value
    }
    this.adminService.addCategory(model).subscribe(({ success }: any) => {
      if (success) {
        this.uploadedImgUrl.reset()
        this.message.create('success', this.translate.instant('actionDone'))
        this.addCategoryModalVisible = false
        this.addCategoryControl.reset()
        this.getCategories()
      } else this.message.create('error', this.translate.instant('error'))
    })
  }

  deleteProduct_onConfirm(product: any) {
    this.adminService.deleteProduct(product.productId).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
        this.getCategories();
      } else this.message.create('error', this.translate.instant('error'))
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
