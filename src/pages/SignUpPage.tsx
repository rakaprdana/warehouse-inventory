import { useState } from "react";
import { Button } from "../components/ui/button";
import { FormInput } from "../components/ui/input";
import { Link } from "react-router-dom";

export const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("SignUp attempt with", { name, email, password });
  };

  return (
    <main>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-background to-foreBackground">
        <form className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-fontBold">
            Sign Up
          </h2>
          <div className="flex flex-col items-center justify-center space-y-6">
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
            <Button text="Sign In" onClick={handleLogin} />
          </div>
          <p className="mt-4 text-center text-fontMedium text-sm">
            Already have an account?{" "}
            <Link to={"/"}>
              <a href="#" className="text-secondary hover:underline">
                Sign In
              </a>
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};
