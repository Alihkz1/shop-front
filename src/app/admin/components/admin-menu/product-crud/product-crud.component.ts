import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../shared/model/category.model';
import { AdminApi } from '../../../shared/admin.api';
import { ValidImageUploaded } from '../../../../shared/function/image-upload.function';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { NzModalService } from 'ng-zorro-antd/modal';
import { ImageCropperModalComponent } from '../../../../shared/component/image-cropper-modal/image-cropper-modal.component';
import { tinyConfig } from './tiny-mce.config';
import { Subscription } from 'rxjs';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Size } from '../../../../shared/model/size.model';
import { ProductDto } from '../../../../shared/model/product-dto.model';
import { NumberToCurrency } from '../../../../shared/function/currency-format.functions';
import { CarouselConfig } from '../../../../shared/component/carousel/carousel.component';
import { About } from '../../../../shared/model/about.model';
import { Color } from '../../../../shared/model/color.model';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrl: './product-crud.component.scss'
})
export class ProductCrudComponent implements OnInit {
  @ViewChild('uploader') uploader: ElementRef<HTMLInputElement>;

  form = new FormGroup({
    categoryId: new FormControl(null, Validators.required),
    title: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    amount: new FormControl(0),
    description: new FormControl(null),
    productId: new FormControl(null),
    size: new FormArray([]),
    color: new FormArray([]),
    about: new FormArray([]),
  });

  tabIndex = 0;
  categories: Category[] = []
  uploadedImages: string[] = []
  primaryImageIndex: number = 0;

  tinyConfig = tinyConfig;
  tinyApi = "odyo8qga6y1ngqxgw8nognasxojsxnoy54l3gp7iznyi269e";

  carouselStyleConfig: CarouselConfig = {
    width: '350px',
    height: '300px',
    imageWidth: ''
  }

  sizingCheckbox = new FormControl(false);
  public get hasSizing(): boolean { return this.sizingCheckbox.value }


  colorCheckbox = new FormControl(false);
  public get hasColor(): boolean { return this.colorCheckbox.value }

  dataLoading: Subscription;
  saveLoading: Subscription;

  public sizeByIndex(i: number) { return this.form.controls['size'].controls[i].value; }
  public aboutByIndex(i: number) { return this.form.controls['about'].controls[i].value; }
  public colorByIndex(i: number) { return this.form.controls['color'].controls[i].value; }
  public get getSizes() { return this.form.controls['size'] as FormArray; }
  public get getAbout() { return this.form.controls['about'] as FormArray; }
  public get getColor() { return this.form.controls['color'] as FormArray; }
  public getFormArrayItemValue(): any[] { return this.getSizes.value; }
  public getAboutFormArrayItemValue(): any[] { return this.getAbout.value; }
  public getColorFormArrayItemValue(): any[] { return this.getColor.value; }

