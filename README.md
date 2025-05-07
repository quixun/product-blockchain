# Product Blockchain Project

A decentralized application (dApp) built with React, TypeScript, and Web3 technologies for managing products on the blockchain.

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite 6
- Redux Toolkit for state management
- React Router 7 for routing
- TailwindCSS 4 for styling

### Blockchain
- Hardhat for smart contract development
- Solidity 0.8.28
- Web3.js 4 for blockchain interaction
- IPFS HTTP Client for decentralized storage

### Development Tools
- ESLint for code linting
- TypeScript for type safety
- SWC for fast refresh and compilation

## Prerequisites

Before you begin, ensure you have the following installed:

### 1. Node.js and npm
- Download and install Node.js LTS from [nodejs.org](https://nodejs.org/)
- Verify installation:
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
```

### 2. Wallet
1. Add Ganache network:
   - Network Name: Ganache
   - RPC URL: http://127.0.0.1:7545
   - Chain ID: 1337
   - Currency Symbol: ETH

### 3. Ganache (Local Blockchain)
1. Download Ganache from [trufflesuite.com/ganache](https://trufflesuite.com/ganache/)
2. Install and launch Ganache
3. Create a new workspace:
   - Click "New Workspace"
   - Set port to 7545
   - Enable "Automine" for faster development
   - Save and restart

### 4. IPFS Setup
1. Install IPFS:
   - For macOS (using Homebrew):
   ```bash
   brew install ipfs
   ```
   - For Linux:
   ```bash
   wget https://dist.ipfs.tech/kubo/v0.26.0/kubo_v0.26.0_linux-amd64.tar.gz
   tar -xvzf kubo_v0.26.0_linux-amd64.tar.gz
   cd kubo
   sudo ./install.sh
   ```
   - For Windows:
   - Download the latest version from [ipfs.tech](https://ipfs.tech/#install)
   - Extract and add to system PATH

2. Initialize IPFS:
```bash
ipfs init
```

3. Configure IPFS API and Gateway:
```bash
# Enable API
ipfs config Addresses.API "/ip4/0.0.0.0/tcp/5001"

# Enable Gateway
ipfs config Addresses.Gateway "/ip4/0.0.0.0/tcp/8080"

# Enable CORS
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
```

4. Start IPFS daemon:
```bash
ipfs daemon
```

5. Verify IPFS is running:
```bash
# In a new terminal
ipfs id
# Should show your peer ID and addresses

# Test the API
curl http://localhost:5001/api/v0/id
```

6. Set environment variables:
```bash
# Add to your .env file
VITE_IPFS_API_URL=http://localhost:5001
VITE_IPFS_GATEWAY_URL=http://localhost:8080
```

Note: Keep the IPFS daemon running while working with the application. You can run it in a separate terminal window or as a background service.

## Getting Started

1. Clone the repository:
```bash
git clone [your-repository-url]
cd product-blockchain
```

2. Install dependencies:
```bash
npm install
```

3. Configure Environment:
   - Create a `.env` file in the root directory
   - Add the following variables:
```env
VITE_IPFS_API_URL=http://localhost:5001
VITE_IPFS_GATEWAY_URL=http://localhost:8080
VITE_GANACHE_URL=http://127.0.0.1:7545
VITE_CHAIN_ID=1337
```

4. Start Required Services:
   - Launch Ganache (if not already running)
   - Start IPFS daemon (if not already running)
   - Ensure MetaMask is connected to Ganache network

5. Deploy smart contracts:
```bash
# Compile contracts
npx hardhat compile

# Deploy to local network
npx hardhat run scripts/deploy.js --network garnacho
```

6. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Troubleshooting

### Common Issues

1. **MetaMask Connection Issues**
   - Ensure MetaMask is connected to Ganache network
   - Check if the Chain ID matches (1337)
   - Try resetting MetaMask account (Settings > Advanced > Reset Account)

2. **IPFS Connection Issues**
   - Verify IPFS daemon is running (`ipfs id` command)
   - Check if API is accessible at http://localhost:5001
   - Ensure CORS is enabled in IPFS settings
   - Check IPFS logs for any errors
   - Try restarting the IPFS daemon

3. **Ganache Issues**
   - Verify Ganache is running on port 7545
   - Check if the workspace is properly configured
   - Try restarting Ganache if transactions are stuck

4. **Contract Deployment Issues**
   - Ensure Ganache is running
   - Check if the network configuration in hardhat.config.cjs matches
   - Verify you have enough test ETH in your MetaMask account

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
├── contracts/          # Smart contracts
├── src/               # Frontend source code
├── public/            # Static assets
├── scripts/           # Deployment scripts
├── test/              # Test files
├── artifacts/         # Compiled contracts
└── cache/            # Hardhat cache
```

## Configuration

The project uses the following configuration files:
- `hardhat.config.cjs` - Hardhat configuration
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.