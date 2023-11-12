import { useAtom } from "jotai";
import { accessToken } from "../../store/user";
import useInterval from "../../hooks/useInterval";
import { Navigate } from "react-router-dom";

export default function AccessTokenHolder() {
  const [data, dispatch] = useAtom(accessToken);

  const [, stop] = useInterval({
    defaultCallback: () => {
      dispatch({ type: "refetch" });
    },
    delay: 3000,
  });

  if (data != null) {
    stop();
    return <Navigate to="/" />;
  }

  return <div>Wait for user authenticated...</div>;
}
