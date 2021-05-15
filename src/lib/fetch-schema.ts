function replacePlaceholder(vars: Record<string, string>) {
  return (word: string) => {
    const [, key] = word.match(/^%([\w-]+)%$/) ?? [];

    return key ? vars[key] : word;
  };
}

export function composeUrl(urlTemplate: string, vars: Record<string, string>) {
  return urlTemplate.split(/(%[\w-]+%)/).map(replacePlaceholder(vars)).join("");
}

export interface FetchOptions {
  urlTemplate: string;
  vars?: Record<string, string>;
  headers?: Record<string, string>;
}

export async function fetchSchema(args: FetchOptions) {
  const { urlTemplate, vars, headers } = args;

  const url = vars ? composeUrl(urlTemplate, vars) : urlTemplate;

  const resp = await fetch(url, {
    method: "GET",
    headers,
  });

  return resp.json();
}
