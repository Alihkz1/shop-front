import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RedZoomModule } from 'ngx-red-zoom';

@Component({
  standalone: true,
  imports: [RedZoomModule, CommonModule],
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  @Input() images: string[];
  currentImageIndex = 0;

  image_onClick(index: number) {
    this.currentImageIndex = index;
  }
}
