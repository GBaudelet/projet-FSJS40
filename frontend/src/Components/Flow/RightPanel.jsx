import { useEffect, useState } from "react";

function RightPanel({ selectedNode }) {
  const [nodeName, setNodeName] = useState("");

  useEffect(() => {
    if (selectedNode) {
      setNodeName(selectedNode?.data?.label || "");
    }
  }, [selectedNode]);

  const handleNameChange = (e) => {
    setNodeName(e.target.value);
    // Logic to update the selected node's data in the flow
  };

  return (
    <div className="right-panel">
      {selectedNode ? (
        <>
          <h3>Edit Node</h3>
          <label>Name:</label>
          <input value={nodeName} onChange={handleNameChange} />
        </>
      ) : (
        <p>Select a node to edit its properties</p>
      )}
    </div>
  );
}

export default RightPanel;
