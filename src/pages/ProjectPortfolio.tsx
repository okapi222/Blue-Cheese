import { useState, useMemo } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners
} from '@dnd-kit/core'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import {
  Button,
  Badge,
  Input,
  Select,
  Checkbox,
  Modal,
  Tabs
} from '@ui'
import type { BadgeVariant, SelectOption, TabItem } from '@ui'
import './project-portfolio.css'

type ProjectStatus = 'Planning' | 'In Progress' | 'Review' | 'Completed'
type ProjectPriority = 'High' | 'Medium' | 'Low'
type ResourceStatus = 'Available' | 'Overallocated' | 'At Capacity'

type TeamMember = {
  id: string
  name: string
  role: string
  allocation: number
  status: ResourceStatus
}

type Project = {
  id: string
  name: string
  description: string
  status: ProjectStatus
  priority: ProjectPriority
  budget: number
  spent: number
  startDate: string
  endDate: string
  team: TeamMember[]
  completion: number
  client: string
  updates: number
}

type ActivityItem = {
  id: string
  user: string
  action: string
  timestamp: string
}

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Digital Transformation Initiative',
    description: 'Comprehensive digital transformation for enterprise client',
    status: 'In Progress',
    priority: 'High',
    budget: 2500000,
    spent: 1200000,
    startDate: '2026-01-15',
    endDate: '2026-08-30',
    completion: 48,
    client: 'Global Manufacturing Corp',
    updates: 3,
    team: [
      { id: 't1', name: 'Sarah Johnson', role: 'Project Lead', allocation: 100, status: 'At Capacity' },
      { id: 't2', name: 'Michael Chen', role: 'Tech Architect', allocation: 75, status: 'Available' },
      { id: 't3', name: 'Emily Rodriguez', role: 'Business Analyst', allocation: 120, status: 'Overallocated' }
    ]
  },
  {
    id: '2',
    name: 'Market Entry Strategy',
    description: 'Strategic planning for Asian market expansion',
    status: 'Planning',
    priority: 'High',
    budget: 850000,
    spent: 120000,
    startDate: '2026-02-01',
    endDate: '2026-06-15',
    completion: 15,
    client: 'RetailCo International',
    updates: 1,
    team: [
      { id: 't4', name: 'David Kim', role: 'Strategy Lead', allocation: 80, status: 'Available' },
      { id: 't5', name: 'Jessica Williams', role: 'Market Analyst', allocation: 60, status: 'Available' }
    ]
  },
  {
    id: '3',
    name: 'Supply Chain Optimization',
    description: 'End-to-end supply chain efficiency improvement',
    status: 'Review',
    priority: 'Medium',
    budget: 1200000,
    spent: 980000,
    startDate: '2025-11-01',
    endDate: '2026-03-31',
    completion: 85,
    client: 'LogisticsPro Ltd',
    updates: 5,
    team: [
      { id: 't6', name: 'Robert Martinez', role: 'Operations Lead', allocation: 90, status: 'At Capacity' },
      { id: 't7', name: 'Amanda Taylor', role: 'Data Scientist', allocation: 100, status: 'At Capacity' },
      { id: 't8', name: 'James Anderson', role: 'Consultant', allocation: 50, status: 'Available' }
    ]
  },
  {
    id: '4',
    name: 'Customer Experience Redesign',
    description: 'Omnichannel customer journey optimization',
    status: 'In Progress',
    priority: 'Medium',
    budget: 620000,
    spent: 310000,
    startDate: '2026-01-20',
    endDate: '2026-05-15',
    completion: 52,
    client: 'Financial Services Inc',
    updates: 2,
    team: [
      { id: 't9', name: 'Lisa Thompson', role: 'UX Lead', allocation: 100, status: 'At Capacity' },
      { id: 't10', name: 'Chris Lee', role: 'Designer', allocation: 80, status: 'Available' }
    ]
  },
  {
    id: '5',
    name: 'Data Analytics Platform',
    description: 'Enterprise-wide data analytics and BI platform',
    status: 'Planning',
    priority: 'Low',
    budget: 1800000,
    spent: 0,
    startDate: '2026-03-01',
    endDate: '2026-12-31',
    completion: 5,
    client: 'TechCorp Industries',
    updates: 0,
    team: [
      { id: 't11', name: 'Daniel Park', role: 'Data Lead', allocation: 40, status: 'Available' }
    ]
  },
  {
    id: '6',
    name: 'Sustainability Integration',
    description: 'ESG framework implementation and reporting',
    status: 'Completed',
    priority: 'High',
    budget: 450000,
    spent: 445000,
    startDate: '2025-09-01',
    endDate: '2026-01-31',
    completion: 100,
    client: 'Energy Solutions Co',
    updates: 0,
    team: [
      { id: 't12', name: 'Maria Garcia', role: 'Sustainability Lead', allocation: 0, status: 'Available' }
    ]
  }
]

