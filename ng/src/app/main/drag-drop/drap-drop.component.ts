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
  private readonly CSV_URL: string = 'https://raw.githubusercontent.com/jonech/SportsTech2018/master/csv/PlayersFinalCatscore.csv';

  attributes = ['Speed', 'Endurance', 'Body Mass', 'Reach', 'Height'];

  selectedAttributes = [];

  draggedAttribute:string = null;

  players: Array<Player> = [];
  pagedPlayers: Array<Player> = [];
  options = {
    legend: {
      display: true,
      position: 'right'
    }
  }
  totalRecords = 0;
  itemPerPage = 5;

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

  attributeMap(attr: string) {
    if (attr == 'Speed') return 'speed';
    if (attr == 'Endurance') return 'endurance\r\r';
    if (attr == 'Body Mass') return 'bodymass';
    if (attr == 'Reach') return 'reach';
    if (attr == 'Height') return 'height';

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
    this.players = [];
    this.pagedPlayers = [];
    this.readCSVData();
  }

  paginate(event) {
    let page = event.page;

    let startIndex = page * this.itemPerPage;
    let endIndex = startIndex + this.itemPerPage;

    this.pagedPlayers = this.players.slice(startIndex, endIndex);
  }


  readCSVData() {

    Papa.parse(this.CSV_URL, {
      download: true,
      header: true,
      newline: "\n\n",
      complete: (results, file) => this.createPlayer(results.data)
    });
  }

  getRank(dataObject, attributes) {
    let rankWeight = attributes.length;
    let rank = 0;

    // base on attributes order list
    // sum up attributes point base on the order
    // first gets more
    // last gets the least
    for (let attr of attributes) {
      rank += parseFloat(dataObject[this.attributeMap(attr)]) * rankWeight/attributes.length;
      rankWeight -= 1;
    }
    return rank;
  }

  createPlayer(data: any[]) {
    this.totalRecords = data.length;

    data.sort((a,b) => {
      let rankA =this.getRank(a, this.attributes);
      let rankB =this.getRank(b, this.attributes);
      return rankB - rankA;
    });
    for (let d of data) {
      let keyNames = Object.keys(d).filter(d => d!='player_id'&&d!='height'&&d!='bodymass');
      let dataValue = keyNames.map(p => d[p]);
      this.players.push({
        name: d.player_id,
        height: d.height,
        weight: d.bodymass,
        data: this.createDNutDataset(keyNames, dataValue)
      });
    }

    this.pagedPlayers = this.players.slice(0, this.itemPerPage);
  }

  createDNutDataset(labels, values) {
    return {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56"
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56"
        ]
      }]
    }
  }
}
