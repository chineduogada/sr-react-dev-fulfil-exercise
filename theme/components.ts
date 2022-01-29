export const layoutStyles = {
  rounded: "4px",
  border: "1px solid",
  borderColor: "black2",
  shadow: "0 0 1px rgba(0, 0, 0, 0.1)",
};

const components = {
  Button: {
    // 1. We can update the base styles
    baseStyle: {
      rounded: "none",
    },
    // 2. We can add a new button size or extend existing
    sizes: {
      md: {
        h: "32px",
        fontSize: "sm",
        background: "blue.500",
        px: "6",
      },
    },
    // 3. We can add a new visual variant
    variants: {
      base: {
        bg: "accent.2",
        color: "black",
        px: "4",
        ...layoutStyles,

        _hover: {
          opacity: 0.8,
          borderColor: "accent.5",
        },
        _focus: {
          opacity: 0.8,
          borderColor: "accent.5",
        },
      },

      "tab-item": {
        px: "3",
        pb: 1,
        borderBottom: "3px solid",
        borderColor: "primary.base",
      },
      //   // 4. We can override existing variants
      //   solid: (props: { colorMode: ColorMode }) => ({
      //     bg: props.colorMode === "dark" ? "red.300" : "red.500",
      //   }),
    },
  },
};

export default components;
