import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowAccordion({color, ...props}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <Path
        d="M3.292 8.292a1 1 0 011.415 0l9.292 9.294 9.293-9.294a1 1 0 011.415 1.415l-10 10a1 1 0 01-1.415 0l-10-10a1 1 0 010-1.415z"
        fill={color}
      />
    </Svg>
  )
}

export default ArrowAccordion
