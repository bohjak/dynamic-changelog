# Dynamic changelog
Fetches 2 schemas with a GET request, compares them, and displays the changelog.

# Configuration
The following options are specified through URLSearchParams:
| query | type | description |
| --- | --- | --- |
| urlTemplate | `string` | URL for the requests with simple templating - anything between two `%` will be replaced with corresponding value from `vars` |
| vars | `Record<string, string>` | Variables used for placeholder replacement; common to both requests |
| varsA | `Record<string, string>` | Variables for request A |
| varsB | `Record<string, string>` | Variables for request B |
| headers | `Record<string, string>` | HTTP headers; common to both requests |
| headersA | `Record<string, string>` | HTTP headers for request A |
| headersB | `Record<string, string>` | HTTP headers for request B |

# Dev
This app is running on Svelte with TypeScript, built by Snowpack and Esbuild.

To start development server run
```
yarn start
```

To build run
```
yarn build
```
