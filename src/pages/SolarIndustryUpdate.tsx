import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PresentationChart } from '../components/presentation-charts'
import { solarIndustryUpdateSlides } from '../data/solarIndustryUpdateSlides'
import './solar-industry-update.css'

const TOTAL_SLIDES = solarIndustryUpdateSlides.length

export function SolarIndustryUpdate() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const slide = solarIndustryUpdateSlides[index]

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % TOTAL_SLIDES)
  }, [])
  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + TOTAL_SLIDES) % TOTAL_SLIDES)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'Home') {
        e.preventDefault()
        setIndex(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        setIndex(TOTAL_SLIDES - 1)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goNext, goPrev])

  return (
    <div className="presentation-deck solar-industry-update">
      <div
        className="presentation-slide"
        role="region"
        aria-label={`Slide ${index + 1} of ${TOTAL_SLIDES}`}
      >
        <div className="presentation-slide__content">
          <h2 className="presentation-slide__title">{slide.title}</h2>
          {slide.subtitle && (
            <p className="presentation-slide__subtitle">{slide.subtitle}</p>
          )}
          {slide.bullets && slide.bullets.length > 0 && (
            <ul className="presentation-slide__bullets">
              {slide.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          )}
          {slide.chart && (
            <div className="presentation-slide__chart">
              <PresentationChart chartId={slide.chart} />
            </div>
          )}
          {slide.note && (
            <p className="presentation-slide__note">{slide.note}</p>
          )}
        </div>
        <footer className="presentation-slide__footer">
          <span className="presentation-slide__counter">
            {index + 1} / {TOTAL_SLIDES}
          </span>
          <span className="presentation-slide__brand">NREL | Fall 2024 Solar Industry Update</span>
        </footer>
      </div>

      <button
        type="button"
        className="presentation-exit"
        onClick={() => navigate('/')}
        aria-label="Exit presentation"
      >
        ✕ Exit
      </button>

      <button
        type="button"
        className="presentation-nav presentation-nav--prev"
        onClick={goPrev}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        type="button"
        className="presentation-nav presentation-nav--next"
        onClick={goNext}
        aria-label="Next slide"
      >
        ›
      </button>

      <div className="presentation-progress">
        <div
          className="presentation-progress__fill"
          style={{ width: `${((index + 1) / TOTAL_SLIDES) * 100}%` }}
        />
      </div>
    </div>
  )
}
