

import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Home';
import Navbar from './components/Navbar';

function App() {
 
  return (
    <>
    {/* <Navbar/> */}
    <Home/>
    </>
  );
}

export default App;
