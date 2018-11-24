import { Component, OnInit } from '@angular/core';
import { RankService } from '../rank/rank.service';

@Component({
  selector: 'drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {

  attributes = ['Speed', 'Strength', 'Endurance', 'Height', 'Weight', 'Others'];
  selectedAttributes = [];

  draggedAttribute:string = null;

  constructor(private rank: RankService) { }

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

  reorder(attribute: string, increment: number) {
    let attrIndex = this.attributes.findIndex(p => p == attribute);

    let newIndex = attrIndex + increment;
    if (newIndex < 0 || newIndex >= this.attributes.length ) {
      return;
    }
    this.array_move(this.attributes, attrIndex, newIndex);
    //this.selectedAttributes.
  }


  array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
  }

  find() {
    this.rank.readCSVData();
  }
}
