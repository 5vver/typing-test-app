/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    // custom properties
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    spacing: {
      px: '1px',
      0: '0',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
    },
    borderRadius: {
      none: '0',
      sm: '.125rem',
      DEFAULT: '.25rem',
      lg: '.5rem',
      full: '9999px',
    },
    fontSize: {
      xs: ['0.75rem', {lineHeight: '1rem'}],
      sm: ['0.875rem', {lineHeight: '1.25rem'}],
      base: ['1rem', {lineHeight: '1.5rem'}],
      lg: ['1.125rem', {lineHeight: '1.75rem'}],
      xl: ['1.25rem', {lineHeight: '1.75rem'}],
      '2xl': ['1.5rem', {lineHeight: '2rem'}],
      '3xl': ['1.875rem', {lineHeight: '2.25rem'}],
      '4xl': ['2.25rem', {lineHeight: '2.5rem'}],
      '5xl': ['3rem', {lineHeight: '1'}],
      '6xl': ['3.75rem', {lineHeight: '1'}],
      '7xl': ['4.5rem', {lineHeight: '1'}],
      '8xl': ['6rem', {lineHeight: '1'}],
      '9xl': ['8rem', {lineHeight: '1'}],
    },
    extend: {
      colors: {
        current: 'currentColor',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // custom colors
        crust: 'var(--crust)',
        mantle: 'var(--mantle)',
        base: 'var(--base)',
        surface0: 'var(--surface0)',
        surface1: 'var(--surface1)',
        surface2: 'var(--surface2)',
        overlay0: 'var(--overlay0)',
        overlay1: 'var(--overlay1)',
        overlay2: 'var(--overlay2)',
        subtext0: 'var(--subtext0)',
        subtext1: 'var(--subtext1)',
        text: 'var(--text)',
        lavender: 'var(--lavender)',
        blue: 'var(--blue)',
        sapphire: 'var(--sapphire)',
        sky: 'var(--sky)',
        teal: 'var(--teal)',
        yellow: 'var(--yellow)',
        peach: 'var(--peach)',
        maroon: 'var(--maroon)',
        mauve: 'var(--mauve)',
        pink: 'var(--pink)',
        flamingo: 'var(--flamingo)',
        rosewater: 'var(--rosewater)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        red: '30px 0 0 #ff3d00',
        white: '30px 0 0 #fff',
      },
      rotate: {
        '3d-90-90-0-180': 'rotate3d(90, 90, 0, 180deg)',
      },
      keyframes: {
        'accordion-down': {
          from: {height: '0'},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: '0'},
        },
        
        // custom keyframes
        rotate: {
          '0%': {transform: 'rotate(0deg)'},
          '100%': {transform: 'rotate(360deg)'},
        },
        rotate2: {
          '0%': {transform: 'rotate(0deg) scale(0.8)'},
          '50%': {transform: 'rotate(360deg) scale(1.2)'},
          '100%': {transform: 'rotate(720deg) scale(0.8)'},
        },
        ball1: {
          '0%': {
            boxShadow: '30px 0 0 #ff3d00',
          },
          '50%': {
            boxShadow: '0 0 0 #ff3d00',
            marginBottom: '0',
            transform: 'translate(15px, 15px)',
          },
          '100%': {
            boxShadow: '30px 0 0 #ff3d00',
            marginBottom: '10px',
          },
        },
        ball2: {
          '0%': {
            boxShadow: '30px 0 0 #fff',
          },
          '50%': {
            boxShadow: '0 0 0 #fff',
            marginTop: '-20px',
            transform: 'translate(15px, 15px)',
          },
          '100%': {
            boxShadow: '30px 0 0 #fff',
            marginTop: '0',
          },
        },
        prixClip: {
          '0%': {clipPath: 'polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)'},
          '50%': {
            clipPath: 'polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)',
          },
          '75%, 100%': {
            clipPath:
              'polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)',
          },
        },
        flicker: {
          '0%, 100%': {opacity: '1'},
          '50%': {opacity: '0'},
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // custom animations
        rotate: 'rotate 1s linear infinite',
        ball1: 'ball1 1s infinite',
        ball2: 'ball2 1s infinite',
        prixClip: 'prixClip 1s linear infinite',
        flicker: 'flicker 1s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
