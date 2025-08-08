# StartupLink - Mobile Startup Investment Platform

StartupLink is a mobile-first platform where entrepreneurs can pitch their startup ideas and everyday people can make micro-investments to support promising ventures. Think Instagram for startup pitches with direct investment capabilities.

## 🚀 Features

### For Entrepreneurs
- Create comprehensive startup profiles with pitch videos and documents
- Track funding progress and investor engagement
- Post updates and milestones to keep investors informed
- Analytics dashboard for profile views and funding metrics
- Community support based on startup domain

### For Investors
- Browse startup pitches by sector, location, and stage
- Make micro-investments starting from $100
- Portfolio tracking and performance analytics
- Sector-based investment recommendations
- Community features for networking and learning

### Core Features
- **Instagram-like Feed**: Vertical scroll through startup pitches
- **Multi-Payment Support**: UPI (India), Stripe (Global), Plaid (US)
- **Real-time Updates**: Live notifications for investments and updates
- **AI Scoring**: Startup evaluation and investor recommendations
- **Social Features**: Like, comment, bookmark, and share startups
- **Community Groups**: Sector-based discussions and networking

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Design**: Mobile-first responsive design
- **Icons**: Font Awesome
- **Images**: Unsplash API for demo content

## 📱 Screenshots

The platform features:
- Instagram-style stories for sectors
- Swipeable startup cards with funding progress
- Investment modal with multiple payment options
- Portfolio tracking dashboard
- Community groups for networking

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/startuplink.git
```

2. Open `index.html` in your browser:
```bash
cd startuplink
open index.html  # macOS
# or
start index.html  # Windows
# or
xdg-open index.html  # Linux
```

3. No build process required - it's a static website!

## 📂 Project Structure

```
startuplink/
├── index.html      # Main HTML file
├── styles.css      # All styles
├── script.js       # JavaScript functionality
└── README.md       # Project documentation
```

## 🎨 Features Breakdown

### 1. Startup Feed
- Vertical scrolling feed of startup pitches
- Each card shows funding progress, founder info, and investment options
- Social interactions (like, comment, share, bookmark)

### 2. Create Pitch
- Multi-step form for entrepreneurs
- Video upload support
- Sector selection and funding goals

### 3. Investment Flow
- Multiple payment methods (Stripe, UPI, Plaid)
- Investment amount selection
- Real-time funding updates

### 4. Portfolio Dashboard
- Track all investments
- View returns and performance
- Portfolio analytics

### 5. Community Groups
- Join sector-specific communities
- Network with other investors and founders
- Share insights and opportunities

## 🔧 Customization

### Adding New Sectors
Edit the sector options in `index.html` and add corresponding story items:
```javascript
// In script.js, add to sampleStartups array
{
    sector: 'your-sector',
    // ... other properties
}
```

### Styling
All styles are in `styles.css` with CSS variables for easy theming:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... modify colors here */
}
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For questions or support, please open an issue in the GitHub repository.

---

Built with ❤️ for the startup community