import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function HappinessEntries() {
  const { data: entries, refetch } = useQuery({
    queryKey: ["/api/entries"],
  });

  useEffect(() => {
    refetch();
  }, []);

  // Sort entries by ID if entries exist
  const sortedEntries = entries?.slice().sort((a, b) => a.id - b.id);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Happiness Entries</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">User ID</th>
              <th className="px-4 py-2 text-left">Happiness Level</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Country</th>
              <th className="px-4 py-2 text-left">Region</th>
            </tr>
          </thead>
          <tbody>
            {sortedEntries?.map((entry) => (
              <tr key={entry.id} className="border-t">
                <td className="px-4 py-2">{entry.id}</td>
                <td className="px-4 py-2">
                  {new Date(entry.datetime).toLocaleString()}
                </td>
                <td className="px-4 py-2">{entry.userId}</td>
                <td className="px-4 py-2">{entry.happinessLevel}</td>
                <td className="px-4 py-2">{`(${entry.location[0]}, ${entry.location[1]})`}</td>
                <td className="px-4 py-2">{entry.country}</td>
                <td className="px-4 py-2">{entry.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}