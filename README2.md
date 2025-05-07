# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Technologies Used

### Frontend
- **React 19**: A modern JavaScript library for building user interfaces with component-based architecture
- **TypeScript**: A strongly typed programming language that builds on JavaScript, adding static type definitions
- **Vite**: A next-generation frontend build tool that offers a faster and leaner development experience
- **Redux Toolkit**: The official, opinionated, batteries-included toolset for efficient Redux development
- **React Router**: A standard library for routing in React applications
- **TailwindCSS**: A utility-first CSS framework for rapidly building custom user interfaces

### Blockchain
- **Hardhat**: A development environment for Ethereum software, including testing, compiling, deploying, and debugging
- **Web3.js**: A collection of libraries that allow you to interact with a local or remote Ethereum node
- **IPFS HTTP Client**: A client library for the InterPlanetary File System, used for decentralized storage of metadata

### Development Tools
- **ESLint**: A static code analysis tool for identifying problematic patterns in JavaScript/TypeScript code
- **TypeScript**: Used for type checking and enhanced development experience
- **SWC**: A super-fast TypeScript/JavaScript compiler used by Vite for Fast Refresh

## Installation and Running the Project

1. Clone repository:
```bash
git clone [repository-url]
cd product-blockchain
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
- Create `.env` file based on `.env.example`
- Update necessary environment variables

4. Compile current contracts (Hardhat):
```bash
npx hardhat compile
```

5. Deploy smart contracts:
```bash
npx hardhat run scripts/deploy.cjs --network garnacho
```

6. Run development server:
```bash
npm run dev
```

## Important Notes

1. **Smart Contracts**:
   - Ensure MetaMask is installed and configured
   - Check network configuration in `hardhat.config.cjs`

2. **IPFS**:
   - Project uses IPFS for metadata storage
   - Configure IPFS node or use IPFS gateway

3. **Development**:
   - Use `npm run lint` to check code style
   - Run tests with `npm test`

4. **Deployment**:
   - Build for production: `npm run build`
   - Preview build: `npm run preview`

## Project Structure

├── contracts/ # Smart contracts
├── src/ # Main source code
│ ├── assets/ # Static assets
│ ├── components/ # Reusable components
│ ├── features/ # Main features
│ ├── layouts/ # Layout templates
│ ├── Router/ # Routing configuration
│ ├── services/ # Services and API calls
│ └── App.tsx # Root component
├── public/ # Static files
├── scripts/ # Utility scripts
└── test/ # Unit tests

## Contributing

1. Create a new branch for feature/fix
2. Commit changes with clear messages
3. Create Pull Request

## License

[MIT License](LICENSE)