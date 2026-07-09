import { useEffect, useRef, useState } from "react";
import { Download, Plus, PackagePlus, ImagePlus } from "lucide-react";

import { loadData, saveData } from "../utils/storage";
import { exportPNG } from "../utils/exportPNG";

import ProductEditor from "../components/ProductEditor";
import PosterCanvas from "../components/PosterCanvas";
import ProductPicker from "../components/ProductPicker";

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

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Poster() {
  const posterRef = useRef(null);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [title, setTitle] = useState(() => loadData("ak_title", "KHUYẾN MÃI LỚN"));
  const [date, setDate] = useState(() => loadData("ak_date", "06/07 - 19/07"));
  const [columns, setColumns] = useState(() => loadData("ak_columns", 4));
  const [posterSize, setPosterSize] = useState(() => loadData("ak_poster_size", "feed"));
  const [logo, setLogo] = useState(() => loadData("ak_logo", ""));
  const [hotline, setHotline] = useState(() => loadData("ak_hotline", "1900 1572"));
  const [products, setProducts] = useState(() => loadData("ak_products", SAMPLE_PRODUCTS));

  useEffect(() => saveData("ak_title", title), [title]);
  useEffect(() => saveData("ak_date", date), [date]);
  useEffect(() => saveData("ak_columns", columns), [columns]);
  useEffect(() => saveData("ak_poster_size", posterSize), [posterSize]);
  useEffect(() => saveData("ak_logo", logo), [logo]);
  useEffect(() => saveData("ak_hotline", hotline), [hotline]);
  useEffect(() => saveData("ak_products", products), [products]);

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

  function addProductsFromLibrary(selectedProducts) {
    setProducts([...products, ...selectedProducts]);
    setPickerOpen(false);
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

  async function uploadLogo(file) {
    if (!file) return;
    const logoBase64 = await fileToBase64(file);
    setLogo(logoBase64);
  }

  return (
    <div>
      <ProductPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onAddProducts={addProductsFromLibrary}
      />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800">
            Tạo Poster
          </h1>

          <p className="text-slate-500 mt-2">
            Chọn sản phẩm từ kho, upload logo, nhập giá và xuất PNG.
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

          <label className="font-bold block mb-2">Tiêu đề</label>
          <input
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 mb-4 outline-none focus:ring-4 focus:ring-green-100"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="font-bold block mb-2">Ngày khuyến mãi</label>
          <input
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 mb-4 outline-none focus:ring-4 focus:ring-green-100"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label className="font-bold block mb-2">Hotline</label>
          <input
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 mb-4 outline-none focus:ring-4 focus:ring-green-100"
            value={hotline}
            onChange={(e) => setHotline(e.target.value)}
          />

          <label className="block border-2 border-dashed border-slate-300 rounded-3xl p-5 mb-5 cursor-pointer hover:bg-slate-50">
            <div className="flex items-center justify-center gap-3 text-slate-600 font-bold">
              <ImagePlus className="text-green-700" />
              Upload logo An Khang
            </div>

            {logo && (
              <div className="mt-4 h-24 bg-slate-100 rounded-2xl grid place-items-center overflow-hidden">
                <img
                  src={logo}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => uploadLogo(event.target.files[0])}
            />
          </label>

          <label className="font-bold block mb-2">Số cột sản phẩm</label>
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

          <label className="font-bold block mb-2">Kích thước Poster</label>
          <select
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 mb-5 outline-none focus:ring-4 focus:ring-green-100 bg-white"
            value={posterSize}
            onChange={(e) => setPosterSize(e.target.value)}
          >
            <option value="feed">Facebook / Zalo Feed (1080×1350)</option>
            <option value="square">Facebook Vuông (1080×1080)</option>
            <option value="story">Story (1080×1920)</option>
            <option value="a4">A4 (1240×1754)</option>
          </select>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-black">
              Sản phẩm ({products.length})
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={addProduct}
              className="bg-green-600 text-white px-4 py-3 rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Thêm tay
            </button>

            <button
              onClick={() => setPickerOpen(true)}
              className="bg-blue-600 text-white px-4 py-3 rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              <PackagePlus size={18} />
              Chọn từ kho
            </button>
          </div>

          <div className="space-y-4 max-h-[520px] overflow-auto pr-1">
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
            logo={logo}
            hotline={hotline}
          />
        </section>
      </div>
    </div>
  );
}