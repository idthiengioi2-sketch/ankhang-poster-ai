import { Sparkles } from "lucide-react";
import { getCardSize } from "../utils/layout.js";

export default function PosterProductCard({
  product,
  columns = 4,
}) {
  const cardSize = getCardSize(columns);

  return (
    <div
      className={[
        "rounded-3xl bg-white p-4 text-center shadow-xl",
        cardSize.minHeight,
      ].join(" ")}
    >
      <div
        className={[
          "grid place-items-center overflow-hidden rounded-2xl bg-slate-100 text-slate-400",
          cardSize.imageHeight,
        ].join(" ")}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name || "Ảnh sản phẩm"}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <Sparkles size={42} />
        )}
      </div>

      <h3
        className={[
          "mt-3 overflow-hidden font-black leading-tight text-slate-800",
          cardSize.nameSize,
        ].join(" ")}
      >
        {product.name || "Tên sản phẩm"}
      </h3>

      {product.oldPrice && (
        <p className="mt-2 text-slate-400 line-through">
          {product.oldPrice}
        </p>
      )}

      <p
        className={[
          "mt-1 font-black text-red-600",
          cardSize.priceSize,
        ].join(" ")}
      >
        {product.price || "Giá KM"}
      </p>

      <div className="mt-2 inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-black text-red-700">
        {product.promo || "Ưu đãi"}
      </div>
    </div>
  );
}