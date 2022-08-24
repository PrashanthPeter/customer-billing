import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  showModal = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleItemModal(){
    this.showModal = !this.showModal;
  }

}
