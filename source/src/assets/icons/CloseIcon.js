import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function CloseIcon(props) {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={40} height={40} rx={20} fill="#404267" />
      <Path
        d="M15.234 25.4l3.66-5.46-3.555-5.34h2.212l2.46 3.803L22.45 14.6h2.227l-3.555 5.34 3.645 5.46h-2.212l-2.543-3.922-2.55 3.922h-2.227z"
        fill="#fff"
      />
    </Svg>
  )
}

export default CloseIcon
