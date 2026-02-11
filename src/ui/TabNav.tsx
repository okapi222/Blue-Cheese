import './tab-nav.css'

export type TabNavItem = {
  id: string
  label: string
}

export type TabNavProps = {
  items: TabNavItem[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

/**
 * TabNav - Simple tab navigation without managed content
 * Use this when you want to manage tab content separately in your component
 * For tabs with managed content, use the Tabs component instead
 */
export function TabNav({ items, activeTab, onTabChange }: TabNavProps) {
  return (
    <div className="ui-TabNav" role="tablist">
      {items.map((item) => (
        <button
          key={item.id}
          role="tab"
          aria-selected={activeTab === item.id}
          id={`tab-${item.id}`}
          className={`ui-TabNav__tab ${
            activeTab === item.id ? 'ui-TabNav__tab--active' : ''
          }`}
          onClick={() => onTabChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
