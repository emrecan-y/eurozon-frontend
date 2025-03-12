import { MouseEventHandler } from "react";

type SvgLoaderProps = {
  svg: "user" | "x" | "burger-menu" | "search" | "shopping-cart";
  className: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
};

function SvgLoader({ svg, className, onClick }: SvgLoaderProps) {
  switch (svg) {
    case "user":
      return (
        <svg
          className={className}
          onClick={onClick}
          width="800px"
          height="800px"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <g>
            <path
              fillRule="evenodd"
              d="M8 1a4 4 0 100 8 4 4 0 000-8zM5.5 5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z"
              clipRule="evenodd"
            />
            <path d="M5.25 10a3.75 3.75 0 00-3.75 3.75v.5a.75.75 0 001.5 0v-.5a2.25 2.25 0 012.25-2.25h5.5A2.25 2.25 0 0113 13.75v.5a.75.75 0 001.5 0v-.5A3.75 3.75 0 0010.75 10h-5.5z" />
          </g>
        </svg>
      );
    case "x":
      return (
        <svg
          className={className}
          onClick={onClick}
          fill="currentColor"
          width="800px"
          height="800px"
          viewBox="0 0 56 56"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 13.0117 40.0117 C 12.2148 40.8086 12.1914 42.1680 13.0117 42.9883 C 13.8086 43.8086 15.1680 43.7851 15.9883 42.9883 L 27.9883 30.9648 L 40.0117 42.9883 C 40.8086 43.7851 42.1680 43.8086 42.9648 42.9883 C 43.8086 42.1680 43.7851 40.8086 42.9648 40.0117 L 30.9648 27.9883 L 42.9648 15.9883 C 43.7851 15.1914 43.8086 13.8086 42.9648 13.0117 C 42.1680 12.1914 40.8086 12.2148 40.0117 13.0117 L 27.9883 25.0352 L 15.9883 13.0117 C 15.1680 12.2148 13.8086 12.1914 13.0117 13.0117 C 12.1914 13.8086 12.2148 15.1914 13.0117 15.9883 L 25.0117 27.9883 Z" />
        </svg>
      );
    case "burger-menu":
      return (
        <svg
          className={className}
          onClick={onClick}
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 18L20 18" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 12L20 12" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 6L20 6" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "search":
      return (
        <svg
          className={className}
          onClick={onClick}
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "shopping-cart":
      return (
        <svg
          className={className}
          onClick={onClick}
          width="800px"
          height="800px"
          viewBox="0 0 512 512"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <g transform="translate(42.666667, 85.333333)">
            <path d="M7.10542736e-15,-1.42108547e-14 L70.3622093,-1.42108547e-14 L89.7493333,85.3333333 L378.389061,85.3333333 L337.246204,277.333333 L89.6377907,277.333333 L36.288,42.6666667 L7.10542736e-15,42.6666667 L7.10542736e-15,-1.42108547e-14 Z M325.610667,128 L99.456,128 L123.690667,234.666667 L302.741333,234.666667 L325.610667,128 Z M138.666667,384 C156.339779,384 170.666667,369.673112 170.666667,352 C170.666667,334.326888 156.339779,320 138.666667,320 C120.993555,320 106.666667,334.326888 106.666667,352 C106.666667,369.673112 120.993555,384 138.666667,384 Z M288,384 C305.673112,384 320,369.673112 320,352 C320,334.326888 305.673112,320 288,320 C270.326888,320 256,334.326888 256,352 C256,369.673112 270.326888,384 288,384 Z"></path>
          </g>
        </svg>
      );
  }
}

export default SvgLoader;
