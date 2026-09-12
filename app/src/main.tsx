import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { PremiumExperience } from './components/site/PremiumExperience'
import './custom/registerFunSeeds'
import './styles/globals.css'
import './styles/components.css'
import './styles/style-packs.css'
import './styles/gallery-detail.css'
import './styles/custom-designs.css'
import './styles/extreme-lab.css'
import './styles/playground-controls.css'
import './styles/site-structure.css'
import './styles/premium-experience.css'
import './styles/premium-layout.css'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Missing #root element')
}

createRoot(root).render(
  <StrictMode>
    <PremiumExperience />
    <App />
  </StrictMode>,
)
