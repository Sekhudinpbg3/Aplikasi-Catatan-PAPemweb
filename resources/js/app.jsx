import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { AlertTemplate } from "./Components";
import { store } from "./utils/reducers/store";
import { useEffect } from "react";

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 3000,
  // you can also just use 'scale' or 'fade'
  transition: transitions.FADE,
};

const appName =
  window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob("./Pages/**/*.jsx")
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);


    root.render(
      <ThemeProvider
        enableSystem={false}
        attribute="class"
        themes={["dark", "light"]}
        defaultTheme="light"
      >
        <AlertProvider
          template={AlertTemplate}
          containerStyle={{
            background: "transparent",
            position: "absolute",
            zIndex: "100",
          }}
          {...options}
        >
          <Provider store={store}>
            <App {...props} />
          </Provider>
        </AlertProvider>
      </ThemeProvider>
    );
  },
});
