import React from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../components/layout/Spinner'
import { getAuth } from 'firebase/auth'
import shareIcon from '../assets/svg/shareIcon.svg'
import { useFetchListing } from '../hooks/useFetchListing'
import { toast } from 'react-toastify'
import { Marker, Popup, TileLayer, MapContainer } from 'react-leaflet'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'

function Listing() {
  const auth = getAuth()
  const prams = useParams()
  const [shareLinkCopied, setShareLinkCopied] = useState(false)
  const { listing, loading } = useFetchListing(prams.listingId)
  if (loading) return <Spinner />
  return (
    <main>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        // spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {listing.imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="swiperSlideDiv">
              <img
                className="swiperImg"
                src={`${listing.imageUrls[index]}}`}
                alt="img"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          setShareLinkCopied(true)
          setTimeout(() => {
            setShareLinkCopied(false)
          }, 2000)
        }}
      >
        <img src={shareIcon} alt="share" />
      </div>
      {shareLinkCopied && toast.success('link copied successfully')}

      <div className="listingDetails">
        <p className="listingName">
          {' '}
          {listing.name} - $
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">For {listing.type}</p>
        {listing.offer && (
          <p className="discountPrice">
            ${listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}
        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : '1 Bedroom'}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms`
              : '1 bathroom'}
          </li>
          <li>{listing.parking && 'Parking Spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>
        </ul>
        <p className="listingLocationTitle">Location</p>
        <div className="leafletContainer">
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.location}</Popup>
            </Marker>
          </MapContainer>
        </div>
        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            className="primaryButton"
            to={`/contact/${listing.userRef}?listingName=${encodeURIComponent(
              listing.name
            )}`}
          >
            contact landlord
          </Link>
        )}
      </div>
    </main>
  )
}

export default Listing
