import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { CreateAccount } from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await CreateAccount({ email, password, username });
      navigate("/login");
      console.log("success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={handleRegister}
      >
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
          type="email"
          required
        />
        <Input
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username..."
          type="text"
          required
        />
        <Input
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password..."
          type="password"
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Register;
