import { useEffect } from "react";

import uuid from "short-uuid";

export default function Login() {
  useEffect(() => {
    const { HOST: host } = import.meta;
    const session = uuid();
    location.href = `https://${host}/miauth/${session}`;
  }, []);

  return <div>logging in...</div>;
}
