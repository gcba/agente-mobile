import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ShareDIDIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={178}
      height={150}
      viewBox="0 0 178 150"
      fill="none"
      {...props}
    >
      <Path
        d="M86 150c41.421 0 75-33.579 75-75S127.421 0 86 0 11 33.579 11 75s33.579 75 75 75z"
        fill="#fff"
      />
      <Path
        d="M46.71 129.893l-24.587-45.82 142.361-49.246L46.71 129.893z"
        fill="#F3F6F9"
        stroke="#404267"
        strokeWidth={0.96561}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M32.962 88.874l13.747 41.019 117.774-95.066L32.962 88.874z"
        fill="#7BD1E0"
        stroke="#404267"
        strokeWidth={0.96561}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M32.962 88.874l24.702 17.432 106.819-71.479-131.52 54.047zM22.122 84.073L1 77.698l163.483-42.871L22.122 84.073z"
        fill="#fff"
        stroke="#404267"
        strokeWidth={0.96561}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ShareDIDIcon
