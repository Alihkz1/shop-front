import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.scss'
})
export class AdminMenuComponent {

  constructor(private router: Router) { }

  addProduct_onClick() { 
    this.router.navigate(['/admin/add-product'])
  }

  usersList_onClick() { 
    this.router.navigate(['/admin/users-list'])
  }

}
