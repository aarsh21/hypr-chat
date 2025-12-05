import { isRegistrationEnabled } from "@/lib/constants";
import { LoginForm } from "./login-form";

export default function Page() {
  return <LoginForm registrationEnabled={isRegistrationEnabled} />;
}
