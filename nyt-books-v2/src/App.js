// Importing React and necessary modules
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

// Importing components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Books from "./pages/Books";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Header component will be consistent across pages */}
        <Header />
        <Routes>
          {/* Define routes for Home and Books components */}
          <Route path="/" element={<Home />} />
          <Route path="/book/:bookId" element={<Books />} />
        </Routes>
        {/* Footer component will be consistent across pages */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
