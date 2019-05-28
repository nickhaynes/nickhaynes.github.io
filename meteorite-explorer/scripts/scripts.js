var apiAddress, searchAddress;

apiAddress = "https://data.nasa.gov/resource/gh4g-9sfh.json";
searchAddressStart = apiAddress + "?$where=lower(name)%20like%20lower(%27%25";
searchAddressEnd = "%25%27)";

var table = document.getElementById('search-table');

// Table creation
function createHeaderCell(cell) {
    var headerCell = document.createElement('th');
    headerCell.innerText = cell;
    return headerCell;
}

function createRowCell(cell) {
    var rowCell = document.createElement('td');
    rowCell.innerText = cell;
    return rowCell;
}

function createTableHeader() {
    var headerRow = document.createElement('tr');
    headerRow.classList.add('header');

    var headerArray = [
        "Name",
        "ID",
        "Name Type",
        "Rec Class",
        "Mass (g)",
        "Fall",
        "Year",
        "Latitude",
        "Longitude"
    ];

    for (let each in headerArray) {
        headerRow.append(createHeaderCell(headerArray[each]));
    }

    var table = document.getElementById('search-table');
    table.innerHTML = '';
    table.appendChild(headerRow);
}

function createTableRow(address) {
    var request = new XMLHttpRequest()
    request.open('GET', address, true)
    request.onload = function() {
        var data = JSON.parse(this.response);
        data.forEach(meteorite => {
            var theYear ='';
            if (meteorite.year == undefined) {
                theYear = 'undefined';
            } else {
                theYear = meteorite.year.substring(0,4);
            }
            var tableRow = document.createElement('tr');
            tableRow.classList.add('result');
            tableRow.append(createRowCell(meteorite.name));
            tableRow.append(createRowCell(meteorite.id));
            tableRow.append(createRowCell(meteorite.nametype));
            tableRow.append(createRowCell(meteorite.recclass));
            tableRow.append(createRowCell(meteorite.mass));
            tableRow.append(createRowCell(meteorite.fall));
            tableRow.append(createRowCell(theYear));
            tableRow.append(createRowCell(meteorite.reclat));
            tableRow.append(createRowCell(meteorite.reclong));
            var element = document.getElementById('search-table');
            element.appendChild(tableRow);
        })
    }
    request.send()
}

$(document).ready(function() {
    createTableHeader();
    createTableRow(apiAddress);
});

// Variables

var target, trigger, submitter, input, filter;

target = document.getElementById('search-results');
trigger = document.getElementById('search-container');
submitter = document.getElementById('submit-button');

function search() {
    input = document.getElementById('the-input').value;
    filter = input.toLowerCase();
    createTableHeader();
    createTableRow(searchAddressStart + filter + searchAddressEnd);
}

// NASA Api Key uPSc3JaQ3mMVxhvfV4du7VVtADUnLD2PG11CRc7e

// https://data.nasa.gov/resource/gh4g-9sfh.json?api_key=uPSc3JaQ3mMVxhvfV4du7VVtADUnLD2PG11CRc7e


//function nextSmallerNumber(num) {
//    num = num.toString().split('');
//    console.log(num);


// }

// nextSmallerNumber(2017);