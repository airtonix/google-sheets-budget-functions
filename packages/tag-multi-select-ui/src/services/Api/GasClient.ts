import { GASClient } from "gas-client";

export const GasClient = new GASClient({
  // this is necessary for local development but will be ignored in production
  allowedDevelopmentDomains: `https://localhost:${process.env.PORT}`,
});
