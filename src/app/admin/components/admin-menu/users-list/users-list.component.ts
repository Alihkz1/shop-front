import { Component, OnInit } from '@angular/core';
import { AdminApi } from '../../../shared/admin.api';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../../shared/model/user.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { FormControl } from '@angular/forms';
import { Comment } from '../../../../shared/model/comment.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  changePasswordTranslate = 'رمز عبور جدید را وارد کنید'
  submitTranslate = 'ثبت'
  backTranslate = 'بازگشت'
  changePasswordControl = new FormControl()

  expandSet = new Set<number>();
  showChangePasswordModal = false;
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
    private message: NzMessageService,
    private translate: TranslateService,
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

  public deleteUser(user: User) {
    this.adminApi.deleteUser(user.userId).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
        this.getData()
      }
    })
  }

  public changePassword(user: User) {
    const model = {
      userId: user.userId,
      newPassword: this.changePasswordControl.value
    }
    this.adminApi.changePassword(model).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
        this.showChangePasswordModal = false;
      }
    })
  }

  public changePassModal_onClose() {
    this.changePasswordControl.reset()
  }
}
