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

export default function PosterCanvas({
  posterRef,
  title,
  date,
  products,
  columns = 4,
  posterSize = "feed",
}) {
  const gridClass = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
  }[columns];

  const size = SIZE_CONFIG[posterSize] || SIZE_CONFIG.feed;

  return (
    <div
      ref={posterRef}
      className={[
        size.className,
        "bg-gradient-to-b from-green-700 via-green-500 to-green-100 rounded-[36px] p-10 relative overflow-hidden",
      ].join(" ")}
    >
      <div className="bg-white rounded-[30px] p-7 flex justify-between items-center shadow">
        <div>
          <h1 className="text-5xl font-black text-green-700">
            NHÀ THUỐC AN KHANG
          </h1>
          <p className="text-2xl text-slate-500 mt-2">
           100% hàng chính hãng
Minh bạch giá và nguồn gốc
Không tính phí cắt liều
Tư vấn đúng thuốc, đúng liều
          </p>
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
        <span>Nhà thuốc An Khang Mỹ Luông</span>
        <span>Hotline: 0931 113 747</span>
      </div>
    </div>
  );
}