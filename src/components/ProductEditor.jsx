import { Trash2, ImagePlus } from "lucide-react";

export default function ProductEditor({
  product,
  index,
  updateProduct,
  removeProduct,
  uploadImage,
}) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
      <div className="flex justify-between items-center mb-3">
        <b>Sản phẩm {index + 1}</b>

        <button
          onClick={() => removeProduct(product.id)}
          className="bg-red-100 text-red-600 p-2 rounded-xl"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <label className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 rounded-2xl p-4 mb-3 cursor-pointer hover:bg-white">
        <ImagePlus size={20} className="text-green-700" />
        <span className="font-bold text-slate-600">
          Chọn ảnh sản phẩm
        </span>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => uploadImage(product.id, e.target.files[0])}
        />
      </label>

      <Input
        placeholder="Tên sản phẩm"
        value={product.name}
        onChange={(value) => updateProduct(product.id, "name", value)}
      />

      <Input
        placeholder="Giá khuyến mãi"
        value={product.price}
        onChange={(value) => updateProduct(product.id, "price", value)}
      />

      <Input
        placeholder="Giá cũ"
        value={product.oldPrice}
        onChange={(value) => updateProduct(product.id, "oldPrice", value)}
      />

      <Input
        placeholder="Khuyến mãi / Quà tặng"
        value={product.promo}
        onChange={(value) => updateProduct(product.id, "promo", value)}
      />
    </div>
  );
}

function Input({ placeholder, value, onChange }) {
  return (
    <input
      className="w-full border border-slate-200 rounded-xl px-3 py-2 mb-2 outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}