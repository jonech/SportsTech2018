import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from 'primeng/dragdrop';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { HeaderComponent } from 'app/main/header/header.component';
import { DragDropComponent } from 'app/main/drag-drop/drap-drop.component';

@NgModule({
  declarations: [ HeaderComponent, DragDropComponent ],
  imports: [ CommonModule, DragDropModule, CardModule, ButtonModule ],
  exports: [ HeaderComponent, DragDropComponent ],
  providers: [],
})
export class MainModule {}
