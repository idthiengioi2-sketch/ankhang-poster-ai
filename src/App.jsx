import { useState } from "react";

import Sidebar from "./components/Sidebar";
import StatusBar from "./components/StatusBar";

import Dashboard from "./pages/Dashboard";
import Poster from "./pages/Poster";
import Products from "./pages/Products";
import Promotions from "./pages/Promotions";
import Settings from "./pages/Settings";

export default function App() {
  const [page, setPage] = useState("dashboard");

  function navigateTo(nextPage) {
    setPage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar
        page={page}
        setPage={navigateTo}
      />

      <main className="flex-1 overflow-auto p-6">
        <StatusBar />

        {page === "dashboard" && (
          <Dashboard onNavigate={navigateTo} />
        )}

        {page === "poster" && <Poster />}

        {page === "products" && <Products />}

        {page === "promotions" && <Promotions />}

        {page === "settings" && <Settings />}
      </main>
    </div>
  );
}