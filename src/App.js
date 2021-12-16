import Home from "./pages/Home"
import { Routes, Route, Link } from "react-router-dom";
import Search from './pages/Search';
import Detail from './pages/Detail';
import Login from './pages/user/Login';
import Signup from "./pages/user/Signup";
import Price from "./pages/Price";
import AgentSignup from "./pages/Agent/Signup";


function App() {
 
  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/agent/signup" element={<AgentSignup />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/pricing" element={<Price />} />
      </Routes>
    </div>
  );
}

export default App;
