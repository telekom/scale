import React, { createContext, useContext, useReducer } from "react"
export const SidebarContext = createContext()
export const SidebarProvider = ({ reducer, initialState, children }) => (
  <SidebarContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </SidebarContext.Provider>
)
export const useSidebarValue = () => useContext(SidebarContext)
