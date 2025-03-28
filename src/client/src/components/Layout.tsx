import { Link, useLocation } from "wouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ["/api/users/me"],
  });

  const handleLogout = () => {
    queryClient.setQueryData(["/api/users/me"], null);
    setLocation("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {user && <span>User ID: {user.id}</span>}
            <nav className="flex gap-4">
              <Link href="/" className={location === "/" ? "font-bold" : ""}>Home</Link>
              <Link href="/happiness-map" className={location === "/happiness-map" ? "font-bold" : ""}>Happiness Map</Link>
              <Link href="/happiness-entries" className={location === "/happiness-entries" ? "font-bold" : ""}>Happiness Entries</Link>
              <Link href="/trends" className={location === "/trends" ? "font-bold" : ""}>Trends</Link>
            </nav>
          </div>
          <div>
            {user ? (
              <Button onClick={handleLogout}>Sign Out</Button>
            ) : (
              <Button onClick={() => setLocation("/login")}>Sign In</Button>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow p-6">
          {children}
        </div>
      </main>
    </div>
  );
}