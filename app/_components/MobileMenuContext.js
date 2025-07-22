"use client";
import { createContext, useContext, useState } from "react";

const MobileMenuContext = createContext();

const initialState = { open: false };

function MobileMenuProvider({ children }) {
  const [open, setOpen] = useState(initialState);

  return (
    <MobileMenuContext.Provider value={{ open, setOpen }}>
      {children}
    </MobileMenuContext.Provider>
  );
}

function useMobileMenu() {
  const context = useContext(MobileMenuContext);
  if (context === "undefined")
    throw new Error("Context was used outside provider");
  return context;
}

export { MobileMenuProvider, useMobileMenu };
