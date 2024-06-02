import React from "react";
import { Handle, Position } from "reactflow";
import Message from "./message";

function CustomNode (props: any) {
  const { data, id } = props;
  return (
    <div className="text-updater-node">
      {/* adding position to left */}
      <Handle
        type="target"
        position={Position.Left}
        id={id}
      />
       {/* Message Node */}
      <div>
        <Message title={data.label} />
      </div>
       {/* adding position to Right */}
      <Handle
        type="source"
        position={Position.Right}
        id={id}
      />
    </div>
  );
}

export default CustomNode;
