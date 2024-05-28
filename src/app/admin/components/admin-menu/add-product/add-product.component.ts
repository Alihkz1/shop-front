import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  form = new FormGroup({
    categories: new FormControl(),
    title: new FormControl()
  });
  categories: { value: any; label: string }[] = [
    {
      value: 's',
      label: 's',
    }
  ]
}
