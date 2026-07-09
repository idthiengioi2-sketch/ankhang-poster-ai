import { useEffect, useState } from "react";
import { Package, Plus, Search, Trash2, ImagePlus } from "lucide-react";

import { loadData, saveData } from "../utils/storage";

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

export default function Products() {
  const [search, setSearch] = useState("");

  const [products, setProducts] = useState(() =>
    loadData("ak_library_products", [])
  );

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    oldPrice: "",
    promo: "",
    image: "",
  });

  useEffect(() => {
    saveData("ak_library_products", products);
  }, [products]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  async function uploadFormImage(file) {
    if (!file) return;

    const imageBase64 = await fileToBase64(file);

    setForm({
      ...form,
      image: imageBase64,
    });
  }

  function addProduct() {
    if (!form.name.trim()) {
      alert("Vui lòng nhập tên sản phẩm");
      return;
    }

    setProducts([
      ...products,
      {
        id: crypto.randomUUID(),
        ...form,
      },
    ]);

    setForm({
      name: "",
      brand: "",
      category: "",
      price: "",
      oldPrice: "",
      promo: "",
      image: "",
    });
  }

  function deleteProduct(id) {
    setProducts(products.filter((product) => product.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-800">
            Kho sản phẩm
          </h1>

          <p className="text-slate-500 mt-2">
            Lưu sản phẩm một lần để sử dụng lại khi tạo poster.
          </p>
        </div>

        <div className="bg-white rounded-2xl px-5 py-3 shadow-sm">
          Tổng:{" "}
          <b className="text-green-700">
            {products.length}
          </b>{" "}
          sản phẩm
        </div>
      </div>

      <div className="grid grid-cols-[420px_1fr] gap-6 mt-8">
        <section className="bg-white rounded-3xl p-6 shadow-sm h-fit">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 grid place-items-center">
              <Plus size={24} />
            </div>

            <h2 className="text-2xl font-black text-slate-800">
              Thêm sản phẩm
            </h2>
          </div>

          <label className="block border-2 border-dashed border-slate-300 rounded-3xl p-5 mb-5 cursor-pointer hover:bg-slate-50">
            <div className="flex items-center justify-center gap-3 text-slate-600 font-bold">
              <ImagePlus className="text-green-700" />
              Chọn ảnh sản phẩm
            </div>

            {form.image && (
              <div className="mt-4 h-32 bg-slate-100 rounded-2xl grid place-items-center overflow-hidden">
                <img
                  src={form.image}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => uploadFormImage(event.target.files[0])}
            />
          </label>

          <FormInput
            label="Tên sản phẩm"
            value={form.name}
            onChange={(value) => setForm({ ...form, name: value })}
          />

          <FormInput
            label="Thương hiệu"
            value={form.brand}
            onChange={(value) => setForm({ ...form, brand: value })}
          />

          <FormInput
            label="Danh mục"
            value={form.category}
            onChange={(value) => setForm({ ...form, category: value })}
          />

          <FormInput
            label="Giá khuyến mãi"
            value={form.price}
            onChange={(value) => setForm({ ...form, price: value })}
          />

          <FormInput
            label="Giá cũ"
            value={form.oldPrice}
            onChange={(value) => setForm({ ...form, oldPrice: value })}
          />

          <FormInput
            label="Khuyến mãi / Quà tặng"
            value={form.promo}
            onChange={(value) => setForm({ ...form, promo: value })}
          />

          <button
            onClick={addProduct}
            className="w-full mt-4 bg-green-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-green-700 transition"
          >
            <Plus size={20} />
            Lưu sản phẩm
          </button>
        </section>

        <section className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-3">
            <Search className="text-slate-400" />
            <input
              className="outline-none flex-1 text-lg"
              placeholder="Tìm sản phẩm..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="divide-y divide-slate-100">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-5 flex items-center justify-between hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-slate-100 grid place-items-center text-slate-400 overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <Package size={28} />
                    )}
                  </div>

                  <div>
                    <h3 className="font-black text-slate-800 text-lg">
                      {product.name}
                    </h3>

                    <p className="text-slate-500 text-sm mt-1">
                      {product.brand || "Chưa có thương hiệu"} •{" "}
                      {product.category || "Chưa có danh mục"}
                    </p>

                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-red-600 font-black">
                        {product.price || "Chưa nhập giá"}
                      </p>

                      {product.oldPrice && (
                        <p className="text-slate-400 line-through">
                          {product.oldPrice}
                        </p>
                      )}
                    </div>

                    {product.promo && (
                      <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold mt-2">
                        {product.promo}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="w-10 h-10 rounded-xl bg-red-100 text-red-600 grid place-items-center"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <div className="p-10 text-center text-slate-400">
                Chưa có sản phẩm nào trong kho.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function FormInput({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="font-bold text-slate-700 block mb-2">
        {label}
      </label>

      <input
        className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}