import { X, Search, Package, Plus } from "lucide-react";
import { getProductLibrary } from "../utils/productLibrary";

export default function ProductPicker({ open, onClose, onAddProducts }) {
  if (!open) return null;

  const products = getProductLibrary();

  function addProduct(product) {
    onAddProducts([
      {
        id: crypto.randomUUID(),
        name: product.name || "",
        price: product.price || "",
        oldPrice: product.oldPrice || "",
        promo: product.promo || "",
        image: product.image || "",
      },
    ]);
  }

  function addAllProducts() {
    const mapped = products.map((product) => ({
      id: crypto.randomUUID(),
      name: product.name || "",
      price: product.price || "",
      oldPrice: product.oldPrice || "",
      promo: product.promo || "",
      image: product.image || "",
    }));

    onAddProducts(mapped);
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[85vh] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-800">
              Chọn sản phẩm từ kho
            </h2>
            <p className="text-slate-500 mt-1">
              Thêm sản phẩm đã lưu vào poster.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 rounded-2xl bg-slate-100 grid place-items-center text-slate-600"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-6">
          {products.length > 0 && (
            <button
              onClick={addAllProducts}
              className="mb-5 bg-green-600 text-white px-5 py-3 rounded-2xl font-black flex items-center gap-2"
            >
              <Plus size={18} />
              Thêm tất cả sản phẩm vào poster
            </button>
          )}

          {products.length === 0 ? (
            <div className="text-center py-16">
              <Package size={64} className="mx-auto text-slate-300" />

              <h3 className="text-2xl font-black mt-4 text-slate-700">
                Kho sản phẩm đang trống
              </h3>

              <p className="text-slate-500 mt-2">
                Hãy vào mục Kho sản phẩm để thêm sản phẩm trước.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 max-h-[55vh] overflow-auto pr-2">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border border-slate-100 rounded-2xl p-4 flex items-center justify-between hover:bg-slate-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 grid place-items-center text-slate-400">
                      <Package size={24} />
                    </div>

                    <div>
                      <h3 className="font-black text-slate-800">
                        {product.name}
                      </h3>

                      <p className="text-slate-500 text-sm">
                        {product.brand || "Chưa có thương hiệu"}
                      </p>

                      <p className="text-red-600 font-black mt-1">
                        {product.price || "Chưa nhập giá"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => addProduct(product)}
                    className="bg-green-600 text-white px-4 py-2 rounded-xl font-bold"
                  >
                    Thêm
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}