export const BACKGROUNDS = [
  {
    id: "green",
    name: "Xanh An Khang",
    className: "from-green-700 via-green-500 to-green-100",
  },
  {
    id: "red",
    name: "Đỏ khuyến mãi",
    className: "from-red-700 via-red-500 to-red-100",
  },
  {
    id: "yellow",
    name: "Vàng nổi bật",
    className: "from-yellow-500 via-orange-300 to-yellow-100",
  },
  {
    id: "tet",
    name: "Tết",
    className: "from-red-700 via-yellow-400 to-red-100",
  },
  {
    id: "black-friday",
    name: "Black Friday",
    className: "from-slate-950 via-slate-800 to-yellow-500",
  },
  {
    id: "noel",
    name: "Noel",
    className: "from-red-700 via-green-700 to-white",
  },
  {
    id: "mother-baby",
    name: "Mẹ và Bé",
    className: "from-pink-400 via-rose-200 to-blue-100",
  },
  {
    id: "beauty",
    name: "Dược mỹ phẩm",
    className: "from-violet-600 via-fuchsia-300 to-pink-100",
  },
  {
    id: "vitamin",
    name: "Vitamin",
    className: "from-orange-500 via-yellow-300 to-green-100",
  },
];

export function getBackgroundById(id) {
  return (
    BACKGROUNDS.find((item) => item.id === id) ||
    BACKGROUNDS[0]
  );
}
