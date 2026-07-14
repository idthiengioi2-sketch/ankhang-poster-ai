import { BACKGROUNDS } from "../utils/backgrounds";

export default function BackgroundSelector({
  background,
  setBackground,
}) {
  return (
    <div className="mb-5">
      <label className="block mb-3 font-bold text-slate-700">
        Nền Poster
      </label>

      <div className="grid grid-cols-2 gap-3">
        {BACKGROUNDS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setBackground(item.id)}
            className={`rounded-2xl border-2 p-3 transition ${
              background === item.id
                ? "border-green-600 bg-green-50"
                : "border-slate-200 hover:bg-slate-50"
            }`}
          >
            <div
              className={`h-16 rounded-xl bg-gradient-to-br ${item.className}`}
            />

            <p className="mt-2 font-bold text-slate-700">
              {item.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}