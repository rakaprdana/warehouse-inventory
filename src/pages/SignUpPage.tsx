import { useState } from "react";
import { Button } from "../components/ui/button";
import { FormInput } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useAuth } from "../middleware/auth-context";

export const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API = import.meta.env.VITE_API_BASE_URL;
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/auth/signup`, {
        name,
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        login(response.data.token);
        navigate("/dashboard");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data.errors) {
        alert(error.response?.data?.message || "SignUp failed");
      }
    }
  };

  return (
    <main>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-background to-foreBackground">
        <form
          onSubmit={handleSignUp}
          className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-fontBold">
            Sign Up
          </h2>
          <div className="space-y-6">
            <FormInput
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormInput
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button text="Sign Up" type="submit" />
          </div>
          <p className="mt-4 text-center text-fontMedium text-sm">
            Already have an account?{" "}
            <Link to={"/"} className="text-secondary hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};
