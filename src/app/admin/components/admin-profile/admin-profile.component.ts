import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../../shared/admin.service';
import { Subscription } from 'rxjs';
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from 'ng-zorro-antd/message';

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
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    /* todo: get by real userId */
    this.adminService.getUser(1).subscribe(({ data }: any) => {
      this.form.patchValue(data.user);
    })
  }

  onSubmit() {
    this.loading = this.adminService.editUser({
      ...this.form.value,
      userId: 1
    })
      .subscribe(({ success }: any) => {
        if (success) {
          this.message.create('success', this.translate.instant('actionDone'));
          this.getData()
        }

      })
  }

}
