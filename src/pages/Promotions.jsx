import { useEffect, useState } from "react";
import { Gift, Plus, Search, Trash2 } from "lucide-react";

import { loadData, saveData } from "../utils/storage";

export default function Promotions() {
  const [search, setSearch] = useState("");

  const [promotions, setPromotions] = useState(() =>
    loadData("ak_promotions", [])
  );

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    saveData("ak_promotions", promotions);
  }, [promotions]);

  const filteredPromotions = promotions.filter((promotion) =>
    promotion.name.toLowerCase().includes(search.toLowerCase())
  );

  function addPromotion() {
    if (!form.name.trim()) {
      alert("Vui lòng nhập tên khuyến mãi");
      return;
    }

    setPromotions([
      ...promotions,
      {
        id: crypto.randomUUID(),
        name: form.name.trim(),
        description: form.description.trim(),
      },
    ]);

    setForm({
      name: "",
      description: "",
    });
  }

  function deletePromotion(id) {
    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa khuyến mãi này?"
    );

    if (!confirmed) return;

    setPromotions(
      promotions.filter((promotion) => promotion.id !== id)
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-800">
            Kho khuyến mãi
          </h1>

          <p className="text-slate-500 mt-2">
            Lưu các nội dung khuyến mãi để sử dụng lại trên poster.
          </p>
        </div>

        <div className="bg-white rounded-2xl px-5 py-3 shadow-sm">
          Tổng:{" "}
          <b className="text-green-700">
            {promotions.length}
          </b>{" "}
          khuyến mãi
        </div>
      </div>

      <div className="grid grid-cols-[420px_1fr] gap-6 mt-8">
        <section className="bg-white rounded-3xl p-6 shadow-sm h-fit">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 grid place-items-center">
              <Gift size={24} />
            </div>

            <h2 className="text-2xl font-black text-slate-800">
              Thêm khuyến mãi
            </h2>
          </div>

          <label className="font-bold text-slate-700 block mb-2">
            Tên khuyến mãi
          </label>

          <input
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 mb-4 outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500"
            placeholder="Ví dụ: Giảm 20%"
            value={form.name}
            onChange={(event) =>
              setForm({
                ...form,
                name: event.target.value,
              })
            }
          />

          <label className="font-bold text-slate-700 block mb-2">
            Mô tả
          </label>

          <textarea
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 min-h-32 outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 resize-none"
            placeholder="Ví dụ: Áp dụng khi mua từ 2 sản phẩm"
            value={form.description}
            onChange={(event) =>
              setForm({
                ...form,
                description: event.target.value,
              })
            }
          />

          <button
            onClick={addPromotion}
            className="w-full mt-5 bg-green-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-green-700 transition"
          >
            <Plus size={20} />
            Lưu khuyến mãi
          </button>
        </section>

        <section className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-3">
            <Search className="text-slate-400" />

            <input
              className="outline-none flex-1 text-lg"
              placeholder="Tìm khuyến mãi..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <div className="divide-y divide-slate-100">
            {filteredPromotions.map((promotion) => (
              <div
                key={promotion.id}
                className="p-5 flex items-center justify-between hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-700 grid place-items-center">
                    <Gift size={25} />
                  </div>

                  <div>
                    <h3 className="font-black text-slate-800 text-lg">
                      {promotion.name}
                    </h3>

                    <p className="text-slate-500 text-sm mt-1">
                      {promotion.description ||
                        "Không có mô tả"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    deletePromotion(promotion.id)
                  }
                  className="w-10 h-10 rounded-xl bg-red-100 text-red-600 grid place-items-center"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            {filteredPromotions.length === 0 && (
              <div className="p-12 text-center text-slate-400">
                Chưa có khuyến mãi nào.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}