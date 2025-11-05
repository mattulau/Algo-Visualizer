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

function distance(nodeA, nodeB) {

  const x1 = parseFloat(nodeA.getAttribute("x")) + parseFloat(nodeA.getAttribute("width")) / 2;
  const y1 = parseFloat(nodeA.getAttribute("y")) + parseFloat(nodeA.getAttribute("height")) / 2;
  const x2 = parseFloat(nodeB.getAttribute("x")) + parseFloat(nodeB.getAttribute("width")) / 2;
  const y2 = parseFloat(nodeB.getAttribute("y")) + parseFloat(nodeB.getAttribute("height")) / 2;

  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

}


function createEdge(nodeA, nodeB, weight = 1) {

  const exists = edges.some(
    e =>
      (e.from === nodeA && e.to === nodeB) || 
      (e.from === nodeB && e.to === nodeA)
  );
  if (exists) return;

  const x1 = parseFloat(nodeA.getAttribute("x")) + parseFloat(nodeA.getAttribute("width")) / 2;
  const y1 = parseFloat(nodeA.getAttribute("y")) + parseFloat(nodeA.getAttribute("height")) / 2;
  const x2 = parseFloat(nodeB.getAttribute("x")) + parseFloat(nodeB.getAttribute("width")) / 2;
  const y2 = parseFloat(nodeB.getAttribute("y")) + parseFloat(nodeB.getAttribute("height")) / 2;

  const newEdge = document.createElementNS("http://www.w3.org/2000/svg", "line");
  newEdge.setAttribute("x1", x1);
  newEdge.setAttribute("y1", y1);
  newEdge.setAttribute("x2", x2);
  newEdge.setAttribute("y2", y2);
  newEdge.setAttribute("stroke", "black");
  newEdge.setAttribute("stroke-widdth", "2");
  newEdge.classList.add("graph-edge");

  svg.insertBefore(newEdge, svg.firstChild);

  edges.push({ from: nodeA, to: nodeB, weight, element: newEdge });

}

function deleteNode() {
  const nodes = svg.querySelectorAll(".graph-node");
  if (nodes.length > 0) {
    const nodeToDelete = nodes[nodes.length - 1];

    for (let i = edges.length - 1; i >= 0; i--) {
      if (edges[i].from === nodeToDelete || edges[i].to === nodeToDelete) {
        edges[i].element.remove();
        edges.splice(i, 1);
      }
    }

    svg.removeChild(nodeToDelete);

    updateCounter();

    generateRandomEdges();
  }
}

function clearAllNodes() {
  nodes.length = 0;
  edges.length = 0;
  svg.innerHTML = "";
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

  edges.forEach(edge => edge.element.remove());
  edges.length = 0;

  const nodeElements = Array.from(svg.querySelectorAll(".graph-node"));

  nodeElements.forEach((nodeA, i ) => {
    const distances = nodeElements.map((nodeB, j) => {
      if (i === j) return null;
      return { node: nodeB, dist: distance(nodeA, nodeB) };
    })
    .filter(Boolean)
    .sort((a, b) => a.dist - b.dist);

    const neighbors = distances.slice(0,4); // (0, 2,3,4,...) second number changes the amount of nodes it will connect to
    neighbors.forEach(({ node }) => {
      const weight = Math.floor(Math.random() * 10) + 1;
      createEdge(nodeA, node, weight);
    });
  });
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
  if (!start || !target) {
    console.warn("[Dijkstra] Missing start/target");
    return null;
  }

  const nodeElements = Array.from(svg.querySelectorAll(".graph-node"));
  const dist = new Map();
  const prev = new Map();

  nodeElements.forEach(n => {
    dist.set(n, Infinity);
    prev.set(n, null);
  });
  dist.set(start, 0);

  const queue = nodeElements.slice();

  function neighborsOf(node) {
    const list = [];
    for (const e of edges) {
      if (e.from === node) list.push({ node: e.to, w: e.weight ?? 1 });
      else if (e.to === node) list.push({ node: e.from, w: e.weight ?? 1 });
    }
    return list;
  }

  while (queue.length) {
    let u = null;
    let uIdx = -1;
    let best = Infinity;

    for (let i = 0; i < queue.length; i++) {
      const cand = queue[i];
      const d = dist.get(cand);
      if (d < best) {
        best = d;
        u = cand;
        uIdx = i;
      }
    }

    if (!u) {
      console.log("[Dijkstra] No reachable node found, exiting early.");
      break;
    }

    if (u === target) {
      console.log("[Dijkstra] Reached target early.");
      break;
    }

    queue.splice(uIdx, 1);

    const nbrs = neighborsOf(u);
    for (const { node: v, w } of nbrs) {
      const alt = dist.get(u) + (Number.isFinite(w) ? w : 1);
      if (alt < dist.get(v)) {
        dist.set(v, alt);
        prev.set(v, u);
      }
    }
  }

  return {
    distanceToTarget: dist.get(target),
    prev,
    dist
  };
}
