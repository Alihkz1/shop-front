import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminApi } from '../../shared/admin.api';
import { Subscription } from 'rxjs';
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from 'ng-zorro-antd/message';
import { ClientService } from '../../../shared/service/client.service';
import { ChangePasswordModalComponent } from '../../../shared/component/change-password-modal/change-password-modal.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.scss'
})
export class AdminProfileComponent implements OnInit {
  loading: Subscription;

  form = new FormGroup({
    name: new FormControl(),
    phone: new FormControl(),
    email: new FormControl({ value: null, disabled: true }),
    password: new FormControl(),
  })

  constructor(
    private adminApi: AdminApi,
    private client: ClientService,
    private message: NzMessageService,
    private translate: TranslateService,
    private modalService: NzModalService,
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    const { userId } = this.client.getUser.user;
    this.adminApi.getUser(userId).subscribe(({ data }: any) => {
      this.form.patchValue(data.user);
    })
  }

  onSubmit() {
    this.loading = this.adminApi.editUser({
      ...this.form.value,
      userId: this.client.getUser.user.userId
    })
      .subscribe(({ success }: any) => {
        if (success) {
          this.message.create('success', this.translate.instant('actionDone'));
          this.getData()
          this.updateName()
        }
      })
  }

  private updateName() {
    const user = this.client.getUser;
    user.user.name = this.form.value.name
    this.client.setUser = user;
  }

  openChangePasswordModal() {
    this.modalService.create({
      nzFooter: null,
      nzCentered: true,
      nzClosable: false,
      nzStyle: {
        width: "500px",
        borderRadius: "6px",
      },
      nzContent: ChangePasswordModalComponent,
      nzData: { userId: this.client.getUser.user.userId },
      nzOnOk: () => {
      },
    }).afterClose.subscribe((result: boolean) => {
      if (result) {
        this.message.create('success', this.translate.instant('actionDone'))
      }
    })
  }
}
