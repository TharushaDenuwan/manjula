import createApp from "@api/lib/create-app";
import configureOpenAPI from "@api/lib/open-api-config";
import { registerRoutes } from "@api/routes/registry";

import env from "./env";

const app = registerRoutes(createApp());

configureOpenAPI(app);

export type AppType = typeof app;

export default {
  port: env.PORT,
  fetch: app.fetch,
};

// // Test

// import createApp from "@api/lib/create-app";
// import configureOpenAPI from "@api/lib/open-api-config";
// import { registerRoutes } from "@api/routes/registry";
// import env from "./env";

// const app = registerRoutes(createApp());
// configureOpenAPI(app);

// const port = env.PORT;

// // Bun-compatible server
// Bun.serve({
//   port,
//   fetch: app.fetch, // Bun uses fetch handler
// });

// console.log(`🚀 API running on port ${port}`);
