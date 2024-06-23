import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from 'ng-zorro-antd/message';
import { MenuApi } from '../../shared/menu.api';
import { ClientService } from '../../../shared/service/client.service';
import { ChangePasswordModalComponent } from '../../../shared/component/change-password-modal/change-password-modal.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrl: './menu-profile.component.scss'
})
export class MenuProfileComponent implements OnInit {
  loading: Subscription;

  form = new FormGroup({
    name: new FormControl(),
    phone: new FormControl(),
    email: new FormControl({ value: null, disabled: true }),
    password: new FormControl(),
  })

  constructor(
    private menuApi: MenuApi,
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
    this.menuApi.getUser(userId).subscribe(({ data }: any) => {
      this.form.patchValue(data.user);
    })
  }

  onSubmit() {
    this.loading = this.menuApi.editUser({
      ...this.form.value,
      userId: this.client.getUser.user.userId
    })
      .subscribe(({ success }: any) => {
        if (success) {
          this.message.create('success', this.translate.instant('actionDone'));
          this.getData()
        }
      })
  }

  openChangePasswordModal() {
    this.modalService.create({
      nzFooter: null,
      nzCentered: true,
      nzClosable: false,
      nzStyle: {
        width: "400px",
        borderRadius: "6px",
      },
      nzContent: ChangePasswordModalComponent,
      nzData: { userId: this.client.getUser.user.userId },
      nzOnOk: () => {
      },
    }).afterClose.subscribe((result: boolean) => {
      if (result) this.message.create('success', this.translate.instant('actionDone'))
    })
  }
}
