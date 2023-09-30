// import React from 'react'
import { useState, useEffect } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'

export const useFetchListing = (listingId) => {
  //   console.log(listingId)

  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchingListing = async () => {
      const docRef = doc(db, 'listings', listingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setListing(docSnap.data())
        setLoading(false)
      }
    }

    fetchingListing()
  }, [listingId])
  return { listing, loading }
}
