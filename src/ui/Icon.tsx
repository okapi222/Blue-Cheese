import React from 'react'
import './icon.css'

export type IconName =
  | 'check'
  | 'close'
  | 'warning'
  | 'info'
  | 'error'
  | 'document'
  | 'email'
  | 'calendar'
  | 'number'
  | 'text'
  | 'boolean'
  | 'currency'
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up'
  | 'arrow-down'
  | 'user'
  | 'upload'
  | 'download'
  | 'edit'
  | 'delete'
  | 'search'
  | 'filter'
  | 'plus'
  | 'minus'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type IconColor = 
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'disabled'

export interface IconProps {
  name: IconName
  size?: IconSize
  color?: IconColor
  className?: string
  'aria-label'?: string
  style?: React.CSSProperties
}

// Map icon names to MDS SVG files
const ICON_SVG_MAP: Record<IconName, string> = {
  check: 'check-outline-16.svg',
  close: 'close-outline-16.svg',
  warning: 'warning-outline-16.svg',
  info: 'info-circle-outline-16.svg',
  error: 'ban-outline-16.svg',
  document: 'file-outline-16.svg',
  email: 'mail-outline-16.svg',
  calendar: 'calendar-outline-16.svg',
  number: 'tag-outline-16.svg',
  text: 'file-text-outline-16.svg',
  boolean: 'check-circle-outline-16.svg',
  currency: 'dollar-outline-16.svg',
  'arrow-right': 'arrow-right-outline-16.svg',
  'arrow-left': 'arrow-left-outline-16.svg',
  'arrow-up': 'arrow-up-outline-16.svg',
  'arrow-down': 'arrow-down-outline-16.svg',
  user: 'profile-outline-16.svg',
  upload: 'upload-outline-16.svg',
  download: 'download-outline-16.svg',
  edit: 'pencil-outline-16.svg',
  delete: 'trash-outline-16.svg',
  search: 'search-outline-16.svg',
  filter: 'funnel-outline-16.svg',
  plus: 'plus-outline-16.svg',
  minus: 'minus-outline-16.svg',
}

/**
 * Icon Component
 * 
 * Displays MDS SVG icons with consistent sizing and color system.
 * 
 * @example
 * ```tsx
 * <Icon name="warning" size="md" color="warning" />
 * <Icon name="check" size="sm" color="success" />
 * ```
 */
export function Icon({
  name,
  size = 'md',
  color = 'default',
  className = '',
  'aria-label': ariaLabel,
  style,
}: IconProps) {
  const svgFile = ICON_SVG_MAP[name] || 'file-outline-16.svg'
  const iconSrc = `/icons/mds/${svgFile}`

  return (
    <img
      src={iconSrc}
      alt={ariaLabel || ''}
      className={`ui-Icon ui-Icon--${size} ui-Icon--${color} ${className}`}
      role={ariaLabel ? 'img' : 'presentation'}
      aria-label={ariaLabel}
      style={style}
    />
  )
}
