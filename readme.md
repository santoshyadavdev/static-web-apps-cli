<p align="center">
    <h2 align="center">Azure Static Web Apps CLI</h2>
</p>
<p align="center">
    <img align="center" src="docs/swa-emu-icon.png" width="300">
</p>

The Static Web Apps CLI, also known as SWA CLI, serves as a local development tool for [Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps). It can:

- Serve static static app assets, or proxy to your app dev server
- Serve API requests, or proxy to APIs running in Azure Functions Core Tools
- Emulate authentication and authorization
- Emulate Static Web Apps configuration, including routing

**Static Web Apps CLI is in preview.** If you have suggestions or you encounter issues, please report them or help us fix them. Your contributions are very much appreciated. 🙏

## Quickstart

Using `npm` or `yarn`:

- Install the cli: `npm install -g @azure/static-web-apps-cli`
- Open a SWA app folder at the root (outside any /api or /app folders): `cd my-awesome-swa-app`
- Start the emulator: `swa start`
- Access your SWA app from `http://localhost:4280`

> Note: The cli can also be installed locally as a devDependency: `npm install -D @azure/static-web-apps-cli`

Using `npx`:

- Open a SWA app folder at the root (outside any /api or /app folders): `cd my-awesome-swa-app`
- Start the emulator: `npx @azure/static-web-apps-cli start`
- Access your SWA app from `http://localhost:4280`

## Start the emulator

### Serve from a folder

By default, CLI starts and serves any the static content from the current working directory `./`:

```bash
swa start
```

However, you can override this behavior. If the artifact folder of your static app is under a different folder (e.g. `./my-dist`), then run the CLI and provide that folder:

```bash
swa start ./my-dist
```

### Serve both the static app and API

