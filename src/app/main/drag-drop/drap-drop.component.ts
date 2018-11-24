import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {

  attributes = ['Speed', 'Strength', 'Endurance', 'Height', 'Weight', 'Others'];
  selectedAttributes = [];

  draggedAttribute:string = null;

  constructor() { }

  ngOnInit(): void { }

  dragStart(event, attribute: string) {
    this.draggedAttribute = attribute;
  }

  dragEnd(event) {
    this.draggedAttribute = null;
  }

  drop(event) {
    if (this.draggedAttribute != null) {
      let draggedCarIndex = this.attributes.findIndex(p => p == this.draggedAttribute);
      this.selectedAttributes = [...this.selectedAttributes, this.draggedAttribute];
      this.attributes = this.attributes.filter((val,i) => i!=draggedCarIndex);
      this.draggedAttribute = null;
    }
  }
}
