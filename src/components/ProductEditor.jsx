import { Gift, ImagePlus, Trash2 } from "lucide-react";
import { fileToBase64 } from "../utils/fileToBase64";

export default function ProductEditor({
  product,
  index,
  updateProduct,
  removeProduct,
  onOpenPromotionPicker,
}) {
  async function uploadImage(file) {
    if (!file) return;

    const image = await fileToBase64(file);
    updateProduct(product.id, "image", image);
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-black text-slate-800">
          Sản phẩm {index + 1}
        </h3>

        <button
          onClick={() => removeProduct(product.id)}
          className="w-10 h-10 rounded-xl bg-red-100 text-red-600 grid place-items-center hover:bg-red-200"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <label className="block border-2 border-dashed border-slate-300 rounded-2xl p-4 cursor-pointer hover:bg-white mb-4">
        <div className="flex items-center justify-center gap-2 text-slate-600 font-bold">
          <ImagePlus size={20} />
          Chọn ảnh
        </div>

        {product.image && (
          <div className="mt-3 h-28 bg-slate-100 rounded-xl grid place-items-center overflow-hidden">
            <img
              src={product.image}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => uploadImage(e.target.files[0])}
        />
      </label>

      <Input
        placeholder="Tên sản phẩm"
        value={product.name}
        onChange={(v) =>
          updateProduct(product.id, "name", v)
        }
      />

      <Input
        placeholder="Giá khuyến mãi"
        value={product.price}
        onChange={(v) =>
          updateProduct(product.id, "price", v)
        }
      />

      <Input
        placeholder="Giá cũ"
        value={product.oldPrice}
        onChange={(v) =>
          updateProduct(product.id, "oldPrice", v)
        }
      />

      <div className="flex gap-2 mt-2">
        <input
          className="flex-1 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-4 focus:ring-green-100"
          placeholder="Khuyến mãi"
          value={product.promo}
          onChange={(e) =>
            updateProduct(
              product.id,
              "promo",
              e.target.value
            )
          }
        />

        <button
          type="button"
          onClick={() =>
            onOpenPromotionPicker(product.id)
          }
          className="px-3 rounded-xl bg-orange-500 text-white hover:bg-orange-600"
          title="Chọn từ kho khuyến mãi"
        >
          <Gift size={18} />
        </button>
      </div>
    </div>
  );
}

function Input({
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      className="w-full border border-slate-200 rounded-xl px-3 py-2 mb-2 outline-none focus:ring-4 focus:ring-green-100"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}