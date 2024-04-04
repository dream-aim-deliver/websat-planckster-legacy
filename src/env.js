import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    HIGHLIGHT_PROJECT_ID: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_ENABLE_TESTNETS: z.boolean(),
    NEXT_PUBLIC_INDEXER_URL: z.string(),
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: z.string(),
    NEXT_PUBLIC_FEE_WALLET_ADDRESS: z.string(),
    NEXT_PUBLIC_CHAIN_BASE_SEPOLIA_JSON_RPC: z.string(),
    NEXT_PUBLIC_CHAIN_BASE_MAINNET_JSON_RPC: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    HIGHLIGHT_PROJECT_ID: process.env.HIGHLIGHT_PROJECT_ID ?? "no-project-id",
    NEXT_PUBLIC_ENABLE_TESTNETS: process.env.NEXT_PUBLIC_ENABLE_TESTNETS?.trim().toLocaleLowerCase() === "true",
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID ?? "no-client-id",
    NEXT_PUBLIC_INDEXER_URL: process.env.NEXT_PUBLIC_INDEXER_URL ?? "http://localhost:8080",
    NEXT_PUBLIC_FEE_WALLET_ADDRESS: process.env.NEXT_PUBLIC_FEE_WALLET_ADDRESS ?? "0x",
    NEXT_PUBLIC_CHAIN_BASE_SEPOLIA_JSON_RPC: process.env.NEXT_PUBLIC_CHAIN_BASE_SEPOLIA_JSON_RPC ?? "http://localhost:8545",
    NEXT_PUBLIC_CHAIN_BASE_MAINNET_JSON_RPC: process.env.NEXT_PUBLIC_CHAIN_BASE_MAINNET_JSON_RPC ?? "http://localhost:8545",
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
