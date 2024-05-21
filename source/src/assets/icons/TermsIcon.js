import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TermsIcon({color, ...props}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={24}
      viewBox="0 0 20 24"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.365 22.451h16.86V5.403L14.37 1.549H1.365V22.45zM18.499 23H1.09a.274.274 0 01-.274-.274V1.274C.816 1.123.94 1 1.09 1h13.393c.073 0 .143.029.194.08l4.015 4.016c.052.051.08.12.08.194v17.436A.274.274 0 0118.5 23z"
        fill={color}
        stroke={color}
        strokeWidth={0.9}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.96 10.772H4.629a.274.274 0 110-.549h10.333a.274.274 0 010 .549zM14.96 14.282H4.629a.274.274 0 110-.549h10.333a.274.274 0 010 .549zM14.96 17.791H4.629a.274.274 0 010-.548h10.333a.274.274 0 110 .548zM13.22 6.532H6.369a.274.274 0 110-.548h6.85a.274.274 0 110 .548z"
        fill={color}
        stroke={color}
        strokeWidth={0.9}
      />
    </Svg>
  )
}

export default TermsIcon
