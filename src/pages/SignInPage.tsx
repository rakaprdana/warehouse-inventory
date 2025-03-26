import { ChangeEvent, useState } from "react";
import { Button } from "../components/ui/button";
import { FormInput } from "../components/ui/input";
import { Link } from "react-router-dom";
import { useAuth } from "../middleware/auth-context";
import { SignInType } from "../types/formdata";
import { useAuthUser } from "../hooks/useAuth";

export const SignInPage = () => {
  const [formData, setFormData] = useState<SignInType>({
    name: "",
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const { signIn } = useAuthUser();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    signIn(formData, login);
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
    <div className="relative flex items-center justify-center min-h-screen bg-[url('/assets/background2.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-fontBold opacity-50"></div>
      <form
        onSubmit={handleLogin}
        className="relative w-full max-w-md p-8 bg-white shadow-lg rounded-xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-fontBold">
          Login
        </h2>
        <div className="space-y-6">
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
          <Button text="Sign In" type="submit" />
        </div>
        <p className="mt-4 text-center text-fontMedium text-sm">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-secondary hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};
