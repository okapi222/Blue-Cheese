import type { ChangeEvent } from 'react'
import './select.css'

export type SelectOption = {
  value: string
  label: string
}

export type SelectProps = {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function Select({ 
  value, 
  onChange, 
  options, 
  placeholder = 'Select...', 
  disabled = false,
  className = ''
}: SelectProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value)
  }

  const classes = ['ui-Select', className].filter(Boolean).join(' ')

  return (
    <select
      className={classes}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
