'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'

import { PostImage } from '@/entities/posts/types'
import { ArrowBackIcon } from '@public/icon/ArrowBackIcon'

import s from './PostSlider.module.scss'

type Props = {
  images: PostImage[]
}

const PostSlider = ({ images }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [slideCount, setSlideCount] = useState(0)
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  useEffect(() => {
    if (!emblaApi) return

    setSlideCount(emblaApi.scrollSnapList().length)

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  return (
    <div ref={emblaRef} className={s.embla}>
      <div className={s.emblaContainer}>
        {images?.map((image, index) => {
          return (
            <div key={index} className={s.emblaSlide}>
              <Image
                className={s.contentPhoto}
                src={image.url}
                alt={'Content Image'}
                width={image.width}
                height={image.height}
              />
            </div>
          )
        })}
      </div>
      {slideCount > 1 && (
        <button type={'button'} className={s.emblaPrev} onClick={scrollPrev}>
          <ArrowBackIcon />
        </button>
      )}
      {slideCount > 1 && (
        <button type={'button'} className={s.emblaNext} onClick={scrollNext}>
          <ArrowBackIcon />
        </button>
      )}
      {slideCount > 1 && (
        <div className={s.pagination}>
          {Array.from({ length: slideCount }).map((_, index) => (
            <button
              type={'button'}
              key={index}
              className={`${s.paginationDot} ${index === selectedIndex ? s.active : ''}`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PostSlider
