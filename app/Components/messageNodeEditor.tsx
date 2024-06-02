import { ArrowLeft } from "lucide-react";
import React from "react";

function MessageNodeEditor(props: any) {
  const { setNodeEditing, editNode, setEditNode } = props;

  const handleUpdateMessage = (e: any) => {
    // updating node label text using lifting state up
    setEditNode({ ...editNode, data: { label: e.target.value } });
  };

  return (
    <div>
      <div className="flex justify-between items-center p-3 py-3 mb-3 border-b">
        <ArrowLeft
          size={20}
          className="cursor-pointer"
          onClick={() => setNodeEditing(false)}
        />
        <h3>Message</h3>
        <div />
      </div>
      <div className="mx-4">
        <h6 className="opacity-75 mb-3">Text</h6>
        <textarea
          className="w-[100%] border-blue-800 border-2 rounded py-2 px-2 h-28 focus:outline-none"
          placeholder="Enter Message..."
          onChange={handleUpdateMessage}
          value={editNode.data.label}
        />
      </div>
    </div>
  );
}

export default MessageNodeEditor;
