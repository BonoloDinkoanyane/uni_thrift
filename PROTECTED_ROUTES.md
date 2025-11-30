# Protected Routes Setup

This document explains how route protection works .

## Protected Routes

The following routes require users to be authenticated before accessing them:

- `/profile` - User profile page
- `/dashboard` - User dashboard
- `/listings/create` - Create new listing
- `/listings/edit/*` - Edit listings
- `/messages` - Direct messages
- `/favorites` - Saved items
- `/orders` - Order history

## How It Works

### 1. Middleware Protection

The `middleware.ts` file intercepts all requests and:
- Checks if the route requires authentication
- Verifies the user's Auth0 session
- Redirects unauthenticated users to `/login`
- Redirects authenticated users away from `/login` and `/register`

### 2. Server-Side Protection

Each protected page uses `getSession()` from Auth0:

```typescript
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await getSession();
  
  if (!session?.user) {
    redirect("/login?returnTo=/protected-page");
  }
  
  // Page content...
}
```

### 3. Return URL

When redirected to login, the original URL is preserved:
- User tries to access `/profile`
- Gets redirected to `/login?returnTo=/profile`
- After login, Auth0 redirects back to `/profile`

## Adding New Protected Routes

1. **Add to middleware.ts:**
```typescript
const protectedRoutes = [
  "/profile",
  "/dashboard",
  "/your-new-route", // Add here
];
```

2. **Add session check to page:**
```typescript
export default async function YourPage() {
  const session = await getSession();
  
  if (!session?.user) {
    redirect("/login?returnTo=/your-new-route");
  }
  
  return <div>Protected content</div>;
}
```

## Public Routes

These routes are accessible without authentication:
- `/` - Home page
- `/faq` - FAQ page
- `/login` - Login page
- `/register` - Register page
- `/browse` - Browse listings (public)

## Testing

1. **Test unauthenticated access:**
   - Navigate to `/profile` without logging in
   - Should redirect to `/login?returnTo=/profile`

2. **Test authenticated access:**
   - Log in first
   - Navigate to `/profile`
   - Should display profile page

3. **Test auth page redirect:**
   - Log in
   - Try to access `/login`
   - Should redirect to `/`
