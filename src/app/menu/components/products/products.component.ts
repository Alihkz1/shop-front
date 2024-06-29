import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Product } from '../../../shared/model/product.model';
import { ClientService } from '../../../shared/service/client.service';
import { AdminApi } from '../../../admin/shared/admin.api';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProductModalComponent } from '../../../shared/component/product-modal/product-modal.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private _products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public get products() { return this._products$.getValue() }
  dataLoading: Subscription;

  constructor(
    private router: Router,
    private menuApi: MenuApi,
    private location: Location,
    private adminApi: AdminApi,
    public client: ClientService,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private translate: TranslateService,
    private modalService: NzModalService,
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    const { categoryId } = this.route.snapshot.params;
    this.dataLoading = this.menuApi.getProducts(categoryId).subscribe(({ success, data }: any) => {
      if (success) {
        this._products$.next(data.products);
      }
    })
  }

  board_onClick(product: Product) {
    const { categoryId } = this.route.snapshot.params;
    this.router.navigate(['menu/products/' + categoryId + '/' + product.productId])
  }

  deleteProduct_onClick(product: Product) {
    this.adminApi.deleteProduct(product.productId).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
        this.getData();
      }
    })
  }

  editProduct_onClick(product: Product) {
    this.modalService.create({
      nzFooter: null,
      nzCentered: true,
      nzClosable: false,
      nzStyle: {
        width: "400px",
        borderRadius: "6px",
      },
      nzContent: ProductModalComponent,
      nzData: { product },
      nzOnOk: () => {
      },
    }).afterClose.subscribe((result: boolean) => {
      if (result) this.getData()
    })
  }

  back() { this.location.back() }

}
