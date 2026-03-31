import React from "react";

export default function ContactComponent() {
  return (
    <div className="bg-[#fffcf9] py-10">
      <div className="container-80">
        <section className="text-gray-600 body-font relative">
          {/* Bản đồ với filter màu ấm hơn thay vì xám lạnh */}
          <div className="absolute inset-0 bg-stone-200 z-0 rounded-3xl overflow-hidden shadow-inner">
            <iframe
              width="100%"
              height="100%"
              frameBorder={0}
              marginHeight={0}
              marginWidth={0}
              title="map"
              scrolling="no"
              src="https://maps.google.com/maps?q=Hồ%20Chí%20Minh&t=&z=13&ie=UTF8&iwloc=&output=embed"
              style={{ filter: "sepia(0.3) contrast(1.2) opacity(0.7)" }}
            ></iframe>
          </div>

          <div className="container px-5 py-24 mx-auto flex">
            <div className="lg:w-1/3 md:w-1/2 bg-white/95 backdrop-blur-sm rounded-[2rem] p-10 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-2xl border border-orange-100">
              <span className="text-orange-600 font-bold tracking-widest text-xs mb-1 uppercase">Kết nối với chúng tôi</span>
              <h2 className="text-[#442c1e] text-3xl mb-2 font-serif font-bold title-font">
                Ghé thăm Quán
              </h2>
              <p className="leading-relaxed mb-6 text-stone-500 italic">
                Để lại lời nhắn, chúng mình sẽ phản hồi bạn bên tách cafe ấm nóng.
              </p>

              {/* Email Input */}
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm font-semibold text-[#442c1e]"
                >
                  Email của bạn
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className="w-full bg-stone-50 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              {/* Message Textarea */}
              <div className="relative mb-4">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm font-semibold text-[#442c1e]"
                >
                  Lời nhắn cho chúng mình
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Bạn muốn đặt bàn hay góp ý điều gì?..."
                  className="w-full bg-stone-50 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 h-32 text-base outline-none text-gray-700 py-2 px-4 resize-none leading-6 transition-colors duration-200 ease-in-out"
                />
              </div>

              {/* Submit Button */}
              <button className="text-white bg-[#442c1e] border-0 py-3 px-8 focus:outline-none hover:bg-[#5d3f2d] rounded-full text-lg font-bold shadow-lg shadow-orange-900/20 transition-all active:scale-95">
                Gửi lời nhắn
              </button>

              <p className="text-xs text-stone-400 mt-4 text-center">
                Hotline: 0123 456 789 | Mở cửa: 07:00 - 22:00
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}