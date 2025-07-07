/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/** @type {import("next").NextConfig} */
const config = {
  webpack: (config) => {
    config.resolve.alias['@prisma/client'] = require.resolve('@prisma/client')
    return config
  },
};

export default config;
