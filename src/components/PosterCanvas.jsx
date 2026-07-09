import PosterProductCard from "./PosterProductCard";

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

const TEMPLATE_BG = {
  green: "from-green-700 via-green-500 to-green-100",
  red: "from-red-700 via-red-500 to-red-100",
  yellow: "from-yellow-500 via-orange-300 to-yellow-100",
  tet: "from-red-700 via-yellow-400 to-red-100",
};

export default function PosterCanvas({
  posterRef,
  title,
  date,
  products,
  columns = 4,
  posterSize = "feed",
  logo = "",
  hotline = "1900 1572",
  template = "green",
}) {
  const gridClass = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
  }[columns];

  const size = SIZE_CONFIG[posterSize] || SIZE_CONFIG.feed;
  const bg = TEMPLATE_BG[template] || TEMPLATE_BG.green;

  return (
    <div
      ref={posterRef}
      className={[
        size.className,
        `bg-gradient-to-b ${bg}`,
        "rounded-[36px] p-10 relative overflow-hidden",
      ].join(" ")}
    >
      <div className="bg-white rounded-[30px] p-7 flex justify-between items-center shadow">
        <div className="flex items-center gap-5">
          {logo ? (
            <div className="w-24 h-24 rounded-3xl bg-white grid place-items-center overflow-hidden border border-slate-100">
              <img
                src={logo}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-3xl bg-green-700 text-white grid place-items-center font-black text-3xl">
              AK
            </div>
          )}

          <div>
            <h1 className="text-5xl font-black text-green-700">
              NHÀ THUỐC AN KHANG
            </h1>

            <p className="text-2xl text-slate-500 mt-2">
              Sức khỏe cho mọi nhà
            </p>
          </div>
        </div>

        <div className="bg-red-600 text-white px-8 py-4 rounded-3xl text-3xl font-black">
          HOT
        </div>
      </div>

      <div className="text-center text-white mt-9">
        <h2 className={`${size.titleSize} font-black drop-shadow`}>
          {title}
        </h2>

        <p className="text-3xl mt-3">
          Áp dụng: {date}
        </p>
      </div>

      <div className={`grid ${gridClass} gap-5 ${size.gridTop}`}>
        {products.slice(0, 20).map((product) => (
          <PosterProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      <div className="absolute left-10 right-10 bottom-8 bg-white/95 rounded-3xl px-8 py-5 flex justify-between text-green-700 text-2xl font-black">
        <span>Cam kết hàng chính hãng</span>
        <span>Hotline: {hotline}</span>
      </div>
    </div>
  );
}