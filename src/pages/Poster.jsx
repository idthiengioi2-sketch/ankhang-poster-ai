import { useEffect, useRef, useState } from "react";
import { Download, PackagePlus, Plus } from "lucide-react";

import { loadData, saveData } from "../utils/storage";
import { exportPNG } from "../utils/exportPNG";

import PosterCanvas from "../components/PosterCanvas";
import ProductEditor from "../components/ProductEditor";
import ProductPicker from "../components/ProductPicker";
import PromotionPicker from "../components/PromotionPicker";
import TemplateSelector from "../components/TemplateSelector";

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

const DEFAULT_PROFILE = {
  storeName: "NHÀ THUỐC AN KHANG",
  slogan: "Sức khỏe cho mọi nhà",
  hotline: "1900 1572",
  address: "",
  logo: "",
};

export default function Poster() {
  const posterRef = useRef(null);

  const [productPickerOpen, setProductPickerOpen] =
    useState(false);

  const [
    promotionPickerOpen,
    setPromotionPickerOpen,
  ] = useState(false);

  const [
    promotionTargetProductId,
    setPromotionTargetProductId,
  ] = useState(null);

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

  const [template, setTemplate] = useState(() =>
    loadData("ak_template", "green")
  );

  const [products, setProducts] = useState(() =>
    loadData("ak_products", SAMPLE_PRODUCTS)
  );

  const storeProfile = loadData(
    "ak_store_profile",
    DEFAULT_PROFILE
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
    saveData("ak_template", template);
  }, [template]);

  useEffect(() => {
    saveData("ak_products", products);
  }, [products]);

  function addProduct() {
    setProducts((currentProducts) => [
      ...currentProducts,
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
    setProducts((currentProducts) => [
      ...currentProducts,
      ...selectedProducts,
    ]);

    setProductPickerOpen(false);
  }

  function updateProduct(id, field, value) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              [field]: value,
            }
          : product
      )
    );
  }

  function removeProduct(id) {
    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.id !== id
      )
    );
  }

  function clearPosterProducts() {
    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa toàn bộ sản phẩm khỏi poster?"
    );

    if (!confirmed) {
      return;
    }

    setProducts([]);
  }

  function openPromotionPicker(productId) {
    setPromotionTargetProductId(productId);
    setPromotionPickerOpen(true);
  }

  function closePromotionPicker() {
    setPromotionPickerOpen(false);
    setPromotionTargetProductId(null);
  }

  function applyPromotionToProduct(promotion) {
    if (!promotionTargetProductId) {
      return;
    }

    updateProduct(
      promotionTargetProductId,
      "promo",
      promotion.name || ""
    );

    closePromotionPicker();
  }

  async function downloadPoster() {
    try {
      await exportPNG(
        posterRef.current,
        `poster-an-khang-${Date.now()}.png`
      );
    } catch (error) {
      console.error(error);
      alert(
        "Không thể tải poster. Vui lòng thử lại."
      );
    }
  }

  return (
    <div>
      <ProductPicker
        open={productPickerOpen}
        onClose={() =>
          setProductPickerOpen(false)
        }
        onAddProducts={addProductsFromLibrary}
      />

      <PromotionPicker
        open={promotionPickerOpen}
        onClose={closePromotionPicker}
        onSelectPromotion={
          applyPromotionToProduct
        }
      />

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-800">
            Tạo Poster
          </h1>

          <p className="mt-2 text-slate-500">
            Chọn sản phẩm và khuyến mãi từ kho,
            sau đó xuất poster PNG.
          </p>
        </div>

        <button
          type="button"
          onClick={downloadPoster}
          className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 font-black text-white transition hover:bg-slate-800"
        >
          <Download size={20} />
          Tải PNG
        </button>
      </div>

      <div className="grid grid-cols-[480px_1fr] gap-6">
        <section className="h-fit rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-5 rounded-2xl border border-green-100 bg-green-50 p-4">
            <p className="font-black text-green-800">
              {storeProfile.storeName}
            </p>

            <p className="mt-1 text-sm text-green-700">
              Hotline:{" "}
              {storeProfile.hotline ||
                "Chưa nhập"}
            </p>

            <p className="text-sm text-green-700">
              Địa chỉ:{" "}
              {storeProfile.address ||
                "Chưa nhập"}
            </p>
          </div>

          <h2 className="mb-5 text-2xl font-black">
            Thông tin chương trình
          </h2>

          <label className="mb-2 block font-bold">
            Tiêu đề
          </label>

          <input
            className="mb-4 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-4 focus:ring-green-100"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
          />

          <label className="mb-2 block font-bold">
            Ngày khuyến mãi
          </label>

          <input
            className="mb-4 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-4 focus:ring-green-100"
            value={date}
            onChange={(event) =>
              setDate(event.target.value)
            }
          />

          <label className="mb-2 block font-bold">
            Số cột sản phẩm
          </label>

          <select
            className="mb-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-green-100"
            value={columns}
            onChange={(event) =>
              setColumns(
                Number(event.target.value)
              )
            }
          >
            <option value={2}>2 cột</option>
            <option value={3}>3 cột</option>
            <option value={4}>4 cột</option>
            <option value={5}>5 cột</option>
          </select>

          <label className="mb-2 block font-bold">
            Kích thước Poster
          </label>

          <select
            className="mb-5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-green-100"
            value={posterSize}
            onChange={(event) =>
              setPosterSize(
                event.target.value
              )
            }
          >
            <option value="feed">
              Facebook / Zalo Feed
              (1080×1350)
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

          <TemplateSelector
            template={template}
            setTemplate={setTemplate}
          />

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black">
              Sản phẩm ({products.length})
            </h2>

            {products.length > 0 && (
              <button
                type="button"
                onClick={clearPosterProducts}
                className="text-sm font-bold text-red-600 hover:text-red-700"
              >
                Xóa tất cả
              </button>
            )}
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={addProduct}
              className="flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-4 py-3 font-bold text-white transition hover:bg-green-700"
            >
              <Plus size={18} />
              Thêm tay
            </button>

            <button
              type="button"
              onClick={() =>
                setProductPickerOpen(true)
              }
              className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700"
            >
              <PackagePlus size={18} />
              Chọn từ kho
            </button>
          </div>

          <div className="max-h-[520px] space-y-4 overflow-auto pr-1">
            {products.map(
              (product, index) => (
                <ProductEditor
                  key={product.id}
                  product={product}
                  index={index}
                  updateProduct={
                    updateProduct
                  }
                  removeProduct={
                    removeProduct
                  }
                  onOpenPromotionPicker={
                    openPromotionPicker
                  }
                />
              )
            )}

            {products.length === 0 && (
              <div className="rounded-2xl border-2 border-dashed border-slate-200 py-10 text-center text-slate-400">
                Chưa có sản phẩm trên poster.
              </div>
            )}
          </div>
        </section>

        <section className="max-h-[calc(100vh-150px)] overflow-auto rounded-3xl bg-white p-5 shadow-sm">
          <PosterCanvas
            posterRef={posterRef}
            title={title}
            date={date}
            products={products}
            columns={columns}
            posterSize={posterSize}
            template={template}
            logo={storeProfile.logo}
            storeName={
              storeProfile.storeName
            }
            slogan={storeProfile.slogan}
            hotline={storeProfile.hotline}
            address={storeProfile.address}
          />
        </section>
      </div>
    </div>
  );
}