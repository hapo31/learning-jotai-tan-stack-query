import * as apis from "@api";
import { atomsWithQuery } from "jotai-tanstack-query";
import { isLoginAtom } from "./user";

export const [favoritesAtom] = atomsWithQuery((get) => ({
  queryKey: ["favorites"],
  queryFn: async () => {
    const login = get(isLoginAtom);
    if (!login) {
      return [];
    }
    const res = await apis.favorites();

    return res;
  },
}));
