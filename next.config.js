/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import { withAxiom } from 'next-axiom';

/** @type {import("next").NextConfig} */
const config = {};

export default withAxiom(config);
