import { useEffect, useRef, useState } from "react";
import { Download, Plus } from "lucide-react";

import { loadData, saveData } from "../utils/storage";
import { exportPNG } from "../utils/exportPNG";

import ProductEditor from "../components/ProductEditor";
import PosterCanvas from "../components/PosterCanvas";

const SAMPLE_PRODUCTS = [
  {
    id: crypto.randomUUID(),
    name: "Blackmores Evening Primrose Oil",
    price: "959.000đ",
    oldPrice: "1.150.000đ",
    promo: "Tặng Vitamin E",
    image: "",
  },
  {
    id: crypto.randomUUID(),
    name: "Spring Leaf Collagen",
    price: "420.000đ",
    oldPrice: "560.000đ",
    promo: "Giảm 25%",
    image: "",
  },
];

export default function Poster() {
  const posterRef = useRef(null);

  const [title, setTitle] = useState(() =>
    loadData("ak_title", "KHUYẾN MÃI LỚN")
  );

  const [date, setDate] = useState(() =>
    loadData("ak_date", "06/07 - 19/07")
  );

  const [columns, setColumns] = useState(() =>
    loadData("ak_columns", 4)
  );

  const [posterSize, setPosterSize] = useState(() =>
    loadData("ak_poster_size", "feed")
  );

  const [products, setProducts] = useState(() =>
    loadData("ak_products", SAMPLE_PRODUCTS)
  );

  useEffect(() => {
    saveData("ak_title", title);
  }, [title]);

  useEffect(() => {
    saveData("ak_date", date);
  }, [date]);

  useEffect(() => {
    saveData("ak_columns", columns);
  }, [columns]);

  useEffect(() => {
    saveData("ak_poster_size", posterSize);
  }, [posterSize]);

  useEffect(() => {
    saveData("ak_products", products);
  }, [products]);

  function addProduct() {
    setProducts([
      ...products,
      {
        id: crypto.randomUUID(),
        name: "",
        price: "",
        oldPrice: "",
        promo: "",
        image: "",
      },
    ]);
  }

  function updateProduct(id, field, value) {
    setProducts(
      products.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  }

  function removeProduct(id) {
    setProducts(products.filter((item) => item.id !== id));
  }

  function uploadImage(id, file) {
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    updateProduct(id, "image", imageUrl);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800">
            Tạo Poster
          </h1>

          <p className="text-slate-500 mt-2">
            Upload ảnh, nhập giá và xuất PNG nhiều kích thước.
          </p>
        </div>

        <button
          onClick={() => exportPNG(posterRef.current)}
          className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-black flex items-center gap-2"
        >
          <Download size={20} />
          Tải PNG
        </button>
      </div>

      <div className="grid grid-cols-[480px_1fr] gap-6">
        <section className="bg-white rounded-3xl p-6 shadow-sm h-fit">
          <h2 className="text-2xl font-black mb-5">
            Thông tin chương trình
          </h2>

          <label className="font-bold block mb-2">
            Tiêu đề
          </label>

          <input
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 mb-4 outline-none focus:ring-4 focus:ring-green-100"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="font-bold block mb-2">
            Ngày khuyến mãi
          </label>

          <input
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 mb-4 outline-none focus:ring-4 focus:ring-green-100"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label className="font-bold block mb-2">
            Số cột sản phẩm
          </label>

          <select
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 mb-4 outline-none focus:ring-4 focus:ring-green-100 bg-white"
            value={columns}
            onChange={(e) => setColumns(Number(e.target.value))}
          >
            <option value={2}>2 cột</option>
            <option value={3}>3 cột</option>
            <option value={4}>4 cột</option>
            <option value={5}>5 cột</option>
          </select>

          <label className="font-bold block mb-2">
            Kích thước Poster
          </label>

          <select
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 mb-5 outline-none focus:ring-4 focus:ring-green-100 bg-white"
            value={posterSize}
            onChange={(e) => setPosterSize(e.target.value)}
          >
            <option value="feed">
              Facebook / Zalo Feed (1080×1350)
            </option>

            <option value="square">
              Facebook Vuông (1080×1080)
            </option>

            <option value="story">
              Story (1080×1920)
            </option>

            <option value="a4">
              A4 (1240×1754)
            </option>
          </select>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-black">
              Sản phẩm ({products.length})
            </h2>

            <button
              onClick={addProduct}
              className="bg-green-600 text-white px-4 py-3 rounded-2xl font-bold flex items-center gap-2"
            >
              <Plus size={18} />
              Thêm
            </button>
          </div>

          <div className="space-y-4 max-h-[680px] overflow-auto pr-1">
            {products.map((product, index) => (
              <ProductEditor
                key={product.id}
                product={product}
                index={index}
                updateProduct={updateProduct}
                removeProduct={removeProduct}
                uploadImage={uploadImage}
              />
            ))}
          </div>
        </section>

        <section className="bg-white rounded-3xl p-5 shadow-sm overflow-auto max-h-[calc(100vh-150px)]">
          <PosterCanvas
            posterRef={posterRef}
            title={title}
            date={date}
            products={products}
            columns={columns}
            posterSize={posterSize}
          />
        </section>
      </div>
    </div>
  );
}