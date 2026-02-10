import { useEffect } from 'react'
import type { ReactNode } from 'react'
import './modal.css'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  size?: ModalSize
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md'
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="ui-Modal-overlay" onClick={handleOverlayClick}>
      <div className={`ui-Modal ui-Modal--${size}`}>
        <div className="ui-Modal__header">
          <h2 className="ui-Modal__title">{title}</h2>
          <button
            className="ui-Modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="ui-Modal__body">{children}</div>
        {footer && <div className="ui-Modal__footer">{footer}</div>}
      </div>
    </div>
  )
}
