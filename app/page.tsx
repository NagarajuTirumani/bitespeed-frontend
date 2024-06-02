"use client";
import React, { useState } from "react";
import { ReactFlowProvider } from "reactflow";
import { MessageSquareText } from "lucide-react";

import Header from "./Components/Header";
import NodeFlow from "./Components/flow";
import MessageNodeEditor from "./Components/messageNodeEditor";

const nodeTypes = [
  {
    type: "messageNode",
    name: "Message",
    icon: <MessageSquareText className="mr-2" />,
  }
  // we can extend nodes here.
];

export default function Home() {
  const [nodeEditing, setNodeEditing] = useState(false);
  const [editNode, setEditNode] = useState({});
  const [saveNodes, setSaveNodes] = useState(false);

  return (
    <main className="max-h-screen overflow-hidden bg-white">
      <Header setSaveNodes={setSaveNodes} />
      <div className="flex flex-row">
        <div className="w-[75%]">
          <ReactFlowProvider> {/* React Flow Provider wrapper to wrap multiple nodes */}
            <NodeFlow
              setNodeEditing={setNodeEditing}
              setEditNode={setEditNode}
              editNode={editNode}
              saveNodes={saveNodes}
              setSaveNodes={setSaveNodes}
            />
          </ReactFlowProvider>
        </div>
        <div className="w-[25%] border-l-gray-400 border-2">
          {nodeEditing ? (
            <MessageNodeEditor // Settings panel
              setNodeEditing={setNodeEditing}
              editNode={editNode}
              setEditNode={setEditNode}
            />
          ) : (
            <>
              <h6 className="m-4 font-medium">Add a Node</h6>
              {nodeTypes.map((nodeType) => ( // Draggable nodes panels
                <div
                  className="border-blue-800 border-2 w-48 py-5 flex flex-col items-center m-4 rounded-md text-blue-700 cursor-pointer"
                  key={nodeType.type}
                  draggable
                >
                  {nodeType.icon}
                  {nodeType.name}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
