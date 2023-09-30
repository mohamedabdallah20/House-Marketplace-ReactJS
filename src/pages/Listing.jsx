import React from 'react'
import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Spinner from '../components/layout/Spinner'
import { getAuth } from 'firebase/auth'
import shareIcon from '../assets/svg/shareIcon.svg'
import { useFetchListing } from '../hooks/useFetchListing'
import { toast } from 'react-toastify'

function Listing() {
  const auth = getAuth()
  const prams = useParams()
  const [shareLinkCopied, setShareLinkCopied] = useState(false)
  const { listing, loading } = useFetchListing(prams.listingId)
  if (loading) return <Spinner />
  return (
    <main>
      {/* slide bar */}

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
        {/* Map */}
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
