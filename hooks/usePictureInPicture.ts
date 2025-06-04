import { useCallback, useRef, useState } from "react";

/**
 * Options for the usePictureInPicture hook.
 */
type UsePictureInPictureOptions = {
  windowFeatures?: string; // Features for the PiP window (e.g., size, position)
  onOpen?: (pipWindow: Window) => void; // Callback when PiP window opens
  onClose?: () => void; // Callback when PiP window closes
  injectStyles?: string; // Additional CSS to inject into PiP window
  injectScripts?: string; // Additional JS to inject into PiP window
};

/**
 * Default CSS styles for the Picture-in-Picture window.
 */
const DEFAULT_PIP_STYLES = `
html, body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: #000;
}
*, *::before, *::after {
  box-sizing: border-box;
}
body > * {
  width: 100vw !important;
  height: 100vh !important;
  max-width: 100vw !important;
  max-height: 100vh !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
`;

/**
 * React hook to open and manage a Document Picture-in-Picture window.
 *
 * @param options Configuration options for the PiP window.
 * @returns Object with open/close functions, state, and error info.
 */
export function usePictureInPicture(options: UsePictureInPictureOptions = {}) {
  // State to track if PiP is active
  const [isActive, setIsActive] = useState(false);
  // State to track any errors
  const [error, setError] = useState<Error | null>(null);
  // Ref to store the PiP window instance
  const pipWindowRef = useRef<Window | null>(null);

  /**
   * Opens a Picture-in-Picture window with the given content.
   *
   * @param content The HTMLElement to display in PiP.
   * @param overrideStyles Optional CSS to override default styles.
   */
  const openPictureInPicture = useCallback(
    async (
      content: HTMLElement,
      overrideStyles?: string // Optional override for default styles
    ) => {
      try {
        // Check for Document Picture-in-Picture API support
        if (!("documentPictureInPicture" in window)) {
          throw new Error("Document Picture-in-Picture API not supported");
        }
        // Get the API from the window object
        const docPip = (window as any).documentPictureInPicture as {
          requestWindow: (features?: string) => Promise<Window>;
        };
        // Request a new PiP window
        const pipWindow = await docPip.requestWindow(options.windowFeatures);

        // Clone the provided content for the PiP window
        const clonedContent = content.cloneNode(true) as HTMLElement;

        // Ensure cloned content fills the PiP window
        clonedContent.style.width = "100vw";
        clonedContent.style.height = "100vh";
        clonedContent.style.maxWidth = "100vw";
        clonedContent.style.maxHeight = "100vh";
        clonedContent.style.display = "flex";
        clonedContent.style.alignItems = "center";
        clonedContent.style.justifyContent = "center";

        // Clear PiP window body and append cloned content
        pipWindow.document.body.innerHTML = "";
        pipWindow.document.body.appendChild(clonedContent);

        // Inject styles: override, default, and custom
        const style = pipWindow.document.createElement("style");
        style.textContent =
          (overrideStyles ?? DEFAULT_PIP_STYLES) + (options.injectStyles || "");
        pipWindow.document.head.appendChild(style);

        // Inject custom scripts if provided
        if (options.injectScripts) {
          const script = pipWindow.document.createElement("script");
          script.textContent = options.injectScripts;
          pipWindow.document.head.appendChild(script);
        }

        // Store the PiP window reference
        pipWindowRef.current = pipWindow;
        setIsActive(true);
        setError(null);

        // Call onOpen callback if provided
        options.onOpen?.(pipWindow);

        // Handle PiP window unload (close)
        const unloadHandler = () => {
          setIsActive(false);
          pipWindowRef.current = null;
          pipWindow.removeEventListener("unload", unloadHandler);
          options.onClose?.();
        };
        pipWindow.addEventListener("unload", unloadHandler);
      } catch (err) {
        // Handle errors and update state
        const error =
          err instanceof Error
            ? err
            : new Error("Failed to open Picture-in-Picture");
        setError(error);
        setIsActive(false);
      }
    },
    [options]
  );

  /**
   * Closes the Picture-in-Picture window if open.
   */
  const closePictureInPicture = useCallback(() => {
    if (pipWindowRef.current) {
      pipWindowRef.current.close();
      pipWindowRef.current = null;
      setIsActive(false);
      options.onClose?.();
    }
  }, [options]);

  // Return API and state for the hook
  return {
    openPictureInPicture,
    closePictureInPicture,
    isActive,
    error,
    pipWindow: pipWindowRef.current,
  };
}
