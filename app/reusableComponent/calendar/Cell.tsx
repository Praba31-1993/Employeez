import clsx from "clsx";
import { Colors } from "../styles";

interface Props extends React.PropsWithChildren {
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
  isHighlighted?: boolean; // New prop to indicate highlight
}



const Cell: React.FC<Props> = ({
  onClick,
  children,
  className,
  isActive = false,
  isHighlighted = false, // Check if the cell should be highlighted
}) => {
  const useColors = Colors();
  return (
    <div
      onClick={!isActive ? onClick : undefined}
      className={clsx(
        "h-10  flex items-center justify-center select-none transition-colors",
        {
          "cursor-pointer hover:bg-gray-100 active:bg-gray-200": !isActive && onClick,
          "font-bold text-white": isActive,
          "text-white": isHighlighted, // Highlight the cell if isHighlighted is true
        },
        className
      )}
      style={{ background: isActive ||  isHighlighted ? useColors.themeRed : undefined ,border:   isHighlighted ? "0.1px solid #e7e6e6a1" : "0.1px solid transparent" }}
    >
      {children}
    </div>
  );
};

export default Cell;
