import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Base URL defaults to the current origin
});

export const { signIn, signUp, signOut, useSession } = authClient;
