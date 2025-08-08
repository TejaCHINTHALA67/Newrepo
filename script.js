// State Management
const state = {
    currentView: 'feed',
    startups: [],
    portfolio: [],
    communities: [],
    user: {
        id: 'user123',
        name: 'John Doe',
        totalInvested: 5200,
        investments: 12
    }
};

// Sample Data
const sampleStartups = [
    {
        id: 1,
        name: 'EcoCharge',
        tagline: 'Wireless charging from renewable energy',
        description: 'Revolutionary wireless charging stations powered entirely by solar and wind energy. Making sustainable charging accessible everywhere.',
        sector: 'green',
        fundingGoal: 500000,
        fundingRaised: 125000,
        investors: 250,
        minInvestment: 100,
        founder: 'Sarah Chen',
        timeAgo: '2 hours ago',
        videoUrl: 'sample-video.mp4',
        imageUrl: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800',
        likes: 342,
        comments: 56,
        shares: 23
    },
    {
        id: 2,
        name: 'HealthAI',
        tagline: 'AI-powered personal health assistant',
        description: 'Your personal health companion that uses AI to track symptoms, suggest remedies, and connect you with healthcare providers.',
        sector: 'health',
        fundingGoal: 750000,
        fundingRaised: 480000,
        investors: 420,
        minInvestment: 100,
        founder: 'Dr. Mike Johnson',
        timeAgo: '5 hours ago',
        videoUrl: 'sample-video.mp4',
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
        likes: 567,
        comments: 89,
        shares: 45
    },
    {
        id: 3,
        name: 'CryptoWallet Pro',
        tagline: 'Secure multi-chain crypto wallet',
        description: 'The most secure and user-friendly cryptocurrency wallet supporting all major blockchains with built-in DeFi features.',
        sector: 'fintech',
        fundingGoal: 1000000,
        fundingRaised: 650000,
        investors: 890,
        minInvestment: 100,
        founder: 'Alex Rivera',
        timeAgo: '1 day ago',
        videoUrl: 'sample-video.mp4',
        imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
        likes: 892,
        comments: 124,
        shares: 67
    },
    {
        id: 4,
        name: 'FoodShare',
        tagline: 'Community food sharing platform',
        description: 'Connecting neighbors to share excess food, reduce waste, and build stronger communities. Join the food sharing revolution.',
        sector: 'social',
        fundingGoal: 300000,
        fundingRaised: 95000,
        investors: 180,
        minInvestment: 100,
        founder: 'Maria Santos',
        timeAgo: '2 days ago',
        videoUrl: 'sample-video.mp4',
        imageUrl: 'https://images.unsplash.com/photo-1609780447631-05b93e5a88ea?w=800',
        likes: 234,
        comments: 45,
        shares: 12
    }
];

const samplePortfolio = [
    {
        id: 1,
        startupId: 1,
        name: 'EcoCharge',
        sector: 'green',
        investmentAmount: 500,
        investmentDate: '2024-01-15',
        currentValue: 575,
        returnPercent: 15
    },
    {
        id: 2,
        startupId: 2,
        name: 'HealthAI',
        sector: 'health',
        investmentAmount: 1000,
        investmentDate: '2024-01-10',
        currentValue: 1120,
        returnPercent: 12
    },
    {
        id: 3,
        startupId: 3,
        name: 'CryptoWallet Pro',
        sector: 'fintech',
        investmentAmount: 2000,
        investmentDate: '2023-12-20',
        currentValue: 2400,
        returnPercent: 20
    }
];

