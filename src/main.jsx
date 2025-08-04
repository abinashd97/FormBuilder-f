import { StrictMode } from "react"; // React's StrictMode for highlighting potential problems
import { createRoot } from "react-dom/client"; // React 18+ API for creating root container
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux"; // Redux Provider to make the store available throughout the app
import { store } from "./store/store.js"; // Redux store instance

// Use React 18+ root API to render the application into the DOM element with id 'root'
createRoot(document.getElementById("root")).render(
  // React.StrictMode helps with highlighting potential issues in development
  <StrictMode>
    {/* The Provider component wraps the app and makes the Redux store available via context */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
