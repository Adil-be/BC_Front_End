import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ItemComponent],
  imports: [CommonModule, SharedModule],
  bootstrap: [ItemComponent],
})
export class ItemModule {}
