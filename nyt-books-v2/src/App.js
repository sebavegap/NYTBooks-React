//import de react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

//import de componentes
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Books from "./pages/Books";


function App() {
  return (
    <div className="App">
      {/* aqui iran los componentes, rodeados de browserrouter y navigation, routes y path
       */}
       <Home></Home>
    </div>
  );
}

export default App;
