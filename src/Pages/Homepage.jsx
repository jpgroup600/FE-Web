import React from 'react'
import SliderContainer from '../Components/Slider'
import SmallCard from '../Components/SmallCard'
import Category from '../Components/Category'
import EventBanner from '../Components/EventBanner'
import Slider2 from '../Components/Slider2'
import ContactBanner from '../Components/ContactBanner'
import AgainCategory from "../Components/AgainCategory"
const Homepage = () => {
  return (
    <>
    <SliderContainer />
    <SmallCard />
    <Category />
    <EventBanner />

    <Slider2 />
    <AgainCategory />

    <ContactBanner />
    </>
  )
}

export default Homepage