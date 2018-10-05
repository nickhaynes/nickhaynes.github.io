

function makeGrid() {

var gridHeight, gridWeight, canvas, rows, cell, cellSize, clear

canvas = $('#pixelCanvas');
gridHeight = $('#inputHeight').val();
gridWeight = $('#inputWeight').val();
cellSize = $('#pixelSize').val();

canvas.children().remove()

for (x = 0; x < gridHeight; x++){
  canvas.append('<tr></tr>');
};

rows = $('tr');

for (y = 0; y < gridWeight; y++){
  rows.append('<td></td>');
};

cell = canvas.find('td');

$('td').css('height', cellSize);
$('td').css('width', cellSize);



  //select color

  $(cell).click(function() {
    console.log("Time to change color!");
    var color;
    color=$("#colorPicker").val();
    $(this).attr('background-color', color);
  }); 

}
  //submit feature

var submitGrid;

submitGrid = $('input[type="submit"]');

submitGrid.click(function(event) {
  event.preventDefault();
  makeGrid();
})





