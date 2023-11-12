import { Button } from "@mui/material";

import AccessTokenHolder from "./AccessTokenHolder";
import { useState } from "react";
import { useAtom } from "jotai";
import { sessionAtom } from "../../store/user";
import { uuid } from "short-uuid";

export default function Login() {
  const [waiting, setWaiting] = useState(false);
  const [session, setSession] = useAtom(sessionAtom);

  return (
    <div>
      <Button
        onClick={() => {
          const { VITE_HOST: host } = import.meta.env;
          openLink(
            `https://${host}/miauth/${session}?permission=read:account,read:favorites,write:note`
          );
          setWaiting(true);
        }}
        disabled={waiting}
      >
        Login
      </Button>
      {waiting && (
        <Button
          onClick={() => {
            setWaiting(false);
            setSession(uuid());
          }}
        >
          Cancel
        </Button>
      )}
      {waiting && <AccessTokenHolder />}
    </div>
  );
}

function openLink(href: string) {
  const a = document.createElement("a");
  a.href = href;
  a.setAttribute("rel", "noopener noreferrer");
  a.target = "_blank";
  a.click();
  a.remove();
}
