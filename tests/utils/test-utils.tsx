import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InView } from "react-intersection-observer";

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers = ({ children }: { children: React.ReactNode }) => {
  return <InView>{children}</InView>;
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
export { customRender as render, userEvent as user };
