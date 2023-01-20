const MenuIcon = ({ size = "icon", fill = "icon-fill" }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' className={`${size} ${fill}`} viewBox='0 0 20 20' fill='currentColor'>
      <path
        fillRule='evenodd'
        d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
        clipRule='evenodd'
      />
    </svg>
  );
};

export default MenuIcon;