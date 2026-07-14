import {
  AlertTriangle,
  ArrowRight,
  Gift,
  ImagePlus,
  Package,
  Settings,
  Sparkles,
  Store,
} from "lucide-react";

import { loadData } from "../utils/storage.js";

const DEFAULT_PROFILE = {
  storeName: "NHÀ THUỐC AN KHANG",
  slogan: "Sức khỏe cho mọi nhà",
  hotline: "1900 1572",
  address: "",
  logo: "",
};

export default function Dashboard({ onNavigate }) {
  const products = loadData("ak_library_products", []);
  const promotions = loadData("ak_promotions", []);
  const posterProducts = loadData("ak_products", []);
  const storeProfile = loadData(
    "ak_store_profile",
    DEFAULT_PROFILE
  );

  const recentProducts = products.slice(-5).reverse();
  const recentPromotions = promotions.slice(-5).reverse();

  const stats = [
    {
      title: "Kho sản phẩm",
      value: products.length,
      description: "Sản phẩm đã lưu",
      icon: Package,
      iconClass: "bg-green-100 text-green-700",
      page: "products",
    },
    {
      title: "Kho khuyến mãi",
      value: promotions.length,
      description: "Nội dung dùng lại",
      icon: Gift,
      iconClass: "bg-red-100 text-red-700",
      page: "promotions",
    },
    {
      title: "Poster hiện tại",
      value: posterProducts.length,
      description: "Sản phẩm đang thiết kế",
      icon: ImagePlus,
      iconClass: "bg-blue-100 text-blue-700",
      page: "poster",
    },
  ];

  const missingItems = [];

  if (!storeProfile.logo) {
    missingItems.push("Logo nhà thuốc");
  }

  if (!storeProfile.address) {
    missingItems.push("Địa chỉ cửa hàng");
  }

  if (products.length === 0) {
    missingItems.push("Kho sản phẩm");
  }

  if (promotions.length === 0) {
    missingItems.push("Kho khuyến mãi");
  }

  return (
    <div className="mx-auto max-w-[1500px]">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 p-8 text-white shadow-lg">
        <div className="flex items-center justify-between gap-8">
          <div className="flex min-w-0 items-center gap-5">
            <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-3xl bg-white text-3xl font-black text-green-700 shadow-lg">
              {storeProfile.logo ? (
                <img
                  src={storeProfile.logo}
                  alt="Logo nhà thuốc"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                "AK"
              )}
            </div>

            <div className="min-w-0">
              <p className="font-bold text-green-100">
                Chào mừng trở lại
              </p>

              <h1 className="mt-1 truncate text-4xl font-black">
                {storeProfile.storeName}
              </h1>

              <p className="mt-2 text-lg text-green-100">
                {storeProfile.slogan}
              </p>

              <p className="mt-3 text-sm text-green-50">
                {storeProfile.address ||
                  "Chưa nhập địa chỉ cửa hàng"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("poster")}
            className="flex shrink-0 items-center gap-3 rounded-2xl bg-white px-6 py-4 font-black text-green-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <Sparkles size={22} />
            Tạo Poster ngay
          </button>
        </div>
      </section>

      {missingItems.length > 0 && (
        <section className="mt-6 flex items-start gap-4 rounded-3xl border border-orange-200 bg-orange-50 p-5">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-orange-100 text-orange-700">
            <AlertTriangle size={22} />
          </div>

          <div className="flex-1">
            <h2 className="font-black text-orange-800">
              Cần bổ sung dữ liệu
            </h2>

            <p className="mt-1 text-sm text-orange-700">
              {missingItems.join(" • ")}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              onNavigate(
                products.length === 0
                  ? "products"
                  : promotions.length === 0
                  ? "promotions"
                  : "settings"
              )
            }
            className="flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2 font-bold text-white transition hover:bg-orange-700"
          >
            Bổ sung ngay
            <ArrowRight size={17} />
          </button>
        </section>
      )}

      <section className="mt-6 grid grid-cols-3 gap-5">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <button
              type="button"
              key={item.title}
              onClick={() => onNavigate(item.page)}
              className="rounded-3xl border border-slate-100 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-slate-500">
                    {item.title}
                  </p>

                  <p className="mt-3 text-5xl font-black text-slate-800">
                    {item.value}
                  </p>

                  <p className="mt-2 text-sm text-slate-400">
                    {item.description}
                  </p>
                </div>

                <div
                  className={[
                    "grid h-14 w-14 place-items-center rounded-2xl",
                    item.iconClass,
                  ].join(" ")}
                >
                  <Icon size={27} />
                </div>
              </div>
            </button>
          );
        })}
      </section>

      <section className="mt-6 grid grid-cols-2 gap-6">
        <RecentProducts
          products={recentProducts}
          onNavigate={onNavigate}
        />

        <RecentPromotions
          promotions={recentPromotions}
          onNavigate={onNavigate}
        />
      </section>

      <section className="mt-6 grid grid-cols-[1fr_420px] gap-6">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800">
            Thao tác nhanh
          </h2>

          <p className="mt-1 text-slate-500">
            Đi thẳng đến công việc cần làm.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <QuickAction
              icon={ImagePlus}
              title="Tạo Poster"
              description="Thiết kế và xuất ảnh PNG"
              colorClass="bg-green-100 text-green-700"
              onClick={() => onNavigate("poster")}
            />

            <QuickAction
              icon={Package}
              title="Thêm sản phẩm"
              description="Quản lý kho sản phẩm"
              colorClass="bg-blue-100 text-blue-700"
              onClick={() => onNavigate("products")}
            />

            <QuickAction
              icon={Gift}
              title="Thêm khuyến mãi"
              description="Lưu nội dung dùng lại"
              colorClass="bg-red-100 text-red-700"
              onClick={() => onNavigate("promotions")}
            />

            <QuickAction
              icon={Settings}
              title="Thông tin cửa hàng"
              description="Logo, hotline và địa chỉ"
              colorClass="bg-orange-100 text-orange-700"
              onClick={() => onNavigate("settings")}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-green-100 text-green-700">
              <Store size={24} />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-800">
                Trạng thái hệ thống
              </h2>

              <p className="text-sm text-slate-500">
                Kiểm tra dữ liệu trước khi tạo poster
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <StatusRow
              label="Thông tin cửa hàng"
              ready={Boolean(
                storeProfile.storeName &&
                  storeProfile.hotline
              )}
            />

            <StatusRow
              label="Logo nhà thuốc"
              ready={Boolean(storeProfile.logo)}
            />

            <StatusRow
              label="Kho sản phẩm"
              ready={products.length > 0}
            />

            <StatusRow
              label="Kho khuyến mãi"
              ready={promotions.length > 0}
            />
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
            Dữ liệu đang được tự động lưu trên máy này.
          </div>
        </div>
      </section>
    </div>
  );
}