If your project includes API functions, install [Azure Functions Core Tools](https://github.com/Azure/azure-functions-core-tools):

```bash
npm install -g azure-functions-core-tools@3 --unsafe-perm true
```

Run the CLI and provide the folder that contains the API backend (a valid Azure Functions App project):

```bash
swa start ./my-dist --api ./api-folder
```

### Serve from a dev server

When developing your frontend app locally, it's often useful to use the dev server that comes with your frontend framework's CLI to serve your app content. Using the framework CLI allows you to use built-in features like the livereload and HMR (hot module replacement).

To use SWA CLI with your local dev server, follow these two steps:

1. Start your local dev server (as usual). For example, if you are using Angular: `ng serve`
1. Run `swa start` with the URI provided by the dev server, in the following format:

```bash
swa start http://<APP_DEV_SERVER_HOST>:<APP_DEV_SERVER_PORT>
```

Here is a list of the default ports used by popular dev servers:

| Tool                                                                               | Port | Command                           |
| ---------------------------------------------------------------------------------- | ---- | --------------------------------- |
| [Angular](https://angular.io/cli)                                                  | 4200 | `swa start http://localhost:4200` |
| [Vue](https://cli.vuejs.org/)                                                      | 8080 | `swa start http://localhost:8080` |
| [Vite](https://github.com/vitejs/vite/)                                            | 3000 | `swa start http://localhost:3000` |
| [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)           | 3000 | `swa start http://localhost:3000` |
| [Blazor WebAssembly](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor)     | 5000 | `swa start http://localhost:5000` |
| [Webpack Dev Server](https://github.com/webpack/webpack-dev-server)                | 8080 | `swa start http://localhost:8080` |
| [Parcel](https://parceljs.org/cli.html)                                            | 1234 | `swa start http://localhost:1234` |
| [Stencil](https://stenciljs.com/docs/dev-server)                                   | 3333 | `swa start http://localhost:3333` |
| [Hugo](https://gohugo.io/commands/hugo_server/)                                    | 1313 | `swa start http://localhost:1313` |
| [Elm (live server)](https://github.com/wking-io/elm-live/)                         | 8000 | `swa start http://localhost:8000` |
| [Ionic](https://ionicframework.com/docs/cli/commands/serve/)                       | 8100 | `swa start http://localhost:8100` |
| [Svelte (sirv-cli)](https://github.com/lukeed/sirv/tree/master/packages/sirv-cli/) | 5000 | `swa start http://localhost:5000` |
| [Sapper](https://sapper.svelte.dev/)                                               | 3000 | `swa start http://localhost:3000` |
| [Scully.io](https://scully.io/)                                                    | 1668 | `swa start http://localhost:1668` |
| [Gatsby](https://www.gatsbyjs.com/docs/gatsby-cli/)                                | 8000 | `swa start http://localhost:8000` |
| [Nuxt.js](https://nuxtjs.org/)                                                     | 3000 | `swa start http://localhost:3000` |
| [Next.js](https://nextjs.org/)                                                     | 3000 | `swa start http://localhost:3000` |

### Serve with a local API backend dev server

When developing your backend locally, it's often useful to use the local API backend dev server to serve your API backend content. Using the backend server allows you to use built-in features like debugging and rich editor support.

To use the CLI with your local API backend dev server, follow these two steps:

1. Start your API using Azure Functions Core Tools: `func host start` or start debugging in VS Code.
2. Run the SWA CLI with the `--api` flag and the URI of the local API server, in the following format:

```bash
swa start ./my-dist --api http://localhost:7071
```

### Serve with both local API backend and fontend app dev servers

In a typical scenario, you're often developing both the front and backend of the app locally. To benefit from SWA features such as authentication and authorization, you can run the SWA CLI providing both dev server URIs:

```bash
swa start http://<APP_DEV_SERVER> --api=http://localhost:7071
```

## Configuration

If you need to override the default values, provide the following options:

| Options                          | Description                                         | Default   | Example                                              |
| -------------------------------- | --------------------------------------------------- | --------- | ---------------------------------------------------- |
| `--app-location`                 | set location for the static app source code         | `./`      | `--app-location="./my-project"`                      |
| `--app, --app-artifact-location` | set app artifact (dist) folder or dev server        | `./`      | `--app="./my-dist"` or `--app=http://localhost:4200` |
| `--api, --api-artifact-location` | set the API folder or dev server                    |           | `--api="./api"` or `--api=http://localhost:8083`     |
| `--api-port`                     | set the API server port                             | `7071`    | `--api-port=8082`                                    |
| `--host`                         | set the emulator host address                       | `0.0.0.0` | `--host=192.168.68.80`                               |
| `--port`                         | set the emulator port value                         | `4280`    | `--port=8080`                                        |
| `--ssl`                          | serving the app and API over HTTPS (default: false) | `false`   | `--ssl` or `--ssl=true`                              |
| `--ssl-cert`                     | SSL certificate to use for serving HTTPS            |           | `--ssl-cert="/home/user/ssl/example.crt"`            |
| `--ssl-key`                      | SSL key to use for serving HTTPS                    |           | `--ssl-key="/home/user/ssl/example.key"`             |

## Local authentication & authorization emulation

The CLI allows you to mock and read authentication & authorization credentials.

### Mocking credentials

When requesting the Static Web Apps login endpoints (`http://localhost:4280/.auth/login/<PROVIDER_NAME>`), you have access a local authentication UI allowing you to set fake user information.

### Reading credentials

When requesting the `http://localhost:4280/.auth/me` endpoint, a `clientPrincipal` containing the fake information will be returned by the authentication API.

Here is an example:

```json
{
  "clientPrincipal": {
    "identityProvider": "twitter",
    "userId": "<USER-UUID>",
    "userDetails": "<USER_NAME>",
    "userRoles": ["anonymous", "authenticated"]
  }
}
```

## High-level architecture

![swa cli architecture](./docs/swa-cli-architecture.png)

The SWA CLI is built on top of the following components:

- A **Reverse Proxy** is the heart of the SWA CLI; it's the piece that forwards all HTTP requests to the appropriate components:
  - `/.auth/**` requests are forwarded to the Auth emulator server.
  - `/api/**` requests are forwarded to the localhost API function (if available).
  - `/**` all other requests are forwarded to the static assets server (serving the front-end app).
- The **Auth emulator server** emulates the whole authentication flow.
- The **Static content server** serves the local app static content.
- The **Serverless API server** is served by Azure Functions Core Tools.

## Want to help? [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/azure/static-web-apps-cli/issues)

Want to file a bug, contribute some code, or improve the documentation? Excellent! Read up on our guidelines for [contributing](https://github.com/azure/static-web-apps-cli/blob/master/CONTRIBUTING.md) and then check out one of our issues in the list: [community-help](https://github.com/azure/static-web-apps-cli/issues).
