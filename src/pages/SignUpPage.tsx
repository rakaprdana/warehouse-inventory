import { ChangeEvent, useState } from "react";
import { Button } from "../components/ui/button";
import { FormInput } from "../components/ui/input";
import { Link } from "react-router-dom";
import { useAuth } from "../middleware/auth-context";
import { SignUpType } from "../interface/formdata";
import { useAuthUser } from "../hooks/useAuth";

export const SignUpPage = () => {
  const [formData, setFormData] = useState<SignUpType>({
    name: "",
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const { signUp } = useAuthUser();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    signUp(formData, login);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
            <FormInput
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
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
