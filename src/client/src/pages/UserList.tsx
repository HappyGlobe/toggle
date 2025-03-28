
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function UserList() {
  const [, setLocation] = useLocation();
  const { data: users, refetch } = useQuery({
    queryKey: ["/api/users"],
  });
  useEffect(() => {
    refetch();
  }, []);

  const handleUserClick = async (userId: string) => {
    // Add login logic here
    setLocation("/");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">List of Registered Users</h1>
      <div className="border rounded-lg divide-y">
        {users?.map((user: any) => (
          <div
            key={user.id}
            onClick={() => handleUserClick(user.id)}
            className="p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <span>User ID: {user.id.toString().padStart(6, '0')}</span>
              <span>{user.username}</span>
              <span>{new Date(user.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
