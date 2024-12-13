import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import LoginForm from "./Components/Auth/Login/LoginForm";
import RegisterForm from "./Components/Auth/Register/Register";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;
