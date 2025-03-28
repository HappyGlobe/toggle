
import React from 'react';
import StatsMap from '@/components/ui/map';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HappinessMap() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="countries" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="countries">Countries</TabsTrigger>
          <TabsTrigger value="regions">Regions</TabsTrigger>
        </TabsList>
        <TabsContent value="countries">
          <StatsMap style={{position: 'absolute', width: '90vw'}} viewMode="countries"/>
        </TabsContent>
        <TabsContent value="regions">
          <StatsMap style={{position: 'absolute', width: '90vw'}} viewMode="regions"/>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// <h1 className="text-2xl text-center font-bold mb-4">Happiness Map</h1>