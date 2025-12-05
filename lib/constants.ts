export const isProductionEnvironment = process.env.NODE_ENV === "production";
export const isDevelopmentEnvironment = process.env.NODE_ENV === "development";
export const isTestEnvironment = Boolean(
  process.env.PLAYWRIGHT_TEST_BASE_URL ||
    process.env.PLAYWRIGHT ||
    process.env.CI_PLAYWRIGHT
);

// Registration can be enabled/disabled via environment variable
// Set REGISTRATION_ENABLED=true to allow new user registration
export const isRegistrationEnabled =
  process.env.REGISTRATION_ENABLED === "true";
