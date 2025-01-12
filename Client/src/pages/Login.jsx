import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogic = async (e) => {
    e.preventDefault();
    try {
      await LoginUser({ email, password });
      navigate("/dashboard");
      console.log("success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <form className="flex flex-col items-center gap-5" onSubmit={handleLogic}>
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
          type="email"
          required
        />
        <Input
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your email..."
          type="password"
          required
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
