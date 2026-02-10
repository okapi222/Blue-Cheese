import { useState, useMemo } from 'react'
import {
  Button,
  Badge,
  Input,
  Select,
  Checkbox,
  Modal,
  Breadcrumb
} from '@ui'
import type {
  BadgeVariant,
  SelectOption,
  BreadcrumbItem
} from '@ui'
import './user-management.css'

type UserStatus = 'Active' | 'Pending' | 'Suspended'
type UserRole = 'Admin' | 'Manager' | 'Member' | 'Viewer'

type User = {
  id: string
  name: string
  email: string
  role: UserRole
  team: string
  status: UserStatus
  lastActive: string
}

type FormErrors = {
  name?: string
  email?: string
  role?: string
  team?: string
}

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'Admin',
    team: 'Engineering',
    status: 'Active',
    lastActive: '2026-02-10'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    role: 'Manager',
    team: 'Engineering',
    status: 'Active',
    lastActive: '2026-02-09'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    role: 'Member',
    team: 'Product',
    status: 'Active',
    lastActive: '2026-02-10'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@company.com',
    role: 'Member',
    team: 'Engineering',
    status: 'Pending',
    lastActive: '2026-02-08'
  },
  {
    id: '5',
    name: 'Jessica Williams',
    email: 'jessica.williams@company.com',
    role: 'Manager',
    team: 'Design',
    status: 'Active',
    lastActive: '2026-02-10'
  },
  {
    id: '6',
    name: 'Robert Martinez',
    email: 'robert.martinez@company.com',
    role: 'Viewer',
    team: 'Product',
    status: 'Suspended',
    lastActive: '2026-02-01'
  },
  {
    id: '7',
    name: 'Amanda Taylor',
    email: 'amanda.taylor@company.com',
    role: 'Member',
    team: 'Design',
    status: 'Active',
    lastActive: '2026-02-09'
  },
  {
    id: '8',
    name: 'James Anderson',
    email: 'james.anderson@company.com',
    role: 'Admin',
    team: 'Operations',
    status: 'Active',
    lastActive: '2026-02-10'
  }
]

const ROLE_OPTIONS: SelectOption[] = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Member', label: 'Member' },
  { value: 'Viewer', label: 'Viewer' }
]

const TEAM_OPTIONS: SelectOption[] = [
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Product', label: 'Product' },
  { value: 'Design', label: 'Design' },
  { value: 'Operations', label: 'Operations' },
  { value: 'Marketing', label: 'Marketing' }
]

