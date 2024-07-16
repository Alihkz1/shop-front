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
import { ActivatedRoute } from '@angular/router';
import { Size } from '../../../../shared/model/size.model';
import { ProductDto } from '../../../../shared/model/product-dto.model';
import { NumberToCurrency } from '../../../../shared/function/currency-format.functions';
import { CarouselConfig } from '../../../../shared/component/carousel/carousel.component';

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
    amount: new FormControl(null),
    description: new FormControl(null),
    productId: new FormControl(null),
    size: new FormArray([])
  });

  tabIndex = 0;
  categories: Category[] = []
  uploadedImages: string[] = []

  tinyConfig = tinyConfig;
  tinyApi = "re8awji0y3nq8ddyftc9xgjjy4f9tjsyjc7303jaz6ok0196";

  carouselStyleConfig: CarouselConfig = {
    width: '350px',
    height: '300px',
    imageWidth: ''
  }

  sizingCheckbox = new FormControl(false);
  public get hasSizing(): boolean { return this.sizingCheckbox.value }

  dataLoading: Subscription;
  saveLoading: Subscription;

  public sizeByIndex(i: number) { return this.form.controls['size'].controls[i].value; }
  public get getSizes() { return this.form.controls['size'] as FormArray; }
  public getFormArrayItemValue(): any[] { return this.getSizes.value; }

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

  constructor(
    private adminApi: AdminApi,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private modalService: NzModalService,
    private translate: TranslateService
  ) { }

  public addRow_onClick() {
    const items = this.form.controls['size'] as FormArray;
    items.push(new FormControl({ size: '', amount: '', id: null, productId: null }));
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
      product.product.price = NumberToCurrency(product.product.price)
      this.form.patchValue(product.product)
      this.uploadedImages = JSON.parse(product.product.imageUrl);
      if (product.productSize.length) {
        this.sizingCheckbox.setValue(true)
        product.productSize.forEach((item: Size) => {
          this.fillForm(item)
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
      this.openImageCropperModal(event);
    } else this.message.create('error', this.translate.instant('onlyImageAccepted'))
  }

  openImageCropperModal(nzData: Event) {
    this.modalService.create({
      nzFooter: null,
      nzCentered: true,
      nzClosable: false,
      nzStyle: {
        width: "500px",
        borderRadius: "6px",
      },
      nzContent: ImageCropperModalComponent,
      nzData,
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
    const sizeArr = this.form.value.size;
    const model = {
      ...this.form.value,
      price: +this.form.value.price?.replaceAll(',', ''),
      imageUrl: JSON.stringify(this.uploadedImages),
      size: JSON.stringify(sizeArr),
      amount: sizeArr.length > 0 ? 0 : this.form.value.amount
    }
    if (this.form.value['productId'])
      this.editProduct_onConfirm(model)
    else
      this.addProduct_onConfirm(model)
  }

  editProduct_onConfirm(model: any) {
    this.saveLoading = this.adminApi.editProduct(model).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
      }
    });
  }

  addProduct_onConfirm(model: any) {
    this.saveLoading = this.adminApi.addProduct(model).subscribe(({ success }: any) => {
      if (success) {
        this.form.reset()
        this.uploadedImages = []
        this.message.create('success', this.translate.instant('actionDone'))
      }
    });
  }

  tabIndex_onChange(event: NzTabChangeEvent) {
    this.tabIndex = event.index;
  }

  deleteImage_onClick(event: string) {
    this.uploadedImages = this.uploadedImages.filter((image: string) => image != event);
  }
}

