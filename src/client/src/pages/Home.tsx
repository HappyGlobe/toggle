import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useGeocoding } from "@/lib/getRegionNames";

export default function Home() {
  const { getLocationInfo, locationInfo, loading, error } = useGeocoding();
  const [happinessLevel, setHappinessLevel] = useState("");
  const [coordinates, setCoordinates] = useState<string>("");
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const { data: user } = useQuery({
    queryKey: ["/api/users/me"],
  });

  const parseCoordinates = (coordStr: string): [number, number] => {
    const [x, y] = coordStr.split(',')
      .map(num => parseFloat(num.trim()));
    return [x, y];
  };

  const isValidCoordinates = (coordStr: string): boolean => {
    if (!coordStr) return false;
    const coords = coordStr.split(',');
    if (coords.length !== 2) return false;
    return coords.every(num => !isNaN(parseFloat(num.trim())));
  };

  const submitHappiness = useMutation({
    mutationFn: async () => {
      try {
        const [x, y] = parseCoordinates(coordinates);

        // Esperar a que se resuelva la información de ubicación
        const location = await getLocationInfo(x, y);

        if (!location) {
          throw new Error('Failed to get location information');
        }

        const res = await fetch('/api/entries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            userId: user.id,
            happinessLevel: happinessLevel,
            location: [x, y],
            country: location.country,
            region: location.state
          })
        });

        if (!res.ok) throw new Error('Failed to submit');
      } catch (error) {
        console.error('Error:', error);
        throw error; // Re-lanzar el error para que lo maneje onError
      }
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Happiness level submitted!" });
      setHappinessLevel("");
      setCoordinates("");
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: "Failed to submit happiness level. Please try again.", 
        variant: "destructive" 
      });
    }
  });

  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center space-y-4">
        <h1 className="text-2xl font-bold">Welcome to Happiness Tracker</h1>
        <p className="text-gray-600">Please sign in to submit your happiness level</p>
        <Button onClick={() => setLocation("/login")}>Sign In</Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Submit Your Happiness Level</h1>
      <Input
        type="number"
        min="0"
        max="100"
        value={happinessLevel}
        onChange={(e) => setHappinessLevel(e.target.value)}
        placeholder="Insert a number between 0-100"
      />
      <Input
        type="text"
        value={coordinates}
        onChange={(e) => setCoordinates(e.target.value)}
        placeholder="Enter coordinates (x,y)"
        className={!coordinates || isValidCoordinates(coordinates) ? "" : "border-red-500"}
      />
      <Button 
        onClick={() => submitHappiness.mutate()}
        disabled={
          submitHappiness.isPending || 
          !happinessLevel || 
          Number(happinessLevel) < 0 || 
          Number(happinessLevel) > 100 ||
          !isValidCoordinates(coordinates)
        }
      >
        {submitHappiness.isPending ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
}