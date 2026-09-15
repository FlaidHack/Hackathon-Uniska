"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("owner@test.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Email atau password salah.");
      return;
    }
    setEmail("");
    setPassword("");
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Katalyst</h1>
        <p className="text-sm text-gray-500 mb-6">Masuk ke akun bisnis kamu</p>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-600">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="owner@test.com" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button onClick={handleLogin} disabled={loading} className="w-full">
            {loading ? "Masuk..." : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
}
