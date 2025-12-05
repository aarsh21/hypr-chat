import { redirect } from "next/navigation";
import { isRegistrationEnabled } from "@/lib/constants";
import { RegisterForm } from "./register-form";

export default function Page() {
  // Redirect to login if registration is disabled
  if (!isRegistrationEnabled) {
    redirect("/login");
  }

  return <RegisterForm />;
}
