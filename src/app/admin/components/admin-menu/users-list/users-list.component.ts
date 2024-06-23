import { Component, OnInit } from '@angular/core';
import { AdminApi } from '../../../shared/admin.api';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../../shared/model/user.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { Comment } from '../../../../shared/model/comment.model';
import { ClientService } from '../../../../shared/service/client.service';
import { ChangePasswordModalComponent } from '../../../../shared/component/change-password-modal/change-password-modal.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  changePasswordTranslate = 'رمز عبور جدید را وارد کنید'
  submitTranslate = 'ثبت'
  backTranslate = 'بازگشت'

  expandSet = new Set<number>();
  private _users$ = new BehaviorSubject<User[]>([]);
  public get users(): User[] {
    return this._users$.getValue();
  }
  private _userComments$ = new BehaviorSubject<Comment[]>([]);
  public get userComments(): Comment[] {
    return this._userComments$.getValue();
  }

  constructor(
    private adminApi: AdminApi,
    public client: ClientService,
    private message: NzMessageService,
    private translate: TranslateService,
    private modalService: NzModalService,
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  onExpandChange(userId: number, checked: boolean): void {
    if (checked) {
      this.getExpandData(userId);
      this.expandSet.add(userId);
    } else {
      this.expandSet.delete(userId);
    }
  }

  private getExpandData(userId: number) {
    /* todo: get Orders */
    this.adminApi.getUserComments(userId).subscribe(({ data }: any) => {
      this._userComments$.next(data.userComments)
    })
  }

  public getData() {
    this.adminApi.getUsers().subscribe(({ data }: any) => {
      this._users$.next(data.users)
    })
  }

  public deleteUser(userId: number) {
    this.adminApi.deleteUser(userId).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
        this.getData()
      }
    })
  }

  openChangePasswordModal(user: User) {
    this.modalService.create({
      nzFooter: null,
      nzCentered: true,
      nzClosable: false,
      nzStyle: {
        width: "400px",
        borderRadius: "6px",
      },
      nzContent: ChangePasswordModalComponent,
      nzData: { userId: user.userId },
      nzOnOk: () => {
      },
    }).afterClose.subscribe((result: boolean) => {
      if (result) this.message.create('success', this.translate.instant('actionDone'))
    })
  }
}
