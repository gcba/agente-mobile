import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BackIcon({color,...props}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={23}
      viewBox="0 0 15 13"
      fill="none"
      {...props}
    >
      <Path
        d="M1.026 5.924L6.982.228A.872.872 0 017.58 0a.87.87 0 01.594.238c.158.151.248.355.25.569a.795.795 0 01-.24.572L3.682 5.687h10.244c.225 0 .442.085.601.238.16.153.25.36.25.575 0 .216-.09.423-.25.576a.871.871 0 01-.601.238H3.68l4.503 4.307c.155.153.24.359.239.572a.797.797 0 01-.25.569.871.871 0 01-.594.238.872.872 0 01-.598-.228L1.025 7.076a.783.783 0 010-1.152h.001z"
        fill={color}
      />
    </Svg>
  )
}

export default BackIcon
