import { ReactFlow, Controls, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useState } from "react";

function FlowContainer() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  return (
    <div className="flow-content">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
        style={{ height: "100%", width: "100%" }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default FlowContainer;
