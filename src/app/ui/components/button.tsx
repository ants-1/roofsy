import clsx from "clsx"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-11 items-center justify-center rounded-xl bg-green-200 px-5 text-sm font-medium text-gray-900 transition-colors border border-gray-200 hover:bg-green-300 hover:cursor-pointer focus-visible:outline shadow-sm',
        className)}
    >
      {children}
    </button>
  )
}