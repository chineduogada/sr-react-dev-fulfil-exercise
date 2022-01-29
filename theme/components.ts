const components = {
  Button: {
    // 1. We can update the base styles
    baseStyle: {
      fontWeight: "normal",
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
        bg: "primary.base",
        color: "white",
        px: "5",

        _hover: {
          bg: "primary.light",
          color: "primary.base",
        },
        _focus: {
          bg: "primary.light",
          color: "primary.base",
        },
      },
      secondary: {
        bg: "primary.light",
        color: "primary.base",
        px: "5",

        _hover: {
          bg: "primary.base",
          color: "white",
        },
        _focus: {
          bg: "primary.base",
          color: "white",
        },
      },
      "nav-item": {
        bg: "accent.4",
        px: "3",
        border: "2px",
        borderColor: "transparent",

        _hover: {
          opacity: 0.8,
          borderColor: "accent.5",
        },
        _focus: {
          opacity: 0.8,
          borderColor: "accent.5",
        },
      },
      //   // 4. We can override existing variants
      //   solid: (props: { colorMode: ColorMode }) => ({
      //     bg: props.colorMode === "dark" ? "red.300" : "red.500",
      //   }),
    },
  },
};

export default components;
