import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BackupIcon({color, ...props}) {
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
        d="M23.625 12.25v10.5a1.75 1.75 0 01-1.75 1.75H6.125a1.75 1.75 0 01-1.75-1.75v-10.5a1.75 1.75 0 011.75-1.75H8.75a.875.875 0 010 1.75H6.125v10.5h15.75v-10.5H19.25a.875.875 0 110-1.75h2.625a1.75 1.75 0 011.75 1.75zm-13.38-4.63l2.88-2.882v10.138a.875.875 0 101.75 0V4.738l2.88 2.882a.876.876 0 001.24-1.238l-4.376-4.375a.876.876 0 00-1.238 0L9.006 6.382a.875.875 0 101.238 1.238z"
        fill={color}
      />
    </Svg>
  )
}

export default BackupIcon
