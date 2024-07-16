import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { CarouselModule } from 'primeng/carousel';

export interface CarouselConfig { height: string, width: string; imageWidth: string }
@Component({
  standalone: true,
  imports: [CarouselModule, NzPopconfirmModule, NzIconModule, NzButtonModule],
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  @Input() styleConfig: CarouselConfig = null;
  @Input() images: string[] = [];
  @Input() showActions = false;
  @Output() deleteImage = new EventEmitter();

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
}
