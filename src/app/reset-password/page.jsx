import { Suspense } from "react";
import ResetPassword from "./ResetPassword";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20 text-gray-500">Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}
