import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Books from "./pages/Books";
import { BooksProvider } from './context/BooksContext';

function App() {
  return (
    <BooksProvider>
      <BrowserRouter>
        <div className="App d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book/:bookId" element={<Books />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </BooksProvider>
  );
}

export default App;