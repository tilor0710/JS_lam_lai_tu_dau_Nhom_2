import jsonServer from "json-server";
import jsonServerAuth from "json-server-auth";
import { createServer as createViteServer } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const apiPort = 3000;

let apiServer;
let viteServer;

async function startServers() {
  apiServer = jsonServer.create();
  const router = jsonServer.router(resolve(projectRoot, "db.json"));

  apiServer.db = router.db;
  apiServer.use(jsonServer.defaults());
  apiServer.use(jsonServerAuth);
  apiServer.use(router);

  viteServer = await createViteServer({
    configFile: resolve(projectRoot, "vite.config.js"),
  });

  await new Promise((resolve, reject) => {
    apiServer.once("error", reject);
    apiServer.listen(apiPort, resolve);
  });
  await viteServer.listen();

  console.log(`JSON Server/Auth running at http://localhost:${apiPort}`);
  viteServer.printUrls();
}

async function stopServers() {
  await viteServer?.close();

  if (apiServer?.listening) {
    await new Promise((resolve) => apiServer.close(resolve));
  }
}

process.once("SIGINT", stopServers);
process.once("SIGTERM", stopServers);

startServers().catch(async (error) => {
  console.error("Failed to start the development servers:", error);
  await stopServers();
  process.exitCode = 1;
});
