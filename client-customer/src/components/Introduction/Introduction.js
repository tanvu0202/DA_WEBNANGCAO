import React from 'react'
import introduction from '../../asset/img/introduction.jpg'
import IntroductionFeature from './IntroductionFeature'

export default function Introduction() {
  return (
    <div className='w-full bg-[#fffcf9]'>
        {/* Banner Section */}
        <div className="w-full h-[600px] relative overflow-hidden">
            {/* Background Image với lớp phủ nhẹ */}
            <div className="bg-introduction h-full bg-cover bg-center relative">
                {/* Overlay để làm nổi bật nội dung */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>

                <div className="container-80 h-full relative z-10">
                    <div className="flex h-full items-center">
                        <div className="w-full md:w-3/5 flex flex-col justify-center">
                            {/* Box nội dung: Đổi từ xám sang nâu cà phê sang trọng */}
                            <div className="bg-[#2d1b0f]/90 backdrop-blur-md px-[40px] py-[45px] rounded-[2rem] border-l-[8px] border-orange-500 shadow-2xl animate__animated animate__fadeInLeft">
                                <h1 className='fancy-underline relative text-[50px] md:text-[60px] font-serif text-white leading-tight font-bold'>
                                    Về Next Coffee
                                </h1>
                                
                                <div className="w-20 h-1 bg-orange-500 mt-4 rounded-full"></div>

                                <p className='text-stone-200 mt-8 text-lg leading-relaxed font-light'>
                                    Với sứ mệnh kết nối những tâm hồn đồng điệu qua từng tách cà phê đậm đà, 
                                    <span className="text-orange-400 font-semibold"> Next Coffee</span> không ngừng nâng cao chất lượng hạt rang 
                                    và không gian thưởng thức để mang lại trải nghiệm tinh tế nhất cho bạn.
                                </p>

                                <div className="flex gap-4 mt-8">
                                    <button className='rounded-full bg-orange-600 hover:bg-orange-700 text-white transition-all duration-300 px-8 py-3 font-bold shadow-lg shadow-orange-900/20'>
                                        Khám phá ngay
                                    </button>
                                    <button className='rounded-full bg-transparent border-2 border-white/50 hover:border-white text-white transition-all duration-300 px-8 py-3 font-bold'>
                                        Câu chuyện của chúng tôi
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block md:w-2/5"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Feature Section */}
        <div className="py-20">
            <IntroductionFeature />
        </div>
    </div>
  )
}