import * as fs from 'fs';
import * as csvParser from 'csv-parser';

function searchInCsv(filePath: string, searchColumn: string, searchValue: string): void {
  const results: any[] = [];
  
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
     
      if (row[searchColumn] && row[searchColumn] === searchValue) {
        results.push(row);
      }
    })
    .on('end', () => {
     
      if (results.length > 0) {
        console.log();
        console.log(results);
      } else {
        console.log();
      }
    })
    .on('error', (error) => {
      console.error();
    });
}

const filePath = 'data.csv';
const searchColumn = 'Nom';
const searchValue = 'Dupont';
searchInCsv(filePath, searchColumn, searchValue);