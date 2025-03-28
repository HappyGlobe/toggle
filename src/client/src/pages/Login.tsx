
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) throw new Error('User not found');
      const user = await response.json();
      return user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/users/me"], user);
      setLocation("/");
    }
  });

  const handleLogin = () => {
    if (userId) {
      loginMutation.mutate();
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <Input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="6-digits user-id"
        maxLength={6}
      />
      <Button onClick={handleLogin} className="w-full">
        Login
      </Button>
      <div className="flex justify-between pt-4">
        <Link href="/register">Register new user</Link>
        <Link href="/users">List of registered users</Link>
      </div>
    </div>
  );
}
