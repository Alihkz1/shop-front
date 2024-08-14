import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { TranslateModule } from "@ngx-translate/core";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AdminApi } from '../../../admin/shared/admin.api';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../env/environment';
import { AspectRatioTypes } from '../image-cropper-modal/image-cropper-modal.component';

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule, ImageCropperModule, NzInputModule, ReactiveFormsModule,
    TranslateModule, NzButtonModule, NzIconModule, NzCheckboxModule
  ],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss'
})
export class CategoryModalComponent implements OnInit {
  modalData = inject(NZ_MODAL_DATA);
  formControl = new FormControl(null, [Validators.required]);
  standardSizeControl = new FormControl(true);

  @ViewChild('uploader') uploader: ElementRef<HTMLInputElement>;
  imageChangedEvent: any;
  aspectRatio = AspectRatioTypes.SQUARE;
  uploadLoading: Subscription
  saveLoading: Subscription
  croppedImage = '';

  public get loading(): boolean {
    return (this.uploadLoading && !this.uploadLoading.closed) ||
      (this.saveLoading && !this.saveLoading.closed)
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
    // this.standardSizeControl.valueChanges.subscribe((flag: boolean) => {
    //   if (flag) this.aspectRatio = 1.14
    //   else this.aspectRatio = 0.75;
    // })
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  uploadFile(): void {
    /* todo: upload to s3 */
    const formData = new FormData();
    formData.append('file', this.croppedImage);
    formData.append('upload_preset', 'online_shop_preset');
    const req = new HttpRequest('POST', environment.UPLOAD_URL, formData)
    this.uploadLoading = this.http.request(req).subscribe((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (event.ok) {
          this.croppedImage = event.body.url
          if (this.modalData)
            this.editCategory_onConfirm()
          else this.addCategory_onConfirm()
        }
      }
    })
  }

  triggerFileInput() {
    this.uploader.nativeElement.click();
  }

  onBack() {
    this.formControl.reset()
    this.modalRef.close(false)
  }

  onSubmit() {
    if (this.croppedImage)
      this.uploadFile();
    else {
      if (this.modalData)
        this.editCategory_onConfirm()
      else this.addCategory_onConfirm()
    }
  }

  editCategory_onConfirm() {
    const model = {
      categoryId: this.modalData.categoryId,
      categoryName: this.formControl.value,
      imageUrl: this.croppedImage
    }
    this.saveLoading = this.adminApi.editCategory(model).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
      }
      this.modalRef.close(success)
    })
  }

  addCategory_onConfirm() {
    const model = {
      imageUrl: this.croppedImage,
      categoryName: this.formControl.value
    }
    this.saveLoading = this.adminApi.addCategory(model).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
      }
      this.modalRef.close(success)
    })
  }
}
