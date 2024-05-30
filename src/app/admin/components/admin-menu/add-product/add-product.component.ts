import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../../../shared/admin.service';
import { environment } from '../../../../../env/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  /* todo: imp category and product model */
  uploadUrl = environment.UPLOAD_URL;
  addLoading: Subscription;
  modalVisible = false;
  addModalVisible = false;

  form = new FormGroup({
    categoryId: new FormControl(),
    title: new FormControl(),
    price: new FormControl(),
    amount: new FormControl()
  });
  newCategoryNameControl = new FormControl()
  addCategoryControl = new FormControl()
  editCategoryId: number;
  categories: { categoryId: any; categoryName: string }[] = []

  constructor(
    private adminService: AdminService,
    private message: NzMessageService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getCategories()
  }

  uploader_onChange(event: any) {
    console.log(event);
  }

  getCategories() {
    this.adminService.getCategories().subscribe(({ data }: any) => {
      this.categories = data.categories;
    })
  }

  addProduct_onClick() {
    this.addLoading = this.adminService.addProduct(this.form.value).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant("productAdded"))
        this.form.reset()
      }
      else this.message.create('success', this.translate.instant("error"))
    });
  }

  deleteCategory_onConfirm(category: any) {
    this.adminService.deleteCategory(category.categoryId).subscribe(({ success }: any) => {
      if (success){
        this.message.create('success', this.translate.instant('actionDone'))
        this.getCategories()
      }
    })
  }

  editCategory_onClick(category: any) {
    this.editCategoryId = category.categoryId;
    this.newCategoryNameControl.setValue(category.categoryName);
    this.modalVisible = !this.modalVisible;
  }

  editCategory_onConfirm() {
    const model = {
      categoryId: this.editCategoryId,
      categoryName: this.newCategoryNameControl.value
    }
    this.adminService.editCategory(model).subscribe(({ success }: any) => {
      if (success) {
        this.modalVisible = false;
        this.newCategoryNameControl.reset();
        this.getCategories();
        this.message.create('success', this.translate.instant('actionDone'))
      } else this.message.create('error', this.translate.instant('error'))
    })
  }

  addCategory_onClick() {
    this.addModalVisible = !this.addModalVisible;
  }

  addCategory_onConfirm() {
    const model = {
      imageUrl: '',
      categoryName: this.addCategoryControl.value
    }
    this.adminService.addCategory(model).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
        this.addModalVisible = false
        this.addCategoryControl.reset()
        this.getCategories()
      } else this.message.create('error', this.translate.instant('error'))
    })
  }
}
