// app/auth/verify-email/page.tsx
export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
      <h1 className="text-2xl font-bold mb-2">Check your email</h1>
      <p className="text-gray-600 max-w-md">
        We’ve sent you a magic link to log in. Click the link in your inbox to
        complete the sign-in process.
      </p>
    </div>
  );
}
