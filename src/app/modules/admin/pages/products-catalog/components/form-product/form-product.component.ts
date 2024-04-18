import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css'],
})
export class FormProductComponent implements OnInit {
  public formProduct = new FormGroup({
    key: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.mapData();
  }

  mapData() {
    if (this.data) {
      this.formProduct.patchValue(this.data);
    }
  }

  createProduct() {
    this.dialogRef.close(this.formProduct.value);
    this.data = null;
  }
}
