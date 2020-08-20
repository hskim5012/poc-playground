import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { DownloadButtonSecondaryComponent } from './components/download-button-secondary/download-button-secondary.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavbarComponent, DownloadButtonSecondaryComponent],
  imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
  exports: [NavbarComponent, DownloadButtonSecondaryComponent]
})
export class CoreModule {}
