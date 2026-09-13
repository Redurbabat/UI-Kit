import { useEffect, useState } from 'react'

const INTRO_KEY = 'red-ui-kit.premium-intro.v1'
const isGalleryHash = () => !window.location.hash.startsWith('#/')

export function PremiumExperience() {
  const [intro, setIntro] = useState<'enter' | 'present' | 'leave' | 'done'>('done')
  const [galleryMode, setGalleryMode] = useState(isGalleryHash)

  useEffect(() => {
    const syncRoute = () => setGalleryMode(isGalleryHash())
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useEffect(() => {
    if (!galleryMode) {
      setIntro('done')
      return
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen = window.sessionStorage.getItem(INTRO_KEY) === 'seen'

    if (!reduced && !seen) {
      setIntro('enter')
      const presentTimer = window.setTimeout(() => setIntro('present'), 220)
      const leaveTimer = window.setTimeout(() => setIntro('leave'), 2100)
      const doneTimer = window.setTimeout(() => {
        setIntro('done')
        window.sessionStorage.setItem(INTRO_KEY, 'seen')
      }, 2750)

      return () => {
        window.clearTimeout(presentTimer)
        window.clearTimeout(leaveTimer)
        window.clearTimeout(doneTimer)
      }
    }

    setIntro('done')
  }, [galleryMode])

  useEffect(() => {
    const root = document.documentElement
    let pointerFrame = 0
    let scrollFrame = 0

    const updatePointer = (event: PointerEvent) => {
      if (pointerFrame) return
      pointerFrame = window.requestAnimationFrame(() => {
        const x = event.clientX / Math.max(window.innerWidth, 1)
        const y = event.clientY / Math.max(window.innerHeight, 1)
        root.style.setProperty('--site-mx', `${(x * 100).toFixed(1)}%`)
        root.style.setProperty('--site-my', `${(y * 100).toFixed(1)}%`)
        root.style.setProperty('--scene-ry', `${((x - 0.5) * -2.4).toFixed(2)}deg`)
        root.style.setProperty('--scene-rx', `${((y - 0.5) * 1.8).toFixed(2)}deg`)
        root.style.setProperty('--house-pan-x', `${((x - 0.5) * -7).toFixed(2)}px`)
        root.style.setProperty('--house-pan-y', `${((y - 0.5) * -4).toFixed(2)}px`)
        pointerFrame = 0
      })
    }

    const updateScroll = () => {
      if (scrollFrame) return
      scrollFrame = window.requestAnimationFrame(() => {
        const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
        const progress = Math.max(0, Math.min(1, window.scrollY / max))
        root.style.setProperty('--page-progress', String(progress))
        root.style.setProperty('--scroll-depth', `${Math.min(window.scrollY * 0.008, 12).toFixed(2)}px`)
        root.style.setProperty('--house-stride', `${(progress * 14).toFixed(2)}px`)
        scrollFrame = 0
      })
    }

    window.addEventListener('pointermove', updatePointer, { passive: true })
    window.addEventListener('scroll', updateScroll, { passive: true })
    updateScroll()

    return () => {
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('scroll', updateScroll)
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame)
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
    }
  }, [])

  useEffect(() => {
    if (!galleryMode) return

    const sections = ['featured', 'catalog', 'library']
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add('is-presented')
        }
      },
      { rootMargin: '-12% 0px -18% 0px', threshold: [0.04, 0.16] },
    )

    sections.forEach((section) => {
      section.classList.add('experience-section')
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [galleryMode])

  const skipIntro = () => {
    window.sessionStorage.setItem(INTRO_KEY, 'seen')
    setIntro('leave')
    window.setTimeout(() => setIntro('done'), 520)
  }

  return (
    <>
      {galleryMode && intro !== 'done' && (
        <div className={`premium-intro premium-intro--${intro}`} role="presentation">
          <div className="premium-intro-grid" />
          <div className="premium-intro-content">
            <span className="premium-intro-index">RED / 001</span>
            <div className="premium-intro-mark" aria-hidden="true"><i /><i /><b>R</b></div>
            <p>component archive · interaction studies · reusable code</p>
            <h1>RED UI <em>KIT</em></h1>
            <div className="premium-intro-line"><i /></div>
            <div className="premium-intro-meta"><span>Components</span><span>Categories</span><span>Interactive code</span></div>
          </div>
          <button className="premium-intro-skip" type="button" onClick={skipIntro}>Skip intro</button>
        </div>
      )}

      <div className="premium-atmosphere" aria-hidden="true">
        <div className="premium-light premium-light--pointer" />
        <div className="premium-light premium-light--violet" />
        <div className="premium-depth-grid" />
        <div className="premium-progress" />
      </div>

      {galleryMode && (
        <div className="spatial-house" aria-hidden="true">
          <div className="house-ceiling"><i /><i /><i /></div>
          <div className="house-wall house-wall--left" />
          <div className="house-wall house-wall--right" />
          <div className="house-floor"><div className="house-floor-lines" /></div>
          <div className="house-far-wall"><div className="house-stone-panel" /></div>
          <div className="house-room-light" />
        </div>
      )}
    </>
  )
}
