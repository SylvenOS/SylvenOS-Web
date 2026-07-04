import HeroSection from '@/components/AboutUs/AboutHero'
import CoreValues from '@/components/AboutUs/CoreValues'
import OurMission from '@/components/AboutUs/OurMission'
import OurStory from '@/components/AboutUs/Story'
import OurVision from '@/components/AboutUs/Vision'
import WhoWeAre from '@/components/AboutUs/Who'
import React from 'react'

const page = () => {
  return (
    <main>
        <HeroSection/>
        <OurStory/>
        <WhoWeAre/>
        <OurMission/>
        <OurVision/>
        <CoreValues/>
    </main>
  )
}

export default page
