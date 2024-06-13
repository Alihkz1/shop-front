import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../../../shared/model/category.model';
import { Router } from '@angular/router';
import { ClientService } from '../../../shared/service/client.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CategoryModalComponent } from '../../../shared/component/category-modal/category-modal.component';
import { AdminApi } from '../../../admin/shared/admin.api';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private _categories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  public get categories() { return this._categories$.getValue() }

  constructor(
    private modalService: NzModalService,
    private translate: TranslateService,
    private message: NzMessageService,
    public client: ClientService,
    private adminApi: AdminApi,
    private menuApi: MenuApi,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.menuApi.getCategories().subscribe(({ success, data }: any) => {
      if (success) {
        this._categories$.next(data.categories);
      }
    })
  }

  board_onClick(category: Category) {
    this.router.navigate(['menu/products/', category.categoryId])
  }

  openCategoryModal(category: Category) {
    this.modalService.create({
      nzFooter: null,
      nzCentered: true,
      nzClosable: false,
      nzStyle: {
        width: "400px",
        borderRadius: "6px",
      },
      nzContent: CategoryModalComponent,
      nzData: category,
      nzOnOk: () => {
      },
    }).afterClose.subscribe((result: boolean) => {
      if (result) this.getData()
    })
  }

  deleteCategory_onConfirm(category: any) {
    this.adminApi.deleteCategory(category.categoryId).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
        this.getData()
      }
    })
  }
}
