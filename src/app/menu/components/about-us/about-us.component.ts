import { Component } from '@angular/core';
import { MenuService } from '../../shared/menu.service';
import { ClientService } from '../../../shared/service/client.service';
import { FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  submitLoading:Subscription;
  message = new FormControl();

  constructor(
    private menuService: MenuService,
    private client: ClientService,
    private translate: TranslateService,
    private messageService: NzMessageService,
  ) { }

  submit_onClick() {
    // const { userId } = this.client.getUser;
    /* todo: getUserId */
    this.submitLoading = this.menuService.addComment({ userId: 1, message: this.message.value }).subscribe(({ success }: any) => {
      if (success) {
        this.messageService.create('success', this.translate.instant('actionDone'))
        this.message.reset()
      }
      else this.messageService.create('error', this.translate.instant('error'))
    })
  }
}
