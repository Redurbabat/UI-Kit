import { useState, type CSSProperties } from 'react'
import type { UiComponentDefinition } from '../../registry/componentRegistry'

interface ComponentPreviewProps {
  component: UiComponentDefinition
}

type MagneticStyle = CSSProperties & {
  '--ui-mx': string
  '--ui-my': string
  '--ui-px': string
  '--ui-py': string
}

function MagneticButton() {
  const [style, setStyle] = useState<MagneticStyle>({
    '--ui-mx': '0px',
    '--ui-my': '0px',
    '--ui-px': '50%',
    '--ui-py': '50%',
  })

  return (
    <div
      className="ui-magnetic-zone"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const relativeX = event.clientX - rect.left
        const relativeY = event.clientY - rect.top
        const offsetX = (relativeX / rect.width - 0.5) * 28
        const offsetY = (relativeY / rect.height - 0.5) * 22

        setStyle({
          '--ui-mx': `${offsetX}px`,
          '--ui-my': `${offsetY}px`,
          '--ui-px': `${(relativeX / rect.width) * 100}%`,
          '--ui-py': `${(relativeY / rect.height) * 100}%`,
        })
      }}
      onPointerLeave={() =>
        setStyle({
          '--ui-mx': '0px',
          '--ui-my': '0px',
          '--ui-px': '50%',
          '--ui-py': '50%',
        })
      }
    >
      <button className="ui-xbtn ui-xbtn--magnetic" style={style} type="button">
        FOLLOW
      </button>
    </div>
  )
}

function ExperimentalPreview({ variant }: { variant: string }) {
  switch (variant) {
    case 'mechanical':
      return (
        <button className="ui-xbtn ui-xbtn--mechanical" type="button">
          <span>PRESS</span>
        </button>
      )
    case 'cube':
      return (
        <button className="ui-xbtn ui-xbtn--cube" type="button">
          <span className="ui-cube-face ui-cube-face--front">OPEN</span>
          <span className="ui-cube-face ui-cube-face--top" />
          <span className="ui-cube-face ui-cube-face--side" />
        </button>
      )
    case 'jelly':
      return (
        <button className="ui-xbtn ui-xbtn--jelly" type="button">
          BOUNCE
        </button>
      )
    case 'orbit':
      return (
        <button className="ui-xbtn ui-xbtn--orbit" type="button">
          ORBIT
        </button>
      )
    case 'magnetic':
      return <MagneticButton />
    case 'hologram':
      return (
        <button className="ui-xbtn ui-xbtn--hologram" type="button">
          JARVIS
        </button>
      )
    case 'folder':
      return (
        <button className="ui-xbtn ui-xbtn--folder" type="button">
          FILES
        </button>
      )
    case 'arcade':
      return <button aria-label="Arcade Go" className="ui-xbtn ui-xbtn--arcade" type="button" />
    case 'crystal':
      return (
        <button className="ui-xbtn ui-xbtn--crystal" type="button">
          CRYSTAL
        </button>
      )
    case 'flip':
      return (
        <button className="ui-xbtn ui-xbtn--flip" type="button">
          <span className="ui-flip-inner">
            <span className="ui-flip-face ui-flip-face--front">READY</span>
            <span className="ui-flip-face ui-flip-face--back">GO!</span>
          </span>
        </button>
      )
    case 'split':
      return (
        <button className="ui-xbtn ui-xbtn--split" type="button">
          UNLOCK
        </button>
      )
    case 'bubble':
      return (
        <button className="ui-xbtn ui-xbtn--bubble" type="button">
          POP
        </button>
      )
    case 'ticket':
      return (
        <button className="ui-xbtn ui-xbtn--ticket" type="button">
          ENTER
        </button>
      )
    case 'space-door':
      return (
        <button className="ui-xbtn ui-xbtn--door" type="button">
          <span>ACCESS</span>
        </button>
      )
    case 'lever':
      return <button aria-label="Mechanical lever" className="ui-xbtn ui-xbtn--lever" type="button" />
    case 'capsule':
      return (
        <button className="ui-xbtn ui-xbtn--capsule" type="button">
          <span>BOOST</span>
        </button>
      )
    case 'stacked':
      return (
        <button className="ui-xbtn ui-xbtn--stacked" type="button">
          LAUNCH
        </button>
      )
    case 'wave':
      return (
        <button className="ui-xbtn ui-xbtn--wave" type="button">
          <span>FLOW</span>
        </button>
      )
    case 'eye':
      return (
        <button className="ui-xbtn ui-xbtn--eye" type="button">
          <span>LOOK</span>
        </button>
      )
    case 'portal':
      return (
        <button className="ui-xbtn ui-xbtn--portal" type="button">
          <span>ENTER</span>
        </button>
      )
    default:
      return null
  }
}

