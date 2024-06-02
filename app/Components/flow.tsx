import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  addEdge,
  Connection,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";

import CustomNode from "./customNode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const nodeTypes = { messageNode: CustomNode }; // custom node types

const initialEdges: any[] | (() => any[]) = [];

function Flow(props: any) {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState(initialEdges);
  const [positions, setPositions] = useState({}); // positions for dragged node

  const { setNodeEditing, setEditNode, editNode, saveNodes, setSaveNodes } = props;

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds) as any[]),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const handleConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) => {
        if (eds && eds.some((e: any) => e.source === params.source)) return eds; // source already there in eges we won't add to edges(simplr return)
        return addEdge(params, eds);
      }),
    []
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const dropPosition = { // select positions
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setPositions(dropPosition);
  };

  useEffect(() => {
    if (Object.entries(positions).length) {
      setNodes([ // add new nodes
        ...nodes,
        {
          id: uuidv4(),
          position: positions as any,
          data: { label: `Message ${nodes.length + 1}` },
          type: "messageNode",
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions]);

  useEffect(() => {
    if (Object.entries(editNode).length) { // updating messages
      const updatedNodes = nodes.map((node) => {
        if (node.id === editNode.id) return editNode;
        return node;
      });
      setNodes(updatedNodes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editNode]);

  const checkConnectivity = () => {
    const adjacencyList: any = {};

    // Initialize adjacency list
    nodes.forEach((node) => {
      adjacencyList[node.id] = [];
    });

    // Populate adjacency list
    edges.forEach((edge) => {
      adjacencyList[edge.source].push(edge.target);
      adjacencyList[edge.target].push(edge.source);
    });

    // Search connectivity
    const visited: any = {};
    const Search = (nodeId: any) => {
      visited[nodeId] = true;
      adjacencyList[nodeId].forEach((neighbor: any) => {
        if (!visited[neighbor]) {
          Search(neighbor);
        }
      });
    };

    // Start Searching from the first node
    Search(nodes[0].id);

    // Check if all nodes are visited
    const allVisited = nodes.every((node) => visited[node.id]);
    return allVisited;
  };

  useEffect(() => {
    const nodes = localStorage.getItem("nodes");
    const edges = localStorage.getItem("edges");
    if (nodes) setNodes(JSON.parse(nodes));
    if (edges) setEdges(JSON.parse(edges));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (saveNodes) {
      if (nodes.length > 0) {
        if (edges.length > 0) {
          if (checkConnectivity()) {
            localStorage.setItem("nodes", JSON.stringify(nodes));
            localStorage.setItem("edges", JSON.stringify(edges));
            toast.success("Successfully Saved Messages!", {
              position: "top-center",
            });
          } else {
            toast.error("Please Connect All Messages!", {
              position: "top-center",
            });
          }
        } else {
          toast.error("Please Connect All Messages!", {
            position: "top-center",
          });
        }
      } else {
        toast.error("Please Add Messages First!", { position: "top-center" });
      }
      setSaveNodes(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveNodes]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleNodeClick = (event: any, node: any) => {
    setEditNode(node);
    setNodeEditing(true);
  };

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        nodeTypes={nodeTypes}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onNodeClick={handleNodeClick}
        onConnectEnd={(e) => e.preventDefault()}
      >
        <Controls /> {/* adding controls (zoom, lock, etc) */}
        <Background gap={8} /> {/* adding background dots */}
        <ToastContainer /> {/* adding toast container */}
      </ReactFlow>
    </div>
  );
}

export default Flow;
