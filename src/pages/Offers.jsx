import React, { useEffect, useState } from 'react'
import {
  collection,
  //   getDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/layout/Spinner'
import ListingItem from '../components/ListingItem'

function Offers() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)
  useEffect(() => {
    const fetchedListing = async () => {
      try {
        // get listings ref
        const listingRef = collection(db, 'listings')
        // create query
        const q = query(
          listingRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(10)
        )
        // Execute the query
        const querySnap = await getDocs(q)
        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisible)
        const listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }

    fetchedListing()
  }, [])
  // Pagination / load more
  const onFetchMoreListings = async () => {
    try {
      // get listings ref
      const listingRef = collection(db, 'listings')
      // create query
      const q = query(
        listingRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        limit(10),
        startAfter(lastFetchedListing)
      )
      // Execute the query
      const querySnap = await getDocs(q)
      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)
      const listings = []
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      setListings((prev) => {
        return [...prev, ...listings]
      })
      setLoading(false)
    } catch (error) {
      toast.error('Could not fetch listings')
    }
  }
  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListing">
              {listings.map((listing) => {
                return (
                  <ListingItem
                    key={listing.id}
                    id={listing.id}
                    listing={listing.data}
                  />
                )
              })}
            </ul>
          </main>
          {lastFetchedListing && (
            <p className="loadMore" onClick={onFetchMoreListings}>
              {' '}
              LOAD MORE
            </p>
          )}
        </>
      ) : (
        <p>No Offers Right Now </p>
      )}
    </div>
  )
}

export default Offers
