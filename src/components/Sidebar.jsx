import {
  ImagePlus,
  LayoutDashboard,
  Package,
} from "lucide-react";

export default function Sidebar({ page, setPage }) {
  const menus = [
    {
      id: "poster",
      title: "Tạo Poster",
      icon: ImagePlus,
    },
    {
      id: "products",
      title: "Kho sản phẩm",
      icon: Package,
    },
    {
      id: "dashboard",
      title: "Dashboard",
      icon: LayoutDashboard,
    },
  ];

  return (
    <aside className="w-72 bg-gradient-to-b from-green-700 to-green-500 text-white min-h-screen p-6 shadow-xl">

      <div className="mb-10">
        <h1 className="text-3xl font-black">
          An Khang
        </h1>

        <p className="text-green-100 mt-1">
          Poster AI v0.5
        </p>
      </div>

      <nav className="space-y-3">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition font-bold ${
                page === item.id
                  ? "bg-white text-green-700 shadow-lg"
                  : "hover:bg-white/10"
              }`}
            >
              <Icon size={22} />

              {item.title}
            </button>
          );
        })}
      </nav>

      <div className="mt-12 bg-white/10 rounded-2xl p-4">
        <p className="font-bold">
          Phiên bản
        </p>

        <p className="text-green-100 text-sm mt-1">
          v0.5 Development
        </p>
      </div>

    </aside>
  );
}