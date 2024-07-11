import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { AdminApi } from '../../../admin/shared/admin.api';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-post-track-code-modal',
  standalone: true,
  imports: [NzInputModule, ReactiveFormsModule, TranslateModule, NzButtonModule],
  templateUrl: './post-track-code-modal.component.html',
  styleUrl: './post-track-code-modal.component.scss'
})
export class PostTrackCodeModalComponent {
  modalData = inject(NZ_MODAL_DATA);
  trackCodeControl = new FormControl()

  constructor(
    private adminApi: AdminApi,
    private modalRef: NzModalRef
  ) { }

  public onSubmit() {
    const model = {
      orderId: this.modalData.orderId,
      trackCode: this.trackCodeControl.value
    }
    this.adminApi.trackCode(model).subscribe(({ success }: any) => {
      this.modalRef.close(success)
    })
  }

  onBack() {
    this.modalRef.close(false)
  }
}
