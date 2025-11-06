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


function createEdge(nodeA, nodeB, weight = Math.floor(Math.random() * 10) + 1) {

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

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / length;
  const uy = dy /length;

  let angleDeg = Math.atan2(dy, dx) * (180 / Math.PI);
  if (angleDeg > 90 || angleDeg < -90) angleDeg += 180;

  const gap = 20;

  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const x1b = midX - ux * gap / 2;
  const y1b = midY - uy * gap / 2;
  const x2b = midX + ux * gap / 2;
  const y2b = midY + uy * gap / 2;

  const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line1.setAttribute("x1", x1);
  line1.setAttribute("y1", y1);
  line1.setAttribute("x2", x1b);
  line1.setAttribute("y2", y1b);
  line1.setAttribute("stroke", "white");
  line1.setAttribute("stroke-width", "1");
  line1.classList.add("graph-edge");

  const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line2.setAttribute("x1", x2b);
  line2.setAttribute("y1", y2b);
  line2.setAttribute("x2", x2);
  line2.setAttribute("y2", y2);
  line2.setAttribute("stroke", "white");
  line2.setAttribute("stroke-width", "1");
  line2.classList.add("graph-edge");

  const px = -uy;
  const py = ux; 
  const labelOffset = 1;

  const labelX = midX + px * labelOffset;
  const labelY = midY + py * labelOffset;

  const edgeLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
  edgeLabel.setAttribute("x", labelX);
  edgeLabel.setAttribute("y", labelY);
  edgeLabel.setAttribute("fill", "white");
  edgeLabel.setAttribute("font-size", "12");
  edgeLabel.setAttribute("text-anchor", "middle");
  edgeLabel.setAttribute("dominant-baseline", "middle");
  edgeLabel.textContent = weight;

const firstNode = svg.querySelector(".graph-node");
if (firstNode) {
  svg.insertBefore(line1, firstNode);
  svg.insertBefore(line2, firstNode);
  svg.insertBefore(edgeLabel, firstNode);
} else {
  svg.appendChild(line1);
  svg.appendChild(line2);
  svg.appendChild(edgeLabel);
}
  
  edges.push({ from: nodeA, to: nodeB, weight, element1: line1, element2: line2, label: edgeLabel });
}

function deleteNode() {
  const nodes = svg.querySelectorAll(".graph-node");
  if (nodes.length > 0) {
    const nodeToDelete = nodes[nodes.length - 1];

    for (let i = edges.length - 1; i >= 0; i--) {
      if (edges[i].from === nodeToDelete || edges[i].to === nodeToDelete) {
        edges[i].element1.remove();
        edges[i].element2.remove();
        edges[i].label.remove();
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
  edges.forEach(e => {
    e.element1.remove();
    e.element2.remove();
    e.label.remove();
  });
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

  edges.forEach(edge => { edge.element1.remove(); edge.element2.remove(); edge.label.remove(); });
  edges.length = 0;

  const maxEdgesPerNode = 5; //max number of edges that can touch a node
  const minEdgesPerNode = 2; //min number of edges that a node has
  const nodeElements = Array.from(svg.querySelectorAll(".graph-node"));

  const edgeCounts = new Map();
  nodeElements.forEach(n => edgeCounts.set(n, 0));

  nodeElements.forEach((nodeA, i ) => {
    const distances = nodeElements.map((nodeB, j) => {
      if (i === j) return null;
      return { node: nodeB, dist: distance(nodeA, nodeB) };
    })
    .filter(Boolean)
    .sort((a, b) => a.dist - b.dist);

    const neighbors = distances.slice(0,maxEdgesPerNode); // uses value from "maxEdgesPerNode" to determine amount of edges a node can be touched by
    
    neighbors.forEach(({ node: nodeB }) => {
      if (edgeCounts.get(nodeA) < maxEdgesPerNode && edgeCounts.get(nodeB) < maxEdgesPerNode) {
        const weight = Math.floor(Math.random() * 100) + 1; // changes edge weight max value
        createEdge(nodeA, nodeB, weight);
        
        edgeCounts.set(nodeA, edgeCounts.get(nodeA) + 1);
        edgeCounts.set(nodeB, edgeCounts.get(nodeB) + 1);
      }
    });
  });

  nodeElements.forEach((nodeA, i) => {
    let count = edgeCounts.get(nodeA);
    if (count < minEdgesPerNode) {
      const distances = nodeElements.map((nodeB, j) => {
        if (i == j) return null;
        return { node: nodeB, dist: distance(nodeA, nodeB) };
      })
      .filter(Boolean)
      .sort((a, b) => a.dist - b.dist);

      for (const { node: nodeB } of distances) {
        if (count >= minEdgesPerNode) break;
        if (edgeCounts.get(nodeB) < maxEdgesPerNode) {
          const exists = edges.some(
            e =>
            (e.from === nodeA && e.to === nodeB) ||
            (e.from === nodeB && e.to === nodeA)
          );
          if (!exists) {
            const weight = Math.floor(Math.random() * 10) + 1;
            createEdge(nodeA, nodeB, weight);

            edgeCounts.set(nodeA, edgeCounts.get(nodeA) + 1);
            edgeCounts.set(nodeB, edgeCounts.get(nodeB) + 1);
            count++;
          }
        }
      }
    }
  });
}
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
