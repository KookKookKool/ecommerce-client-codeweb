// types/global.d.ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    gtagScriptAdded: boolean;
  }
}

// Define the gtag function type
type GtagFunction = (...args: any[]) => void;

// Extend the Window interface to include gtag and other properties
interface Window {
  gtag?: GtagFunction;
  gtagScriptAdded?: boolean;
  dataLayer?: any[];
}

