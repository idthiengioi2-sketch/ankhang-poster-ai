import { Gift, ImagePlus, Trash2 } from "lucide-react";
import { fileToBase64 } from "../utils/fileToBase64.js";

export default function ProductEditor({
  product,
  index,
  updateProduct,
  removeProduct,
  onOpenPromotionPicker,
}) {
  async function uploadImage(file) {
    if (!file) return;

    try {
      const image = await fileToBase64(file);
      updateProduct(product.id, "image", image);
    } catch (error) {
      console.error(error);
      alert("Không thể đọc ảnh. Vui lòng thử ảnh khác.");
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-black text-slate-800">
          Sản phẩm {index + 1}
        </h3>

        <button
          type="button"
          onClick={() => removeProduct(product.id)}
          className="grid h-10 w-10 place-items-center rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <label className="mb-4 block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 p-4 hover:bg-white">
        <div className="flex items-center justify-center gap-2 font-bold text-slate-600">
          <ImagePlus size={20} />
          Chọn ảnh
        </div>

        {product.image && (
          <div className="mt-3 grid h-28 place-items-center overflow-hidden rounded-xl bg-slate-100">
            <img
              src={product.image}
              alt={product.name || "Ảnh sản phẩm"}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) =>
            uploadImage(event.target.files?.[0])
          }
        />
      </label>

      <Input
        placeholder="Tên sản phẩm"
        value={product.name || ""}
        onChange={(value) =>
          updateProduct(product.id, "name", value)
        }
      />

      <Input
        placeholder="Giá khuyến mãi"
        value={product.price || ""}
        onChange={(value) =>
          updateProduct(product.id, "price", value)
        }
      />

      <Input
        placeholder="Giá cũ"
        value={product.oldPrice || ""}
        onChange={(value) =>
          updateProduct(product.id, "oldPrice", value)
        }
      />

      <div className="mt-2 flex gap-2">
        <input
          className="flex-1 rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-4 focus:ring-green-100"
          placeholder="Khuyến mãi"
          value={product.promo || ""}
          onChange={(event) =>
            updateProduct(
              product.id,
              "promo",
              event.target.value
            )
          }
        />

        {onOpenPromotionPicker && (
          <button
            type="button"
            onClick={() =>
              onOpenPromotionPicker(product.id)
            }
            className="rounded-xl bg-orange-500 px-3 text-white hover:bg-orange-600"
            title="Chọn từ kho khuyến mãi"
          >
            <Gift size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

function Input({ placeholder, value, onChange }) {
  return (
    <input
      className="mb-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-4 focus:ring-green-100"
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}