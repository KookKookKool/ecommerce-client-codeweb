"use client"

import Image from "next/image";

interface GalleryTabProps {
    url : string
}

const GalleryTab = ({url} : GalleryTabProps) => {
  return (
    <div className="w-24 h-24 aspect-square rounded-md relative mt-24">
        <Image 
        src={url}
        alt={url}
        className="w-full h-full object-contain"
        fill
        />
    </div>
  )
}

export default GalleryTab;