export function ComponentPreview({ component }: ComponentPreviewProps) {
  if (component.family === 'experimental') {
    return <ExperimentalPreview variant={component.variant} />
  }

  if (component.family === 'button') {
    return (
      <button className={`ui-button ui-button--${component.variant}`} type="button">
        {component.variant === 'aurora' ? '✦ ' : ''}
        {component.variant === 'physical' ? 'Öffnen' : 'Starten'}
      </button>
    )
  }

  if (component.family === 'toggle') {
    return (
      <label className={`ui-switch ui-switch--${component.variant}`}>
        <input defaultChecked={component.variant === 'standard' || component.variant === 'neon' || component.variant === 'orb'} type="checkbox" />
        <span className="ui-switch-track">
          <span className="ui-switch-knob" />
        </span>
      </label>
    )
  }

  if (component.family === 'checkbox') {
    return (
      <label className={`ui-check ui-check--${component.variant}`}>
        <input defaultChecked={component.variant === 'default' || component.variant === 'glow' || component.variant === 'soft'} type="checkbox" />
        <span className="ui-check-box" />
        Aktiv
      </label>
    )
  }

  if (component.family === 'card') {
    return (
      <article className={`ui-card ui-card--${component.variant}`}>
        <h3>{component.variant === 'neon' ? 'JARVIS' : component.variant === 'accent' ? 'Gaming-PC' : 'BABAT RED'}</h3>
        <p>{component.variant === 'accent' ? 'Online · verbunden' : 'Eine interaktive Oberfläche mit eigener Materialität.'}</p>
        <span className="ui-card-chip">{component.variant}</span>
      </article>
    )
  }

  if (component.family === 'loader') {
    if (component.variant === 'dots') {
      return <div className="ui-loader ui-loader--dots"><span /><span /><span /></div>
    }
    if (component.variant === 'bars') {
      return <div className="ui-loader ui-loader--bars"><span /><span /><span /><span /><span /></div>
    }
    return <div className={`ui-loader ui-loader--${component.variant}`} aria-label="Loading" />
  }

  if (component.family === 'input') {
    if (component.variant === 'floating') {
      return (
        <label className="ui-field ui-field--floating">
          <input className="ui-input" placeholder=" " />
          <span>E-Mail</span>
        </label>
      )
    }

    return (
      <label className={`ui-field ui-field--${component.variant}`}>
        <input className="ui-input" placeholder={component.variant === 'search' ? 'Komponenten suchen' : 'Text eingeben'} />
      </label>
    )
  }

  if (component.family === 'form') {
    return (
      <form className={`ui-mini-form ui-mini-form--${component.variant}`} onSubmit={(event) => event.preventDefault()}>
        <input placeholder={component.variant === 'ai' ? 'Was soll JARVIS tun?' : 'Name'} />
        {component.variant !== 'compact' && <input placeholder="Beschreibung" />}
        <button type="submit">{component.variant === 'ai' ? 'Ausführen' : 'Speichern'}</button>
      </form>
    )
  }

  if (component.family === 'pattern') {
    return <div className={`ui-pattern ui-pattern--${component.variant}`} aria-hidden="true" />
  }

  if (component.family === 'radio') {
    return (
      <label className={`ui-radio ui-radio--${component.variant}`}>
        <input defaultChecked type="radio" name={`preview-${component.id}`} />
        <span className="ui-radio-dot" />
        Option A
      </label>
    )
  }

  if (component.family === 'tooltip') {
    return (
      <span className={`ui-tooltip-wrap ui-tooltip-wrap--${component.variant}`}>
        <button aria-label="Show tooltip" type="button">?</button>
        <span className="ui-tooltip" role="tooltip">Mehr Informationen</span>
      </span>
    )
  }

  return null
}
