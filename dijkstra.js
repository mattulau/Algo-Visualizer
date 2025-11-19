/* Graph Controls */

const svg = document.getElementById("graph");
const nodeCountDisplay = document.getElementById("node-count");
const nodes = [];
const edges = [];
let currentPathNodes = [];
let currentPathEdges = [];
let selectedStartNode = null;
let selectedEndNode = null;
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

  newNode.addEventListener("click", () => handleNodeClick(newNode) );

  svg.appendChild(newNode);
  updateCounter();
}


function handleNodeClick(node) {
  if (!selectedStartNode) {
    node.classList.add("start");
    selectedStartNode = node;
    console.log("Start node selected");
  }
  else if (!selectedEndNode && node !== selectedStartNode) {
    node.classList.add("end");
    selectedEndNode = node;
    console.log("End node selected");
  }
  else if (node === selectedStartNode) {
    node.classList.remove("start");
    selectedStartNode = null;
    console.log("Start node deselected");
  }
  else if (node === selectedEndNode) {
    node.classList.remove("end");
    selectedEndNode = null;
    console.log("End node deselected");
  }

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

function playSteps(steps, callback) {
  let i = 0;

  function next() {
    if (i >= steps.length) {
      callback();
      return;
    }

    const s = steps[i];

    if (s.type === "current") {
      s.node.classList.add("current");
    } 
    else if (s.type === "visit") {
      s.node.classList.add("visited");
      s.edge.element1.classList.add("visited-edge");
      s.edge.element2.classList.add("visited-edge");
    }
    else if (s.type === "relax") {
      s.node.classList.add("visited");
    }

    setTimeout(next, 100); // speed of animation
    i++;
  }

  next();
}


function startAlgorithm() {
  if (!selectedStartNode || !selectedEndNode) {
    alert("Pick a start and end node first.");
    return false;
  }

  const result = Dijkstra(selectedStartNode, selectedEndNode);
  if (!result) {
    alert("Algorithm failed to run.");
    return false;
  }

  const { distanceToTarget, prev, steps } = result;

  if (!Number.isFinite(distanceToTarget)) {
    alert("No path exists between the selected nodes.");
    return false;
  }

  const finalPath = reconstructPath(prev, selectedStartNode, selectedEndNode);
  if (!finalPath) {
    alert("No path exists between the selected nodes.");
    return false;
  }

  document.getElementById("stat-status").textContent = "Running";

  playSteps(steps, () => {
    highlightFinalPath(finalPath);
    document.getElementById("stat-status").textContent = "Completed";
  });

  return true; 
}

function highlightFinalPath(path) {
  svg.querySelectorAll(".graph-node").forEach(n => {
    n.classList.remove("visited", "current", "path", "start", "end");
  });

  edges.forEach(e => {
    e.element1.classList.remove("visited-edge", "path-edge");
    e.element2.classList.remove("visited-edge", "path-edge");
  });

  currentPathNodes = [];
  currentPathEdges = [];

  path.forEach(node => {
    node.classList.add("path");
    currentPathNodes.push(node);
  });

  selectedStartNode.classList.add("start");
  selectedEndNode.classList.add("end");

  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i];
    const b = path[i + 1];
    const edge = edges.find(
      e =>
        (e.from === a && e.to === b) ||
        (e.from === b && e.to === a)
    );
    if (edge) {
      edge.element1.classList.add("path-edge");
      edge.element2.classList.add("path-edge");
      currentPathEdges.push(edge);
    }
  }
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
  edges.forEach(edge => {
    edge.element1.remove();
    edge.element2.remove();
    edge.label.remove();
  });
  edges.length = 0;

  const nodeElements = Array.from(svg.querySelectorAll(".graph-node"));
  if (nodeElements.length <= 1) return;

  const MIN_EDGES = 5;
  const MAX_EDGES = 7;

  const edgeCounts = new Map();
  nodeElements.forEach(n => edgeCounts.set(n, 0));

  for (let i = 1; i < nodeElements.length; i++) {
    const nodeA = nodeElements[i];
    const nodeB = nodeElements[Math.floor(Math.random() * i)];
    const weight = Math.floor(Math.random() * 100) + 1;
    createEdge(nodeA, nodeB, weight);
    edgeCounts.set(nodeA, edgeCounts.get(nodeA) + 1);
    edgeCounts.set(nodeB, edgeCounts.get(nodeB) + 1);
  }

  nodeElements.forEach((nodeA, i) => {
    let currentCount = edgeCounts.get(nodeA);

    if (currentCount < MIN_EDGES) {
      const distances = nodeElements
        .map((nodeB, j) => {
          if (i === j) return null;
          return { node: nodeB, dist: distance(nodeA, nodeB) };
        })
        .filter(Boolean)
        .sort((a, b) => a.dist - b.dist);

      for (const { node: nodeB } of distances) {
        if (currentCount >= MIN_EDGES) break;
        if (edgeCounts.get(nodeB) >= MAX_EDGES) continue;

        const exists = edges.some(
          e =>
            (e.from === nodeA && e.to === nodeB) ||
            (e.from === nodeB && e.to === nodeA)
        );
        if (exists) continue;

        const weight = Math.floor(Math.random() * 100) + 1;
        createEdge(nodeA, nodeB, weight);

        edgeCounts.set(nodeA, edgeCounts.get(nodeA) + 1);
        edgeCounts.set(nodeB, edgeCounts.get(nodeB) + 1);
        currentCount++;
      }
    }
  });

  nodeElements.forEach((nodeA, i) => {
    const distances = nodeElements
      .map((nodeB, j) => {
        if (i === j) return null;
        return { node: nodeB, dist: distance(nodeA, nodeB) };
      })
      .filter(Boolean)
      .sort((a, b) => a.dist - b.dist);

    for (const { node: nodeB } of distances) {
      if (edgeCounts.get(nodeA) >= MAX_EDGES) break;
      if (edgeCounts.get(nodeB) >= MAX_EDGES) continue;

      const exists = edges.some(
        e =>
          (e.from === nodeA && e.to === nodeB) ||
          (e.from === nodeB && e.to === nodeA)
      );
      if (exists) continue;

      const weight = Math.floor(Math.random() * 100) + 1;
      createEdge(nodeA, nodeB, weight);

      edgeCounts.set(nodeA, edgeCounts.get(nodeA) + 1);
      edgeCounts.set(nodeB, edgeCounts.get(nodeB) + 1);
    }
  });

}
/* Graph Controls */

