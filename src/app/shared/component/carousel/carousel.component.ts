import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { CarouselModule } from 'primeng/carousel';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { TranslateModule } from "@ngx-translate/core";

export interface CarouselConfig { height: string, width: string; imageWidth: string }
@Component({
  standalone: true,
  imports: [CarouselModule, NzPopconfirmModule, NzIconModule, NzButtonModule, NzCheckboxModule, TranslateModule],
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  @Input() styleConfig: CarouselConfig = null;
  @Input() images: string[] = [];
  @Input() showActions = false;
  @Input() primaryImageIndex: number;
  @Output() deleteImage = new EventEmitter();
  @Output() primaryChange = new EventEmitter();

  responsiveOptions: any[] = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(private cdr: ChangeDetectorRef) { }

  public getIndex(image: string) {
    return this.images.findIndex((el) => el === image);
  }

  primary_onChange(image: string, changeFlag: boolean) {
    if (changeFlag) {
      this.primaryChange.emit(this.getIndex(image))
      this.cdr.detectChanges()
    }
  }
}
