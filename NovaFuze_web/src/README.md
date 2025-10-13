# NovaFuze Website - Clean Firebase Storage Version

This is a clean rebuild of the NovaFuze website with only Firebase Storage functionality, removing all the complex CMS system that was causing connection errors.

## What's Included

- ✅ Clean React application with Tailwind CSS
- ✅ NovaFuze brand colors (#4E6BDF primary)
- ✅ Complete homepage with all sections
- ✅ Light/Dark mode theme system
- ✅ Firebase Storage integration
- ✅ Simple admin panel with media manager
- ✅ Responsive design
- ✅ All static content (no external CMS dependencies)

## Firebase Setup

1. Create a new Firebase project at https://console.firebase.google.com
2. Enable Firebase Storage
3. Update `/firebase/config.ts` with your Firebase project credentials:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com", 
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
}
```

## Admin Access

- Navigate to `#admin/login` or click the admin icon in the header
- Demo credentials:
  - Email: `admin@novafuze.in`
  - Password: `admin123`

## Features

### Homepage Sections
- Hero section with stats
- Services showcase
- Products section with pricing in INR
- Portfolio with case studies
- Client testimonials carousel
- Blog articles preview
- Newsletter signup

### Admin Panel
- Simple login system
- Media manager for uploading images to Firebase Storage
- Image URL copying functionality

### Theme System
- Light/Dark mode toggle
- System preference detection
- Persistent theme storage

## Development

The application is built with:
- React 18+ with TypeScript
- Tailwind CSS v4
- ShadCN UI components  
- Lucide React icons
- Firebase Storage
- Hash-based routing

## No Errors

This version has been completely rebuilt to eliminate:
- ❌ Firebase WebChannelConnection errors
- ❌ Complex CMS system dependencies
- ❌ Context provider conflicts
- ❌ Connection management issues

## Next Steps

To extend this application:

1. **Add Firebase Auth** - Replace simple admin login with Firebase Authentication
2. **Add Firestore** - Store content data in Firestore database
3. **Add more admin features** - Content management, user management, analytics
4. **Add contact forms** - Integrate with email services
5. **Add blog functionality** - Dynamic blog with categories and search

## File Structure

```
├── App.tsx (Clean main component)
├── components/
│   ├── Header.tsx (Static navigation)
│   ├── Footer.tsx (Static footer)
│   ├── Router.tsx (Hash-based routing)
│   ├── HeroSection.tsx (Homepage hero)
│   ├── ServicesSection.tsx (Services showcase)
│   ├── ProductsSection.tsx (Products with INR pricing)
│   ├── PortfolioSection.tsx (Portfolio showcase)
│   ├── TestimonialsSection.tsx (Client testimonials)
│   ├── BlogSection.tsx (Blog preview)
│   ├── NewsletterSection.tsx (Newsletter signup)
│   ├── ThemeProvider.tsx (Theme management)
│   ├── ThemeToggle.tsx (Theme toggle)
│   ├── MediaManager.tsx (Firebase Storage manager)
│   └── SimpleAdminLogin.tsx (Basic admin login)
├── firebase/
│   ├── config.ts (Firebase configuration)
│   └── storage.ts (Storage utilities)
└── styles/
    └── globals.css (Tailwind + theme variables)
```

This is a solid foundation that can be extended as needed without the complexity and errors of the previous CMS system.