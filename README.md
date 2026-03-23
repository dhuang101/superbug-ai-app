# SuperBug AI Web App

A web application that servers as the frontend for the SuperBug AI App. Which will present the outputs from artificial intelligence predicting the existence of antibiotic resistant infectous bacterium using EMR (Electronic Medical Record) data in the FHIR (Fast Healthcare Interoperability Resources) format.

## Main Documentation
[Google Docs](https://docs.google.com/document/d/1UyBMpHdM3QX23dxKdgPOiHFnuKBjgF2EyFMKZQRJqaE/edit?usp=sharing)

## Dependencies 

The app is currently built using [Node.js](https://nodejs.org/en) v22.11.0

It is recommended to use nvm 
- [UNIX](https://github.com/nvm-sh/nvm) 
- [Windows](https://github.com/coreybutler/nvm-windows) 
  
to manage your versions of node.


###  Tech Stack

| Category           | Tech |
|--------------------|------|
| **Framework**      | [Next.js](https://nextjs.org/) |
| **UI Library**     | [React](https://react.dev/) |
| **Language**       | [TypeScript](https://www.typescriptlang.org/) |
| **Styling**        | [Tailwind CSS](https://tailwindcss.com/) / [DaisyUI](https://daisyui.com/) |
| **Auth**           | [NextAuth.js](https://next-auth.js.org/) |
| **Database**       | [FHIR JPA Server](https://github.com/hapifhir/hapi-fhir-jpaserver-starter) |

## Getting Started

### Clone the repository
View the repository at [GitHub](https://github.com/dhuang101/superbug-ai-app)
```bash
git clone https://github.com/dhuang101/superbug-ai-app.git
cd superbug-ai-app
```

### Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Setup .env.local
Create a .env.local file in the root:
```bash
AUTH0_CLIENT_SECRET = "the secret for Auth0"

NEXTAUTH_URL = "URL for NextAuthJS"
NEXTAUTH_SECRET = "Secret for NextAuthJS"

NEXT_PUBLIC_AUTH0_CLIENT_ID = "Auth0's client ID made public to the frontend"
NEXT_PUBLIC_AUTH0_ISSUER = "Auth0's issuer URL made public to the frontend"
```

### Start dev server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Your app is now running at http://localhost:3000

## Build

To build the app simply run ```npm run build```. This will create a built version of the application which can then be launched using ```npm start```. The app will then be running on [localhost:3000](http:localhost:3000).

## File Structure
```
.
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # Global store reducer declatations
│   ├── functions/      # Reusable TS functions
│   ├── pages/          # Next.js pages (routes)
│   ├── styles/         # TailwindCSS/DaisyUI dependencies
│   ├── types/          # Reusable TS Types
│   └── middleware.ts   # NextJS middleware function
├── .env.local          # Local environment variables
├── next.config.js      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
└── package.json
```