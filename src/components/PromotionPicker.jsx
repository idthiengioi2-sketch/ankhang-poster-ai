import { Gift, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { loadData } from "../utils/storage.js";

export default function PromotionPicker({
  open,
  onClose,
  onSelectPromotion,
}) {
  const [search, setSearch] = useState("");

  const promotions = loadData("ak_promotions", []);

  const filteredPromotions = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return promotions;
    }

    return promotions.filter((promotion) => {
      const name = promotion.name?.toLowerCase() || "";
      const description =
        promotion.description?.toLowerCase() || "";

      return (
        name.includes(keyword) ||
        description.includes(keyword)
      );
    });
  }, [promotions, search]);

  if (!open) {
    return null;
  }

  function selectPromotion(promotion) {
    onSelectPromotion(promotion);
    setSearch("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h2 className="text-3xl font-black text-slate-800">
              Chọn khuyến mãi
            </h2>

            <p className="mt-1 text-slate-500">
              Chọn nội dung khuyến mãi để áp dụng cho sản phẩm.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
            <Search className="text-slate-400" size={20} />

            <input
              className="flex-1 bg-transparent text-lg outline-none"
              placeholder="Tìm khuyến mãi..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          {filteredPromotions.length === 0 ? (
            <div className="py-16 text-center">
              <Gift
                size={64}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 text-2xl font-black text-slate-700">
                Chưa có khuyến mãi
              </h3>

              <p className="mt-2 text-slate-500">
                Hãy vào Kho khuyến mãi để tạo nội dung trước.
              </p>
            </div>
          ) : (
            <div className="grid max-h-[55vh] grid-cols-2 gap-4 overflow-auto pr-2">
              {filteredPromotions.map((promotion) => (
                <button
                  type="button"
                  key={promotion.id}
                  onClick={() =>
                    selectPromotion(promotion)
                  }
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-green-500 hover:bg-green-50"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-red-100 text-red-700">
                    <Gift size={24} />
                  </div>

                  <div>
                    <h3 className="font-black text-slate-800">
                      {promotion.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {promotion.description ||
                        "Không có mô tả"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}