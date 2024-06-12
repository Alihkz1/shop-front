import { Component, OnInit } from '@angular/core';
import { AdminApi } from '../../../shared/admin.api';
import { BehaviorSubject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { Comment } from '../../../../shared/model/comment.model';
@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrl: './all-comments.component.scss'
})
export class AllCommentsComponent implements OnInit {
  private _comments$ = new BehaviorSubject<any[]>([]);
  public get comments() { return this._comments$.getValue() }

  constructor(
    private adminApi: AdminApi,
    private message: NzMessageService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getComments()
  }

  getComments() {
    this.adminApi.getComments().subscribe(({ data }: any) => {
      this._comments$.next(data.comments);
    })
  }

  deleteComment(commentId: number) {
    this.adminApi.deleteComment(commentId).subscribe(({ success }: any) => {
      if (success) {
        this.getComments()
        this.message.create('success', this.translate.instant('actionDone'))
      } else this.message.create('error', this.translate.instant('error'))
    })
  }

  read_onChange(flag: boolean, comment: Comment) {
    this.adminApi.editComment(
      {
        commentId: comment.commentId,
        read: flag
      }
    ).subscribe(() => {
      this.getComments()
    })
  }
}
