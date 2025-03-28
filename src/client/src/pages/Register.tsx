
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";

export default function Register() {
  const [username, setUsername] = useState("");
  const [, setLocation] = useLocation();

  const register = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      if (!res.ok) throw new Error('Failed to register');
      return await res.json();
    },
    onSuccess: (data) => {
      setLocation(`/user-registered/${data.id}`);
    }
  });

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Register New User</h1>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <Button onClick={() => register.mutate()} className="w-full">
        Create User
      </Button>
    </div>
  );
}
