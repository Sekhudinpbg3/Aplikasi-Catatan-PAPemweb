const SadIcon = ({ size = "icon", stroke = "icon-stroke", strokeWidth }) => {
  return (
    <svg className={`fill-transparent ${size} ${stroke}`} viewBox='0 0 24 24' strokeWidth={`${strokeWidth}`}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  );
};

export default SadIcon;
