'use client'

import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  UserIcon,
  BookOpenIcon,
  MegaphoneIcon,
  XMarkIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, EnvelopeIcon, ShareIcon } from '@heroicons/react/20/solid'

import { LanguageSelector } from './LanguageSelector'

const products = [
  // { name: 'Find a church', description: 'Get into a church that preaches from the King James Bible and has the right gospel', href: '#', icon: MagnifyingGlassIcon },
  { name: 'Come to church', description: 'Come and visit our church where you will be edified by the entire Bible', href: '#', icon: HomeIcon },
  { name: 'Be baptized', description: 'The first step in obedience after you get saved to profess your faith and begin your walk with God', href: '#', icon: UserIcon },
  { name: 'Get the right Bible', description: 'Find a KJV Bible that you can read, as modern versions pervert and tamper with the Word of God', href: '#', icon: BookOpenIcon },
  { name: 'Spread the gospel', description: 'Learn how to go soul winning and reach the lost with the gospel of Jesus Christ', href: '#', icon: MegaphoneIcon },
]
const callsToAction = [
  { name: 'Share this site', href: '#', icon: ShareIcon },
  { name: 'Contact us', href: '#', icon: EnvelopeIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-white w-full">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#">
              <span className="sr-only">Bible Way to Heaven</span>
              <img className="h-8 w-auto" src="https://shbc-site.vercel.app/_next/image?url=%2Flogo.png%3Fv%3D2&w=384&q=75" alt="" />
              {/* <span className="font-semibold text-gray-700">Sure Foundation Baptist Church</span> */}
            </a>
          </div>
          <div className="flex lg:flex-1 lg:justify-end">
            <LanguageSelector />
          </div>
        </nav>
      </header>
    </>
  )
}
