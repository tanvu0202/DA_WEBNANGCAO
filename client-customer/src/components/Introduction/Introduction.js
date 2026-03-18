import React from 'react'
import introduction from '../../asset/img/introduction.jpg'
import IntroductionFeature from './IntroductionFeature'
export default function Introduction() {
  return (
    <div className='w-full'>
        <div className="w-full h-[550px]">
            <div className="bg-introduction h-full ">
                <div className="flex h-full">
                <div className="w-1/2 flex flex-col justify-center h-full">
                    <div className="bg-[#949494] px-[35px] py-[30px] rounded-xl border-l-[6px] border-[#21499a] w-[80%] ml-auto">
                        <h1 className='fancy-underline relative text-[61px] text-white'>
                        Giới Thiệu Chung
                        </h1>
                        <p className='text-[#f1f1f1] mt-8'>HHK.Store Chúng tôi Với mục tiêu trở thành chuỗi cửa hàng bán lẻ số 1 Việt Nam, HHK.Store sẽ luôn luôn nâng cao chất lượng sản phẩm & dịch vụ cũng như những tiện ích đi kèm.</p>
                        <button className='rounded-2xl bg-white hover:bg-accent hover:text-white transition-all duration-300 text-accent px-5 py-2 mt-5 font-semibold'>Xem thêm</button>
                    </div>
                </div>
                <div className="w-1/2"></div>
                </div>
            </div>
        </div>
        <IntroductionFeature />
    </div>
  )
}
