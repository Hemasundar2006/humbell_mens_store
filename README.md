<<<<<<< HEAD
# 🛍️ Humbell - Modern Fashion E-Commerce Frontend

A beautiful, fully responsive fashion e-commerce frontend built with React, Tailwind CSS, Redux Toolkit, and React Router v6. Inspired by modern fashion brands like Zara, H&M, and Urbanic.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.8-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-cyan)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.0.1-764abc)

## ✨ Features

- 📱 **Fully Responsive Design** - Optimized for mobile, tablet, and desktop
- 🎨 **Modern UI/UX** - Minimal, elegant design inspired by top fashion brands
- 🌓 **Dark/Light Mode** - Theme toggle with persistent storage
- 🛒 **Shopping Cart** - Full cart management with local storage persistence
- 🔐 **Authentication** - Login/Register pages with JWT integration
- 🎯 **Smart Filtering** - Filter products by category, price, and gender
- 📦 **Product Management** - Detailed product pages with size/color selection
- 💳 **Checkout Flow** - Complete checkout process with mock order confirmation
- 👨‍💼 **Admin Dashboard** - Basic admin UI for product/order management
- 🚀 **Redux State Management** - Centralized state with Redux Toolkit
- 🔄 **Axios API Integration** - Ready for backend connection
- 📍 **React Router v6** - Modern routing implementation

## 🛠️ Tech Stack

- **React 18** - Latest React with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Redux** - React bindings for Redux
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library

## 📁 Project Structure

```
frontend/
├── package.json
├── vite.config.js
├── tailwind.config.cjs
├── postcss.config.cjs
├── index.html
├── .gitignore
├── README.md
├── public/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── app/
    │   └── store.js                  # Redux store configuration
    ├── api/
    │   └── axiosInstance.js          # Axios instance with interceptors
    ├── features/
    │   ├── auth/
    │   │   └── authSlice.js          # Authentication state & actions
    │   ├── products/
    │   │   └── productsSlice.js      # Products state & actions
    │   └── cart/
    │       └── cartSlice.js          # Cart state & actions
    ├── components/
    │   ├── Navbar.jsx                # Navigation with theme toggle
    │   ├── Footer.jsx                # Footer component
    │   ├── ProductCard.jsx           # Product card component
    │   ├── Loader.jsx                # Loading spinner
    │   └── Banner.jsx                # Hero banner
    └── pages/
        ├── Home.jsx                  # Homepage
        ├── Shop.jsx                  # Shop with filters
        ├── Product.jsx               # Product details
        ├── Cart.jsx                  # Shopping cart
        ├── Checkout.jsx              # Checkout page
        ├── Login.jsx                 # Login page
        ├── Register.jsx              # Register page
        └── Admin.jsx                 # Admin dashboard
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository** (or navigate to the project folder):
   ```bash
   cd "Humbell Frontend"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   
   The project includes a `.env.example` file. Create a `.env` file in the root:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your backend API URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   
   The app will automatically open at [http://localhost:3000](http://localhost:3000)

### Build for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🔌 Backend Integration

This frontend is designed to work with a REST API backend. The Axios instance in `src/api/axiosInstance.js` is pre-configured with:

- **Base URL**: Set via `VITE_API_URL` environment variable
- **Auth Headers**: Automatically adds JWT token from localStorage
- **Content-Type**: JSON by default

### Expected API Endpoints

```
Authentication:
POST /api/auth/register - Register new user
POST /api/auth/login - Login user

Products:
GET /api/products - Get all products (with optional filters)
GET /api/products/:id - Get single product

Orders (to be implemented):
POST /api/orders - Create new order
GET /api/orders - Get user orders
```

## 🎨 Design Features

### Color Scheme
- **Primary Colors**: Grayscale palette for minimal aesthetic
- **Dark Mode**: Full dark theme support
- **Accent Colors**: Context-based (green for success, red for errors)

### Typography
- **Display Font**: Playfair Display (for headings)
- **Body Font**: Inter (for content)

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔐 Authentication Flow

1. User registers/logs in via `/login` or `/register`
2. JWT token is stored in localStorage
3. Token is automatically added to all API requests
4. User data is stored in Redux state
5. Protected routes redirect to login if not authenticated

## 🛒 Cart Management

- Cart items stored in localStorage for persistence
- Redux state for real-time updates
- Support for size/color variants
- Automatic total calculation
- Quantity management

## 👨‍💼 Admin Features

Access the admin dashboard at `/admin` (requires admin user).

Features include:
- Overview dashboard with stats
- Product management interface
- Order management
- User analytics

## 🌓 Theme Toggle

- Light/Dark mode toggle in navbar
- Theme preference saved to localStorage
- Smooth transitions between themes
- Fully styled dark mode for all components

## 📱 Responsive Design

All pages are fully responsive with:
- Mobile-first approach
- Adaptive navigation (hamburger menu on mobile)
- Flexible grid layouts
- Touch-friendly interactions
- Optimized images

## 🔧 Customization

### Changing Colors

Edit `tailwind.config.cjs`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom color palette
      },
    },
  },
}
```

### Adding New Pages

1. Create page component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/Navbar.jsx`

## 📝 Notes

- This is a **frontend-only** application
- Backend integration requires a compatible REST API
- Mock data can be added for testing without a backend
- All API calls will fail gracefully if backend is not available

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is occupied, Vite will automatically use the next available port.

### API Connection Issues
Check that:
- `VITE_API_URL` is correctly set in `.env`
- Backend server is running
- CORS is enabled on the backend

### Build Errors
Clear node_modules and reinstall:
```bash
rm -rf node_modules
npm install
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💡 Future Enhancements

- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Search functionality with autocomplete
- [ ] Order tracking
- [ ] Multiple image carousel for products
- [ ] Social media integration
- [ ] Newsletter subscription backend
- [ ] Payment gateway integration
- [ ] Multi-language support

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Built with ❤️ using React and Tailwind CSS**

=======
# Humbell-Mens-Store
>>>>>>> 57afc227a4c2b2f4a2fa7d6ad20dd733f20dbaf6
