import React,{useEffect, useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Banner() {
    const [loading,setLoading] = useState(false);
    const [banners, setBanner] = useState([]);

    const getBanner = async ()=>{
        try{
            setLoading(true)
            let res = await fetch("https://api.jsonbin.io/v3/b/644500aa8e4aa6225e8f325e",
            {
                method: "GET",
                headers: {
                  "X-ACCESS-KEY":
                    "$2b$10$i3Vn9FP..ooifcRShouNxui9GKXqjTVsX1lYSieQTuo0x6pKLsu2m",
                },
              })
            let resJson = await res.json();
            setBanner(resJson.record.data)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setLoading(false);
        }
    }


    useEffect(()=>{
        getBanner()
    },[])

  return (
    <div className="banner">

        {
            loading ?
            <div className="skeleton banner_loading row"></div>
            :
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                onSwiper={(swiper) => console.log(swiper)}
                pagination={{ clickable: true }}
                navigation
                >
                    {banners.map((banner,index)=>(
                         <SwiperSlide key={index}>
                            <img className="bannerImg" src={banner.imageDesktop} alt="" />
                         </SwiperSlide>
                    ))}
               
                
            </Swiper>
        }
    </div>
  )
}

export default Banner