import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';

@Injectable()
export class RankService {
  private readonly CSV_DIR: string = '/csv/MOCK_DATA.csv';
  private readonly CSV_URL: string = 'https://raw.githubusercontent.com/jonech/SportsTech2018/master/csv/MOCK_DATA.csv';

  constructor() {

  }

  readCSVData(): Promise<any> {
    Papa.parse(this.CSV_URL, {
      download: true,
      header: true,
      complete: (results, file) => {
        console.log('Parsed', results, file);
        return new Promise(results.data);
      }
    });

  }

}
