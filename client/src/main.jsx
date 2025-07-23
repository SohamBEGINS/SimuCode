import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ClerkProvider} from '@clerk/clerk-react'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// Enhanced debugging
console.log('=== CLERK DEBUGGING ===');
console.log('Environment Mode:', import.meta.env.MODE);
console.log('Clerk Key Present:', !!PUBLISHABLE_KEY);
console.log('Clerk Key Length:', PUBLISHABLE_KEY?.length);
console.log('Clerk Key Prefix:', PUBLISHABLE_KEY?.substring(0, 10) + '...');
console.log('Full Key (first 20 chars):', PUBLISHABLE_KEY?.substring(0, 20));

if(!PUBLISHABLE_KEY)
{
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </StrictMode>,
)
