# Routing Guide

This project uses React Router to provide unique URLs for each test page.

## Available Pages & URLs

Once the development server is running, you can access these pages:

### 1. Landing Page
- **URL**: `http://localhost:5173/`
- **Component**: `LandingPage.tsx`
- **Description**: Landing Page

### 2. Dashboard
- **URL**: `http://localhost:5173/dashboard`
- **Component**: `Dashboard.tsx`
- **Description**: Basic Dashboard

### 3. Analytics Dashboard
- **URL**: `http://localhost:5173/analytics-dashboard`
- **Component**: `AnalyticsDashboard.tsx`
- **Description**: Advanced Analytics & Metrics

### 4. User Management
- **URL**: `http://localhost:5173/user-management`
- **Component**: `UserManagement.tsx`
- **Description**: User & Team Management Interface

## Navigation

A fixed sidebar navigation is provided that shows all available pages. The current page is highlighted in blue.

## Adding a New Page

To add a new test page to the routing system:

### Step 1: Create Your Page Component

Create your page in `src/pages/`:

```tsx
// src/pages/MyNewPage.tsx
export function MyNewPage() {
  return (
    <div>
      <h1>My New Page</h1>
      {/* Your page content */}
    </div>
  )
}
```

### Step 2: Add Route to App.tsx

Update `src/App.tsx`:

```tsx
import { MyNewPage } from './pages/MyNewPage'

// In the Routes component:
<Route path="/my-new-page" element={<MyNewPage />} />
```

### Step 3: Add to Navigation Menu

Update `src/components/Navigation.tsx`:

```tsx
const pages = [
  // ... existing pages ...
  { 
    path: '/my-new-page', 
    label: 'My New Page', 
    description: 'Description of what this page demonstrates' 
  },
]
```

### Step 4: Access Your Page

Navigate to: `http://localhost:5173/my-new-page`

## Navigation Structure

```
src/
├── App.tsx                    # Main router configuration
├── components/
│   ├── Navigation.tsx         # Sidebar navigation component
│   └── navigation.css         # Navigation styles
└── pages/
    ├── LandingPage.tsx        # /
    ├── Dashboard.tsx          # /dashboard
    ├── AnalyticsDashboard.tsx # /analytics-dashboard
    └── UserManagement.tsx     # /user-management
```

## Features

- **Persistent Navigation**: Sidebar remains visible across all pages
- **Active State**: Current page is highlighted in the navigation
- **Direct URL Access**: You can bookmark and share specific page URLs
- **Browser History**: Back/forward buttons work correctly
- **Responsive**: Navigation collapses on mobile devices

## Tips

1. **URL Conventions**: Use kebab-case for URLs (`/user-management` not `/UserManagement`)
2. **Component Names**: Use PascalCase for component names (`UserManagement`)
3. **Descriptions**: Keep navigation descriptions concise (1-3 words)
4. **Testing**: Always test new routes by accessing the URL directly (refresh the page)

## Development Server

Start the server:
```bash
npm run dev
```

The server will show you the port (usually `http://localhost:5173/`). The navigation will automatically appear on all pages.
