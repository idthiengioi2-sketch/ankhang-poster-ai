import { Sparkles } from "lucide-react";

export default function PosterProductCard({ product }) {
  return (
    <div className="bg-white rounded-3xl p-4 text-center shadow-xl min-h-[255px]">
      <div className="h-[110px] bg-slate-100 rounded-2xl grid place-items-center overflow-hidden text-slate-400">

        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <Sparkles size={42} />
        )}

      </div>

      <h3 className="text-[20px] leading-tight font-black mt-3 h-12 overflow-hidden">
        {product.name || "Tên sản phẩm"}
      </h3>

      {product.oldPrice && (
        <p className="text-slate-400 line-through mt-2">
          {product.oldPrice}
        </p>
      )}

      <p className="text-red-600 text-3xl font-black mt-1">
        {product.price || "Giá KM"}
      </p>

      <div className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full font-black text-sm mt-2">
        {product.promo || "Ưu đãi"}
      </div>
    </div>
  );
}