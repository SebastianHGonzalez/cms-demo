import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="space-y-2 p-8">
      <h1 className="text-2xl font-black">Home</h1>
    </div>
  );
}
