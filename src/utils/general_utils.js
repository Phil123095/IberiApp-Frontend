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
      colors.bg_color = tailwindConfig().theme.colors.indigo[800]
      colors.hv_bg_color = tailwindConfig().theme.colors.indigo[900]
  }

  else if (key === "P2_raised") {
      colors.bg_color = tailwindConfig().theme.colors.indigo[700]
      colors.hv_bg_color = tailwindConfig().theme.colors.indigo[800]
  }

  else if (key === "P3_raised") {
      colors.bg_color = tailwindConfig().theme.colors.indigo[500]
      colors.hv_bg_color = tailwindConfig().theme.colors.indigo[600]
  }

  else if (key === "P4_raised") {
      colors.bg_color = tailwindConfig().theme.colors.indigo[200]
      colors.hv_bg_color = tailwindConfig().theme.colors.indigo[300]
  }

  return colors

};

export const color_picker = (index) => {
  const colors = {}
  if (index <= 7) {
    const bg_shade = 200 + (100 * index)
    colors.bg_color = tailwindConfig().theme.colors.indigo[bg_shade]
    colors.hv_bg_color = tailwindConfig().theme.colors.indigo[bg_shade + 100]
  }
  else if (index > 7 && index <= 15) {
    const bg_shade = 200 + (100 * (index-7))
    colors.bg_color = tailwindConfig().theme.colors.blue[bg_shade]
    colors.hv_bg_color = tailwindConfig().theme.colors.blue[bg_shade + 100]
  }
  else {
    colors.bg_color = tailwindConfig().theme.colors.purple[600]
    colors.hv_bg_color = tailwindConfig().theme.colors.purple[700]
  }

  return colors;

}


export const return_loader = () => {
  return (
      <svg role="status" class="inline mr-3 w-5 h-5 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
      </svg>
  )
  
}