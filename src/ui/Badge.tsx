import * as React from 'react'
import './badge-component.css'

export type BadgeVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral'
export type BadgeStyle = 'filled' | 'outlined'
export type BadgeSize = 'sm' | 'md' | 'lg'

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
  badgeStyle?: BadgeStyle
  size?: BadgeSize
  children: React.ReactNode
}

export function Badge({
  variant = 'neutral',
  badgeStyle = 'filled',
  size = 'md',
  className,
  ...rest
}: BadgeProps) {
  const variantClass = `ui-Badge--${variant}-${badgeStyle}`
  const sizeClass = `ui-Badge--${size}`

  return (
    <span
      {...rest}
      className={['ui-Badge', variantClass, sizeClass, className]
        .filter(Boolean)
        .join(' ')}
    />
  )
}
