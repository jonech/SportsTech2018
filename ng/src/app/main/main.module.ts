import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from 'primeng/dragdrop';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';

import { HeaderComponent } from 'app/main/header/header.component';
import { DragDropComponent } from 'app/main/drag-drop/drap-drop.component';
import { RankService } from './rank/rank.service';

@NgModule({
  declarations: [ HeaderComponent, DragDropComponent ],
  imports: [ CommonModule, DragDropModule, CardModule, ButtonModule, ChartModule ],
  exports: [ HeaderComponent, DragDropComponent ],
  providers: [RankService],
})
export class MainModule {}
