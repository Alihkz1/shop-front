import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ClientService } from '../../../shared/service/client.service';

@Component({
  selector: 'app-saved-products',
  templateUrl: './saved-products.component.html',
  styleUrl: './saved-products.component.scss'
})
export class SavedProductsComponent implements OnInit {

  constructor(
    private client: ClientService,
    private menuApi: MenuApi
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  private getData() {
    const { userId } = this.client.getUser.user;
    this.menuApi.getSaveds(userId).subscribe()
  }

}
