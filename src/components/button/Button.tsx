import { ComponentProps } from 'react'
type ButtonProps = ComponentProps<'button'>&{
    variant: ButtonVariant
}
type ButtonVariant = 'primary' | 'secondary'| 'danger'| 'success'| 'warning' | 'info' | 'light' | 'dark'

function Button({ children ,variant, ...rest}: ButtonProps) {
    return (
        <button {...rest} className={getVariant(variant) + ' px-4 py-2 rounded-lg cursor-pointer rounded-2xl'}>
            {children}
        </button>
    )
}

export default Button
function getVariant(variant: ButtonVariant) {
    switch (variant) {
        case 'primary':
            return 'bg-blue-500 text-white'
        case 'secondary':
            return 'bg-gray-500 text-white'
        case 'danger':
            return 'bg-red-500 text-white'
        case 'success':
            return 'bg-green-500 text-white'
        case 'warning':
            return 'bg-yellow-500 text-white'
        case 'info':
            return 'bg-blue-500 text-white'
        case 'light':
            return 'bg-white text-black'
        case 'dark':
            return 'bg-black text-white'
        default:
            return ''
    }
}