import React from 'react'
import feature from '../../asset/img/feature.png'
export default function IntroductionFeature() {
  return (
    <div className='container-80 py-10'>
        <div className="text-center">
            <p className='text-2xl font-medium'>Công ty cổ phần Minh Man Toàn Cầu</p>
            <p className='text-accent text-xl mt-4'>Cung cấp cho khách hàng sản phẩm và dịch vụ với chất lượng cao và ngày càng hoàn <br /> thiện, góp phần nâng cao chất lượng sống cho cộng đồng.</p>
        </div>
        <div className="pt-10">
            <div className="flex items-center gap-10">
                <div className="w-1/2">
                    <img src={feature} alt="" />
                </div>
                <div className="w-1/2">
                    <div className="flex space-x-6">
                        <div className="w-14 h-8">
                            <img src="http://steamark.monamedia.net/wp-content/uploads/2023/06/4801304-128-copy-1.png" alt=""  className='w-full h-full object-cover'/>
                        </div>
                        <div>
                            <p className='text-secondary font-medium text-xl'>Tầm nhìn</p>
                            <p className='text-base text-accent'>Phấn đấu để trở thành một trong những Công ty hàng đầu tại Việt Nam về lĩnh vực bán lẻ đồ uống, sách báo trong các cửa hàng kinh doanh.</p>
                        </div>
                    </div>

                    <div className="flex space-x-6 mt-6">
                        <div className="w-14 h-8">
                            <img src="http://steamark.monamedia.net/wp-content/uploads/2023/06/5310248-128-copy-1.png" alt=""  className='w-full h-full object-cover'/>
                        </div>
                        <div>
                            <p className='text-secondary font-medium text-xl'>Sứ mệnh</p>
                            <p className='text-base text-accent'>Cung cấp cho khách hàng sản phẩm và dịch vụ với chất lượng cao và ngày càng hoàn thiện, góp phần nâng cao chất lượng sống cho cộng đồng.</p>
                        </div>
                    </div>

                    <div className="flex space-x-6 mt-6">
                        <div className="w-7 h-8">
                            <img src="http://steamark.monamedia.net/wp-content/uploads/2023/06/296210-128-1-copy-1.png" alt=""  className='w-full h-full object-cover'/>
                        </div>
                        <div>
                            <p className='text-secondary font-medium text-xl'>Triết lý kinh doanh</p>
                            <p className='text-base text-accent'>Khiêm tốn - Thật thà - Dũng cảm.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
