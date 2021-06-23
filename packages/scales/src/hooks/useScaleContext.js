import React from "react";

const ScaleContext = React.createContext(undefined);

function ScaleProvider({ children, value }) {
  return (
    <ScaleContext.Provider value={value}>{children}</ScaleContext.Provider>
  );
}

function useScaleContext() {
  const context = React.useContext(ScaleContext);
  if (context === undefined) {
    throw new Error("useScaleContext must be used within a ScaleProvider");
  }
  return context;
}

export { ScaleProvider, useScaleContext };
