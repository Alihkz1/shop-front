import { Component, OnInit } from '@angular/core';
import { AdminApi } from '../../../shared/admin.api';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  constructor(private adminApi: AdminApi) { }

  ngOnInit(): void {
    this.adminApi.getUsers().subscribe()
  }
}
