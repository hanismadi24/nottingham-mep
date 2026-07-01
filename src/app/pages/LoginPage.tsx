/*import { useState } from "react";
import api from "../services/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Success");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="p-10">
      <div className="max-w-md mx-auto space-y-4">
        <input
          className="border p-3 w-full"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="border p-3 w-full"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="bg-black text-white px-5 py-3"
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  );
}*/