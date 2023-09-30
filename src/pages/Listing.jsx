import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Spinner from '../components/layout/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import { useFetchListing } from '../hooks/useFetchListing'

function Listing() {
  const prams = useParams()
  const { listing, loading } = useFetchListing(prams.listingId)
  console.log(listing)
  if (loading) return <Spinner />
  return <div>Listing</div>
}

export default Listing
