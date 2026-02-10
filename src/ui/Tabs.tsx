import { ReactNode, useState } from 'react'
import './tabs.css'

export type TabItem = {
  id: string
  label: string
  content: ReactNode
}

export type TabsProps = {
  tabs: TabItem[]
  defaultActiveId?: string
  onTabChange?: (tabId: string) => void
}

export function Tabs({ tabs, defaultActiveId, onTabChange }: TabsProps) {
  const [activeTabId, setActiveTabId] = useState(
    defaultActiveId || tabs[0]?.id || ''
  )

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId)
    onTabChange?.(tabId)
  }

  const activeTab = tabs.find((tab) => tab.id === activeTabId)

  return (
    <div className="ui-Tabs">
      <div className="ui-Tabs__header" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTabId === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            className={`ui-Tabs__tab ${
              activeTabId === tab.id ? 'ui-Tabs__tab--active' : ''
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className="ui-Tabs__panel"
        role="tabpanel"
        id={`panel-${activeTabId}`}
        aria-labelledby={`tab-${activeTabId}`}
      >
        {activeTab?.content}
      </div>
    </div>
  )
}