const STATUS_OPTIONS: SelectOption[] = [
  { value: '', label: 'All Statuses' },
  { value: 'Active', label: 'Active' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Suspended', label: 'Suspended' }
]

function getStatusBadgeVariant(status: UserStatus): BadgeVariant {
  switch (status) {
    case 'Active':
      return 'success'
    case 'Pending':
      return 'warning'
    case 'Suspended':
      return 'error'
    default:
      return 'neutral'
  }
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Member' as UserRole,
    team: 'Engineering',
    status: 'Pending' as UserStatus
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [currentTeam] = useState<string>('Engineering')

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Admin', onClick: () => console.log('Navigate to Admin') },
    { label: 'Team Management', onClick: () => console.log('Navigate to Team Management') },
    { label: currentTeam }
  ]

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = !statusFilter || user.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [users, searchQuery, statusFilter])

  const allSelected =
    filteredUsers.length > 0 && selectedUsers.size === filteredUsers.length
  const someSelected = selectedUsers.size > 0 && !allSelected

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(new Set(filteredUsers.map((u) => u.id)))
    } else {
      setSelectedUsers(new Set())
    }
  }

  const handleSelectUser = (userId: string, checked: boolean) => {
    const newSelected = new Set(selectedUsers)
    if (checked) {
      newSelected.add(userId)
    } else {
      newSelected.delete(userId)
    }
    setSelectedUsers(newSelected)
  }

  const validateForm = (): boolean => {
    const errors: FormErrors = {}

    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format'
    }

    if (!formData.role) {
      errors.role = 'Role is required'
    }

    if (!formData.team) {
      errors.team = 'Team is required'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddUser = () => {
    if (!validateForm()) return

    const newUser: User = {
      id: String(Date.now()),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      team: formData.team,
      status: formData.status,
      lastActive: new Date().toISOString().split('T')[0]
    }

    setUsers([...users, newUser])
    setIsAddModalOpen(false)
    resetForm()
  }

  const handleEditUser = () => {
    if (!editingUser || !validateForm()) return

    setUsers(
      users.map((user) =>
        user.id === editingUser.id
          ? {
              ...user,
              name: formData.name,
              email: formData.email,
              role: formData.role,
              team: formData.team,
              status: formData.status
            }
          : user
      )
    )
    setEditingUser(null)
    resetForm()
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((user) => user.id !== userId))
      const newSelected = new Set(selectedUsers)
      newSelected.delete(userId)
      setSelectedUsers(newSelected)
    }
  }

  const openEditModal = (user: User) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      team: user.team,
      status: user.status
    })
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'Member',
      team: 'Engineering',
      status: 'Pending'
    })
    setFormErrors({})
  }

  const handleBulkActivate = () => {
    setUsers(
      users.map((user) =>
        selectedUsers.has(user.id) ? { ...user, status: 'Active' } : user
      )
    )
    setSelectedUsers(new Set())
  }

  const handleBulkSuspend = () => {
    setUsers(
      users.map((user) =>
        selectedUsers.has(user.id) ? { ...user, status: 'Suspended' } : user
      )
    )
    setSelectedUsers(new Set())
  }

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedUsers.size} users?`)) {
      setUsers(users.filter((user) => !selectedUsers.has(user.id)))
      setSelectedUsers(new Set())
    }
  }

  return (
    <div className="user-management">
      <div className="user-management__header">
        <div className="user-management__breadcrumb">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <h1 className="user-management__title">User & Team Management</h1>
      </div>

      <div className="user-management__controls">
        <div className="user-management__search-group">
          <label className="user-management__label">Search Users</label>
          <Input
            type="search"
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name or email..."
          />
        </div>

        <div className="user-management__filter-group">
          <label className="user-management__label">Filter by Status</label>
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={STATUS_OPTIONS}
          />
        </div>

        <div className="user-management__filter-group">
          <Button
            variant="primary"
            onClick={() => {
              resetForm()
              setIsAddModalOpen(true)
            }}
          >
            Add User
          </Button>
        </div>
      </div>

      {selectedUsers.size > 0 && (
        <div className="user-management__actions">
          <span className="user-management__selected-count">
            {selectedUsers.size} selected
          </span>
          <Button variant="secondary" size="sm" onClick={handleBulkActivate}>
            Activate
          </Button>
          <Button variant="secondary" size="sm" onClick={handleBulkSuspend}>
            Suspend
          </Button>
          <Button variant="danger" size="sm" onClick={handleBulkDelete}>
            Delete
          </Button>
        </div>
      )}

      <div className="user-management__table-container">
        <table className="user-management__table">
          <thead>
            <tr>
              <th className="user-management__checkbox-cell">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="user-management__name-cell">Name</th>
              <th className="user-management__email-cell">Email</th>
              <th className="user-management__role-cell">Role</th>
              <th className="user-management__team-cell">Team</th>
              <th className="user-management__status-cell">Status</th>
              <th className="user-management__actions-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="user-management__empty-state">
                    No users found matching your criteria
                  </div>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <Checkbox
                      checked={selectedUsers.has(user.id)}
                      onChange={(checked) => handleSelectUser(user.id, checked)}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Select
                      value={user.role}
                      onChange={(newRole) => {
                        setUsers(
                          users.map((u) =>
                            u.id === user.id ? { ...u, role: newRole as UserRole } : u
                          )
                        )
                      }}
                      options={ROLE_OPTIONS}
                    />
                  </td>
                  <td>{user.team}</td>
                  <td>
                    <Badge variant={getStatusBadgeVariant(user.status)}>
                      {user.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="user-management__table-actions">
                      <Button
                        variant="tertiary"
                        size="sm"
                        onClick={() => openEditModal(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          resetForm()
        }}
        title="Add New User"
        size="lg"
        footer={
          <>
            <Button
              variant="tertiary"
              onClick={() => {
                setIsAddModalOpen(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddUser}>
              Add User
            </Button>
          </>
        }
      >
        <div className="user-management__form-group">
          <label className="user-management__form-label">Name</label>
          <Input
            type="text"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="Enter full name"
            className="user-management__form-input"
          />
          {formErrors.name && (
            <div className="user-management__error">{formErrors.name}</div>
          )}
        </div>

        <div className="user-management__form-group">
          <label className="user-management__form-label">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            placeholder="user@company.com"
            className="user-management__form-input"
          />
          {formErrors.email && (
            <div className="user-management__error">{formErrors.email}</div>
          )}
        </div>

        <div className="user-management__form-group">
          <label className="user-management__form-label">Role</label>
          <Select
            value={formData.role}
            onChange={(value) => setFormData({ ...formData, role: value as UserRole })}
            options={ROLE_OPTIONS}
            className="user-management__form-input"
          />
          {formErrors.role && (
            <div className="user-management__error">{formErrors.role}</div>
          )}
        </div>

        <div className="user-management__form-group">
          <label className="user-management__form-label">Team</label>
          <Select
            value={formData.team}
            onChange={(value) => setFormData({ ...formData, team: value })}
            options={TEAM_OPTIONS}
            className="user-management__form-input"
          />
          {formErrors.team && (
            <div className="user-management__error">{formErrors.team}</div>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={editingUser !== null}
        onClose={() => {
          setEditingUser(null)
          resetForm()
        }}
        title="Edit User"
        size="lg"
        footer={
          <>
            <Button
              variant="tertiary"
              onClick={() => {
                setEditingUser(null)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleEditUser}>
              Save Changes
            </Button>
          </>
        }
      >
        <div className="user-management__form-group">
          <label className="user-management__form-label">Name</label>
          <Input
            type="text"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="Enter full name"
            className="user-management__form-input"
          />
          {formErrors.name && (
            <div className="user-management__error">{formErrors.name}</div>
          )}
        </div>

        <div className="user-management__form-group">
          <label className="user-management__form-label">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            placeholder="user@company.com"
            className="user-management__form-input"
          />
          {formErrors.email && (
            <div className="user-management__error">{formErrors.email}</div>
          )}
        </div>

        <div className="user-management__form-group">
          <label className="user-management__form-label">Role</label>
          <Select
            value={formData.role}
            onChange={(value) => setFormData({ ...formData, role: value as UserRole })}
            options={ROLE_OPTIONS}
            className="user-management__form-input"
          />
          {formErrors.role && (
            <div className="user-management__error">{formErrors.role}</div>
          )}
        </div>

        <div className="user-management__form-group">
          <label className="user-management__form-label">Team</label>
          <Select
            value={formData.team}
            onChange={(value) => setFormData({ ...formData, team: value })}
            options={TEAM_OPTIONS}
            className="user-management__form-input"
          />
          {formErrors.team && (
            <div className="user-management__error">{formErrors.team}</div>
          )}
        </div>

        <div className="user-management__form-group">
          <label className="user-management__form-label">Status</label>
          <Select
            value={formData.status}
            onChange={(value) => setFormData({ ...formData, status: value as UserStatus })}
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Pending', label: 'Pending' },
              { value: 'Suspended', label: 'Suspended' }
            ]}
            className="user-management__form-input"
          />
        </div>
      </Modal>
    </div>
  )
}
