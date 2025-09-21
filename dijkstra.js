/* Graph Controls */

const svg = document.getElementById("graph");
const nodeCountDisplay = document.getElementById("node-count");

let nodeCount = 0;
const nodeFiles = [ "assets/node-1.svg", "assets/node-2.svg", "assets/node-3.svg", "assets/node-4.svg", "assets/node-5.svg", "assets/node-6.svg", "assets/node-7.svg" ];

function updateCounter() {
  const nodes = svg.querySelectorAll(".graph-node")
  nodeCount = nodes.length;
  nodeCountDisplay.textContent = nodeCount;
}

function createNode(x, y, size = 32) {
  nodeCount++;
  const randomFile = nodeFiles[Math.floor(Math.random() * nodeFiles.length)];

  const newNode = document.createElementNS("http://www.w3.org/2000/svg", "image");
  newNode.setAttribute("href", randomFile);
  newNode.setAttribute("x", x);
  newNode.setAttribute("y", y);
  newNode.setAttribute("width", size);
  newNode.setAttribute("height", size);
  newNode.classList.add("graph-node");

  svg.appendChild(newNode);
  updateCounter();
}

function deleteNode() {
  const nodes = svg.querySelectorAll(".graph-node");
  if (nodes.length > 0) {
    svg.removeChild( nodes [nodes.length -1] );
    updateCounter();
  }
}

function clearAllNodes() {
  const nodes = svg.querySelectorAll(".graph-node");
  nodes.forEach(node => svg.removeChild(node));
  nodeCount = 0;
  updateCounter();
}

function startAlgorithm() {
  alert("Algo would run");
}

function generateRandomNodes(count, size = 32) {
  clearAllNodes();

  const maxX = svg.clientWidth - size;
  const maxY = svg.clientHeight - size;

  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    createNode(x, y, size);
  }

  generateRandomEdges();
}

// For Drop Down Menu
document.getElementById("algo-size-select").addEventListener("change", (e) => {
  const count = parseInt(e.target.value, 10);
  if (count > 0) {
    generateRandomNodes(count);
  } else {
    clearAllNodes();
  }
});



document.getElementById("addNodeBtn").addEventListener("click", () => {
  const size = 32;
  const maxX = svg.clientWidth - size;
  const maxY = svg.clientHeight - size;
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);
  createNode(x, y, size)
});

document.getElementById("deleteNodeBtn").addEventListener("click", () => {
  deleteNode();
});

document.getElementById("startBtn").addEventListener("click", () => {
  startAlgorithm();
});

/* Size Preset Start Path */
/* 

document.getElementById("btn-startPath").addEventListener("click", () => {
  startPresetPath();
}); 

*/

document.getElementById("btn-clearPath").addEventListener("click", () => {
  clearAllNodes();
});

/* Graph Controls */

function Dijkstra(start, target) {
  const distance = {};
  const prev = {};
  const queue = [];
}