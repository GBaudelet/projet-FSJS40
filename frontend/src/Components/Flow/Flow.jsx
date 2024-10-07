import React from "react";
import { ReactFlow, Controls, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

function Flow() {
  return (
    <div
      style={{
        height: "89.1vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 1, display: "flex" }}>
        <LeftPanel />
        <div style={{ flex: 1, position: "relative" }}>
          <ReactFlow style={{ height: "100%", width: "100%" }}>
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <RightPanel />
      </div>
    </div>
  );
}

export default Flow;
