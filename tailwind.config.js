/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            'inherit': 'inherit',
            'transparent': 'transparent',
            'white': '#FFFFFF',
            'primary': '#F78E1E',
            'danger': '#E13333',
            'danger-lighter': '#ffe0e0',
            'success': '#259660',
            'info': '#3759D1',
            'warning': '#ffa32c',
            'warning-lighter': '#fff0d8',
            'grey-100': '#AAB0C6',
            'grey-200': '#8D95AF',
            'grey-300': '#6C7287',
            'grey-400': '#454B5F',
            'off-white-100': '#F6F7FB',
            'off-white-200': '#EDF0F6',
            'off-white-300': '#D8DEEC',
            'off-white-400': '#BDC4D3',
            'green': '#299935',
            'yellow-dark': '#CB8B2A',
            'red': '#BD3333',
            'violet': '#9B44C3',
            'dark-blue': '#3541AF',
            'teal': '#398A9C',
            'purple': '#543D96',
            'pastel-red': '#B15335',
            'azure': '#2382C7',
        },
        fontSize: {
            b1: ['18px', {lineHeight: '28px'}],
            b2: ['16px', {lineHeight: '26px'}],
            b3: ['15px', {lineHeight: '24px'}],
            b4: ['14px', {lineHeight: '20px'}],
            b5: ['13px', {lineHeight: '20px'}],
            b6: ['12px', {lineHeight: '18px'}],
            h1: ['36px', {lineHeight: '46px'}],
            h2: ['28px', {lineHeight: '42px'}],
            h3: ['22px', {lineHeight: '28px'}],
            h4: ['16px', {lineHeight: '22px'}],
            h5: ['15px', {lineHeight: '22px'}],
            h6: ['14px', {lineHeight: '21px'}],
        },
        typography: (theme) => ({
            DEFAULT: {
                css: {
                    h1: {
                        fontSize: theme('fontSize.h1[0]'),
                        lineHeight: theme('fontSize.h1[1].lineHeight'),
                        color: theme('colors.dark'),
                        fontWeight: theme('fontWeight.bold')
                    },
                    h2: {
                        fontSize: theme('fontSize.h2[0]'),
                        lineHeight: theme('fontSize.h2[1].lineHeight'),
                        color: theme('colors.dark'),
                        fontWeight: theme('fontWeight.bold')
                    },
                    h3: {
                        fontSize: theme('fontSize.h3[0]'),
                        lineHeight: theme('fontSize.h3[1].lineHeight'),
                        color: theme('colors.dark'),
                        fontWeight: theme('fontWeight.bold')
                    },
                    h4: {
                        fontSize: theme('fontSize.h4[0]'),
                        lineHeight: theme('fontSize.h4[1].lineHeight'),
                        color: theme('colors.dark'),
                        fontWeight: theme('fontWeight.bold')
                    },
                    h5: {
                        fontSize: theme('fontSize.h5[0]'),
                        lineHeight: theme('fontSize.h5[1].lineHeight'),
                        color: theme('colors.dark'),
                        fontWeight: theme('fontWeight.bold')
                    },
                    h6: {
                        fontSize: theme('fontSize.h6[0]'),
                        lineHeight: theme('fontSize.h6[1].lineHeight'),
                        color: theme('colors.dark'),
                        fontWeight: theme('fontWeight.bold')
                    },
                }
            }
        }),
        fontFamily: {
            sans: ["'Inter', sans-serif"],
        },
        extend: {
            boxShadow: {
                'custom-1': '0px 10px 40px 0px #191C261A'
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('tailwindcss/plugin')(({addBase, theme}) => {
            addBase({
                'html': {color: theme('colors.grey-400')},
            })
        })
    ],
}