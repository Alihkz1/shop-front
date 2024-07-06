import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { AdminApi } from '../../../admin/shared/admin.api';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TranslateModule } from "@ngx-translate/core";
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-change-password-modal',
  standalone: true,
  imports: [NzInputModule, ReactiveFormsModule, TranslateModule, NzButtonModule],
  templateUrl: './change-password-modal.component.html',
  styleUrl: './change-password-modal.component.scss'
})
export class ChangePasswordModalComponent {
  modalData = inject(NZ_MODAL_DATA);
  changePasswordControl = new FormControl()

  constructor(
    private adminApi: AdminApi,
    private modalRef: NzModalRef
  ) { }

  public onSubmit() {
    const model = {
      userId: this.modalData.userId,
      newPassword: this.changePasswordControl.value
    }
    this.adminApi.changePassword(model).subscribe(({ success }: any) => {
      this.modalRef.close(success)
    })
  }

  onBack() {
    this.modalRef.close(false)
  }
}
