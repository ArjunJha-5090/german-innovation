# German Engineering & Innovation

A professional, interactive website showcasing Germany's rich history of engineering excellence, from Gutenberg's printing press to Industry 4.0.

## 🚀 Quick Start

### Running the Site

1. **Start the Flask backend:**
   ```bash
   cd /Users/arjunjha/Desktop/german-innovation
   python3 app.py
   ```

2. **Access the site:**
   - Open: http://localhost:5050/index-new.html
   - Or use the proxy: http://127.0.0.1:50157/index-new.html

## 📁 File Structure

### New Professional Version (Use These!)
- `index-new.html` - Clean, modern landing page
- `login-new.html` - Professional lamp login page
- `dashboard-new.html` - Interactive flip card dashboard
- `css/professional.css` - Clean, modern styling

### Content Pages (Already Updated)
- `technologies.html` - Technology innovations
- `automotive.html` - Automotive timeline
- `brands.html` - Leading German brands
- `people.html` - Scientists & engineers
- `history.html` - Germany history timeline
- `gallery.html` - Visual gallery

## ✨ Features

### 1. Landing Page (index-new.html)
- Clean hero section with clear value proposition
- Feature cards highlighting key sections
- Statistics showcase
- Professional typography and spacing
- Dark/Light theme toggle

### 2. Lamp Login (login-new.html)
- Interactive lamp animation
- Switch on lamp → authenticate → redirect to dashboard
- Smooth transitions and professional design

### 3. Dashboard (dashboard-new.html)
- 6 interactive flip cards
- Click to flip and see description
- Direct links to full topic pages
- Language toggle (EN/DE)
- Theme toggle
- Logout functionality

### 4. Content Pages
- Technologies: 6 tech cards + 4 innovation sections
- Automotive: 8 timeline milestones with car animation
- Brands: 8 brand cards with real logos
- People: 9 scientist/engineer profiles
- History: 8 historical periods
- All pages have scroll-reveal animations

## 🎨 Design System

### Colors
- **Primary**: Blue (#1e40af)
- **Secondary**: Green (#059669)
- **Accent**: Amber (#f59e0b)
- **Light theme**: White backgrounds
- **Dark theme**: Slate backgrounds

### Typography
- Font: Inter (Google Fonts)
- Responsive sizing with clamp()
- Clear hierarchy

### Components
- Cards with hover effects
- Flip cards with 3D animation
- Timeline items
- Professional buttons
- Smooth transitions

## 🔐 Authentication Flow

1. User visits `index-new.html` (public landing page)
2. Clicks "Get Started" → redirected to `login-new.html`
3. Switches on lamp → backend authenticates
4. Redirected to `dashboard-new.html` (protected)
5. From dashboard, can access all content pages

## 🌐 Backend API

### Endpoints
- `POST /api/login` - Authenticate user
- `POST /api/logout` - Clear session
- `GET /api/status` - Check auth status

### Protected Routes
All pages except `index-new.html` and `login-new.html` require authentication.

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 600px, 768px, 1024px
- Grid layouts adapt to screen size
- Touch-friendly interactions

## 🎯 For Submission

### What to Show
1. Start at: http://localhost:5050/index-new.html
2. Demonstrate:
   - Clean landing page
   - Lamp login interaction
   - Dashboard flip cards
   - Navigate to any content page
   - Theme toggle
   - Language toggle

### Key Highlights
- ✅ Professional, clean design
- ✅ Interactive animations
- ✅ Real data and content
- ✅ Backend authentication
- ✅ Responsive layout
- ✅ Dark/Light themes
- ✅ EN/DE language support
- ✅ Smooth UX transitions

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Python Flask
- **Fonts**: Google Fonts (Inter)
- **Icons**: Unicode emojis
- **Logos**: Wikipedia CDN

## 📊 Content Summary

- **130+ years** of automotive history
- **50+ innovations** documented
- **10+ brands** featured with logos
- **9 scientists** with full biographies
- **8 historical periods** covered
- **6 technology sectors** explored

## 🎓 Educational Value

This site serves as a comprehensive educational resource about:
- German engineering principles
- Historical technological developments
- Modern innovation leadership
- Cultural and scientific contributions
- Future sustainability vision

---

**Made with precision and quality** 🇩🇪