const sampleCommunities = [
    {
        id: 1,
        name: 'Tech Innovators',
        description: 'A community for tech startup founders and investors to share insights and opportunities.',
        members: 2340,
        sector: 'tech',
        tags: ['AI', 'SaaS', 'Web3'],
        joined: false
    },
    {
        id: 2,
        name: 'Green Energy Investors',
        description: 'Focused on sustainable and renewable energy startups making a positive impact.',
        members: 1567,
        sector: 'green',
        tags: ['Solar', 'Wind', 'Sustainability'],
        joined: true
    },
    {
        id: 3,
        name: 'Healthcare Disruption',
        description: 'Exploring innovative healthcare solutions and medical technology investments.',
        members: 892,
        sector: 'health',
        tags: ['MedTech', 'Biotech', 'Digital Health'],
        joined: false
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Load sample data
    state.startups = sampleStartups;
    state.portfolio = samplePortfolio;
    state.communities = sampleCommunities;
    
    // Initialize views
    renderStartupFeed();
    setupEventListeners();
    
    // Show initial view
    showView('feed');
}

// Event Listeners
function setupEventListeners() {
    // Pitch form submission
    const pitchForm = document.getElementById('pitchForm');
    pitchForm.addEventListener('submit', handlePitchSubmit);
    
    // Investment form submission
    const investmentForm = document.getElementById('investmentForm');
    investmentForm.addEventListener('submit', handleInvestmentSubmit);
    
    // Story items
    document.querySelectorAll('.story-item').forEach(story => {
        story.addEventListener('click', handleStoryClick);
    });
    
    // Video upload
    const videoInput = document.querySelector('.video-upload input[type="file"]');
    const videoUploadDiv = document.querySelector('.video-upload');
    videoUploadDiv.addEventListener('click', () => videoInput.click());
    
    // Community category filters
    document.querySelectorAll('.category-chip').forEach(chip => {
        chip.addEventListener('click', handleCategoryFilter);
    });
}

// View Management
function showView(viewName) {
    // Hide all views
    document.querySelectorAll('.feed-container, .create-pitch-container, .portfolio-container, .community-container').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show selected view
    switch(viewName) {
        case 'feed':
            document.getElementById('feedView').classList.add('active');
            break;
        case 'portfolio':
            document.getElementById('portfolioView').classList.add('active');
            renderPortfolio();
            break;
        case 'community':
            document.getElementById('communityView').classList.add('active');
            renderCommunities();
            break;
    }
    
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNavItem = document.querySelector(`.nav-item[onclick*="${viewName}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
    
    state.currentView = viewName;
}

function showCreatePitch() {
    document.getElementById('feedView').classList.remove('active');
    document.getElementById('createPitchView').classList.add('active');
}

function showFeed() {
    document.getElementById('createPitchView').classList.remove('active');
    document.getElementById('feedView').classList.add('active');
}

// Startup Feed Rendering
function renderStartupFeed() {
    const feedContainer = document.getElementById('startupFeed');
    feedContainer.innerHTML = '';
    
    state.startups.forEach(startup => {
        const card = createStartupCard(startup);
        feedContainer.appendChild(card);
    });
}

function createStartupCard(startup) {
    const card = document.createElement('div');
    card.className = 'startup-card';
    card.innerHTML = `
        <div class="startup-header">
            <div class="startup-info">
                <div class="startup-avatar">${startup.name.charAt(0)}</div>
                <div class="startup-details">
                    <h3>${startup.name}</h3>
                    <div class="startup-meta">
                        <span>${startup.founder}</span>
                        <span>•</span>
                        <span class="sector-badge">${startup.sector}</span>
                        <span>•</span>
                        <span>${startup.timeAgo}</span>
                    </div>
                </div>
            </div>
            <button class="icon-btn">
                <i class="fas fa-ellipsis-v"></i>
            </button>
        </div>
        
        <div class="startup-media">
            <img src="${startup.imageUrl}" alt="${startup.name}">
            <div class="play-overlay">
                <div class="play-btn">
                    <i class="fas fa-play"></i>
                </div>
            </div>
        </div>
        
        <div class="startup-content">
            <h4 class="startup-tagline">${startup.tagline}</h4>
            <p class="startup-description">${startup.description}</p>
            
            <div class="funding-progress">
                <div class="progress-header">
                    <span class="progress-label">Funding Progress</span>
                    <span class="progress-value">$${formatNumber(startup.fundingRaised)} of $${formatNumber(startup.fundingGoal)}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(startup.fundingRaised / startup.fundingGoal) * 100}%"></div>
                </div>
                <div class="progress-header mt-1">
                    <span class="progress-label">${startup.investors} investors</span>
                    <span class="progress-label">${Math.round((startup.fundingRaised / startup.fundingGoal) * 100)}% funded</span>
                </div>
            </div>
        </div>
        
        <div class="startup-actions">
            <div class="action-buttons">
                <button class="action-btn" onclick="toggleLike(${startup.id}, this)">
                    <i class="far fa-heart"></i>
                </button>
                <button class="action-btn" onclick="showComments(${startup.id})">
                    <i class="far fa-comment"></i>
                </button>
                <button class="action-btn" onclick="shareStartup(${startup.id})">
                    <i class="far fa-share"></i>
                </button>
                <button class="action-btn" onclick="bookmarkStartup(${startup.id}, this)">
                    <i class="far fa-bookmark"></i>
                </button>
            </div>
            <button class="invest-now-btn" onclick="showInvestmentModal(${startup.id})">
                Invest Now
            </button>
        </div>
    `;
    
    return card;
}

// Investment Flow
function showInvestmentModal(startupId) {
    const startup = state.startups.find(s => s.id === startupId);
    if (!startup) return;
    
    document.getElementById('investStartupName').textContent = startup.name;
    document.getElementById('totalRaised').textContent = `$${formatNumber(startup.fundingRaised)}`;
    document.getElementById('investorCount').textContent = startup.investors;
    
    const modal = document.getElementById('investmentModal');
    modal.style.display = 'block';
    modal.dataset.startupId = startupId;
}

function closeInvestmentModal() {
    document.getElementById('investmentModal').style.display = 'none';
}

function handleInvestmentSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const amount = parseInt(formData.get('amount'));
    const paymentMethod = formData.get('paymentMethod');
    const startupId = parseInt(document.getElementById('investmentModal').dataset.startupId);
    
    // Simulate investment processing
    console.log('Processing investment:', { startupId, amount, paymentMethod });
    
    // Add to portfolio
    const startup = state.startups.find(s => s.id === startupId);
    const portfolioItem = {
        id: state.portfolio.length + 1,
        startupId: startupId,
        name: startup.name,
        sector: startup.sector,
        investmentAmount: amount,
        investmentDate: new Date().toISOString().split('T')[0],
        currentValue: amount,
        returnPercent: 0
    };
    
    state.portfolio.push(portfolioItem);
    
    // Update startup funding
    startup.fundingRaised += amount;
    startup.investors += 1;
    
    // Close modal and show success
    closeInvestmentModal();
    showNotification('Investment successful! 🎉', 'success');
    
    // Refresh feed
    renderStartupFeed();
}

// Portfolio Management
function renderPortfolio() {
    const portfolioList = document.getElementById('portfolioList');
    portfolioList.innerHTML = '';
    
    state.portfolio.forEach(item => {
        const portfolioCard = createPortfolioCard(item);
        portfolioList.appendChild(portfolioCard);
    });
}

function createPortfolioCard(item) {
    const card = document.createElement('div');
    card.className = 'portfolio-item';
    card.innerHTML = `
        <div class="portfolio-icon">${item.name.charAt(0)}</div>
        <div class="portfolio-details">
            <div class="portfolio-name">${item.name}</div>
            <div class="portfolio-stats">
                <span>Invested: $${formatNumber(item.investmentAmount)}</span>
                <span>Current: $${formatNumber(item.currentValue)}</span>
            </div>
        </div>
        <div class="portfolio-return ${item.returnPercent >= 0 ? 'positive' : 'negative'}">
            ${item.returnPercent >= 0 ? '+' : ''}${item.returnPercent}%
        </div>
    `;
    
    return card;
}

// Community Features
function renderCommunities() {
    const communityList = document.getElementById('communityList');
    communityList.innerHTML = '';
    
    state.communities.forEach(community => {
        const communityCard = createCommunityCard(community);
        communityList.appendChild(communityCard);
    });
}

function createCommunityCard(community) {
    const card = document.createElement('div');
    card.className = 'community-card';
    card.innerHTML = `
        <div class="community-header-info">
            <div>
                <h3 class="community-title">${community.name}</h3>
                <div class="community-members">${formatNumber(community.members)} members</div>
            </div>
            <button class="join-btn" onclick="toggleJoinCommunity(${community.id}, this)">
                ${community.joined ? 'Joined' : 'Join'}
            </button>
        </div>
        <p class="community-description">${community.description}</p>
        <div class="community-tags">
            ${community.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
    `;
    
    return card;
}

// Social Features
function toggleLike(startupId, button) {
    const icon = button.querySelector('i');
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        button.classList.add('liked');
        showNotification('Added to favorites! ❤️', 'success');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        button.classList.remove('liked');
    }
}

function bookmarkStartup(startupId, button) {
    const icon = button.querySelector('i');
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        showNotification('Saved to bookmarks! 📌', 'success');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
    }
}

function shareStartup(startupId) {
    if (navigator.share) {
        const startup = state.startups.find(s => s.id === startupId);
        navigator.share({
            title: startup.name,
            text: startup.tagline,
            url: window.location.href
        });
    } else {
        showNotification('Link copied to clipboard! 📋', 'success');
    }
}

function showComments(startupId) {
    showNotification('Comments feature coming soon! 💬', 'info');
}

function toggleJoinCommunity(communityId, button) {
    const community = state.communities.find(c => c.id === communityId);
    community.joined = !community.joined;
    button.textContent = community.joined ? 'Joined' : 'Join';
    
    if (community.joined) {
        community.members += 1;
        showNotification(`Joined ${community.name}! 🎉`, 'success');
    } else {
        community.members -= 1;
    }
    
    renderCommunities();
}

// Form Handlers
function handlePitchSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const pitch = {
        id: state.startups.length + 1,
        name: formData.get('startupName'),
        tagline: formData.get('tagline'),
        description: formData.get('description'),
        sector: formData.get('sector'),
        fundingGoal: parseInt(formData.get('fundingGoal')),
        fundingRaised: 0,
        investors: 0,
        minInvestment: parseInt(formData.get('minInvestment')),
        founder: state.user.name,
        timeAgo: 'Just now',
        videoUrl: 'sample-video.mp4',
        imageUrl: `https://images.unsplash.com/photo-${Date.now()}?w=800`,
        likes: 0,
        comments: 0,
        shares: 0
    };
    
    state.startups.unshift(pitch);
    showNotification('Pitch submitted successfully! 🚀', 'success');
    
    // Reset form and go back to feed
    e.target.reset();
    showFeed();
    renderStartupFeed();
}

function handleStoryClick(e) {
    const story = e.currentTarget;
    if (story.classList.contains('add-story')) {
        showCreatePitch();
    } else {
        // Filter by sector
        const sector = story.querySelector('span').textContent.toLowerCase();
        showNotification(`Filtering by ${sector} startups`, 'info');
    }
}

function handleCategoryFilter(e) {
    const chip = e.currentTarget;
    document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    
    const category = chip.textContent.toLowerCase();
    showNotification(`Showing ${category} communities`, 'info');
}

// Utility Functions
function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--primary-color)'};
        color: white;
        padding: 12px 24px;
        border-radius: 24px;
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideDown 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translate(-50%, -100px);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translate(-50%, 0);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Handle window click for modal closing
window.onclick = function(event) {
    const modal = document.getElementById('investmentModal');
    if (event.target === modal) {
        closeInvestmentModal();
    }
};