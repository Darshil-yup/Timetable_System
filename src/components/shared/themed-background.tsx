
"use client"

import { useTheme } from "next-themes";
import { useEffect } from "react";

export function ThemedBackground() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme) {
      if (resolvedTheme === 'dark') {
        document.body.style.backgroundImage = "url('/light.jpeg')";
      } else {
        document.body.style.backgroundImage = "url('/dark.jpeg')";
      }
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
      document.body.style.transition = 'background-image 0.5s ease-in-out';
    }
  }, [resolvedTheme]);

  return null;
}
