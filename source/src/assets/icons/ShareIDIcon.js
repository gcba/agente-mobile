import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ShareIDIcon({color, ...props}) {
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
        d="M19.25 17.5a4.362 4.362 0 00-3.13 1.322l-5.043-3.24a4.353 4.353 0 000-3.164l5.042-3.24a4.375 4.375 0 10-.947-1.471l-5.042 3.24a4.375 4.375 0 100 6.106l5.042 3.24A4.375 4.375 0 1019.25 17.5zm0-14a2.625 2.625 0 110 5.25 2.625 2.625 0 010-5.25zM7 16.625a2.625 2.625 0 110-5.25 2.625 2.625 0 010 5.25zM19.25 24.5a2.625 2.625 0 110-5.25 2.625 2.625 0 010 5.25z"
        fill={color}
      />
    </Svg>
  )
}

export default ShareIDIcon
