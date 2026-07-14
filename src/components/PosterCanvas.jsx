import PosterProductCard from "./PosterProductCard";
import { getBackgroundById } from "../utils/backgrounds.js";
import {
  getAutoColumns,
  getGridColumns,
} from "../utils/layout.js";

const SIZE_CONFIG = {
  feed: {
    className: "w-[1080px] h-[1350px]",
    titleSize: "text-7xl",
    gridTop: "mt-9",
  },

  square: {
    className: "w-[1080px] h-[1080px]",
    titleSize: "text-6xl",
    gridTop: "mt-7",
  },

  story: {
    className: "w-[1080px] h-[1920px]",
    titleSize: "text-7xl",
    gridTop: "mt-12",
  },

  a4: {
    className: "w-[1240px] h-[1754px]",
    titleSize: "text-7xl",
    gridTop: "mt-12",
  },
};

const TEMPLATE_CONFIG = {
  green: {
    accent: "bg-green-700",
    text: "text-green-700",
    footerText: "text-green-700",
  },

  red: {
    accent: "bg-red-700",
    text: "text-red-700",
    footerText: "text-red-700",
  },

  yellow: {
    accent: "bg-orange-500",
    text: "text-orange-600",
    footerText: "text-orange-600",
  },

  tet: {
    accent: "bg-red-700",
    text: "text-red-700",
    footerText: "text-red-700",
  },
};

export default function PosterCanvas({
  posterRef,
  title,
  date,
  products = [],
  columns = "auto",
  posterSize = "feed",
  template = "green",
  background = "green",
  logo = "",
  storeName = "NHÀ THUỐC AN KHANG",
  slogan = "Sức khỏe cho mọi nhà",
  hotline = "1900 1572",
  address = "",
}) {
  const productCount = products.length;

  const effectiveColumns =
    columns === "auto"
      ? getAutoColumns(productCount)
      : Number(columns) || getAutoColumns(productCount);

  const gridClass = getGridColumns(effectiveColumns);

  const size =
    SIZE_CONFIG[posterSize] || SIZE_CONFIG.feed;

  const theme =
    TEMPLATE_CONFIG[template] ||
    TEMPLATE_CONFIG.green;

  const selectedBackground =
    getBackgroundById(background);

  return (
    <div
      ref={posterRef}
      className={[
        size.className,
        "relative overflow-hidden rounded-[36px] p-10",
        "bg-gradient-to-b",
        selectedBackground.className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10" />

      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/10" />

      <header className="relative z-10 flex items-center justify-between rounded-[30px] bg-white p-7 shadow-xl">
        <div className="flex min-w-0 items-center gap-5">
          {logo ? (
            <div className="grid h-24 w-28 shrink-0 place-items-center overflow-hidden rounded-3xl border border-slate-100 bg-white">
              <img
                src={logo}
                alt="Logo nhà thuốc"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ) : (
            <div
              className={[
                "grid h-24 w-24 shrink-0 place-items-center rounded-3xl text-3xl font-black text-white",
                theme.accent,
              ].join(" ")}
            >
              AK
            </div>
          )}

          <div className="min-w-0">
            <h1
              className={[
                "truncate text-5xl font-black",
                theme.text,
              ].join(" ")}
            >
              {storeName}
            </h1>

            <p className="mt-2 truncate text-2xl text-slate-500">
              {slogan}
            </p>
          </div>
        </div>

        <div className="ml-5 shrink-0 rounded-3xl bg-red-600 px-8 py-4 text-3xl font-black text-white shadow-lg">
          HOT
        </div>
      </header>

      <section className="relative z-10 mt-9 text-center text-white">
        <h2
          className={[
            size.titleSize,
            "font-black drop-shadow-lg",
          ].join(" ")}
        >
          {title}
        </h2>

        <p className="mt-3 text-3xl font-bold">
          Áp dụng: {date}
        </p>
      </section>

      <section
        className={[
          "relative z-10 grid gap-5",
          gridClass,
          size.gridTop,
        ].join(" ")}
      >
        {products.slice(0, 20).map((product) => (
          <PosterProductCard
            key={product.id}
            product={product}
            columns={effectiveColumns}
          />
        ))}
      </section>

      {products.length === 0 && (
        <div className="relative z-10 mt-12 rounded-3xl border-4 border-dashed border-white/50 bg-white/15 p-12 text-center text-3xl font-black text-white">
          Chưa có sản phẩm trên poster
        </div>
      )}

      <footer
        className={[
          "absolute bottom-8 left-10 right-10 z-20 rounded-3xl bg-white/95 px-8 py-4 font-black shadow-xl",
          theme.footerText,
        ].join(" ")}
      >
        <div className="flex items-center justify-between gap-8 text-2xl">
          <span>Cam kết hàng chính hãng</span>

          <span>
            Hotline: {hotline || "Chưa nhập"}
          </span>
        </div>

        {address && (
          <p className="mt-2 text-center text-base font-bold text-slate-600">
            Địa chỉ: {address}
          </p>
        )}
      </footer>
    </div>
  );
}