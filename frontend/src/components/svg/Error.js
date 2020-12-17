import * as React from "react";

function Error(props) {
  return (
    <svg className="popup__icon"
      width={120}
      height={120}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M60 117c31.48 0 57-25.52 57-57S91.48 3 60 3 3 28.52 3 60s25.52 57 57 57zm0 3c33.137 0 60-26.863 60-60S93.137 0 60 0 0 26.863 0 60s26.863 60 60 60zm-4.95-59.293L36.666 42.322l5.656-5.657L60.707 55.05l17.678-17.677 5.657 5.656-17.678 17.678 16.97 16.97-5.656 5.657-16.97-16.97-17.679 17.678-5.656-5.657L55.05 60.707z"
        fill="#FD0707"
      />
    </svg>
  );
}

export default Error;