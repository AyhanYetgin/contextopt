"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    Paddle: {
      Setup: (config: Record<string, unknown>) => void;
      Checkout: {
        open: (config: Record<string, unknown>) => void;
      };
    };
  }
}

export function usePaddle() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.Paddle) {
      setLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/paddle.js";
    script.onload = () => {
      try {
        window.Paddle.Setup({ vendor: 0 });
      } catch {}
      setLoaded(true);
    };
    document.body.appendChild(script);
  }, []);

  function openCheckout(priceId: string, userId?: string) {
    if (!window.Paddle) {
      window.location.href = `/pro?error=paddle-not-loaded`;
      return;
    }
    window.Paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customData: { user_id: userId || "" },
      settings: {
        displayMode: "overlay",
        theme: "light",
        successUrl: window.location.origin + "/success",
        cancelUrl: window.location.origin + "/cancel",
      },
    });
  }

  return { loaded, openCheckout };
}
