import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../../shared/admin.service';
import { Subscription } from 'rxjs';
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from 'ng-zorro-antd/message';
import { ClientService } from '../../../shared/service/client.service';

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
    private message: NzMessageService,
    private adminService: AdminService,
    private translate: TranslateService,
    private client: ClientService,
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    const { userId } = this.client.getUser.user;
    this.adminService.getUser(userId).subscribe(({ data }: any) => {
      this.form.patchValue(data.user);
    })
  }

  onSubmit() {
    this.loading = this.adminService.editUser({
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

}
