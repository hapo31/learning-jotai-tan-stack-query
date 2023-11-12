import reactLogo from "../../assets/react.svg";
import "../../App.css";
import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import { isLoginAtom } from "../../store/user";
import { Button } from "@mui/material";

import { favoritesAtom } from "../../store/favorites";

function App() {
  const isLogin = useAtomValue(isLoginAtom);

  const favorites = useAtomValue(favoritesAtom);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Jotai + TanStackQuery</h1>
      <div>
        {isLogin && (
          <Button
            onClick={() => {
              sessionStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </Button>
        )}
      </div>
      <code>{JSON.stringify(favorites, null, "\t")}</code>
      {!isLogin && (
        <div className="card">
          <Link to="login">Login</Link>
        </div>
      )}
    </>
  );
}

export default App;
