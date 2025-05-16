import React from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
  to: string;
  label: string;
  active: boolean;
  onClick?: () => void;
  mobile?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, active, onClick, mobile = false }) => {
  const baseClasses = "transition duration-300";
  
  const desktopClasses = active 
    ? "text-blue-600 font-medium" 
    : "text-gray-700 hover:text-blue-600";
  
  const mobileClasses = "block w-full px-4 py-2 text-left hover:bg-gray-100";
  const mobileActiveClasses = active 
    ? "text-blue-600 font-medium" 
    : "text-gray-700 hover:text-blue-600";

  const classes = mobile 
    ? `${baseClasses} ${mobileClasses} ${mobileActiveClasses}` 
    : `${baseClasses} ${desktopClasses}`;

  return (
    <Link 
      to={to} 
      className={classes}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default NavItem;