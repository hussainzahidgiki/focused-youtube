import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Watch from "./pages/Watch/Watch";
import './App.css'

function App() {
  return (
    <div className="App-header">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/watch" element={<Watch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
