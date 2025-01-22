import './App.css'
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import {Router} from "lucide-react";

function App() {
  return (
    <>
      <Router />
      <TanStackRouterDevtools initialIsOpen={false} />
    </>
  )
}

export default App
