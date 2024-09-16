import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';
import { TranslateModule } from "@ngx-translate/core";
import { MenuApi } from '../../../menu/shared/menu.api';

export enum AspectRatioTypes {
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
  croppedImage: ImageCroppedEvent | null = null;
  aspectRatio = AspectRatioTypes.SQUARE;
  checkBoxOne = true;
  checkBoxTwo = false;
  checkBoxThree = false;
  uploadLoading: Subscription;

  constructor(
    private modalRef: NzModalRef,
    private menuApi: MenuApi
  ) { }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event;
  }

  close(success: boolean) {
    if (!success) {
      this.modalRef.close({ success })
    } else this.uploadFile()
  }

  base64ToFile(base64: string): File {
    const [header, data] = base64.split(',');
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(data);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new File([new Uint8Array(array)], this.modalData.file.name, { type: mime });
  }


  uploadFile(): void {
    const file = this.base64ToFile(this.croppedImage.base64);
    const formData = new FormData();
    formData.append('file', file);
    this.uploadLoading = this.menuApi.uploadFile(formData)
      .subscribe(({ success, data }: any) => {
        if (success) {
          this.modalRef.close({
            success: true,
            uploadedImgUrl: data
          })
        }
      })
  }

  aspectRatio_onChange(event: boolean, index: number) {
    if (event === false) return;
    if (index === 0) {
      this.aspectRatio = AspectRatioTypes.SQUARE
      this.checkBoxTwo = false
      this.checkBoxThree = false
    }
    else if (index === 1) {
      this.aspectRatio = AspectRatioTypes.LIKE_SQUARE
      this.checkBoxOne = false
      this.checkBoxThree = false
    }
    else if (index === 2) {
      this.aspectRatio = AspectRatioTypes.RECTANGLE
      this.checkBoxOne = false
      this.checkBoxTwo = false
    }
  }
}
