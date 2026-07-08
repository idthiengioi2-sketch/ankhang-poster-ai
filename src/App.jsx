import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Poster from "./pages/Poster";

export default function App() {
  const [page, setPage] = useState("poster");

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar page={page} setPage={setPage} />

      <main className="flex-1 p-6 overflow-auto">
        {page === "poster" && <Poster />}
        {page === "dashboard" && (
          <div>
            <h1 className="text-4xl font-black text-slate-800">Dashboard</h1>
            <p className="text-slate-500 mt-2">Sẽ nâng cấp ở v0.2</p>
          </div>
        )}
      </main>
    </div>
  );
}