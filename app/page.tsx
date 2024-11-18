
import HeroCarousel from '@/components/HeroCarousel'
import Searchbar from '@/components/Searchbar'
import Image from 'next/image'
import React from 'react'
import { getAllProducts } from '@/lib/actions'
import ProductCard from '@/components/ProductCard'

const home = async () => {
  const allProducts = await getAllProducts();
  return (
    <>
      <section className='px-6 md:px-20 py-24'>
        <div className='flex max-xl:flix-col gap-16'>
          <div className='flex flex-col justify-center'>
            <p className='small-text'>
              Grab your products on TIME....!:
              <Image
              src="/assets/icons/clock.svg"
              alt="clock"
              width={55}
              height={25}
              />
            </p>
              <h1 className='head-text'>
                Get notfied when ITS DROPED <br />
                <span className='text-primary'> RupeeTracker</span>
              </h1>
              <p className='mt-6'>
                Track your price and get it ON "TIME" with unbeliveble prices
              </p>

              <Searchbar />
          </div>
          <HeroCarousel />
        </div>

      </section>
      <section className='trending-section'>
        <h2 className='section-text'>
        Treding
        </h2>
        <div className='flex flex-wrap gap-x-8 gap-y-16'>
    {allProducts?.map((product) => (
        <ProductCard key={product._id} product={product} />
    ))}
</div>

      </section>
    </>
  )
}

export default home