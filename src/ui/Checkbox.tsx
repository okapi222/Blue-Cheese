import { useEffect, useRef } from 'react'
import './checkbox.css'

export type CheckboxSize = 'sm' | 'md'

export type CheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  indeterminate?: boolean
  label?: string
  disabled?: boolean
  size?: CheckboxSize
  className?: string
}

export function Checkbox({
  checked,
  onChange,
  indeterminate = false,
  label,
  disabled = false,
  size = 'md',
  className = ''
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  const handleChange = () => {
    if (!disabled) {
      onChange(!checked)
    }
  }

  const classes = [
    'ui-Checkbox',
    size === 'sm' && 'ui-Checkbox--sm',
    disabled && 'ui-Checkbox--disabled',
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <label className={classes}>
      <input
        ref={inputRef}
        type="checkbox"
        className="ui-Checkbox__input"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        aria-label={label}
      />
      <span className="ui-Checkbox__box" />
      {label && <span className="ui-Checkbox__label">{label}</span>}
    </label>
  )
}
