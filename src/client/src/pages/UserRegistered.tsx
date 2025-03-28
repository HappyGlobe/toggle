
import { useQuery } from "@tanstack/react-query";

export default function UserRegistered({ params }: { params: { id: string } }) {
  const { data: user } = useQuery({
    queryKey: [`/api/users/${params.id}`],
    refetchOnMount: true,
  });

  return (
    <div className="max-w-md mx-auto text-center space-y-4">
      <h1 className="text-2xl font-bold">User Registered Successfully</h1>
      <p>The 6-digit user-id is:</p>
      <p className="text-4xl font-bold">{user?.id.toString().padStart(6, '0')}</p>
    </div>
  );
}
