# Reactuals

![npm](https://img.shields.io/npm/v/reactuals) ![license](https://img.shields.io/npm/l/reactuals) ![downloads](https://img.shields.io/npm/dm/reactuals)

**Reactuals** is a lightweight, powerful collection of 31 custom React hooks designed to streamline frontend development, optimize performance, and enhance user experience. Each hook solves specific real-world challenges, from handling user interactions to managing state persistence, making your React applications more efficient, accessible, and intuitive. Built with TypeScript for type safety, these hooks are easy to integrate, highly reusable, and performance-focused.

## Installation

Install the package via npm or yarn:

```bash
npm install reactuals
```

```bash
yarn add reactuals
```

## Documentation

For detailed usage, parameters, and examples of each hook, visit our [official documentation](https://reactuals.vercel.app).

## Available Hooks

The following table lists all hooks provided by `reactuals`, along with their descriptions:

| Hook Name                | Description                                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **useClickAnywhere**     | Detects clicks anywhere on the document, useful for closing modals or dropdowns when clicking outside specific elements.                      |
| **useKeyPress**          | Tracks when a specific key is pressed, enabling keyboard shortcuts or interactive controls in applications.                                   |
| **useWindowResize**      | Monitors window resize events, providing current window dimensions for responsive layouts or dynamic UI adjustments.                          |
| **useDebounce**          | Delays a value update until a specified time has passed without changes, optimizing performance for inputs like search or form validation.    |
| **useInterval**          | Runs a function at specified intervals, ideal for timers, polls, or animations that need controlled execution.                                |
| **useLocalStorage**      | Synchronizes state with `localStorage`, persisting data across browser sessions for user preferences or settings.                             |
| **useOnScreen**          | Detects if a DOM element is visible in the viewport using the Intersection Observer API, enabling lazy-loading or visibility triggers.        |
| **usePrevious**          | Returns the previous value of a state or prop, useful for tracking changes or implementing undo/redo functionality.                           |
| **useTimeout**           | Executes a function after a specified delay, suitable for delayed actions like tooltips or auto-saving forms.                                 |
| **useToggle**            | Manages a boolean state with a toggle function, simplifying on/off or show/hide UI patterns.                                                  |
| **useFocusTrap**         | Traps keyboard focus within a DOM element, enhancing accessibility for modals or dialogs by preventing focus escape.                          |
| **useMediaQuery**        | Tracks whether a CSS media query matches, enabling responsive design or conditional rendering based on screen size or device.                 |
| **useOnClickOutside**    | Detects clicks outside a specified DOM element, perfect for closing popovers, menus, or modals when clicking elsewhere.                       |
| **useScrollPosition**    | Returns the current vertical scroll position (`scrollY`) of the window, powering scroll-based features like progress bars or navigation aids. |
| **useClipboard**         | Provides copy-to-clipboard functionality, simplifying text copying for user convenience in forms or code snippets.                            |
| **useConditionalEffect** | Runs a `useEffect` only when specified conditions are met, reducing unnecessary side effects for optimized performance.                       |
| **useDocumentTitle**     | Dynamically updates the document’s title, enhancing SEO and user navigation in single-page applications.                                      |
| **useElementSize**       | Tracks the dimensions of a DOM element, useful for dynamic layouts or resizing-aware components like charts or modals.                        |
| **useFavicon**           | Updates the browser’s favicon dynamically, ideal for branding or visual cues like notifications in web apps.                                  |
| **useHover**             | Detects when a DOM element is hovered, enabling interactive hover effects or tooltips without complex event handling.                         |
| **useIsMounted**         | Returns a boolean indicating if a component is mounted, preventing state updates on unmounted components to avoid memory leaks.               |
| **useOnlineStatus**      | Monitors the browser’s online/offline status, allowing adaptive UI or data syncing behavior based on network availability.                    |
| **usePageExit**          | Detects when a user attempts to leave a page, enabling prompts to save unsaved changes or confirm navigation.                                 |
| **useRenderCount**       | Tracks the number of times a component has rendered, aiding in debugging performance issues and identifying unnecessary re-renders.           |
| **useScrollDirection**   | Detects the scroll direction (`"up"` or `"down"`) of the window, ideal for dynamic UI effects like hiding/showing navigation elements.        |
| **useSessionStorage**    | Synchronizes state with `sessionStorage`, persisting data across page refreshes within a browser session for temporary storage.               |
| **useThrottle**          | Throttles a value to update only after a specified delay, optimizing performance in input-heavy scenarios like search or live filters.        |
| **useTimeoutToggle**     | Toggles a boolean state after a delay, useful for temporary UI states like notifications or alerts that auto-dismiss.                         |
| **useUpdateEffect**      | Runs an effect only on updates (not on initial mount), simplifying logic for side effects triggered by state or prop changes.                 |
| **useWhyDidYouUpdate**   | Logs changes to props or state that cause re-renders, helping debug performance issues by identifying unnecessary updates.                    |
| **useClickAndHold**      | Detects when a user clicks and holds on an element, enabling long-press interactions like context menus or drag initiators.                   |

## Why Use Reactuals?

- **Lightweight**: Minimal bundle size with no dependencies.
- **Type-Safe**: Written in TypeScript for robust type checking.
- **Performance-Optimized**: Hooks are designed to minimize re-renders and resource usage.
- **Real-World Focused**: Each hook addresses practical challenges, from accessibility to performance.
- **Comprehensive Docs**: Detailed guidance available at [reactuals.dev/docs](https://reactuals.dev/docs).

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/new-hook`).
3. Commit your changes (`git commit -m "Add new hook"`).).
4. Push to the to branch (`push origin feature/new-hook`).
5. Open a pull requestRequest).

Please ensure your code aligns with follows the existing style, includes tests, and updates documentation.

## License

MIT License. See [LICENSE](LICENSE) for details.

## Support

For issues, or feature requests, please open an issue, or feature request on the [GitHub repository](https://github.com/your-username/reactuals). We’re here to help!

---

Builtmade with ❤️ for the React community. Happy coding!