const MOCK_ACTIVITY: ActivityItem[] = [
  { id: 'a1', user: 'Sarah Johnson', action: 'Updated project timeline', timestamp: '2 hours ago' },
  { id: 'a2', user: 'Michael Chen', action: 'Added new team member', timestamp: '5 hours ago' },
  { id: 'a3', user: 'Emily Rodriguez', action: 'Uploaded design documents', timestamp: '1 day ago' },
  { id: 'a4', user: 'David Kim', action: 'Completed milestone review', timestamp: '2 days ago' },
  { id: 'a5', user: 'Jessica Williams', action: 'Updated budget forecast', timestamp: '3 days ago' }
]

const statusColumns: ProjectStatus[] = ['Planning', 'In Progress', 'Review', 'Completed']

function getStatusBadgeVariant(status: ProjectStatus): BadgeVariant {
  switch (status) {
    case 'Planning':
      return 'neutral'
    case 'In Progress':
      return 'info'
    case 'Review':
      return 'warning'
    case 'Completed':
      return 'success'
  }
}

function getPriorityBadgeVariant(priority: ProjectPriority): BadgeVariant {
  switch (priority) {
    case 'High':
      return 'error'
    case 'Medium':
      return 'warning'
    case 'Low':
      return 'neutral'
  }
}