  public deleteSizeRow_onClick(i: number) {
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

  public deleteColorRow_onClick(i: number) {
    if (this.colorByIndex(i).id)
      this.adminApi.deleteColor(this.colorByIndex(i).id).subscribe(({ success }: any) => {
        if (success) {
          const items = this.form.controls['color'] as FormArray;
          items.removeAt(i);
        }
      })
    else {
      const items = this.form.controls['color'] as FormArray;
      items.removeAt(i);
    }
  }

  constructor(
    private router: Router,
    private adminApi: AdminApi,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private modalService: NzModalService,
    private translate: TranslateService
  ) { }

  public addSizeRow_onClick() {
    const items = this.form.controls['size'] as FormArray;
    items.push(new FormControl({ size: '', amount: 0, id: null, productId: null }));
  }

  public addColorRow_onClick() {
    const items = this.form.controls['color'] as FormArray;
    items.push(new FormControl({ color: '', id: null, productId: null }));
  }

  ngOnInit(): void {
    const { productId } = this.route.snapshot.queryParams;
    if (productId) this.getData()
    this.getCategories();
  }

  private getData() {
    const { productId } = this.route.snapshot.queryParams;
    this.dataLoading = this.adminApi.getProductRetrieve(productId).subscribe(({ success, data }: any) => {
      if (!success) return;
      const product: ProductDto | any = data.product;
      this.primaryImageIndex = product.product.primaryImageIndex;
      product.product.price = NumberToCurrency(product.product.price)
      this.form.patchValue(product.product)
      this.uploadedImages = JSON.parse(product.product.imageUrl);
      if (product.productSize.length) {
        this.sizingCheckbox.setValue(true)
        product.productSize.forEach((item: Size) => {
          this.fillForm(item)
        })
      }
      if (product.productAbout.length) {
        product.productAbout.forEach((item: About) => {
          this.fillAboutForm(item)
        })
      }
      if (product.productColor.length) {
        this.colorCheckbox.setValue(true)
        product.productColor.forEach((item: Color) => {
          this.fillColorForm(item)
        })
      }
    })
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

  public fillAboutForm(newItem: About): void {
    const formArrayValue = this.form.controls['about'] as FormArray;
    formArrayValue.push(
      new FormBuilder().group({
        id: newItem.id,
        key: newItem.key,
        value: newItem.value,
        productId: newItem.productId,
      })
    );
  }


  public fillColorForm(newItem: Color): void {
    const formArrayValue = this.form.controls['color'] as FormArray;
    formArrayValue.push(
      new FormBuilder().group({
        id: newItem.id,
        color: newItem.color,
        productId: newItem.productId,
      })
    );
  }

  getCategories() {
    this.adminApi.getCategoriesLight().subscribe(({ data }: any) => {
      this.categories = data.categories;
    })
  }

  triggerFileInput() {
    this.uploader.nativeElement.click();
  }

  image_onSelect(event: any) {
    const file: File = event.target.files[0];
    if (file && ValidImageUploaded(file)) {
      this.openImageCropperModal(event, file);
    } else this.message.create('error', this.translate.instant('onlyImageAccepted'))
  }

  openImageCropperModal(event: Event, file: File) {
    this.modalService.create({
      nzFooter: null,
      nzCentered: true,
      nzClosable: false,
      nzStyle: {
        width: "500px",
        borderRadius: "6px",
      },
      nzContent: ImageCropperModalComponent,
      nzData: { event, file },
    }).afterClose.subscribe((result: { success: boolean; uploadedImgUrl: string }) => {
      if (result?.success) {
        this.uploadedImages.push(result.uploadedImgUrl)
        this.cdr.detectChanges()
      }
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.message.create('error', this.translate.instant('fillRequiredFields'))
      return
    }
    const sizeArr = this.form.value.size
      .filter((el: any) => el != null)
      .filter((el: any) => el.size != '' && el.amount > 0);
    const aboutArr = this.form.value.about
      .filter((el: any) => el != null)
      .filter((el: any) => el.key != '' && el.value != '');
    const colorArr = this.form.value.color
      .filter((el: any) => el.color)
    const model = {
      ...this.form.value,
      price: +this.form.value.price?.replaceAll(',', ''),
      imageUrl: JSON.stringify(this.uploadedImages),
      size: JSON.stringify(sizeArr),
      about: JSON.stringify(aboutArr),
      color: JSON.stringify(colorArr),
      amount: sizeArr.length > 0 ? 0 : this.form.value.amount,
      primaryImageIndex: this.primaryImageIndex
    }
    if (this.form.value['productId'])
      this.editProduct_onConfirm(model)
    else this.addProduct_onConfirm(model)
  }

  editProduct_onConfirm(model: any) {
    this.saveLoading = this.adminApi.editProduct(model).subscribe(({ success }: any) => {
      if (success) {
        this.resetAfterSubmit()
      }
    });
  }

  addProduct_onConfirm(model: any) {
    this.saveLoading = this.adminApi.addProduct(model).subscribe(({ success }: any) => {
      if (success) {
        this.resetAfterSubmit()
      }
    });
  }

  private resetAfterSubmit() {
    const { productId } = this.route.snapshot.queryParams;
    if (productId) {
      this.router.navigate([], {
        queryParams: null
      })
    }
    this.tabIndex = 0;
    this.primaryImageIndex = 0;
    this.form.reset()
    this.uploadedImages = []
    this.message.create('success', this.translate.instant('actionDone'))
  }

  tabIndex_onChange(event: NzTabChangeEvent) {
    this.tabIndex = event.index;
  }

  deleteImage_onClick(event: string) {
    this.uploadedImages = this.uploadedImages.filter((image: string) => image != event);
  }

  primaryIndex_onChange(index: number) {
    this.primaryImageIndex = index;
  }

  public addPropertyRow_onClick() {
    const items = this.form.controls['about'] as FormArray;
    items.push(new FormControl({ key: '', value: '', id: null, productId: null }));
  }

  public deleteAboutRow_onClick(i: number) {
    if (this.aboutByIndex(i).id)
      this.adminApi.deleteAbout(this.aboutByIndex(i).id).subscribe(({ success }: any) => {
        if (success) {
          const items = this.form.controls['about'] as FormArray;
          items.removeAt(i);
        }
      })
    else {
      const items = this.form.controls['about'] as FormArray;
      items.removeAt(i);
    }
  }

}

