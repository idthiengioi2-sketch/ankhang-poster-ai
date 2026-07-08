import { ImagePlus, LayoutDashboard } from "lucide-react";

export default function Sidebar({ page, setPage }) {
  const menu = [
    { id: "poster", label: "Tạo Poster", icon: ImagePlus },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  return (
    <aside className="w-80 min-h-screen bg-gradient-to-b from-green-700 to-green-500 text-white p-6 shrink-0">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 rounded-3xl bg-white text-green-700 grid place-items-center font-black text-2xl shadow-xl">
          AK
        </div>

        <div>
          <h1 className="text-3xl font-black leading-tight">An Khang</h1>
          <p className="text-green-100 font-semibold">Poster AI v0.1</p>
        </div>
      </div>

      <nav className="space-y-3">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = page === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={[
                "w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-left font-bold transition",
                active
                  ? "bg-white text-green-700 shadow-xl"
                  : "hover:bg-white/15",
              ].join(" ")}
            >
              <Icon size={22} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}