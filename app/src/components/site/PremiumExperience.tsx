import { useEffect, useMemo, useState } from 'react'

const JOURNEY = [
  { id: 'top', label: 'Entrance', code: '00' },
  { id: 'explore', label: 'Explore', code: '01' },
  { id: 'featured', label: 'Featured', code: '02' },
  { id: 'motion', label: 'Motion', code: '03' },
  { id: 'playground-collection', label: 'Playground', code: '04' },
  { id: 'my-designs', label: 'Personal', code: '05' },
  { id: 'extreme-lab', label: 'Extreme', code: '06' },
  { id: 'library', label: 'Library', code: '07' },
]

const INTRO_KEY = 'red-ui-kit.premium-intro.v1'

export function PremiumExperience() {
  const [active, setActive] = useState('top')
  const [intro, setIntro] = useState<'enter' | 'present' | 'leave' | 'done'>('done')

  const journey = useMemo(() => JOURNEY, [])

  useEffect(() => {
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
  }, [])

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
    const sections = journey
      .slice(1)
      .map((item) => ({ item, element: document.getElementById(item.id) }))
      .filter((entry): entry is { item: (typeof JOURNEY)[number]; element: HTMLElement } => Boolean(entry.element))

    if (!sections.length) return

    sections.forEach(({ item, element }) => {
      element.classList.add('experience-section')
      element.dataset.chapter = item.code
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
  }, [journey])

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
      {intro !== 'done' && (
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

      <nav className="journey-rail" aria-label="Page journey">
        <span className="journey-rail-title">Journey</span>
        <div className="journey-track" aria-hidden="true"><i /></div>
        <div className="journey-points">
          {journey.map((item) => (
            <button
              key={item.id}
              type="button"
              className={active === item.id ? 'active' : ''}
              onClick={() => goTo(item.id)}
              aria-label={`Go to ${item.label}`}
            >
              <span>{item.code}</span><i /><b>{item.label}</b>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
