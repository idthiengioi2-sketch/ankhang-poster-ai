const TEMPLATES = [
  {
    id: "green",
    name: "Xanh An Khang",
    desc: "Mẫu chuẩn thương hiệu",
    preview: "from-green-700 via-green-500 to-green-100",
  },
  {
    id: "red",
    name: "Đỏ khuyến mãi",
    desc: "Nổi bật chương trình giảm giá",
    preview: "from-red-700 via-red-500 to-red-100",
  },
  {
    id: "yellow",
    name: "Vàng nổi bật",
    desc: "Phù hợp flash sale",
    preview: "from-yellow-500 via-orange-300 to-yellow-100",
  },
  {
    id: "tet",
    name: "Tết",
    desc: "Không khí lễ Tết",
    preview: "from-red-700 via-yellow-400 to-red-100",
  },
];

export default function TemplateSelector({ template, setTemplate }) {
  return (
    <div className="mb-5">
      <label className="font-bold block mb-3">
        Template màu
      </label>

      <div className="grid grid-cols-2 gap-3">
        {TEMPLATES.map((item) => {
          const active = template === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setTemplate(item.id)}
              className={[
                "rounded-2xl border-2 p-3 text-left transition",
                active
                  ? "border-green-600 bg-green-50"
                  : "border-slate-200 bg-white hover:bg-slate-50",
              ].join(" ")}
            >
              <div
                className={`h-16 rounded-xl bg-gradient-to-br ${item.preview}`}
              />

              <p className="font-black text-slate-800 mt-3">
                {item.name}
              </p>

              <p className="text-slate-500 text-sm">
                {item.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}