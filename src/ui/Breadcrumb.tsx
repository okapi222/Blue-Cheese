import './breadcrumb.css'

export type BreadcrumbItem = {
  label: string
  onClick?: () => void
}

export type BreadcrumbProps = {
  items: BreadcrumbItem[]
  separator?: string
  className?: string
}

export function Breadcrumb({ items, separator = '/', className = '' }: BreadcrumbProps) {
  const classes = ['ui-Breadcrumb', className].filter(Boolean).join(' ')

  return (
    <nav className={classes} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={index} className="ui-Breadcrumb__item">
            {isLast ? (
              <span className="ui-Breadcrumb__current" aria-current="page">
                {item.label}
              </span>
            ) : (
              <>
                {item.onClick ? (
                  <a
                    className="ui-Breadcrumb__link"
                    onClick={item.onClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        item.onClick?.()
                      }
                    }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="ui-Breadcrumb__link">{item.label}</span>
                )}
                <span className="ui-Breadcrumb__separator" aria-hidden="true">
                  {separator}
                </span>
              </>
            )}
          </div>
        )
      })}
    </nav>
  )
}
