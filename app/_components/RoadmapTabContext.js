"use client";
import { createContext, useContext, useState } from "react";

const RoadmapTabContext = createContext();

const initialState = { activeTab: "all" };

function RoadmapTabProvider({ children }) {
  const [activeTab, setActiveTab] = useState(initialState);

  return (
    <RoadmapTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </RoadmapTabContext.Provider>
  );
}

function useRoadmapTab() {
  const context = useContext(RoadmapTabContext);

  if (context === "undefined")
    throw new Error("Context was used outside provider");
  return context;
}

export { RoadmapTabProvider, useRoadmapTab };
