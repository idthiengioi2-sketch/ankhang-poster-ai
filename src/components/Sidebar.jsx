import {
  Gift,
  ImagePlus,
  LayoutDashboard,
  Package,
  Settings,
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
      id: "promotions",
      title: "Kho khuyến mãi",
      icon: Gift,
    },
    {
      id: "settings",
      title: "Cài đặt cửa hàng",
      icon: Settings,
    },
    {
      id: "dashboard",
      title: "Dashboard",
      icon: LayoutDashboard,
    },
  ];

  return (
    <aside className="w-72 min-h-screen shrink-0 bg-gradient-to-b from-green-700 to-green-500 text-white p-6 shadow-xl">
      <div className="mb-10">
        <div className="w-16 h-16 rounded-3xl bg-white text-green-700 grid place-items-center font-black text-2xl shadow-xl mb-4">
          AK
        </div>

        <h1 className="text-3xl font-black">
          An Khang
        </h1>

        <p className="text-green-100 mt-1">
          Poster AI 1.2
        </p>
      </div>

      <nav className="space-y-3">
        {menus.map((item) => {
          const Icon = item.icon;
          const active = page === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={[
                "w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition font-bold text-left",
                active
                  ? "bg-white text-green-700 shadow-lg"
                  : "text-white hover:bg-white/10",
              ].join(" ")}
            >
              <Icon size={22} />
              <span>{item.title}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-12 bg-white/10 rounded-2xl p-4">
        <p className="font-bold">
          Phiên bản
        </p>

        <p className="text-green-100 text-sm mt-1">
          Promotion Library
        </p>
      </div>
    </aside>
  );
}