async function _fetch(
  endpoint: string,
  body: Record<string, unknown>,
  options: RequestInit = {},
  withCredentials = true
) {
  const token = sessionStorage.getItem("accessToken");
  const { VITE_HOST: host } = import.meta.env;
  const url = `https://${host}/api/${endpoint}`;

  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: JSON.stringify(
      Object.assign(
        withCredentials
          ? {
              i: token,
            }
          : {},
        {
          ...body,
        }
      )
    ),
    ...options,
  }).then((res) => res.json());
}

export async function accessToken(session: string) {
  try {
    const res = await _fetch(`/miauth/${session}/check`, {}, {}, false);
    if (!res.ok) {
      return { token: null };
    }
    return res as { token: string; user: unknown };
  } catch (e) {
    console.error(e);
    return { token: null };
  }
}

export async function favorites() {
  const data = await _fetch("/i/favorites", {
    limit: 10,
  });

  console.log(data);
  return data;
}
