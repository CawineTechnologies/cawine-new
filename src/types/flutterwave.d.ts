export {};

declare global {
  interface Window {
    FlutterwaveCheckout: (options: any) => void;
  }
}