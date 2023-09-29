import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  collection,
  //   getDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/layout/Spinner'
import ListingItem from '../components/ListingItem'

function Category() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  //   const [lastFetchedListing, setLastFetchedListing] = useState(null)
  const params = useParams()
  useEffect(() => {
    const fetchedListing = async () => {
      try {
        // get listings ref
        const listingRef = collection(db, 'listings')
        // create query
        const q = query(
          listingRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(10)
        )
        // Execute the query
        const querySnap = await getDocs(q)
        // const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        // setLastFetchedListing(lastVisible)
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
  }, [params.categoryName])
  return (
    <div className="category">
      <header>
        <p className="pageHeader">places for {params.categoryName}</p>
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
        </>
      ) : (
        <p>No listing to show for {params.categoryName}</p>
      )}
    </div>
  )
}

export default Category
