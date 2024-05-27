import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-routing',
  templateUrl: './admin-routing.component.html',
  styleUrl: './admin-routing.component.scss'
})
export class AdminRoutingComponent {

  constructor(private router: Router) { }

  logout_onClick() { }

  profile_onClick() {
    this.router.navigate(['/admin/profile']);
  }

}
