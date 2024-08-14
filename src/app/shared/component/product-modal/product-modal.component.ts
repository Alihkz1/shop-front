import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { TranslateModule } from "@ngx-translate/core";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AdminApi } from '../../../admin/shared/admin.api';
import { Category } from '../../model/category.model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { PriceFormatDirective } from '../../../menu/shared/directive/price-format.directive';
import { NumberToCurrency } from '../../function/currency-format.functions';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CommonModule } from '@angular/common';
import { Size } from '../../model/size.model';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, FormsModule, NzCheckboxModule, ImageCropperModule,
    PriceFormatDirective, TranslateModule, NzSelectModule,
    NzInputModule, NzButtonModule, NzIconModule
  ],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent implements OnInit {
  /** @description  no image and no description in this modal**/
  @ViewChild('uploader') uploader: ElementRef<HTMLInputElement>;
  modalData = inject(NZ_MODAL_DATA);
  categories: Category[] = []
  saveLoading: Subscription
  standardSizeControl = new FormControl(true);
  showAmountField = true
  croppedImage: string | null = null;
  sizingCheckbox = new FormControl(false);
  public get hasSizing(): boolean { return this.sizingCheckbox.value }

  form = new FormGroup({
    categoryId: new FormControl({ value: null, disabled: true }, Validators.required),
    title: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    amount: new FormControl(null, Validators.required),
    productId: new FormControl(null, Validators.required),
    size: new FormArray([])
  });

  public get getSizes() { return this.form.controls['size'] as FormArray; }

  public sizeByIndex(i: number) { return this.form.controls['size'].controls[i].value; }

  public addRow_onClick() {
    const items = this.form.controls['size'] as FormArray;
    items.push(new FormControl({ size: '', amount: '', id: null, productId: null }));
  }

  public deleteRow_onClick(i: number) {
    if (this.sizeByIndex(i).id)
      this.adminApi.deleteSize(this.sizeByIndex(i).id).subscribe(({ success }: any) => {
        if (success) {
          const items = this.form.controls['size'] as FormArray;
          items.removeAt(i);
        }
      })
    else {
      const items = this.form.controls['size'] as FormArray;
      items.removeAt(i);
    }
  }

  public getFormArrayItemValue(): any[] {
    return this.getSizes.value;
  }

  constructor(
    private adminApi: AdminApi,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.sizingCheckbox.valueChanges.subscribe((flag: boolean) => {
      this.showAmountField = !flag;
    })

    if (this.modalData.product) {
      if (this.modalData.product.productSize.length) {
        this.sizingCheckbox.setValue(true)
        this.modalData.product.productSize.forEach((item: Size) => {
          this.fillForm(item)
        })
      }
      const model = {
        ...this.modalData.product.product,
        price: NumberToCurrency(this.modalData.product.product.price),
        size: null
      }
      this.form.patchValue(model)
    }

    this.getCategories()
  }

  public fillForm(newItem: Size): void {
    const formArrayValue = this.form.controls['size'] as FormArray;
    formArrayValue.push(
      new FormBuilder().group({
        id: newItem.id,
        size: newItem.size,
        amount: newItem.amount,
        productId: newItem.productId,
      })
    );
  }

  getCategories() {
    this.adminApi.getCategoriesLight().subscribe(({ data }: any) => {
      this.categories = data.categories;
      this.form.get('categoryId')?.setValue(this.modalData.category?.categoryId || this.modalData.product?.product?.categoryId);
    })
  }

  onBack() {
    this.form.reset()
    this.modalRef.close(false)
  }

  onSubmit() {
    const sizeArr = this.form.value.size.filter((el: Size) => el.size && el.amount);
    const model = {
      ...this.form.value,
      price: +this.form.value.price.replaceAll(',', ''),
      size: JSON.stringify(sizeArr),
      amount: sizeArr.length > 0 ? 0 : this.form.value.amount
    }
    if (this.modalData.product)
      this.editProduct_onConfirm(model)
    else this.addProduct_onConfirm(model)
  }

  editProduct_onConfirm(model: any) {
    this.saveLoading = this.adminApi.editProduct(model).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
      }
      this.modalRef.close(success)
    });
  }

  addProduct_onConfirm(model: any) {
    model = {
      ...model,
      categoryId: this.form.get('categoryId')?.value
    }
    this.saveLoading = this.adminApi.addProduct(model).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
      }
      this.modalRef.close(success)
    });
  }
}