function getResourceStatusBadgeVariant(status: ResourceStatus): BadgeVariant {
  switch (status) {
    case 'Available':
      return 'success'
    case 'At Capacity':
      return 'warning'
    case 'Overallocated':
      return 'error'
  }
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

type SortableProjectCardProps = {
  project: Project
  onCardClick: (project: Project) => void
  isSelected: boolean
  onSelect: (id: string, selected: boolean) => void
}

function SortableProjectCard({
  project,
  onCardClick,
  isSelected,
  onSelect
}: SortableProjectCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: project.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  const hasConflicts = project.team.some((member) => member.status === 'Overallocated')

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`project-card ${isDragging ? 'project-card--dragging' : ''}`}
      {...attributes}
      {...listeners}
    >
      <div className="project-card__header">
        <Checkbox
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation()
            onSelect(project.id, e.target.checked)
          }}
          label=""
          onClick={(e) => e.stopPropagation()}
        />
        <div className="project-card__title-section" onClick={() => onCardClick(project)}>
          <h4 className="project-card__title">{project.name}</h4>
          {project.updates > 0 && (
            <Badge variant="error" badgeStyle="outlined" size="sm">
              {project.updates}
            </Badge>
          )}
          {hasConflicts && (
            <span className="project-card__warning-icon" title="Resource conflicts">
              ⚠️
            </span>
          )}
        </div>
      </div>

      <div className="project-card__content" onClick={() => onCardClick(project)}>
        <p className="project-card__description">{project.description}</p>

        <div className="project-card__meta">
          <div className="project-card__meta-row">
            <span className="project-card__label">Client:</span>
            <span className="project-card__value">{project.client}</span>
          </div>
          <div className="project-card__meta-row">
            <span className="project-card__label">Priority:</span>
            <Badge variant={getPriorityBadgeVariant(project.priority)} badgeStyle="outlined" size="sm">
              {project.priority}
            </Badge>
          </div>
        </div>

        <div className="project-card__budget">
          <span className="project-card__label">Budget:</span>
          <span className="project-card__value">
            {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
          </span>
        </div>

        <div className="project-card__progress">
          <div className="project-card__progress-header">
            <span className="project-card__label">Completion</span>
            <span className="project-card__value">{project.completion}%</span>
          </div>
          <div className="project-card__progress-bar">
            <div
              className="project-card__progress-fill"
              style={{ width: `${project.completion}%` }}
            />
          </div>
        </div>

        <div className="project-card__team">
          <span className="project-card__label">Team ({project.team.length}):</span>
          <div className="project-card__team-list">
            {project.team.slice(0, 3).map((member) => (
              <span key={member.id} className="project-card__team-member">
                {member.name}
              </span>
            ))}
            {project.team.length > 3 && (
              <span className="project-card__team-more">+{project.team.length - 3} more</span>
            )}
          </div>
        </div>

        <div className="project-card__timeline">
          <span className="project-card__label">Timeline:</span>
          <span className="project-card__value">
            {new Date(project.startDate).toLocaleDateString()} -{' '}
            {new Date(project.endDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  )
}

type ViewMode = 'kanban' | 'list'

export function ProjectPortfolio() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)
  const [viewMode, setViewMode] = useState<ViewMode>('kanban')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedProjectIds, setSelectedProjectIds] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('name')
  const [draggedProject, setDraggedProject] = useState<Project | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    })
  )

  const totalUpdates = projects.reduce((sum, p) => sum + p.updates, 0)

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery === '' ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'all' || project.status === statusFilter
      const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [projects, searchQuery, statusFilter, priorityFilter])

  const sortedProjects = useMemo(() => {
    const sorted = [...filteredProjects]
    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'budget':
        sorted.sort((a, b) => b.budget - a.budget)
        break
      case 'completion':
        sorted.sort((a, b) => b.completion - a.completion)
        break
      case 'endDate':
        sorted.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
        break
    }
    return sorted
  }, [filteredProjects, sortBy])

  const projectsByStatus = useMemo(() => {
    const result: Record<ProjectStatus, Project[]> = {
      Planning: [],
      'In Progress': [],
      Review: [],
      Completed: []
    }

    sortedProjects.forEach((project) => {
      result[project.status].push(project)
    })

    return result
  }, [sortedProjects])

  const handleDragStart = (event: DragStartEvent) => {
    const project = projects.find((p) => p.id === event.active.id)
    setDraggedProject(project || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggedProject(null)

    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Check if we're moving to a different status column
    const overStatus = statusColumns.find((status) => overId === status)
    if (overStatus) {
      setProjects((prev) =>
        prev.map((p) => (p.id === activeId ? { ...p, status: overStatus } : p))
      )
      return
    }

    // Otherwise, handle reordering within the same column
    const activeProject = projects.find((p) => p.id === activeId)
    const overProject = projects.find((p) => p.id === overId)

    if (!activeProject || !overProject) return
    if (activeProject.status !== overProject.status) return

    const statusProjects = projects.filter((p) => p.status === activeProject.status)
    const oldIndex = statusProjects.findIndex((p) => p.id === activeId)
    const newIndex = statusProjects.findIndex((p) => p.id === overId)

    const reorderedStatusProjects = arrayMove(statusProjects, oldIndex, newIndex)

    setProjects((prev) => {
      const otherProjects = prev.filter((p) => p.status !== activeProject.status)
      return [...otherProjects, ...reorderedStatusProjects]
    })
  }

  const handleBulkStatusUpdate = (newStatus: ProjectStatus) => {
    if (selectedProjectIds.size === 0) return

    setProjects((prev) =>
      prev.map((p) => (selectedProjectIds.has(p.id) ? { ...p, status: newStatus } : p))
    )
    setSelectedProjectIds(new Set())
  }

  const handleSelectProject = (id: string, selected: boolean) => {
    setSelectedProjectIds((prev) => {
      const next = new Set(prev)
      if (selected) {
        next.add(id)
      } else {
        next.delete(id)
      }
      return next
    })
  }

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedProjectIds(new Set(filteredProjects.map((p) => p.id)))
    } else {
      setSelectedProjectIds(new Set())
    }
  }

  const statusOptions: SelectOption[] = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Planning', label: 'Planning' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Review', label: 'Review' },
    { value: 'Completed', label: 'Completed' }
  ]

  const priorityOptions: SelectOption[] = [
    { value: 'all', label: 'All Priorities' },
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' }
  ]

  const sortOptions: SelectOption[] = [
    { value: 'name', label: 'Name' },
    { value: 'budget', label: 'Budget' },
    { value: 'completion', label: 'Completion' },
    { value: 'endDate', label: 'End Date' }
  ]

  const renderProjectDetailModal = () => {
    if (!selectedProject) return null

    const overviewContent = (
      <div className="project-detail__overview">
        <div className="project-detail__section">
          <h3 className="project-detail__section-title">Project Information</h3>
          <div className="project-detail__info-grid">
            <div className="project-detail__info-item">
              <span className="project-detail__label">Client:</span>
              <span className="project-detail__value">{selectedProject.client}</span>
            </div>
            <div className="project-detail__info-item">
              <span className="project-detail__label">Status:</span>
              <Badge variant={getStatusBadgeVariant(selectedProject.status)} badgeStyle="outlined">
                {selectedProject.status}
              </Badge>
            </div>
            <div className="project-detail__info-item">
              <span className="project-detail__label">Priority:</span>
              <Badge variant={getPriorityBadgeVariant(selectedProject.priority)} badgeStyle="outlined">
                {selectedProject.priority}
              </Badge>
            </div>
            <div className="project-detail__info-item">
              <span className="project-detail__label">Timeline:</span>
              <span className="project-detail__value">
                {new Date(selectedProject.startDate).toLocaleDateString()} -{' '}
                {new Date(selectedProject.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="project-detail__info-item">
              <span className="project-detail__label">Budget:</span>
              <span className="project-detail__value">{formatCurrency(selectedProject.budget)}</span>
            </div>
            <div className="project-detail__info-item">
              <span className="project-detail__label">Spent:</span>
              <span className="project-detail__value">{formatCurrency(selectedProject.spent)}</span>
            </div>
          </div>
        </div>

        <div className="project-detail__section">
          <h3 className="project-detail__section-title">Description</h3>
          <p>{selectedProject.description}</p>
        </div>

        <div className="project-detail__section">
          <h3 className="project-detail__section-title">Progress</h3>
          <div className="project-detail__progress">
            <div className="project-detail__progress-header">
              <span>{selectedProject.completion}% Complete</span>
            </div>
            <div className="project-detail__progress-bar">
              <div
                className="project-detail__progress-fill"
                style={{ width: `${selectedProject.completion}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    )

    const teamContent = (
      <div className="project-detail__team">
        <table className="resource-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Allocation %</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {selectedProject.team.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.role}</td>
                <td>{member.allocation}%</td>
                <td>
                  <Badge variant={getResourceStatusBadgeVariant(member.status)} badgeStyle="outlined" size="sm">
                    {member.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )

    const filesContent = (
      <div className="project-detail__files">
        <div className="project-detail__empty">
          <p>No files uploaded yet</p>
          <Button variant="primary" size="sm">
            Upload File
          </Button>
        </div>
      </div>
    )

    const activityContent = (
      <div className="project-detail__activity">
        {MOCK_ACTIVITY.map((item) => (
          <div key={item.id} className="activity-item">
            <div className="activity-item__icon">👤</div>
            <div className="activity-item__content">
              <div className="activity-item__header">
                <span className="activity-item__user">{item.user}</span>
                <span className="activity-item__timestamp">{item.timestamp}</span>
              </div>
              <p className="activity-item__action">{item.action}</p>
            </div>
          </div>
        ))}
      </div>
    )

    const tabs: TabItem[] = [
      { id: 'overview', label: 'Overview', content: overviewContent },
      { id: 'team', label: 'Team', content: teamContent },
      { id: 'files', label: 'Files', content: filesContent },
      { id: 'activity', label: 'Activity', content: activityContent }
    ]

    return (
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject.name}
        size="xl"
        footer={
          <>
            <Button variant="tertiary" onClick={() => setSelectedProject(null)}>
              Close
            </Button>
            <Button variant="primary">Save Changes</Button>
          </>
        }
      >
        <Tabs tabs={tabs} />
      </Modal>
    )
  }

  return (
    <div className="project-portfolio">
      <div className="project-portfolio__header">
        <div className="project-portfolio__title-section">
          <h1 className="project-portfolio__title">Project Portfolio</h1>
          <p className="project-portfolio__subtitle">
            Track and manage all active projects and resources
          </p>
        </div>

        {totalUpdates > 0 && (
          <div className="project-portfolio__notifications">
            <Badge variant="error" badgeStyle="filled">
              {totalUpdates} Updates
            </Badge>
          </div>
        )}
      </div>

      <div className="project-portfolio__controls">
        <div className="project-portfolio__filters">
          <Input
            type="text"
            placeholder="Search projects or clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
          <Select
            options={priorityOptions}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          />
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          />
        </div>

        <div className="project-portfolio__actions">
          <div className="project-portfolio__view-toggle">
            <Button
              variant={viewMode === 'kanban' ? 'primary' : 'tertiary'}
              size="sm"
              onClick={() => setViewMode('kanban')}
            >
              Kanban
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'tertiary'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
          </div>
          <Button variant="primary">New Project</Button>
        </div>
      </div>

      {selectedProjectIds.size > 0 && (
        <div className="project-portfolio__bulk-actions">
          <span className="project-portfolio__bulk-count">
            {selectedProjectIds.size} project{selectedProjectIds.size !== 1 ? 's' : ''} selected
          </span>
          <div className="project-portfolio__bulk-buttons">
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => handleBulkStatusUpdate('Planning')}
            >
              Move to Planning
            </Button>
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => handleBulkStatusUpdate('In Progress')}
            >
              Move to In Progress
            </Button>
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => handleBulkStatusUpdate('Review')}
            >
              Move to Review
            </Button>
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => handleBulkStatusUpdate('Completed')}
            >
              Move to Completed
            </Button>
            <Button variant="tertiary" size="sm" onClick={() => setSelectedProjectIds(new Set())}>
              Clear Selection
            </Button>
          </div>
        </div>
      )}

      {viewMode === 'kanban' && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="kanban-board">
            {statusColumns.map((status) => {
              const columnProjects = projectsByStatus[status]
              return (
                <div key={status} className="kanban-column">
                  <div className="kanban-column__header">
                    <h3 className="kanban-column__title">{status}</h3>
                    <Badge variant="neutral" badgeStyle="outlined" size="sm">
                      {columnProjects.length}
                    </Badge>
                  </div>
                  <SortableContext
                    items={columnProjects.map((p) => p.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="kanban-column__content">
                      {columnProjects.map((project) => (
                        <SortableProjectCard
                          key={project.id}
                          project={project}
                          onCardClick={setSelectedProject}
                          isSelected={selectedProjectIds.has(project.id)}
                          onSelect={handleSelectProject}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </div>
              )
            })}
          </div>
          <DragOverlay>
            {draggedProject ? (
              <div className="project-card project-card--overlay">
                <h4 className="project-card__title">{draggedProject.name}</h4>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}

      {viewMode === 'list' && (
        <div className="project-list">
          <table className="project-table">
            <thead>
              <tr>
                <th>
                  <Checkbox
                    checked={
                      filteredProjects.length > 0 &&
                      filteredProjects.every((p) => selectedProjectIds.has(p.id))
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    label=""
                  />
                </th>
                <th>Project Name</th>
                <th>Client</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Budget</th>
                <th>Completion</th>
                <th>End Date</th>
                <th>Team Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedProjects.map((project) => {
                const hasConflicts = project.team.some((m) => m.status === 'Overallocated')
                return (
                  <tr key={project.id}>
                    <td>
                      <Checkbox
                        checked={selectedProjectIds.has(project.id)}
                        onChange={(e) => handleSelectProject(project.id, e.target.checked)}
                        label=""
                      />
                    </td>
                    <td>
                      <div className="project-table__name-cell">
                        {project.name}
                        {project.updates > 0 && (
                          <Badge variant="error" badgeStyle="outlined" size="sm">
                            {project.updates}
                          </Badge>
                        )}
                        {hasConflicts && (
                          <span className="project-table__warning" title="Resource conflicts">
                            ⚠️
                          </span>
                        )}
                      </div>
                    </td>
                    <td>{project.client}</td>
                    <td>
                      <Badge variant={getStatusBadgeVariant(project.status)} badgeStyle="outlined" size="sm">
                        {project.status}
                      </Badge>
                    </td>
                    <td>
                      <Badge variant={getPriorityBadgeVariant(project.priority)} badgeStyle="outlined" size="sm">
                        {project.priority}
                      </Badge>
                    </td>
                    <td>{formatCurrency(project.budget)}</td>
                    <td>
                      <div className="project-table__progress">
                        <span>{project.completion}%</span>
                        <div className="project-table__progress-bar">
                          <div
                            className="project-table__progress-fill"
                            style={{ width: `${project.completion}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>{new Date(project.endDate).toLocaleDateString()}</td>
                    <td>{project.team.length}</td>
                    <td className="table-actions">
                      <Button
                        variant="tertiary"
                        size="sm"
                        onClick={() => setSelectedProject(project)}
                      >
                        View
                      </Button>
                      <Button variant="tertiary" size="sm">
                        Edit
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {renderProjectDetailModal()}
    </div>
  )
}
