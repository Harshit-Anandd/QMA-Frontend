# Quick Start Guide - React Quantity Measurement Frontend

## 5-Minute Setup

### 1. Install Dependencies
```bash
cd quantity-measurement-react
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Visit: `http://localhost:5173`

### 3. Configure Backend Connection

Update `vite.config.ts` to point to your Spring Boot backend:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',  // Your backend URL
      changeOrigin: true,
    },
  },
}
```

### 4. Test the Application

1. **Register**: Create a new account at `/register`
2. **Login**: Sign in with your credentials at `/login`
3. **Quantity Operations**: Start measuring at `/quantity`

## File Locations

| Component | Location |
|-----------|----------|
| Login Page | `src/components/auth/Login.tsx` |
| Register Page | `src/components/auth/Register.tsx` |
| Main App | `src/components/quantity/Quantity.tsx` |
| Auth Logic | `src/context/AuthContext.tsx` |
| API Calls | `src/services/` |
| Type Definitions | `src/types/index.ts` |

## Common Tasks

### Add a new measurement type
1. Update `MeasurementType` in `src/types/index.ts`
2. Add config to `TYPE_CONFIGS` in `src/components/quantity/Quantity.tsx`

### Add a new API endpoint
1. Add method to service in `src/services/`
2. Define types in `src/types/index.ts`
3. Use in component

### Customize styling
Each component has its own CSS file:
- `src/components/auth/Auth.css`
- `src/components/quantity/Quantity.css`
- `src/components/shared/Navbar.css`

## Build for Production

```bash
npm run build
npm run preview
```

## Debugging

### Enable Vite debug logging
Add `?debug` to your dev URL: `http://localhost:5173?debug`

### Check Network Requests
Use browser DevTools Network tab to inspect API calls

### View stored data
Open browser console:
```javascript
localStorage.getItem('qm_token')
localStorage.getItem('qm_user')
```

## Troubleshooting

**"Cannot POST /api/v1/auth/login"**
- Ensure backend is running on port 8080
- Check `vite.config.ts` proxy configuration
- Verify backend API endpoints match

**"Token is not valid"**
- Clear localStorage: `localStorage.clear()`
- Re-login to get a fresh token

**Build fails with CSS error**
- Check for invalid CSS in component files
- Ensure all CSS selectors are valid

## Next Steps

1. ✅ Start dev server
2. ✅ Register and login
3. ✅ Test quantity operations
4. ✅ Customize as needed
5. ✅ Build for production

For detailed documentation, see [PROJECT_SETUP.md](./PROJECT_SETUP.md)
