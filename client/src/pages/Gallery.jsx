
import React, { useState, useMemo, useEffect } from 'react'
import { PageHero, SectionHeading, CTA } from '../components/Sections'
import { useLanguage } from '../context/LanguageContext'

const galleryModules = import.meta.glob(
  '../assets/gallery/**/*.{jpg,jpeg,JPG,JPEG}',
  {
    eager: true,
    query: '?url',
    import: 'default'
  }
)

const categoryLabels = {
  Roof_Installation_and_Construction: 'roofInstallation',
  Completed_Shingle_Roofs: 'completedRoofs',
  Tile_Roofing: 'tileRoofing',
  Metal_Roofing: 'metalRoofing',
  Roof_Details_and_Repairs: 'roofDetails',
  Project_Exteriors: 'projectExteriors'
}

const photos = Object.entries(galleryModules).map(([path, image]) => {
  const folder = path.split('/')[3]

  return {
    image,
    category: folder,
    title: categoryLabels[folder] || 'roofingProject',
    id: path
  }
})
export default function Gallery() {
  const { t } = useLanguage()

  const [activeCategory, setActiveCategory] = useState('all')
  const [visibleCount, setVisibleCount] = useState(12)
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const categories = [
  { value: 'all', label: t('allProjects') },
  ...Object.entries(categoryLabels).map(([value, key]) => ({
    value,
    label: t(key)
  }))
]

  const filteredPhotos = useMemo(() => {
    return activeCategory === 'all'
      ? photos
      : photos.filter(photo => photo.category === activeCategory)
  }, [activeCategory])

  const visiblePhotos = filteredPhotos.slice(0, visibleCount)

  return (
    <>
      <PageHero
        eyebrow={t('pageGallery')}
        title={t('inspiration')}
        description={t('galleryDescription')}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">

          <SectionHeading
            eyebrow={t('visualInspiration')}
            title={t('materials')}
            copy={t('galleryNote')}
          />

          {/* Category Filters */}
          <div className="mb-9 flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => {
                  setActiveCategory(category.value)
                  setVisibleCount(12)
                }}
                className={`px-4 py-3 text-xs font-bold uppercase tracking-wide transition ${
                  activeCategory === category.value
                    ? 'bg-roof-red text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {visiblePhotos.map((photo, index) => (
              
<figure
  key={photo.id}
  onClick={() => setSelectedPhoto(photo)}
  className={`group relative m-0 h-[180px] cursor-zoom-in overflow-hidden bg-slate-200 md:h-[240px] ${
    index === 0
      ? 'col-span-2 row-span-2 h-[363px] md:h-[496px]'
      : ''
  }`}
>
  <img
    src={photo.image}
    alt={photo.title}
    loading="lazy"
    decoding="async"
    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
  />

  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1723]/80 to-transparent px-4 pb-4 pt-14">
    <figcaption className="text-xs font-bold tracking-wide text-white">
  {t(photo.title)}
</figcaption>
  </div>
</figure>

            ))}
          </div>

          {/* Load More */}
          {visibleCount < filteredPhotos.length && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 12)}
                className="bg-roof-red px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#b91f2b]"
              >
                {t('loadMore')}
              </button>
            </div>
          )}

          {filteredPhotos.length === 0 && (
            <p className="py-12 text-center text-slate-500">
              {t('noProjects')}
            </p>
          )}

        </div>
      </section>

      {selectedPhoto && (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10"
    onClick={() => setSelectedPhoto(null)}
  >
    {/* Close Button */}
    <button
      onClick={() => setSelectedPhoto(null)}
      className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-3xl text-white transition hover:bg-roof-red"
      aria-label={t('closeImage')}
    >
      &times;
    </button>

    {/* Large Image */}
    <div
      className="flex max-h-full max-w-6xl flex-col items-center"
      onClick={e => e.stopPropagation()}
    >
      <img
        src={selectedPhoto.image}
        alt={selectedPhoto.title}
        className="max-h-[80vh] max-w-full object-contain"
      />

      <p className="mt-4 text-center text-sm font-semibold text-white">
        {t(selectedPhoto.title)}
      </p>
    </div>
  </div>
)}

      <CTA />
    </>
  )
}
