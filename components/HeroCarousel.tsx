"use client"

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";

const heroImages = [
  { imgUrl: '/assets/images/apple.svg', alt: 'apple'},
  { imgUrl: '/assets/images/samsung.svg', alt: 'bag'},
  { imgUrl: '/assets/images/gaming.svg', alt: 'lamp'},
  { imgUrl: '/assets/images/TOYS.svg', alt: 'air fryer'},
  { imgUrl: '/assets/images/furniter.svg', alt: 'chair'},
  { imgUrl: '/assets/images/samsumg-watch.svg', alt: 'samsung watch'},
  { imgUrl: '/assets/images/macbook.svg', alt: 'macbook'},
  { imgUrl: '/assets/images/sony.svg', alt: 'sony'},
]

const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        // autoPlay
        // infiniteLoop
        // interval={3000}
        showArrows={false}
        showStatus={true}
      >
        {heroImages.map((image) => (
          <Image 
            src={image.imgUrl}
            alt={image.alt}
            width={484}
            height={484}
            className="object-contain"
            key={image.alt}
          />
        ))}
      </Carousel>

      <Image 
        src="assets/icons/hand-drawn-arrow.svg"
        alt="arrow"
        width={175}
        height={175}
        className="max-xl:hidden absolute -left-[15%] bottom-0 z-0"
      />
    </div>
  )
}

export default HeroCarousel