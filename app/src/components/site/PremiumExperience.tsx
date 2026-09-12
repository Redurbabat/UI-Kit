import { useEffect, useMemo, useState } from 'react'

const JOURNEY = [
  { id: 'top', label: 'Entrance', room: 'Entrance Hall', code: '00', note: 'Welcome to RED UI KIT' },
  { id: 'explore', label: 'Directory', room: 'House Directory', code: '01', note: 'Choose a collection room' },
  { id: 'featured', label: 'Featured', room: 'Featured Exhibition', code: '02', note: 'Curated entrance pieces' },
  { id: 'collection-motion', label: 'Motion', room: 'Motion Gallery', code: '03', note: 'Glass, depth and pointer light' },
  { id: 'collection-music', label: 'Music', room: 'Music Room', code: '04', note: 'Animated playback controls' },
  { id: 'collection-spatial', label: 'Spatial', room: 'Spatial Gallery', code: '05', note: '3D cards and dashboards' },
  { id: 'collection-workshop', label: 'Workshop', room: 'Interaction Workshop', code: '06', note: 'Mechanical and tactile pieces' },
  { id: 'collection-other', label: 'Experiments', room: 'Experiment Shelf', code: '07', note: 'Unclassified built-in studies' },
  { id: 'my-designs', label: 'Personal', room: 'Private Studio', code: '08', note: 'Your saved work' },
  { id: 'extreme-lab', label: 'Extreme', room: 'Extreme Hall', code: '09', note: 'Experimental installations' },
  { id: 'library', label: 'Library', room: 'Archive Library', code: '10', note: 'The stable component registry' },
] as const

const INTRO_KEY = 'red-ui-kit.premium-intro.v1'
const isGalleryHash = () => !window.location.hash.startsWith('#/')

