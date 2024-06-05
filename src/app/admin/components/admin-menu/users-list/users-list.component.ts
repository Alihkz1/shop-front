import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../shared/admin.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  constructor(private adminService:AdminService){}

  ngOnInit(): void {
      this.adminService.getUsers().subscribe()
  }
}
