import { CommonModule } from '@angular/common';
import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';
import { environment } from '../../../../env/environment';
import { Subscription } from 'rxjs';
import { TranslateModule } from "@ngx-translate/core";

export enum aspectRatioTypes {
  SQUARE = 1 / 1,
  RECTANGLE = 16 / 9,
  LIKE_SQUARE = 4 / 3
}


@Component({
  standalone: true,
  imports: [ImageCropperModule, NzCheckboxModule, NzButtonModule, CommonModule, FormsModule, TranslateModule],
  selector: 'app-image-cropper-modal',
  templateUrl: './image-cropper-modal.component.html',
  styleUrls: ['./image-cropper-modal.component.scss']
})
export class ImageCropperModalComponent {
  modalData = inject(NZ_MODAL_DATA);
  croppedImage: string | null = null;
  aspectRatio = aspectRatioTypes.RECTANGLE;
  checkBoxOne = false;
  checkBoxTwo = false;
  checkBoxThree = true;
  uploadLoading: Subscription;

  constructor(
    private modalRef: NzModalRef,
    private http: HttpClient
  ) { }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  close(success: boolean) {
    if (!success) {
      this.modalRef.close({ success })
    } else this.uploadFile(this.croppedImage)
  }

  uploadFile(file: string): void {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'online_shop_preset');
    const req = new HttpRequest('POST', environment.UPLOAD_URL, formData)
    this.uploadLoading = this.http.request(req).subscribe((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (event.ok) {
          this.modalRef.close({
            success: true,
            uploadedImgUrl: event.body.url
          })
        }
      }
    })
  }

  aspectRatio_onChange(event: boolean, index: number) {
    if (event === false) return;
    if (index === 0) {
      this.aspectRatio = aspectRatioTypes.SQUARE
      this.checkBoxTwo = false
      this.checkBoxThree = false
    }
    else if (index === 1) {
      this.aspectRatio = aspectRatioTypes.LIKE_SQUARE
      this.checkBoxOne = false
      this.checkBoxThree = false
    }
    else if (index === 2) {
      this.aspectRatio = aspectRatioTypes.RECTANGLE
      this.checkBoxOne = false
      this.checkBoxTwo = false
    }

  }
}
