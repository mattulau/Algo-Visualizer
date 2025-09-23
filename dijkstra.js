/* Graph Controls */

const svg = document.getElementById("graph");
const nodeCountDisplay = document.getElementById("node-count");
const nodes = [];
const edges = [];

let nodeCount = 0;
const nodeFiles = [ "assets/node-1.svg", "assets/node-2.svg", "assets/node-3.svg", "assets/node-4.svg", "assets/node-5.svg", "assets/node-6.svg", "assets/node-7.svg" ];

function updateCounter() {
  const nodes = svg.querySelectorAll(".graph-node")
  nodeCount = nodes.length;
  nodeCountDisplay.textContent = nodeCount;
}

function createNode(x, y, size = 20) {
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

function createEdge(nodeA, nodeB, weight = 1) {

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

function generateRandomNodes(count, size = 20) {
  clearAllNodes();

  const maxX = svg.clientWidth - size;
  const maxY = svg.clientHeight - size;
  const minDist = size * 3;

  for (let i = 0; i < count; i++) {
    let valid = false;
    while(!valid) {
      const tempX = Math.floor(Math.random() * maxX);
      const tempY = Math.floor(Math.random() * maxY);
      valid = true;
      for (let j = 0; j < nodes.length; j++) {
        const dx = nodes[j].x - tempX;
        const dy = nodes[j].y - tempY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          valid = false;
          break;
        }
      }
      if (valid) {
        const x = tempX;
        const y = tempY;
        createNode(x, y, size);
        nodes.push({x, y})
      }
    }
  }

  generateRandomEdges();
}

function generateRandomEdges() {

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
  const size = 20;
  const maxX = svg.clientWidth - size;
  const maxY = svg.clientHeight - size;
  const minDist = size * 2;
  let valid = false;
  while(!valid) {
    const tempX = Math.floor(Math.random() * maxX);
    const tempY = Math.floor(Math.random() * maxY);
    valid = true;
    for (let i = 0; i < nodes.length; i++) {
      const dx = nodes[i].x - tempX;
      const dy = nodes[i].y - tempY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDist) {
        valid = false;
        break;
      }
    }
    if (valid) {
      const x = tempX;
      const y = tempY;
      createNode(x, y, size);
      nodes.push({x, y});
    }
  }
  generateRandomEdges();
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

  const presetSelect = document.getElementById("algo-size-select");
  presetSelect.value = "0";
});

/* Graph Controls */

function Dijkstra(start, target) {
  const distance = {};
  const prev = {};
  const queue = [];
}