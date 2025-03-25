import { useAuth } from "../../middleware/auth-context";
import { Button } from "./button";

export const Navbar = () => {
  const { logout } = useAuth();
  const handleLogOut = () => {
    logout();
  };
  return (
    <nav className="sticky top-0 z-10 w-full bg-gradient-to-r from-[#992626] to-primary shadow-md rounded-b-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-white font-extrabold text-3xl">Dashboard</h1>
        <Button text={"Log Out"} variant="submit" onClick={handleLogOut} />
      </div>
    </nav>
  );
};
