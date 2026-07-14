import {
  CheckCircle2,
  Gift,
  ImagePlus,
  Package,
} from "lucide-react";

import { loadData } from "../utils/storage.js";

export default function StatusBar() {
  const products = loadData("ak_library_products", []);
  const promotions = loadData("ak_promotions", []);
  const posterProducts = loadData("ak_products", []);

  const savedTime = new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
      <div className="flex items-center gap-2 text-green-700">
        <CheckCircle2 size={20} />

        <div>
          <p className="font-black">
            Đã tự động lưu
          </p>

          <p className="text-xs text-slate-400">
            Cập nhật lúc {savedTime}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <StatusItem
          icon={Package}
          label="Sản phẩm"
          value={products.length}
          colorClass="bg-green-100 text-green-700"
        />

        <StatusItem
          icon={Gift}
          label="Khuyến mãi"
          value={promotions.length}
          colorClass="bg-red-100 text-red-700"
        />

        <StatusItem
          icon={ImagePlus}
          label="Đang thiết kế"
          value={posterProducts.length}
          colorClass="bg-blue-100 text-blue-700"
        />
      </div>
    </div>
  );
}

function StatusItem({
  icon: Icon,
  label,
  value,
  colorClass,
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
      <div
        className={[
          "grid h-8 w-8 place-items-center rounded-lg",
          colorClass,
        ].join(" ")}
      >
        <Icon size={17} />
      </div>

      <div>
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="font-black text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}