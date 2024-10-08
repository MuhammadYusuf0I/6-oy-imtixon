import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import Details from "./pages/Details";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:id" element={<Details></Details>}></Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
