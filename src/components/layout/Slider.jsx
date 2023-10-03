import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css/bundle'
import Spinner from './Spinner'

function Slider() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchListings = async () => {
      const collRef = collection(db, 'listings')
      const q = query(collRef, orderBy('timestamp', 'desc'), limit(5))
      const qSnap = await getDocs(q)

      let listing = []
      qSnap.forEach((doc) => {
        listing.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      setListings(listing)
      setLoading(false)
    }
    fetchListings()
  }, [])

  if (loading) return <Spinner />
  return (
    listings && (
      <>
        <p className="exploreHeading">Recommended</p>
        <Swiper
          slidesPerView={1}
          navigation
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          pagination={{ clickable: true }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => {
                navigate(`/category/${data.type}/${id}`)
              }}
            >
              <div className="swiperSlideDiv">
                <img
                  className="swiperImg"
                  src={`${data.imageUrls[0]}}`}
                  alt={`${data.name}`}
                />
                <p className="swiperSlideText">{data.name}</p>
                <p className="swiperSlidePrice">
                  ${data.discountedPrice ?? data.regularPrice}
                  {data.type === 'rent' && '/ Month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  )
}

export default Slider
