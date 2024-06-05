import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../shared/menu.service';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../../../shared/model/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private _categories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  public get categories() { return this._categories$.getValue() }

  constructor(
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.menuService.getCategories().subscribe(({ success, data }: any) => {
      if (success) {
        this._categories$.next(data.categories);
      }
    })
  }

  board_onClick(category: Category) {
    this.router.navigate(['menu/products/' + category.categoryId])
  }
}
