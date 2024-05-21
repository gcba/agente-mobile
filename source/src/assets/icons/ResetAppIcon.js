import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ResetAppIcon(props) {
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
        d="M23.625 6.125H19.25V5.25a2.625 2.625 0 00-2.625-2.625h-5.25A2.625 2.625 0 008.75 5.25v.875H4.375a.875.875 0 000 1.75h.875v15.75A1.75 1.75 0 007 25.375h14a1.75 1.75 0 001.75-1.75V7.875h.875a.875.875 0 100-1.75zM10.5 5.25a.875.875 0 01.875-.875h5.25a.875.875 0 01.875.875v.875h-7V5.25zM21 23.625H7V7.875h14v15.75zM12.25 12.25v7a.875.875 0 11-1.75 0v-7a.875.875 0 111.75 0zm5.25 0v7a.875.875 0 11-1.75 0v-7a.875.875 0 111.75 0z"
        fill="#B94452"
      />
    </Svg>
  )
}

export default ResetAppIcon
