export const getBorderStyle = (
  color: string,
  selectedColor: string,
): string => {
  const colorMap: Record<string, string> = {
    white: "#fff",
    multi: "#FF4000",
    "navy blue": "#1e3269",
    cream: "#f5e9da",
    peach: "#ffdab9",
    "off white": "#f8f8f8",
    mauve: "#e0b0ff",
  };

  const c = color?.toLowerCase?.() || "";
  const borderColor = colorMap[c] || color;

  if (["white", "multi"].includes(c)) {
    return selectedColor === color
      ? "2.5px solid #FF4000"
      : "2.5px solid #E1DFE1";
  }

  if (["navy blue", "cream", "peach", "off white", "mauve"].includes(c)) {
    return selectedColor === color
      ? `2.5px solid ${borderColor}`
      : "2.5px solid transparent";
  }

  return selectedColor === color
    ? `2.5px solid ${borderColor}`
    : "2.5px solid transparent";
};

export const getBackgroundColor = (color: string): string => {
  const colorMap: Record<string, string> = {
    white: "#fff",
    multi: "#fff",
    "navy blue": "#1e3269",
    cream: "#f5e9da",
  };

  const c = color?.toLowerCase?.() || "";
  return colorMap[c] || color;
};
