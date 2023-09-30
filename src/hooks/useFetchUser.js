// import React from 'react'
import { useState, useEffect } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'

export const useFetchUser = (userId) => {
  //   console.log(listingId)

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchingListing = async () => {
      const docRef = doc(db, 'users', userId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setUser(docSnap.data())
        setLoading(false)
      } else {
        setLoading(false)
      }
    }

    fetchingListing()
  }, [userId])
  return { user, loading }
}
