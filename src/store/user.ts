import { atom } from "jotai";
import { atomsWithQuery } from "jotai-tanstack-query";
import { uuid } from "short-uuid";
import * as apis from "@api";

export const sessionAtom = atom(uuid());

export const [accessToken, accessTokenStatus] = atomsWithQuery((get) => ({
  queryKey: [get(sessionAtom), "accessToken"],
  queryFn: async ({ queryKey: [session] }) => {
    const storedToken = sessionStorage.getItem("accessToken");
    if (storedToken != null) {
      return storedToken;
    }
    const { token } = await apis.accessToken(session as string);

    if (token != null) {
      sessionStorage.setItem("accessToken", token);
    }
    return token;
  },
  get,
}));

export const isLoginAtom = atom((get) => get(accessToken) != null);
