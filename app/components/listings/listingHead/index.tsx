'use client'

import Image from "next/image"

import useCountries from "../../hooks/useCountries"
import { SafeUser } from "../../../types"

import Heading from "../../heading"
import HeartButton from "../../heartButton"

interface ListingHeadProps {
    title: string
    localValue: string
    imageSrc: string
    id: string
    currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    localValue,
    imageSrc,
    id,
    currentUser
}) => {
  const { getByValue } = useCountries()

  const location = getByValue(localValue)

  return ( 
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton 
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
   )
}
 
export default ListingHead