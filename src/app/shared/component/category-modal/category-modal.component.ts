import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { environment } from '../../../../env/environment';
import { TranslateModule } from "@ngx-translate/core";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AdminApi } from '../../../admin/shared/admin.api';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NzInputModule, NzUploadModule, TranslateModule, NzButtonModule, NzIconModule],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss'
})
export class CategoryModalComponent implements OnInit {
  modalData = inject(NZ_MODAL_DATA);
  formControl = new FormControl();
  uploadedImgUrl = new FormControl('')

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

  constructor(
    private translate: TranslateService,
    private message: NzMessageService,
    private modalRef: NzModalRef,
    private adminApi: AdminApi,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    if (this.modalData)
      this.formControl.setValue(this.modalData.categoryName)
  }

  onBack() {
    this.formControl.reset()
    this.modalRef.close(false)
  }

  onSubmit() {
    if (this.modalData)
      this.editCategory_onConfirm()
    else this.addCategory_onConfirm()
  }

  editCategory_onConfirm() {
    const model = {
      categoryId: this.modalData.categoryId,
      categoryName: this.formControl.value,
      imageUrl: this.uploadedImgUrl.value
    }
    this.adminApi.editCategory(model).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
      }
      this.modalRef.close(success)
    })
  }

  addCategory_onConfirm() {
    const model = {
      imageUrl: this.uploadedImgUrl.value,
      categoryName: this.formControl.value
    }
    this.adminApi.addCategory(model).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
      }
      this.modalRef.close(success)
    })
  }
}
