import type { FetchOptions } from "./fetch-schema";

interface UrlOptions {
  urlTemplate?: string;
  vars?: Record<string, string>;
  varsA?: Record<string, string>;
  varsB?: Record<string, string>;
  headers?: Record<string, string>;
  headersA?: Record<string, string>;
  headersB?: Record<string, string>;
}

export const getFetchOptions = (): [
  optionsA: FetchOptions,
  optionsB: FetchOptions,
] => {
  const urlParams = new URLSearchParams(window.location.search);
  const optionsString = urlParams.get("options");
  if (!optionsString) throw new Error("No options object specified");
  const options: UrlOptions = JSON.parse(optionsString);

  const { urlTemplate, vars, varsA, varsB, headers, headersA, headersB } =
    options;

  if (!urlTemplate || typeof urlTemplate !== "string") {
    throw new Error("No request URL supplied");
  }

  const optionsA: FetchOptions = {
    urlTemplate,
    vars: { ...vars, ...varsA },
    headers: { ...headers, ...headersA },
  };

  const optionsB: FetchOptions = {
    urlTemplate,
    vars: { ...vars, ...varsB },
    headers: { ...headers, ...headersB },
  };

  return [optionsA, optionsB];
};
