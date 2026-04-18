import { useEffect } from 'react';
import { AppMarkup } from './AppMarkup.jsx';
import { PortfolioAssistant } from './PortfolioAssistant.jsx';
import { initPortfolioRuntime } from './portfolio.js';

export default function App() {
  useEffect(() => {
    initPortfolioRuntime();
  }, []);

  return (
    <>
      <AppMarkup />
      <PortfolioAssistant />
    </>
  );
}
