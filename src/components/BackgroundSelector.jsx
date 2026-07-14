import { BACKGROUNDS } from "../utils/backgrounds.js";

export default function BackgroundSelector({
  background,
  setBackground,
}) {
  return (
    <div className="mb-5">
      <label className="mb-3 block font-bold text-slate-700">
        Nền Poster
      </label>

      <div className="grid grid-cols-2 gap-3">
        {BACKGROUNDS.map((item) => {
          const active = background === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setBackground(item.id)}
              className={[
                "rounded-2xl border-2 p-3 text-left transition",
                active
                  ? "border-green-600 bg-green-50"
                  : "border-slate-200 bg-white hover:bg-slate-50",
              ].join(" ")}
            >
              <div
                className={[
                  "h-16 rounded-xl bg-gradient-to-br",
                  item.className,
                ].join(" ")}
              />

              <p className="mt-3 font-black text-slate-800">
                {item.name}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
