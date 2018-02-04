/**
 * Created by robha on 2018-01-09.
 */

function Node(id, status) {
    this.id = id;
    this.status = status;
}

function Board(height,width) {
    this.height = height;
    this.width = width;
    this.boardArray = [];
    this.nodes = {};
}

Board.prototype.initialise = function() {
    this.createGrid();
    this.addEventListeners();
    this.initialiseMap();
};

Board.prototype.createGrid = function() {
    let tableHTML = "";
    for (let r = 0; r < this.height; r++) {
        let currentArrayRow = [];
        let currentHTMLRow = `<tr id="row ${r}">`;
        for (let c = 0; c < this.width; c++) {
            let newNodeID = `${r}-${c}`, newNodeClass, newNode;
            newNodeClass = "empty";
            newNode = new Node(newNodeID, newNodeClass);
            currentArrayRow.push(newNode);
            currentHTMLRow += `<td id="${newNodeID}" class="${newNodeClass}"></td>`;
            this.nodes[`${newNodeID}`] = newNode;
        }
        this.boardArray.push(currentArrayRow);
        tableHTML += `${currentHTMLRow}`;
    }
    let board = document.getElementById("board");
    board.innerHTML = tableHTML;
};

Board.prototype.getNode = function(id) {
    let coordinates = id.split("-");
    let r = parseInt(coordinates[0]);
    let c = parseInt(coordinates[1]);
    return this.boardArray[r][c];
};

Board.prototype.addEventListeners = function() {
  let board = this;
  for (let r = 0; r < board.height; r++) {
      for (let c = 0; c < board.width; c++) {
          let currentID = `${r}-${c}`;
          let currentNode = board.getNode(currentID);
          let currentElement = document.getElementById(currentID);
          // currentElement.onclick = (e) => {
          //     e.preventDefault();
          //     board.toggleWall(currentNode)
          // };
          currentElement.onmousedown = (e) => {
              e.preventDefault();
              this.dragType = currentNode.status == "empty" ? "wall" : "empty";
              currentElement.className = this.dragType;
              currentNode.status = this.dragType;
              this.isDrag = true;
          };
          currentElement.onmouseup = (e) => {
              e.preventDefault();
              this.isDrag = false;
          };
          currentElement.onmouseenter = (e) => {
              e.preventDefault();
              if (this.isDrag) {
                  currentElement.className = this.dragType;
                  currentNode.status = this.dragType;
              }
          };
      }
  }
};

Board.prototype.toggleWall = function(node) {
    let element = document.getElementById(node.id);
    element.className = node.status == "empty" ? "wall" : "empty";
    node.status = node.status == "empty" ? "wall" : "empty";
};

let height = 20;
let width = 50;
let newBoard = new Board(height, width);
newBoard.initialise();
