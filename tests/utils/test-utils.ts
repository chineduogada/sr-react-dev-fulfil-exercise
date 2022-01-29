import React from "react";
import { render } from "@testing-library/react";

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers = ({ children }: { children: React.ReactNode }) => {
  return children;
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    wrapper: Providers as React.JSXElementConstructor<{
      children: React.ReactElement;
    }>,
    ...options,
  });

// re-export everything
export * from "@testing-library/react";
// override render method
export { customRender as render };
