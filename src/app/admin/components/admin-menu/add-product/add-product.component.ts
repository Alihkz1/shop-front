import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../shared/admin.service';
import { environment } from '../../../../../env/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from 'rxjs';
import { Category } from '../../../../shared/model/category.model';
import { NzModalComponent } from 'ng-zorro-antd/modal';
import { CATEGORY_MOCK } from '../../../../shared/mock-data/categories.mock';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  @ViewChild('productModal') productModal: NzModalComponent;

  uploadUrl = environment.UPLOAD_URL;
  addLoading: Subscription;
  editCategoryModalVisible = false;
  addCategoryModalVisible = false;
  productModalVisible = false;

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
  editCategoryId: number = 0;
  categories: any[] = []

  constructor(
    private adminService: AdminService,
    private message: NzMessageService,
    private translate: TranslateService,
  ) { 
    // this.backTranslate = this.translate.instant('back');
    this.backTranslate = "بازگشت"
    // this.submitTranslate = this.translate.instant('submit');
    this.submitTranslate = "ثبت"
  }

  ngOnInit(): void {
    this.getCategories()
  }

  uploader_onChange(event: any) {
    console.log(event);
  }

  getCategories() {
    // this.adminService.getCategories().subscribe(({ data }: any) => {
    //   this.categories = data.categories;
    // })
    this.categories = CATEGORY_MOCK;
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
          categoryId: this.form.get('categoryId')?.value
        }
      ).subscribe(({ success }: any) => {
        if (success) {
          this.message.create('success', this.translate.instant("productAdded"))
          this.form.reset()
          this.getCategories()
          this.productModalVisible = false;
        }
        else this.message.create('error', this.translate.instant("error"))
      });
    } else {
      this.addLoading = this.adminService.editProduct(this.form.value).subscribe(({ success }: any) => {
        if (success) {
          this.message.create('success', this.translate.instant("productAdded"))
          this.form.reset()
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
      categoryName: this.newCategoryNameControl.value
    }
    this.adminService.editCategory(model).subscribe(({ success }: any) => {
      if (success) {
        this.editCategoryModalVisible = false;
        this.newCategoryNameControl.reset();
        this.getCategories();
        this.message.create('success', this.translate.instant('actionDone'))
      } else this.message.create('error', this.translate.instant('error'))
    })
  }

  addCategory_onConfirm() {
    const model = {
      imageUrl: '',
      categoryName: this.addCategoryControl.value
    }
    this.adminService.addCategory(model).subscribe(({ success }: any) => {
      if (success) {
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
