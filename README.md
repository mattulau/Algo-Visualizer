# Algorithm Visualizer 

Dijkstra & A* Shortest Path Visualizer (8 - 128 Nodes)

## Overview 
This project is an interactive pathfinding algorithm visualizer that demonstrates how Dijkstra's Algorithm and A* Search find the shortest path in a graph. 
The webapp generates a graph of 8 to 128 nodes, lets you select a start and goal node, and explores the graph step-by-step until it finds the shortest path. 

## Algorithm Info
Dijkstra's Algorithm 
- Is used to find the shortest path from the starting node to all other nodes in a graph with non-negative edge weights.
- Uses a priority queue ordere by current distance from the start.
- Always expands the node with the smallest known distance so far.
- Guarantees an optimal shortest path in graphs with non-negative weights.

A* Search
- Is an informaed search algorithm and combines the cost so far from the start node and a heuristic estimate from the current node to the goal.
- The heuristic is admissable and consistent

# Visualization Logic
For both algorithms, the visualizer shows:
1. Unvisted nodes - default color
2. Frontier / open set - Nodes that are discovered and waiting to be explored
3. Visited / closed set - nodes that have been processed
4. Final shortest path - highlighted as a continuous path from start to goal


## The goal of this project is to
- Build intuition for how Dijkstra and A* behave.
- Compare their performance and search patterns.
- Practice implementing graph algorithms and UI

## Tech Stack
Language(s): HTML, CSS, and JavaScript 

## Features 
Interactive graph size:
- Pick the number of nodes you need: 8, 16, 32, 64, 128.
Random graph generations:
- Nodes a placed on the canvas at random.
- Edges are created between nodes with random positive weights.
Two pathfinding algorithms:
- Dijkstra's Algorithm
- A* Search
Visual exploration:
- Nodes as they are visited
- Frontier / open set
- Final shortest path from start to goal
User controls:
- Choose graph size (8-128 nodes).
- Select start and goal nodes.
- Select algorithm (Dijkstra or A*)
- Run/reset visualization

## Controls & Usage

1. Select Node Count (8-128)
   - Press the button corresponding to the number of nodes you want
   - The higher the number of nodes, the more complex the graph becomes
  
2. Select Algorithm
   - Choose between Dijkstra and A* 

4. Run Visualization 
   - Once the node amount and algorithm have been selected, press the "Start Visualization" button
     
5. Choose Start & Goal Nodes 
   - On the graph, select the start and end node of your choosing 
   - Click start to begin pathfinding.

6. Reset/ New graph
   - Once visualization is complete and the path is found, press the "reset" button to try a new graph
   - Click "back" to select a different number of nodes or a different algroithm
  
## Educational Focus

This project is designed to:
Show how graph size affects runtime and the number of nodes visited
Compare uninformed (Dijkstra) vs informed (A*) search:
 -  Dijkstra explores outward in all directions
 -  A* uses the heuristic to aim toward the goal
Reinforces concepts:
 - Priority queue
 - Adjaceny lists
 - Heuristics
 - Shortest path reconstruction using parent/previous pointers
     
        

