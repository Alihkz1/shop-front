import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../shared/admin.service';
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
    private message: NzMessageService,
    private adminService: AdminService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getComments()
  }

  getComments() {
    this.adminService.getComments().subscribe(({ data }: any) => {
      this._comments$.next(data.comments);
    })
  }

  deleteComment(commentId: number) {
    this.adminService.deleteComment(commentId).subscribe(({ success }: any) => {
      if (success) {
        this.getComments()
        this.message.create('success', this.translate.instant('actionDone'))
      } else this.message.create('error', this.translate.instant('error'))
    })
  }

  read_onChange(flag: boolean, comment: Comment) {
    this.adminService.editComment(
      {
        commentId: comment.commentId,
        read: flag
      }
    ).subscribe()
  }
}
