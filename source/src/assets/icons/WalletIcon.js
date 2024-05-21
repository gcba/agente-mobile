import * as React from "react"
import Svg, { Path } from "react-native-svg"

function WalletIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={23}
      height={20}
      viewBox="0 0 23 20"
      fill="none"
      {...props}
    >
      <Path
        d="M20.625 3.875h-17.5a.875.875 0 010-1.75H18a.875.875 0 100-1.75H3.125A2.625 2.625 0 00.5 3v14a2.625 2.625 0 002.625 2.625h17.5a1.75 1.75 0 001.75-1.75V5.625a1.75 1.75 0 00-1.75-1.75zm0 14h-17.5A.875.875 0 012.25 17V5.475c.281.1.577.15.875.15h17.5v12.25zm-5.25-6.563a1.313 1.313 0 112.626 0 1.313 1.313 0 01-2.626 0z"
        fill={props.color}
      />
    </Svg>
  )
}

export default WalletIcon
