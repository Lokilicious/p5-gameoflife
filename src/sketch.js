let res = 10;
let grid;

function setup() {
  // put setup code here
  createCanvas(800, 800);
  frameRate(30);
  let cols = width / res;
  let rows = height / res;
  this.grid = this.initializeGrid(cols, rows);
  this.populateGrid();
}

function draw() {
  background(0);
  for(let i = 0; i < this.grid.length; i++){
    for(let j = 0; j < this.grid[i].length; j++){
      let x = i * res;
      let y = j * res;
      if(this.grid[i][j].alive){
        if(this.grid[i][j].age > 3){
          fill('red');
        } else {
          fill(255);
        }
        rect(x, y, res-1, res-1);
      }
    }
  }
  for(let i = 0; i < this.grid.length; i++){
    for(let j = 0; j < this.grid[i].length; j++){
      this.grid[i][j].updateHistory();
    }
  }
  for(let i = 0; i < this.grid.length; i++){
    for(let j = 0; j < this.grid[i].length; j++){
      this.grid[i][j].updateAlive();
    }
  }
}

function initializeGrid(cols, rows) {
	let array = new Array(cols); 
	for(let i = 0; i < rows; i++) {
    array[i] = new Array(rows); 
  }
	return array; 
}

function populateGrid(){
	for(let i = 0; i < this.grid.length; i++) {
    for(let j = 0; j < this.grid[i].length; j++) {
      this.grid[i][j] = new Cell(i, j, this.grid);
    }
	}
}

function Cell(x, y, grid) {
  this.x = x;
  this.y = y;
  this.grid = grid;
  this.alive = Math.floor(Math.random() * 2) === 1;
  this.age = this.alive ? 1 : 0;
  this.neighbors = 0;
  this.history;
  this.coordinates = `${this.x}:${this.y}`;

  this.countNeighbors = function (){
    sum = 0;
    for(let i = -1; i <= 1; i++){
      for(let j = -1; j <= 1; j++){
        if(!(i == 0 && j == 0)){
          cols = this.grid.length;
          rows = this.grid[0].length;
          col = (this.x + i + cols) % cols;
          row = (this.y + j + rows) % rows;
          if(this.grid[col][row].history){
            sum ++;
          }
        }
      }
    }
    this.neighbors = sum;
    return sum;
  }

  this.updateAlive = function (){
    let neighbors = this.countNeighbors();
    if(this.history && (neighbors < 2 || neighbors > 3)) {
      this.alive = false;
      this.age = 0;
    }
    if(!this.history && neighbors === 3){
      this.alive = true;
      this.age = 1;
    }

    if(this.history == this.alive){
      this.age++;
    }else {
      this.age = 0;
    }
  }

  this.updateHistory = function(){
    this.history = this.alive;
  }

}