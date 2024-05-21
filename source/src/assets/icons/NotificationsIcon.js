import * as React from "react"
import Svg, { Path } from "react-native-svg"

function NotificationsIcon(props) {
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
        d="M25.035 19.243c-.607-1.045-1.51-4.004-1.51-7.868a8.75 8.75 0 00-17.5 0c0 3.865-.903 6.823-1.51 7.868a1.75 1.75 0 001.51 2.632h4.464a4.375 4.375 0 008.573 0h4.463a1.75 1.75 0 001.51-2.632zm-10.26 4.382a2.625 2.625 0 01-2.474-1.75h4.949a2.625 2.625 0 01-2.475 1.75zm-8.75-3.5c.843-1.448 1.75-4.804 1.75-8.75a7 7 0 0114 0c0 3.943.906 7.299 1.75 8.75h-17.5z"
        fill={props.color}
      />
    </Svg>
  )
}

export default NotificationsIcon
