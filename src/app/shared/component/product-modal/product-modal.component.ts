import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { TranslateModule } from "@ngx-translate/core";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AdminApi } from '../../../admin/shared/admin.api';
import { Category } from '../../model/category.model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzUploadModule, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../env/environment';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, NzSelectModule, NzInputModule, NzButtonModule, NzUploadModule, NzIconModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent implements OnInit {
  modalData = inject(NZ_MODAL_DATA);
  categories: Category[] = []
  uploadedImgUrl = new FormControl('')

  form = new FormGroup({
    categoryId: new FormControl({ value: null, disabled: true }, Validators.required),
    title: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    amount: new FormControl(null, Validators.required),
    productId: new FormControl(null, Validators.required),
  });

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
      (error: any) => {
        item.onError!(error, item.file!);
      }
    )
  }

  constructor(private modalRef: NzModalRef, private adminApi: AdminApi, private http: HttpClient) { }

  ngOnInit(): void {
    if (this.modalData.product) {
      this.form.patchValue(this.modalData.product)
    }
    this.getCategories()
  }

  getCategories() {
    this.adminApi.getCategories().subscribe(({ data }: any) => {
      this.categories = data.categories;
      this.form.get('categoryId')?.setValue(this.modalData.category?.categoryId || this.modalData.product?.categoryId);
    })
  }

  onBack() {
    this.form.reset()
    this.modalRef.close(false)
  }

  onSubmit() {
    if (this.modalData)
      this.editProduct_onConfirm()
    else this.addProduct_onConfirm()
  }

  editProduct_onConfirm() { }

  addProduct_onConfirm() { }
}
