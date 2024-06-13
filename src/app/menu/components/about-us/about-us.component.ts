import { Component } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ClientService } from '../../../shared/service/client.service';
import { FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  submitLoading: Subscription;
  message = new FormControl('', Validators.required);

  constructor(
    private client: ClientService,
    private menuApi: MenuApi,
    private translate: TranslateService,
    private messageService: NzMessageService,
  ) { }

  submit_onClick() {
    let userId = null;
    if (this.client.isLogin)
      userId = this.client.getUser.user.userId;
    this.submitLoading = this.menuApi.addComment({ userId, message: this.message.value }).subscribe(({ success }: any) => {
      if (success) {
        this.messageService.create('success', this.translate.instant('actionDone'))
        this.message.reset()
      }
    })
  }
}
