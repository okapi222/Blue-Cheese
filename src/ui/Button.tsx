import * as React from 'react'
import './button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'contrast' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  disabled,
  ...rest
}: ButtonProps) {
  const variantClass = `ui-Button--${variant}`
  const sizeClass = `ui-Button--${size}`

  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      className={['ui-Button', variantClass, sizeClass, className].filter(Boolean).join(' ')}
    />
  )
}

