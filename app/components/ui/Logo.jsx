const Logo = ({ size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="4"
        width="32"
        height="32"
        rx="8"
        fill="#3B82F6"
        className="animate-pulse"
      />
      <text
        x="20"
        y="28"
        fontSize="24"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
        fontFamily="monospace"
      >
        ×
      </text>
    </svg>
  );
};

export default Logo;
