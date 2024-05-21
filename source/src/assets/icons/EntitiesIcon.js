import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EntitiesIcon(props) {
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
        d="M27.025 22.75h-1.75V10.5a1.75 1.75 0 00-1.75-1.75h-7V3.5a1.75 1.75 0 00-2.72-1.457l-8.75 5.832a1.75 1.75 0 00-.78 1.46V22.75h-1.75a.875.875 0 000 1.75h24.5a.875.875 0 100-1.75zm-3.5-12.25v12.25h-7V10.5h7zm-17.5-1.166l8.75-5.834v19.25h-8.75V9.334zm7 2.916V14a.875.875 0 11-1.75 0v-1.75a.875.875 0 011.75 0zm-3.5 0V14a.875.875 0 11-1.75 0v-1.75a.875.875 0 011.75 0zm0 6.125v1.75a.875.875 0 11-1.75 0v-1.75a.875.875 0 011.75 0zm3.5 0v1.75a.875.875 0 11-1.75 0v-1.75a.875.875 0 011.75 0z"
        fill={props.color}
      />
    </Svg>
  )
}

export default EntitiesIcon