function RecentProducts({ products, onNavigate }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-800">
            Sản phẩm mới thêm
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            5 sản phẩm gần nhất trong kho
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate("products")}
          className="flex items-center gap-1 font-bold text-green-700"
        >
          Xem tất cả
          <ArrowRight size={17} />
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-4 rounded-2xl bg-slate-50 p-3"
          >
            <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-white text-slate-400">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <Package size={23} />
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate font-black text-slate-800">
                {product.name}
              </p>

              <p className="mt-1 text-sm font-bold text-red-600">
                {product.price || "Chưa nhập giá"}
              </p>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <EmptyState text="Chưa có sản phẩm trong kho." />
        )}
      </div>
    </div>
  );
}

function RecentPromotions({
  promotions,
  onNavigate,
}) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-800">
            Khuyến mãi mới thêm
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            5 nội dung gần nhất
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate("promotions")}
          className="flex items-center gap-1 font-bold text-green-700"
        >
          Xem tất cả
          <ArrowRight size={17} />
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {promotions.map((promotion) => (
          <div
            key={promotion.id}
            className="flex items-center gap-4 rounded-2xl bg-slate-50 p-3"
          >
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-red-100 text-red-700">
              <Gift size={23} />
            </div>

            <div className="min-w-0">
              <p className="truncate font-black text-slate-800">
                {promotion.name}
              </p>

              <p className="mt-1 truncate text-sm text-slate-500">
                {promotion.description ||
                  "Không có mô tả"}
              </p>
            </div>
          </div>
        ))}

        {promotions.length === 0 && (
          <EmptyState text="Chưa có khuyến mãi trong kho." />
        )}
      </div>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  title,
  description,
  colorClass,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 text-left transition hover:border-green-200 hover:bg-green-50"
    >
      <div
        className={[
          "grid h-12 w-12 shrink-0 place-items-center rounded-2xl",
          colorClass,
        ].join(" ")}
      >
        <Icon size={23} />
      </div>

      <div>
        <p className="font-black text-slate-800">
          {title}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>
    </button>
  );
}

function StatusRow({ label, ready }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
      <span className="font-bold text-slate-700">
        {label}
      </span>

      <span
        className={[
          "rounded-full px-3 py-1 text-xs font-black",
          ready
            ? "bg-green-100 text-green-700"
            : "bg-orange-100 text-orange-700",
        ].join(" ")}
      >
        {ready ? "Sẵn sàng" : "Cần bổ sung"}
      </span>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-200 py-8 text-center text-slate-400">
      {text}
    </div>
  );
}