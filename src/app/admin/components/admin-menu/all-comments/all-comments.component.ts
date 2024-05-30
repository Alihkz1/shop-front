import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../shared/admin.service';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrl: './all-comments.component.scss'
})
export class AllCommentsComponent implements OnInit {
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getComments()
  }

  getComments() {
    this.adminService.getComments().subscribe(({ data }: any) => {
      console.log(data.comments);
    })
  }

}
