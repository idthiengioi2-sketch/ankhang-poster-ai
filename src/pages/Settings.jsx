import { useEffect, useState } from "react";
import { ImagePlus, Save } from "lucide-react";
import { loadData, saveData } from "../utils/storage";

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Settings() {
  const [profile, setProfile] = useState(() =>
    loadData("ak_store_profile", {
      storeName: "NHÀ THUỐC AN KHANG",
      slogan: "Sức khỏe cho mọi nhà",
      hotline: "1900 1572",
      address: "",
      logo: "",
    })
  );

  useEffect(() => {
    saveData("ak_store_profile", profile);
  }, [profile]);

  async function uploadLogo(file) {
    if (!file) return;
    const base64 = await fileToBase64(file);
    setProfile({ ...profile, logo: base64 });
  }

  return (
    <div>
      <h1 className="text-4xl font-black text-slate-800">
        Cài đặt cửa hàng
      </h1>

      <p className="text-slate-500 mt-2">
        Thông tin này sẽ tự động hiển thị trên poster.
      </p>

      <div className="grid grid-cols-[520px_1fr] gap-6 mt-8">
        <section className="bg-white rounded-3xl p-6 shadow-sm">
          <label className="block border-2 border-dashed border-slate-300 rounded-3xl p-5 mb-5 cursor-pointer hover:bg-slate-50">
            <div className="flex items-center justify-center gap-3 text-slate-600 font-bold">
              <ImagePlus className="text-green-700" />
              Upload logo
            </div>

            {profile.logo && (
              <div className="mt-4 h-28 bg-slate-100 rounded-2xl grid place-items-center overflow-hidden">
                <img
                  src={profile.logo}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => uploadLogo(e.target.files[0])}
            />
          </label>

          <Input
            label="Tên nhà thuốc"
            value={profile.storeName}
            onChange={(v) => setProfile({ ...profile, storeName: v })}
          />

          <Input
            label="Khẩu hiệu"
            value={profile.slogan}
            onChange={(v) => setProfile({ ...profile, slogan: v })}
          />

          <Input
            label="Hotline"
            value={profile.hotline}
            onChange={(v) => setProfile({ ...profile, hotline: v })}
          />

          <Input
            label="Địa chỉ"
            value={profile.address}
            onChange={(v) => setProfile({ ...profile, address: v })}
          />

          <div className="mt-5 bg-green-50 text-green-700 rounded-2xl p-4 font-bold flex items-center gap-2">
            <Save size={20} />
            Dữ liệu tự lưu sau khi nhập
          </div>
        </section>

        <section className="bg-gradient-to-b from-green-700 to-green-500 rounded-3xl p-8 text-white shadow-sm h-fit">
          <div className="w-24 h-24 rounded-3xl bg-white grid place-items-center overflow-hidden text-green-700 font-black text-3xl">
            {profile.logo ? (
              <img
                src={profile.logo}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              "AK"
            )}
          </div>

          <h2 className="text-4xl font-black mt-6">
            {profile.storeName}
          </h2>

          <p className="text-green-100 text-xl mt-2">
            {profile.slogan}
          </p>

          <div className="mt-8 space-y-3 text-lg">
            <p>
              <b>Hotline:</b> {profile.hotline}
            </p>
            <p>
              <b>Địa chỉ:</b> {profile.address || "Chưa nhập"}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="font-bold text-slate-700 block mb-2">
        {label}
      </label>

      <input
        className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}