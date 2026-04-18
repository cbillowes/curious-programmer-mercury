import "server-only";

import { stackClientApp } from "@/stack/client";
import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  inheritsFrom: stackClientApp,
});
