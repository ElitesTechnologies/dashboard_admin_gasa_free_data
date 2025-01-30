"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var csvParser = require("csv-parser");
function searchInCsv(filePath, searchColumn, searchValue) {
    var results = [];
    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', function (row) {
        if (row[searchColumn] && row[searchColumn] === searchValue) {
            results.push(row);
        }
    })
        .on('end', function () {
        if (results.length > 0) {
            console.log('success');
            console.log(results);
        }
        else {
            console.log('not found');
        }
    })
        .on('error', function (error) {
        console.error();
    });
}
var filePath = 'data.csv';
var searchColumn = 'Matricule';
var searchValue = 'CEPQ.S611';
searchInCsv(filePath, searchColumn, searchValue);
