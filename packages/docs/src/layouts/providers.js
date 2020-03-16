import React from "react"
import { SidebarProvider } from "../context/SidebarContext"

// Instantiating context in `wrapRootElement` handler ensures:
//  - there is fresh store for each SSR page
//  - it will be called only once in browser, when React mounts
export default ({ element }) => {
  const initialState = {
    sidebar: true,
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "toggleSidebar":
        return {
          ...state,
          sidebar: action.newSidebar,
        }

      default:
        return state
    }
  }
  return (
    <SidebarProvider initialState={initialState} reducer={reducer}>
      {element}
    </SidebarProvider>
  )
}
