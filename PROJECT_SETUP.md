# Quantity Measurement Frontend - React + TypeScript

A modern React application for quantity measurements with support for comparison, conversion, and arithmetic operations. This is a React-TypeScript port of the Angular version with feature parity.

## 🚀 Features

- **User Authentication**: Login and registration with JWT token management
- **Quantity Operations**: 
  - Compare measurements
  - Convert between units
  - Perform arithmetic operations (+, -, *, /)
- **Supported Measurements**:
  - Length (Feet, Inch, Yards, Centimeters)
  - Weight (Gram, Kilogram, Pound)
  - Temperature (Celsius, Fahrenheit, Kelvin)
  - Volume (Litre, Millilitre, Gallon)
- **OAuth2 Support**: OAuth2 callback handler for external authentication
- **Route Protection**: Authenticated and guest-only routes
- **Responsive Design**: Mobile-friendly UI

## 🛠️ Tech Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite 8+
- **Routing**: React Router v6
- **HTTP Client**: Axios with JWT interceptor
- **State Management**: React Context API
- **Styling**: CSS Modules (component-scoped CSS)

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/                 # Authentication components
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── OAuthCallback.tsx
│   │   └── Auth.css
│   ├── quantity/             # Measurement operations
│   │   ├── Quantity.tsx
│   │   └── Quantity.css
│   └── shared/               # Shared components
│       ├── Navbar.tsx
│       ├── Navbar.css
│       └── ProtectedRoute.tsx
├── context/
│   └── AuthContext.tsx       # Authentication context & provider
├── hooks/
│   └── useAuth.ts            # Custom auth hook
├── services/
│   ├── authService.ts        # Auth API calls
│   └── quantityService.ts    # Quantity API calls
├── types/
│   └── index.ts              # TypeScript interfaces
├── utils/
│   └── http.ts               # Axios instance with interceptors
├── pages/                    # (Ready for page components)
├── App.tsx                   # Main app component with routing
├── App.css                   # Global app styles
├── main.tsx                  # React entry point
└── index.css                 # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 10+

### Installation

1. Navigate to the project directory:
```bash
cd quantity-measurement-react
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview

Preview the production build locally:
```bash
npm run preview
```

## 🔌 API Configuration

The application connects to a Spring Boot backend. Configure the API endpoint in `vite.config.ts`:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',  // Change this to your backend URL
      changeOrigin: true,
    },
  },
}
```

### Expected Backend Endpoints

**Authentication:**
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login

**Quantities:**
- `POST /api/v1/quantities/compare` - Compare two quantities
- `POST /api/v1/quantities/convert` - Convert between units
- `POST /api/v1/quantities/add` - Add two quantities
- `POST /api/v1/quantities/subtract` - Subtract two quantities
- `POST /api/v1/quantities/divide` - Divide two quantities

### API Request/Response Format

See `src/types/index.ts` for complete interface definitions.

**Example Login Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Example Comparison Request:**
```json
{
  "quantity1": {
    "value": 100,
    "unit": "FEET",
    "measurementType": "LengthUnit"
  },
  "quantity2": {
    "value": 30,
    "unit": "YARDS",
    "measurementType": "LengthUnit"
  }
}
```

## 🔐 Authentication

The app uses JWT tokens stored in localStorage. The JWT interceptor automatically:
- Attaches the token to every request
- Redirects to login on 401 (Unauthorized) responses

User data is persisted in localStorage for convenience.

## 🎨 Component Architecture

### Authentication Flow
1. User navigates to `/login` or `/register`
2. GuestRoute prevents authenticated users from accessing auth pages
3. On successful auth, token and user data are stored
4. User is redirected to `/quantity` page

### Quantity Operations
1. User selects measurement type (Length, Weight, etc.)
2. User chooses operation (Compare, Convert, Arithmetic)
3. User enters values and units
4. Results are displayed with formatted output

### State Management
- **Auth Context**: Manages global user state
- **Component State**: Individual component state for form data and results
- **localStorage**: Persists token and user data across sessions

## 📦 Dependencies

- `react` & `react-dom` - UI library
- `react-router-dom` - Client-side routing
- `axios` - HTTP client
- `typescript` - Type safety
- `vite` - Fast build tool

## 📝 Development Notes

### Type Safety
- TypeScript strict mode enabled (`verbatimModuleSyntax: true`)
- Type-only imports for pure types
- All API responses are typed

### Code Style
- Functional components with React hooks
- Custom hooks for reusable logic
- Scoped CSS for component isolation

### Error Handling
- Try-catch in async operations
- User-friendly error messages
- API error mapping

## 🧪 Testing

Currently, the project has test setup configured (vitest). Add test files with `.test.ts` or `.test.tsx` extension.

Run tests:
```bash
npm run test
```

## 🚢 Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/` folder to your hosting provider
3. Ensure the backend API endpoint is correctly configured

### Environment Variables

Create a `.env` file for environment-specific configuration:
```env
VITE_API_BASE_URL=https://api.example.com
```

Update `src/utils/http.ts` to use it:
```typescript
baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1'
```

## 🐛 Troubleshooting

### API calls failing with CORS errors
- Ensure backend has CORS enabled
- Check that `target` in `vite.config.ts` proxy matches your backend URL

### Token expiration not handled
- Implement token refresh logic in `src/utils/http.ts` interceptor
- Currently redirects to login on 401 response

### CSS not loading
- Ensure CSS files are imported in components
- Check for CSS syntax errors (use browser DevTools)

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [React Router Documentation](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

## 🤝 Contributing

When adding new features:
1. Create components in appropriate folders
2. Add TypeScript types to `src/types/index.ts`
3. Create services in `src/services/` for API calls
4. Use Context API for shared state
5. Follow existing code style and patterns

## 📄 License

This project is part of the Quantity Measurement application suite.
