import React from 'react';
import ReactDOM from 'react-dom/client';
import {NextUIProvider} from "@nextui-org/react";
import App from './App';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <NextUIProvider>
        <App />
        {/* <main className="dark text-foreground bg-background">
          <App />
        </main> */}
      </NextUIProvider>
    </React.StrictMode>,
  );
}
