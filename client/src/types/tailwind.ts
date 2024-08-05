type BaseColor =
  | "amber"
  | "blue"
  | "cyan"
  | "emerald"
  | "fuchsia"
  | "gray"
  | "green"
  | "indigo"
  | "lime"
  | "neutral"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "rose"
  | "sky"
  | "slate"
  | "stone"
  | "teal"
  | "violet"
  | "yellow"
  | "zinc";

type CustomColor =
  | "crust"
  | "mantle"
  | "base"
  | "surface0"
  | "surface1"
  | "surface2"
  | "overlay0"
  | "overlay1"
  | "overlay2"
  | "subtext0"
  | "subtext1"
  | "text"
  | "lavender"
  | "blue"
  | "sapphire"
  | "sky"
  | "teal"
  | "yellow"
  | "peach"
  | "maroon"
  | "mauve"
  | "pink"
  | "flamingo"
  | "rosewater";

type BaseLevel = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type Color =
  | `${BaseColor}-${BaseLevel}`
  | BaseColor
  | CustomColor
  | "inherit"
  | "current"
  | "transparent"
  | "black"
  | "white";