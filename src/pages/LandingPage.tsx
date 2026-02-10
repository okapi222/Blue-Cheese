import { Button } from '@ui'
import './landing-page.css'

export function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-headline">
            Transform Your Business with McKinsey
          </h1>
          <p className="hero-subtitle">
            Partner with us to unlock sustainable growth, drive innovation, and achieve lasting impact across your organization.
          </p>
        </div>
      </section>

      <div className="cta-actions">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="contrast">Contrast</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="primary" disabled>Disabled</Button>
      </div>
    </div>
  )
}
