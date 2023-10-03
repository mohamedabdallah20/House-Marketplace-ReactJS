import React from 'react'
import { Link } from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import Slider from '../components/layout/Slider'

function Explore() {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>
      <main className="exploreCategoriesHeading">
        <Slider />
        <p className="exploreCategoriesHeading">Categories</p>
        <div className="exploreCategories">
          <Link to="/category/rent" className="exploreCategoriesLink">
            <img
              src={rentCategoryImage}
              alt="rent"
              className="exploreCategoryImg"
            ></img>
            Places for Rent
          </Link>
          <Link to="/category/sale" className="exploreCategoriesLink">
            <img
              src={sellCategoryImage}
              alt="sell"
              className="exploreCategoryImg"
            ></img>
            Places for sell
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Explore
