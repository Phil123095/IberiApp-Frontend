import resolveConfig from 'tailwindcss/resolveConfig';

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig('./src/css/tailwind.config.js')
}

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) => Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value);

export const formatPriorityCodes = (value) => {
  const prio_params = {}
  if (value === 'P1_raised') {
      prio_params.order = 1
      prio_params.format_code = "Critical Priority"
  }
  else if (value === 'P2_raised') {
      prio_params.order = 2
      prio_params.format_code = "High Priority"
  } 
  else if (value === 'P3_raised') {
      prio_params.order = 3
      prio_params.format_code = "Medium Priority"
  } 
  else if (value === 'P4_raised') {
      prio_params.order = 4
      prio_params.format_code = "Low Priority"
  }

  return prio_params
};

export const return_color = (key) => {
  const colors = {}

  if (key === "P1_raised") {
      colors.bg_color = tailwindConfig().theme.colors.indigo[500]
      colors.hv_bg_color = tailwindConfig().theme.colors.indigo[600]
  }

  else if (key === "P2_raised") {
      colors.bg_color = tailwindConfig().theme.colors.indigo[800]
      colors.hv_bg_color = tailwindConfig().theme.colors.indigo[900]
  }

  else if (key === "P3_raised") {
      colors.bg_color = tailwindConfig().theme.colors.sky[400]
      colors.hv_bg_color = tailwindConfig().theme.colors.sky[500]
  }

  else if (key === "P4_raised") {
      colors.bg_color = tailwindConfig().theme.colors.slate[200]
      colors.hv_bg_color = tailwindConfig().theme.colors.slate[300]
  }

  return colors

};