import { useEffect } from "react";
import appRouter from "./Routes/Routes";
import { BrowserRouter,RouterProvider } from "react-router-dom";
function App() {
  
  return (
    <>
 
        <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
