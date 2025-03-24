import { useState } from "react";
import { Button } from "../components/ui/button";
import { FormInput } from "../components/ui/input";
import { Link } from "react-router-dom";

export const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login attempt with", { email, password });
  };

  return (
    <main>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-background to-foreBackground">
        <form className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-fontBold">
            Login
          </h2>
          <div className="space-y-6">
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
            Don't have an account?{" "}
            <Link to={"/signup"}>
              <a className="text-secondary hover:underline">Sign up</a>
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};
