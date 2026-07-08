import PosterProductCard from "./PosterProductCard";

export default function PosterCanvas({
  posterRef,
  title,
  date,
  products,
}) {
  return (
    <div
      ref={posterRef}
      className="w-[1080px] h-[1350px] bg-gradient-to-b from-green-700 via-green-500 to-green-100 rounded-[36px] p-10 relative overflow-hidden"
    >
      <div className="bg-white rounded-[30px] p-7 flex justify-between items-center shadow">
        <div>
          <h1 className="text-5xl font-black text-green-700">
            NHÀ THUỐC AN KHANG
          </h1>
          <p className="text-2xl text-slate-500 mt-2">
            Sức khỏe cho mọi nhà
          </p>
        </div>

        <div className="bg-red-600 text-white px-8 py-4 rounded-3xl text-3xl font-black">
          HOT
        </div>
      </div>

      <div className="text-center text-white mt-9">
        <h2 className="text-7xl font-black drop-shadow">
          {title}
        </h2>
        <p className="text-3xl mt-3">
          Áp dụng: {date}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-5 mt-9">
        {products.slice(0, 20).map((product) => (
          <PosterProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      <div className="absolute left-10 right-10 bottom-8 bg-white/95 rounded-3xl px-8 py-5 flex justify-between text-green-700 text-2xl font-black">
        <span>Cam kết hàng chính hãng</span>
        <span>Hotline: 1900 1572</span>
      </div>
    </div>
  );
}