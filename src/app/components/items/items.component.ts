

import { Component, OnInit } from '@angular/core';
import { ItemsDataService } from 'src/app/services/items/items-data.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Items } from '../../models/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
items: Items[] = [];

itemsForm: FormGroup;
name: FormControl;
code: FormControl;
price: FormControl;

  constructor(
    private itemsService: ItemsDataService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.itemsForm = this.fb.group({
    name: this.name,
    code: this. code,
    price: this.price,

    });
    this.getItems();
  }

  getItems() {
    this.itemsService.getItems().subscribe((data) =>{
      this.items = data;
    });
  }


  addItems() {
    debugger
    if (this.itemsForm.valid) {
      let formValue = this.itemsForm.value;
      let items = new  Items();
      items.name = formValue.name;
      items.code = formValue.code;
      items.price = parseInt(formValue.price);
      this.itemsService.createItems(items).subscribe((data) =>{
        this.itemsForm.reset();
        this.getItems();
      })

    }
  }
}
