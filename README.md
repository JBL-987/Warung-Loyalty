# 🪙 Warung Token - Loyalty System

A blockchain-based reward system for loyal warung customers using Stacks and Clarity smart contracts.

## 🎯 About The Project

**Warung Token** is a decentralized application that enables warung (local store) owners to give token rewards to loyal customers. Built on top of the Stacks blockchain with secure and transparent Clarity smart contracts.

### ✨ Key Features

- 🎁 **Token Reward System** - Warung owners can mint tokens for customers
- 🔄 **Easy Transfer** - Customers can transfer tokens to other users
- 🔒 **Blockchain Security** - Built on secure Stacks blockchain
- 📱 **User-Friendly Interface** - Simple and intuitive UI/UX
- 🏪 **SIP-010 Compliant** - Follows Stacks token standards

## 🚀 Live Demo

🌐 **Live Demo**: [warung-token.vercel.app](https://warung-token.vercel.app) *(replace with your deployment URL)*

📋 **Smart Contract**: [ST2052P3NV494NZ9Q3DPNWX9ZXVDE5HHMRY0VAAFM.warung-loyalty](https://explorer.hiro.so/txid/0x123456?chain=testnet) *(replace with actual contract address)*

## 📋 Prerequisites

Before running the project, make sure you have:

- **Node.js** (v18 or newer)
- **npm** or **yarn**
- **Stacks Wallet** (Leather or Xverse)
- **STX Testnet** tokens for gas fees

## 🛠️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/username/warung-token.git
cd warung-token
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup Environment Variables

Create `.env.local` file in root directory:

```env
# Optional: for custom configuration
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ADDRESS=ST2052P3NV494NZ9Q3DPNWX9ZXVDE5HHMRY0VAAFM
NEXT_PUBLIC_CONTRACT_NAME=warung-loyalty
```

### 4. Update Contract Address

Edit `lib/contract.ts` and replace with your contract address:

```typescript
export const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";
export const OWNER_ADDRESS = "YOUR_WALLET_ADDRESS_HERE";
```

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
warung-token/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel (owner only)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── BalanceCard.tsx    # Token balance display
│   ├── MintForm.tsx       # Mint tokens (admin only)
│   ├── Navbar.tsx         # Navigation bar
│   └── TransferForm.tsx   # Transfer tokens
├── hooks/                 # Custom React hooks
│   └── use-stacks.ts      # Stacks wallet integration
├── lib/                   # Utility libraries
│   └── contract.ts        # Smart contract interactions
├── public/               # Static assets
│   └── logo.png          # App logo
├── contracts/            # Clarity smart contracts
│   └── warung-loyalty.clar
├── README.md
└── package.json
```

## 🔧 Smart Contract

### Token Details

- **Name**: Workshop Token
- **Symbol**: WTK
- **Decimals**: 6
- **Standard**: SIP-010 (Stacks Improvement Proposal)

### Main Functions

```clarity
;; Read-only functions
(get-balance (user principal))     ;; Get user token balance
(get-total-supply)                 ;; Get total token supply
(get-name)                         ;; Get token name
(get-symbol)                       ;; Get token symbol

;; Public functions
(transfer (amount uint) (from principal) (to principal) (memo (optional (buff 34))))
(mint (amount uint) (to principal)) ;; Owner only
```

### Deployment

To deploy smart contract to testnet:

```bash
# Install Clarinet
curl -L https://github.com/hirosystems/clarinet/releases/download/v1.7.0/clarinet-linux-x64.tar.gz | tar xz
sudo mv clarinet /usr/local/bin/

# Deploy contract
clarinet deploy --testnet
```

## 💻 Usage

### For Customers (Regular Users)

1. **Connect Wallet**
   - Click "Connect Wallet" in navbar
   - Choose Leather or Xverse wallet
   - Approve connection

2. **Check Balance**
   - WTK balance will appear automatically after connecting
   - Click "Refresh" for manual update

3. **Transfer Tokens**
   - Enter recipient address
   - Input token amount
   - Add memo (optional)
   - Click "Transfer"

### For Warung Owners (Admin)

1. **Access Admin Panel**
   - Connect wallet with owner address
   - Click "Admin" in navbar
   - Only owner can access this panel

2. **Mint Tokens**
   - Enter customer address
   - Input reward amount
   - Click "Mint Tokens"

## 🔧 Configuration

### Contract Settings

Edit `lib/contract.ts` to customize:

```typescript
// Contract info
export const CONTRACT_ADDRESS = "ST..."; // Contract address
export const CONTRACT_NAME = "warung-loyalty";
export const TOKEN_DECIMALS = 6;

// Owner address (who can mint)
export const OWNER_ADDRESS = "ST...";

// Network
export const NETWORK = STACKS_TESTNET; // or STACKS_MAINNET
```

### UI Customization

Theme and styling can be changed in:
- `app/globals.css` - Global styles
- Tailwind classes in components
- Color scheme: Yellow/Black theme

## 📱 Mobile Support

- ✅ Responsive design
- ✅ Mobile wallet support (Xverse mobile)
- ✅ Touch-friendly UI
- ✅ Progressive Web App ready

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### Contract Testing

```bash
clarinet test
```

### Integration Testing

```bash
npm run test:integration
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Auto-deploy
4. Update environment variables

```bash
# Build for production
npm run build

# Preview build locally
npm start
```

### Netlify

```bash
npm run build
# Upload .next folder to Netlify
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["npm", "start"]
```

## 🛡️ Security

### Smart Contract Security

- ✅ SIP-010 compliant
- ✅ Owner-only mint function
- ✅ Transfer validation
- ✅ No recursive calls
- ✅ Safe math operations

### Frontend Security

- ✅ Input validation
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Environment variables
- ✅ Secure wallet connections

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Use Tailwind for styling
- Add tests for new features
- Update documentation
- Follow conventional commits

## 📝 Changelog

### v1.0.0 (Current)
- ✅ Basic token functionality (mint, transfer, balance)
- ✅ Wallet integration (Leather, Xverse)
- ✅ Admin panel for owners
- ✅ Responsive UI
- ✅ Transaction feedback

### Planned Features (v1.1.0)
- 🔄 Transaction history
- 📊 Analytics dashboard
- 🏪 Multi-warung support
- 💸 Redeem system
- 🔔 Push notifications

## 🐛 Known Issues

- [ ] Slow balance refresh after mint (workaround: manual refresh)
- [ ] Transaction pending state can get stuck (refresh page)
- [ ] Mobile wallet disconnect issue (reconnect wallet)

## 📞 Support

**Issues**: [GitHub Issues](https://github.com/username/warung-token/issues)

**Email**: support@warung-token.com

**Discord**: [Join Community](https://discord.gg/warung-token)

**Documentation**: [Wiki](https://github.com/username/warung-token/wiki)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Stacks](https://stacks.org/) - Blockchain platform
- [Clarity](https://clarity-lang.org/) - Smart contract language
- [Hiro](https://hiro.so/) - Developer tools
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

---

<div align="center">

**Built with ❤️ for Indonesian warung community**

[⭐ Star Repository](https://github.com/username/warung-token) • [🐛 Report Bug](https://github.com/username/warung-token/issues) • [💡 Request Feature](https://github.com/username/warung-token/issues)

</div>