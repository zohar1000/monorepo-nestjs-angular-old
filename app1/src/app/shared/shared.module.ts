import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const declarations = [
];

const imports = [
  // angular
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule
];

@NgModule({
  declarations,
  imports: [
    // HttpClientModule,
    // ...modules
  ],
  exports: [
    imports,
    ...declarations
  ]
})
export class SharedModule {}
