import { Download, FileSpreadsheet, Upload } from "lucide-react";
import * as XLSX from "xlsx";

function normalizeText(value) {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
}

function findValue(row, possibleNames) {
  const keys = Object.keys(row);

  const foundKey = keys.find((key) =>
    possibleNames.some(
      (name) =>
        key.trim().toLowerCase() ===
        name.trim().toLowerCase()
    )
  );

  return foundKey ? row[foundKey] : "";
}

function mapExcelRow(row) {
  return {
    id: crypto.randomUUID(),

    name: normalizeText(
      findValue(row, [
        "Tên sản phẩm",
        "Ten san pham",
        "Sản phẩm",
        "San pham",
        "name",
      ])
    ),

    brand: normalizeText(
      findValue(row, [
        "Thương hiệu",
        "Thuong hieu",
        "brand",
      ])
    ),

    category: normalizeText(
      findValue(row, [
        "Danh mục",
        "Danh muc",
        "category",
      ])
    ),

    price: normalizeText(
      findValue(row, [
        "Giá khuyến mãi",
        "Gia khuyen mai",
        "Giá KM",
        "Gia KM",
        "price",
      ])
    ),

    oldPrice: normalizeText(
      findValue(row, [
        "Giá cũ",
        "Gia cu",
        "oldPrice",
      ])
    ),

    promo: normalizeText(
      findValue(row, [
        "Khuyến mãi",
        "Khuyen mai",
        "Quà tặng",
        "Qua tang",
        "promo",
      ])
    ),

    image: "",
  };
}

export default function ExcelTools({
  products,
  onImportProducts,
}) {
  async function importExcel(file) {
    if (!file) {
      return;
    }

    try {
      const fileData = await file.arrayBuffer();

      const workbook = XLSX.read(fileData);

      const firstSheetName = workbook.SheetNames[0];

      if (!firstSheetName) {
        alert("File Excel không có trang dữ liệu.");
        return;
      }

      const worksheet =
        workbook.Sheets[firstSheetName];

      const rows = XLSX.utils.sheet_to_json(
        worksheet,
        {
          defval: "",
          raw: false,
        }
      );

      const importedProducts = rows
        .map(mapExcelRow)
        .filter((product) =>
          product.name.trim()
        );

      if (importedProducts.length === 0) {
        alert(
          "Không tìm thấy sản phẩm. Hãy kiểm tra tên cột trong file Excel."
        );
        return;
      }

      onImportProducts(importedProducts);

      alert(
        `Đã nhập ${importedProducts.length} sản phẩm từ Excel.`
      );
    } catch (error) {
      console.error(error);

      alert(
        "Không thể đọc file Excel. Vui lòng kiểm tra lại file."
      );
    }
  }

  function exportExcel() {
    if (products.length === 0) {
      alert("Kho sản phẩm đang trống.");
      return;
    }

    const exportRows = products.map(
      (product, index) => ({
        STT: index + 1,
        "Tên sản phẩm": product.name || "",
        "Thương hiệu": product.brand || "",
        "Danh mục": product.category || "",
        "Giá khuyến mãi":
          product.price || "",
        "Giá cũ":
          product.oldPrice || "",
        "Khuyến mãi":
          product.promo || "",
      })
    );

    const worksheet =
      XLSX.utils.json_to_sheet(exportRows);

    worksheet["!cols"] = [
      { wch: 8 },
      { wch: 40 },
      { wch: 22 },
      { wch: 22 },
      { wch: 20 },
      { wch: 20 },
      { wch: 30 },
    ];

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "San pham"
    );

    XLSX.writeFile(
      workbook,
      `kho-san-pham-an-khang-${Date.now()}.xlsx`,
      {
        compression: true,
      }
    );
  }

  function exportSampleFile() {
    const sampleRows = [
      {
        "Tên sản phẩm":
          "Listerine Cool Mint",
        "Thương hiệu":
          "Listerine",
        "Danh mục":
          "Chăm sóc răng miệng",
        "Giá khuyến mãi":
          "76.000đ",
        "Giá cũ":
          "169.000đ",
        "Khuyến mãi":
          "Giảm sốc",
      },
      {
        "Tên sản phẩm":
          "Listerine Trà Xanh",
        "Thương hiệu":
          "Listerine",
        "Danh mục":
          "Chăm sóc răng miệng",
        "Giá khuyến mãi":
          "85.000đ",
        "Giá cũ":
          "187.000đ",
        "Khuyến mãi":
          "Flash Sale",
      },
    ];

    const worksheet =
      XLSX.utils.json_to_sheet(sampleRows);

    worksheet["!cols"] = [
      { wch: 40 },
      { wch: 22 },
      { wch: 25 },
      { wch: 20 },
      { wch: 20 },
      { wch: 30 },
    ];

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Mau nhap san pham"
    );

    XLSX.writeFile(
      workbook,
      "mau-import-san-pham-an-khang.xlsx",
      {
        compression: true,
      }
    );
  }

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-green-100 text-green-700">
          <FileSpreadsheet size={24} />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-800">
            Nhập / Xuất Excel
          </h2>

          <p className="text-sm text-slate-500">
            Nhập nhiều sản phẩm hoặc sao lưu dữ liệu.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-green-600 px-4 py-3 font-bold text-white transition hover:bg-green-700">
          <Upload size={18} />
          Import Excel

          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={(event) => {
              importExcel(
                event.target.files[0]
              );

              event.target.value = "";
            }}
          />
        </label>

        <button
          type="button"
          onClick={exportExcel}
          className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700"
        >
          <Download size={18} />
          Export Excel
        </button>

        <button
          type="button"
          onClick={exportSampleFile}
          className="flex items-center justify-center gap-2 rounded-2xl bg-slate-700 px-4 py-3 font-bold text-white transition hover:bg-slate-800"
        >
          <FileSpreadsheet size={18} />
          File mẫu
        </button>
      </div>
    </div>
  );
}