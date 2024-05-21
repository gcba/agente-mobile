import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ScanIcon(props) {
  return (
    <Svg
      width={29}
      height={28}
      viewBox="0 0 29 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M25.275 4.375V8.75a.875.875 0 01-1.75 0v-3.5h-3.5a.875.875 0 110-1.75H24.4a.875.875 0 01.875.875zM9.525 22.75h-3.5v-3.5a.875.875 0 10-1.75 0v4.375a.875.875 0 00.875.875h4.375a.875.875 0 000-1.75zM24.4 18.375a.875.875 0 00-.875.875v3.5h-3.5a.875.875 0 100 1.75H24.4a.875.875 0 00.875-.875V19.25a.875.875 0 00-.875-.875zM5.15 9.625a.875.875 0 00.875-.875v-3.5h3.5a.875.875 0 000-1.75H5.15a.875.875 0 00-.875.875V8.75a.875.875 0 00.875.875zm14 10.5H10.4a1.75 1.75 0 01-1.75-1.75v-8.75a1.75 1.75 0 011.75-1.75h8.75a1.75 1.75 0 011.75 1.75v8.75a1.75 1.75 0 01-1.75 1.75zm-8.75-1.75h8.75v-8.75H10.4v8.75z"
        fill={props.color}
      />
    </Svg>
  )
}

export default ScanIcon