function Dijkstra(start, target) {
  const nodeElements = Array.from(svg.querySelectorAll(".graph-node"));
  const dist = new Map();
  const prev = new Map();

  const steps = []; // animation steps

  nodeElements.forEach(n => {
    dist.set(n, Infinity);
    prev.set(n, null);
  });
  dist.set(start, 0);

  const queue = nodeElements.slice();

  function neighborsOf(node) {
    return edges.filter(e => e.from === node || e.to === node)
      .map(e => ({
        node: e.from === node ? e.to : e.from,
        edge: e,
        w: e.weight
      }));
  }

  while (queue.length > 0) {
    let u = null;
    let uIdx = -1;
    let best = Infinity;

    for (let i = 0; i < queue.length; i++) {
      const node = queue[i];
      if (dist.get(node) < best) {
        best = dist.get(node);
        u = node;
        uIdx = i;
      }
    }

    if (!u) break;

    queue.splice(uIdx, 1);

    steps.push({ type: "current", node: u });

    if (u === target) break;

    const nbrs = neighborsOf(u);
    for (const { node: v, edge, w } of nbrs) {
      const alt = dist.get(u) + w;
      steps.push({ type: "visit", node: v, edge });

      if (alt < dist.get(v)) {
        dist.set(v, alt);
        prev.set(v, u);
        steps.push({ type: "relax", node: v, edge });
      }
    }
  }

  return {
    distanceToTarget: dist.get(target),
    prev,
    steps
  };

}

function reconstructPath(prev, start, target) {
  const path = [];
  let cur = target;

  while (cur && cur !== start) {
    path.unshift(cur);
    cur = prev.get(cur);
  }

  if (!cur) return null;

  path.unshift(start);
  return path;
}

