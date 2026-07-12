import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Poster from "./pages/Poster";
import Products from "./pages/Products";
import Settings from "./pages/Settings";

export default function App() {
  const [page, setPage] = useState("poster");

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar page={page} setPage={setPage} />

      <main className="flex-1 p-6 overflow-auto">
        {page === "poster" && <Poster />}

        {page === "products" && <Products />}

        {page === "settings" && <Settings />}

        {page === "dashboard" && (
          <div>
            <h1 className="text-4xl font-black text-slate-800">
              Dashboard
            </h1>

            <p className="text-slate-500 mt-2">
              Tổng quan An Khang Poster AI.
            </p>

            <div className="grid grid-cols-3 gap-6 mt-8">
              <DashboardCard
                title="Tạo Poster"
                description="Tạo poster nhiều sản phẩm và xuất PNG."
              />

              <DashboardCard
                title="Kho sản phẩm"
                description="Lưu ảnh, giá và chương trình khuyến mãi."
              />

              <DashboardCard
                title="Cài đặt"
                description="Lưu logo và thông tin nhà thuốc."
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function DashboardCard({ title, description }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <h2 className="text-2xl font-black text-slate-800">
        {title}
      </h2>

      <p className="text-slate-500 mt-2">
        {description}
      </p>
    </div>
  );
}