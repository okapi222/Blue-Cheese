import type { ChangeEvent } from 'react'
import './input.css'

export type InputProps = {
  type?: 'text' | 'email' | 'password' | 'search' | 'date'
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function Input({ 
  type = 'text',
  value, 
  onChange, 
  placeholder,
  disabled = false,
  className = ''
}: InputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const classes = ['ui-Input', className].filter(Boolean).join(' ')

  return (
    <input
      type={type}
      className={classes}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  )
}
