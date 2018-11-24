import { Component, OnInit } from '@angular/core';
import { RankService } from '../rank/rank.service';
import * as Papa from 'papaparse';
import { Player } from './player.model';

@Component({
  selector: 'drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {
  private readonly CSV_URL: string = 'https://raw.githubusercontent.com/jonech/SportsTech2018/master/csv/MOCK_DATA.csv';

  attributes = ['Speed', 'Strength', 'Endurance', 'Height', 'Weight', 'Others'];
  selectedAttributes = [];

  draggedAttribute:string = null;

  players: Array<Player> = [];

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
    this.readCSVData();
  }




  readCSVData() {
    Papa.parse(this.CSV_URL, {
      download: true,
      header: true,
      complete: (results, file) => this.createPlayer(results.data)
    });
  }

  createPlayer(data) {
    for (let d of data) {

      let keyNames = Object.keys(d).filter(d => d!='player'&&d!='height'&&d!='weight');
      let dataValue = keyNames.map(p => data[p]);

      this.players.push({
        name: d.player,
        height: d.height,
        weight: d.weight,
        data: this.createDNutDataset(keyNames, dataValue)
      });
    }
    console.log(this.players);
  }

  createDNutDataset(labels, values) {
    return {
      labels: labels,
      datasets: [{
        data: values
      }]
    }
  }
}
