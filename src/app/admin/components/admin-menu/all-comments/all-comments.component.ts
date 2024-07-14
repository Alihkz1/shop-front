import { Component, OnInit } from '@angular/core';
import { AdminApi } from '../../../shared/admin.api';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { Comment } from '../../../../shared/model/comment.model';
import { DatePipe } from '@angular/common';
import moment from 'jalali-moment';
@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrl: './all-comments.component.scss'
})
export class AllCommentsComponent implements OnInit {
  private _comments$ = new BehaviorSubject<any[]>([]);
  public get comments() { return this._comments$.getValue() }
  dataLoading: Subscription;

  constructor(
    private adminApi: AdminApi,
    private message: NzMessageService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getComments()
  }

  getComments() {
   this.dataLoading =  this.adminApi.getComments().subscribe(({ data }: any) => {
      const list = data.comments.map((row: any) => {
        return {
          ...row,
          comment: {
            ...row.comment,
            date: moment(new Date(row.comment.date)).locale('fa').format('HH:mm:ss YYYY/MM/DD'),
          }
        }
      })
      this._comments$.next(list);
    })
  }

  deleteComment(commentId: number) {
    this.adminApi.deleteComment(commentId).subscribe(({ success }: any) => {
      if (success) {
        this.getComments()
        this.message.create('success', this.translate.instant('actionDone'))
      }
    })
  }

  read_onChange(flag: boolean, comment: Comment) {
    this.adminApi.editComment(
      {
        commentId: comment.commentId,
        read: flag
      }
    ).subscribe(({ success }: any) => {
      if (success) {
        // this.getComments()
      }
    })
  }
}
