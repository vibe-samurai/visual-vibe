import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const useSidebarNavigation = (userId: string | number | null) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const router = useRouter()

  const handleLinkClick = (index: number, href: string) => {
    setActiveIndex(index)

    if (index === 2) {
      router.replace(`${href}/${userId}`)
    } else {
      router.replace(href)
    }
  }

  return { activeIndex, handleLinkClick }
}
