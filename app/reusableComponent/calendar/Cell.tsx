import clsx from "clsx";

interface Props extends React.PropsWithChildren {
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
  isHighlighted?: boolean;  // New prop to indicate highlight
}

const Cell: React.FC<Props> = ({
  onClick,
  children,
  className,
  isActive = false,
  isHighlighted = false,  // Check if the cell should be highlighted
}) => {
  return (
    <div
      onClick={!isActive ? onClick : undefined}
      className={clsx(
        "h-10 border-b border-r flex items-center justify-center select-none transition-colors",
        {
          "cursor-pointer hover:bg-gray-100 active:bg-gray-200": !isActive && onClick,
          "font-bold text-white bg-blue-600": isActive,
          "bg-red-500": isHighlighted, // Highlight the date if isHighlighted is true
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default Cell;
