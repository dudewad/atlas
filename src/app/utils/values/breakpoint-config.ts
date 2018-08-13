const sm = 480;
const md = 768;
const lg = 1024;
const xl = 1280;

export const BpCfg = {
  xs: `(max-width: ${sm - 1}px)`,
  xsMax: `(max-width: ${sm - 1}px)`,

  smMin: `(min-width: ${sm}px)`,
  sm: `(min-width: ${sm}px) and (max-width: ${md - 1 }px)`,
  smMax: `(max-width: ${md - 1 }px)`,

  mdMin: `(min-width: ${md}px)`,
  md: `(min-width: ${md}px) and (max-width: ${lg - 1 }px)`,
  mdMax: `(max-width: ${lg - 1 }px)`,

  lgMin: `(min-width: ${lg}px)`,
  lg: `(min-width: ${lg}px) and (max-width: ${xl - 1 }px)`,
  lgMax: `(max-width: ${xl - 1 }px)`,

  xlMin: `(min-width: ${xl}px)`,
  xl: `(min-width: ${xl}px)`,
};
