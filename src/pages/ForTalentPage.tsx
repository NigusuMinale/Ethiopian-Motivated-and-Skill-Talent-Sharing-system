import React from "react";
import Navbar from "@/components/sections/Navbar";
import ForTalent from "@/components/sections/ForTalent";

export default function ForTalentPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24">
        <ForTalent />
      </main>
    </div>
  );
}
