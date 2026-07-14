import { useEffect, useMemo, useState } from "react";
import {
  ImagePlus,
  Package,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import ExcelTools from "../components/ExcelTools";
import { loadData, saveData } from "../utils/storage";

const EMPTY_FORM = {
  name: "",
  brand: "",
  category: "",
  price: "",
  oldPrice: "",
  promo: "",
  image: "",
};

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

  const [form, setForm] = useState(EMPTY_FORM);

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    saveData("ak_library_products", products);
  }, [products]);

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return products;
    }

    return products.filter((product) => {
      const searchableText = [
        product.name,
        product.brand,
        product.category,
        product.price,
        product.oldPrice,
        product.promo,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(keyword);
    });
  }, [products, search]);

  async function uploadFormImage(file) {
    if (!file) {
      return;
    }

    try {
      const imageBase64 = await fileToBase64(file);

      setForm((currentForm) => ({
        ...currentForm,
        image: imageBase64,
      }));
    } catch (error) {
      console.error(error);
      alert("Không thể đọc ảnh. Vui lòng chọn ảnh khác.");
    }
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
  }

  function saveProduct() {
    if (!form.name.trim()) {
      alert("Vui lòng nhập tên sản phẩm.");
      return;
    }

    const normalizedProduct = {
      name: form.name.trim(),
      brand: form.brand.trim(),
      category: form.category.trim(),
      price: form.price.trim(),
      oldPrice: form.oldPrice.trim(),
      promo: form.promo.trim(),
      image: form.image || "",
    };

    if (editingId) {
      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === editingId
            ? {
                ...product,
                ...normalizedProduct,
              }
            : product
        )
      );
    } else {
      setProducts((currentProducts) => [
        ...currentProducts,
        {
          id: crypto.randomUUID(),
          ...normalizedProduct,
        },
      ]);
    }

    resetForm();
  }

  function editProduct(product) {
    setEditingId(product.id);

    setForm({
      name: product.name || "",
      brand: product.brand || "",
      category: product.category || "",
      price: product.price || "",
      oldPrice: product.oldPrice || "",
      promo: product.promo || "",
      image: product.image || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function deleteProduct(id) {
    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa sản phẩm này?"
    );

    if (!confirmed) {
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.id !== id
      )
    );

    if (editingId === id) {
      resetForm();
    }
  }

  function importProducts(importedProducts) {
    if (!Array.isArray(importedProducts)) {
      return;
    }

    const validProducts = importedProducts.filter(
      (product) => product.name?.trim()
    );

    if (validProducts.length === 0) {
      alert("Không có sản phẩm hợp lệ để nhập.");
      return;
    }

    setProducts((currentProducts) => [
      ...currentProducts,
      ...validProducts,
    ]);
  }

  function clearAllProducts() {
    if (products.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa toàn bộ sản phẩm trong kho?"
    );

    if (!confirmed) {
      return;
    }

    setProducts([]);
    resetForm();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-800">
            Kho sản phẩm
          </h1>

          <p className="mt-2 text-slate-500">
            Lưu sản phẩm, nhập từ Excel và sử dụng lại khi tạo
            poster.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {products.length > 0 && (
            <button
              type="button"
              onClick={clearAllProducts}
              className="rounded-2xl bg-red-100 px-5 py-3 font-bold text-red-600 transition hover:bg-red-200"
            >
              Xóa tất cả
            </button>
          )}

          <div className="rounded-2xl bg-white px-5 py-3 shadow-sm">
            Tổng:{" "}
            <b className="text-green-700">
              {products.length}
            </b>{" "}
            sản phẩm
          </div>
        </div>
      </div>

      <div className="mt-8">
        <ExcelTools
          products={products}
          onImportProducts={importProducts}
        />
      </div>

      <div className="mt-6 grid grid-cols-[420px_1fr] gap-6">
        <section className="h-fit rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div
              className={[
                "grid h-12 w-12 place-items-center rounded-2xl",
                editingId
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700",
              ].join(" ")}
            >
              {editingId ? (
                <Pencil size={24} />
              ) : (
                <Plus size={24} />
              )}
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-800">
                {editingId
                  ? "Sửa sản phẩm"
                  : "Thêm sản phẩm"}
              </h2>

              {editingId && (
                <p className="mt-1 text-sm text-blue-600">
                  Đang chỉnh sửa sản phẩm đã lưu
                </p>
              )}
            </div>
          </div>

          <label className="mb-5 block cursor-pointer rounded-3xl border-2 border-dashed border-slate-300 p-5 transition hover:bg-slate-50">
            <div className="flex items-center justify-center gap-3 font-bold text-slate-600">
              <ImagePlus className="text-green-700" />
              Chọn ảnh sản phẩm
            </div>

            {form.image ? (
              <div className="mt-4 grid h-36 place-items-center overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={form.image}
                  alt="Ảnh sản phẩm"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : (
              <div className="mt-4 grid h-24 place-items-center rounded-2xl bg-slate-50 text-sm text-slate-400">
                Chưa chọn ảnh
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) =>
                uploadFormImage(event.target.files[0])
              }
            />
          </label>

          {form.image && (
            <button
              type="button"
              onClick={() =>
                setForm((currentForm) => ({
                  ...currentForm,
                  image: "",
                }))
              }
              className="mb-4 flex items-center gap-2 text-sm font-bold text-red-600"
            >
              <X size={16} />
              Xóa ảnh
            </button>
          )}

          <FormInput
            label="Tên sản phẩm"
            placeholder="Ví dụ: Listerine Cool Mint"
            value={form.name}
            onChange={(value) =>
              setForm({
                ...form,
                name: value,
              })
            }
          />

          <FormInput
            label="Thương hiệu"
            placeholder="Ví dụ: Listerine"
            value={form.brand}
            onChange={(value) =>
              setForm({
                ...form,
                brand: value,
              })
            }
          />

          <FormInput
            label="Danh mục"
            placeholder="Ví dụ: Chăm sóc răng miệng"
            value={form.category}
            onChange={(value) =>
              setForm({
                ...form,
                category: value,
              })
            }
          />

          <FormInput
            label="Giá khuyến mãi"
            placeholder="Ví dụ: 76.000đ"
            value={form.price}
            onChange={(value) =>
              setForm({
                ...form,
                price: value,
              })
            }
          />

          <FormInput
            label="Giá cũ"
            placeholder="Ví dụ: 169.000đ"
            value={form.oldPrice}
            onChange={(value) =>
              setForm({
                ...form,
                oldPrice: value,
              })
            }
          />

          <FormInput
            label="Khuyến mãi / Quà tặng"
            placeholder="Ví dụ: Giảm sốc"
            value={form.promo}
            onChange={(value) =>
              setForm({
                ...form,
                promo: value,
              })
            }
          />

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={saveProduct}
              className={[
                "flex items-center justify-center gap-2 rounded-2xl py-4 font-black text-white transition",
                editingId
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-green-600 hover:bg-green-700",
              ].join(" ")}
            >
              {editingId ? (
                <Pencil size={20} />
              ) : (
                <Plus size={20} />
              )}

              {editingId
                ? "Cập nhật"
                : "Lưu sản phẩm"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-2xl bg-slate-100 py-4 font-black text-slate-600 transition hover:bg-slate-200"
            >
              Làm mới
            </button>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 p-5">
            <Search className="text-slate-400" />

            <input
              className="flex-1 text-lg outline-none"
              placeholder="Tìm theo tên, thương hiệu, danh mục..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-500"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="max-h-[calc(100vh-260px)] divide-y divide-slate-100 overflow-auto">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-5 transition hover:bg-slate-50"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-slate-100 text-slate-400">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <Package size={28} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-black text-slate-800">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {product.brand ||
                        "Chưa có thương hiệu"}{" "}
                      •{" "}
                      {product.category ||
                        "Chưa có danh mục"}
                    </p>

                    <div className="mt-1 flex items-center gap-3">
                      <p className="font-black text-red-600">
                        {product.price ||
                          "Chưa nhập giá"}
                      </p>

                      {product.oldPrice && (
                        <p className="text-slate-400 line-through">
                          {product.oldPrice}
                        </p>
                      )}
                    </div>

                    {product.promo && (
                      <span className="mt-2 inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-700">
                        {product.promo}
                      </span>
                    )}
                  </div>
                </div>

                <div className="ml-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => editProduct(product)}
                    className="grid h-10 w-10 place-items-center rounded-xl bg-blue-100 text-blue-600 transition hover:bg-blue-200"
                    title="Sửa sản phẩm"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      deleteProduct(product.id)
                    }
                    className="grid h-10 w-10 place-items-center rounded-xl bg-red-100 text-red-600 transition hover:bg-red-200"
                    title="Xóa sản phẩm"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <div className="p-12 text-center">
                <Package
                  size={60}
                  className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 text-xl font-black text-slate-600">
                  Không tìm thấy sản phẩm
                </h3>

                <p className="mt-2 text-slate-400">
                  Hãy thêm sản phẩm mới hoặc nhập từ
                  Excel.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function FormInput({
  label,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="mb-4">
      <label className="mb-2 block font-bold text-slate-700">
        {label}
      </label>

      <input
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
        placeholder={placeholder}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
      />
    </div>
  );
}