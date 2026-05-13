import { useNavigate, useLocation } from "react-router-dom";
import { handleError } from "../../util";
import { LogIn, UserPlus, Swords, LogOut, Home } from "lucide-react";
import Logo from "./Logo";

function Navbar({ mode, setMode, isRunning, isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('jwtToken');
    setIsAuthenticated(false);
    handleError("Logged out successfully");
    navigate('/');
  };

  return (
    <div className="w-full bg-[#252527] backdrop-blur-md border-b border-slate-700">
      <div className="mx-auto flex flex-wrap justify-between items-center gap-3 px-4 py-4 md:px-8 max-w-screen-xl">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl">
          <Logo />
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-slate-300">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              title={mode === "normal" ? "Survival Mode" : "Home"}
              onClick={() => {
                if (mode === "normal" && !isAuthenticated) {
                  handleError("Login first");
                  return;
                }
                if (mode === "normal") {
                  navigate("/survival");
                } else {
                  navigate("/normal");
                }
                setMode(mode === "normal" ? "survival" : "normal");
              }}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1f1f23] hover:bg-cyan-400/20 transition-all duration-150 sm:hidden"
            >
              {mode === "normal" ? <Swords size={18} /> : <Home size={18} />}
             
            </button>
            <span className="px-3 py-1.5 rounded-lg hover:bg-cyan-400/20 hover:text-cyan-300 active:bg-cyan-500/30 active:scale-95 cursor-pointer hidden sm:inline-flex transition-all duration-150"
              onClick={() => {
                if (mode === "normal" && !isAuthenticated) {
                  handleError("Login first");
                  return;
                }
                if (mode === "normal") {
                  navigate("/survival");
                } else {
                  navigate("/normal");
                }
                setMode(mode === "normal" ? "survival" : "normal");
              }}
            >
              {mode === "normal" ? "Survival Mode" : "Home"}
            </span>
          </div>

          {isAuthenticated ? (
            <>
              <button
                type="button"
                title="Logout"
                onClick={handleLogout}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1f1f23] hover:bg-cyan-400/20 transition-all duration-150 sm:hidden"
              >
                <LogOut size={18} />
              </button>
              <span className="px-3 py-1.5 rounded-lg hover:bg-cyan-400/20 hover:text-cyan-300 active:bg-cyan-500/30 active:scale-95 cursor-pointer hidden sm:inline-flex transition-all duration-150"
                onClick={handleLogout}
              >
                Logout
              </span>
            </>
          ) : (
            <>
              <button
                type="button"
                title="Login"
                onClick={() => navigate("/login")}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1f1f23] hover:bg-cyan-400/20 transition-all duration-150 sm:hidden"
              >
                <LogIn size={18} />
              </button>
              <button
                type="button"
                title="Signup"
                onClick={() => navigate("/signup")}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1f1f23] hover:bg-cyan-400/20 transition-all duration-150 sm:hidden"
              >
                <UserPlus size={18} />
              </button>
              <span className="px-3 py-1.5 rounded-lg hover:bg-cyan-400/20 hover:text-cyan-300 active:bg-cyan-500/30 active:scale-95 cursor-pointer hidden sm:inline-flex transition-all duration-150"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
              <span className="px-3 py-1.5 rounded-lg hover:bg-cyan-400/20 hover:text-cyan-300 active:bg-cyan-500/30 active:scale-95 cursor-pointer hidden sm:inline-flex transition-all duration-150"
                onClick={() => navigate("/signup")}
              >
                Signup
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;