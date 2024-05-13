import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'transparent' | 'destructive';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = ({
  children,
  variant = 'primary',
  disabled = false,
  className: styles,
  ...props
}: ButtonProps) => {
  let className = '';

  switch (variant) {
    case 'primary':
      className =
        'text-white bg-indigo-500 hover:bg-indigo-600 font-semibold py-2 px-4 rounded';
      break;
    case 'secondary':
      className =
        'text-white bg-zinc-500 hover:bg-zinc-700 font-semibold py-2 px-4 rounded';
      break;
    case 'transparent':
      className =
        'text-white bg-transparent hover:bg-[rgba(255,255,255,0.2)] font-semibold py-2 px-4 rounded';
      break;
    case 'destructive':
      className =
        'text-white bg-red-500 hover:bg-red-700 font-semibold py-2 px-4 rounded';
      break;
  }

  if (disabled) {
    className += ' opacity-20 pointer-events-none';
  }

  return (
    <button {...props} className={`${className}${styles ? ' ' + styles : ''}`} disabled={disabled}>
      {children}
    </button>
  );
};