export function PremiumExperience() {
  const [active, setActive] = useState('top')
  const [intro, setIntro] = useState<'enter' | 'present' | 'leave' | 'done'>('done')
  const [galleryMode, setGalleryMode] = useState(isGalleryHash)

  const journey = useMemo(() => JOURNEY, [])
  const currentIndex = Math.max(0, journey.findIndex((item) => item.id === active))
  const currentRoom = journey[currentIndex] ?? journey[0]
  const nextRoom = journey[currentIndex + 1] ?? null

  useEffect(() => {
    const syncRoute = () => setGalleryMode(isGalleryHash())
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (galleryMode) {
      root.dataset.room = currentRoom.id
      root.style.setProperty('--room-index', String(currentIndex))
    } else {
      delete root.dataset.room
      root.style.removeProperty('--room-index')
    }

    return () => {
      delete root.dataset.room
      root.style.removeProperty('--room-index')
    }
  }, [currentIndex, currentRoom.id, galleryMode])

  useEffect(() => {
    if (!galleryMode) {
      setIntro('done')
      return
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen = window.sessionStorage.getItem(INTRO_KEY) === 'seen'

    if (!reduced && !seen) {
      setIntro('enter')
      const presentTimer = window.setTimeout(() => setIntro('present'), 260)
      const leaveTimer = window.setTimeout(() => setIntro('leave'), 2350)
      const doneTimer = window.setTimeout(() => {
        setIntro('done')
        window.sessionStorage.setItem(INTRO_KEY, 'seen')
      }, 3150)

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
        root.style.setProperty('--scene-ry', `${((x - 0.5) * -5).toFixed(2)}deg`)
        root.style.setProperty('--scene-rx', `${((y - 0.5) * 3.5).toFixed(2)}deg`)
        root.style.setProperty('--house-pan-x', `${((x - 0.5) * -16).toFixed(2)}px`)
        root.style.setProperty('--house-pan-y', `${((y - 0.5) * -8).toFixed(2)}px`)
        pointerFrame = 0
      })
    }

    const updateScroll = () => {
      if (scrollFrame) return
      scrollFrame = window.requestAnimationFrame(() => {
        const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
        const progress = Math.max(0, Math.min(1, window.scrollY / max))
        root.style.setProperty('--page-progress', String(progress))
        root.style.setProperty('--scroll-depth', `${Math.min(window.scrollY * 0.018, 24).toFixed(2)}px`)
        root.style.setProperty('--house-stride', `${(progress * 38).toFixed(2)}px`)
        if (window.scrollY < 260) setActive('top')
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

    const sections = journey
      .slice(1)
      .map((item) => ({ item, element: document.getElementById(item.id) }))
      .filter((entry): entry is { item: (typeof JOURNEY)[number]; element: HTMLElement } => Boolean(entry.element))

    if (!sections.length) return

    sections.forEach(({ item, element }) => {
      element.classList.add('experience-section', 'house-room-section')
      element.dataset.chapter = item.code
      element.dataset.roomName = item.room
    })

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add('is-presented')
        }

        const current = visible[0]?.target as HTMLElement | undefined
        if (current?.id) setActive(current.id)
      },
      { rootMargin: '-24% 0px -42% 0px', threshold: [0.08, 0.2, 0.42, 0.68] },
    )

    sections.forEach(({ element }) => observer.observe(element))
    return () => observer.disconnect()
  }, [galleryMode, journey])

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const skipIntro = () => {
    window.sessionStorage.setItem(INTRO_KEY, 'seen')
    setIntro('leave')
    window.setTimeout(() => setIntro('done'), 650)
  }

  return (
    <>
      {galleryMode && intro !== 'done' && (
        <div className={`premium-intro premium-intro--${intro}`} role="presentation">
          <div className="premium-intro-grid" />
          <div className="premium-intro-orb premium-intro-orb--a" />
          <div className="premium-intro-orb premium-intro-orb--b" />
          <div className="premium-intro-content">
            <span className="premium-intro-index">RED / 001</span>
            <div className="premium-intro-mark" aria-hidden="true"><i /><i /><b>R</b></div>
            <p>Design system · motion laboratory · spatial interface archive</p>
            <h1>RED UI <em>KIT</em></h1>
            <div className="premium-intro-line"><i /></div>
            <div className="premium-intro-meta"><span>3D systems</span><span>Motion studies</span><span>Interactive code</span></div>
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
        <>
          <div className="spatial-house" aria-hidden="true">
            <div className="house-ceiling"><i /><i /><i /></div>
            <div className="house-wall house-wall--left" />
            <div className="house-wall house-wall--right" />
            <div className="house-floor"><div className="house-floor-lines" /></div>
            <div className="house-far-wall">
              <div className="house-door-glow" />
              <div className="house-door-frame" key={currentRoom.id}>
                <div className="house-door-inner">
                  <span>{nextRoom ? 'NEXT ROOM' : 'END OF TOUR'}</span>
                  <strong>{nextRoom?.room ?? currentRoom.room}</strong>
                  <small>{nextRoom?.note ?? currentRoom.note}</small>
                </div>
              </div>
            </div>
            <div className="house-room-light" />
          </div>

          <div className="house-room-plaque" key={`plaque-${currentRoom.id}`}>
            <span>{currentRoom.code} / ROOM</span>
            <strong>{currentRoom.room}</strong>
            <small>{currentRoom.note}</small>
          </div>

          {nextRoom && (
            <button className="house-next-step" type="button" onClick={() => goTo(nextRoom.id)}>
              <span>Walk to next room</span><strong>{nextRoom.room}</strong><i>→</i>
            </button>
          )}

          <nav className="journey-rail" aria-label="Page journey">
            <span className="journey-rail-title">Floor plan</span>
            <div className="journey-track" aria-hidden="true"><i /></div>
            <div className="journey-points">
              {journey.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={active === item.id ? 'active' : ''}
                  onClick={() => goTo(item.id)}
                  aria-label={`Go to ${item.room}`}
                >
                  <span>{item.code}</span><i /><b>{item.room}</b>
                </button>
              ))}
            </div>
          </nav>
        </>
      )}
    </>
  )
}
