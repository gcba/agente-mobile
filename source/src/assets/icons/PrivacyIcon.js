import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function PrivacyIcon({color, ...props}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_463_22313)" fill={color}>
        <Path d="M11.027 1.659c2.523.835 5.112 1.818 7.325 2.677.154 1.008.365 2.736.406 4.825.035 2.38-.162 3.692-.249 4.15-.182.63-.566 1.315-1.139 2.035-.68.854-1.605 1.74-2.75 2.637-.002 0-.002.001-.003.002a24.566 24.566 0 01-3.59 2.338 24.465 24.465 0 01-3.587-2.335l-.002-.002c-1.145-.896-2.07-1.783-2.748-2.635-.545-.685-.918-1.338-1.11-1.942l-.017-.06C3.477 13.056 3.2 11.885 3.242 9c.046-1.837.214-3.478.477-4.676 2.207-.855 4.788-1.834 7.309-2.667m0-1.655c-.13 0-.26.021-.386.063C8.172.878 5.638 1.83 3.06 2.829a1.715 1.715 0 00-.827.686c.015.002-.53 1.701-.622 5.454-.055 3.754.412 4.879.397 4.88.253.825.726 1.664 1.405 2.517.758.953 1.783 1.938 3.02 2.905 2.05 1.609 3.968 2.57 4.048 2.604a1.23 1.23 0 001.096 0c.081-.035 2.001-1 4.05-2.607 1.238-.969 2.263-1.953 3.022-2.905.727-.915 1.218-1.811 1.456-2.692-.01-.001.334-1.38.286-4.538-.06-3.159-.5-5.488-.494-5.49a1.716 1.716 0 00-.897-.808c-2.578-1-5.113-1.954-7.585-2.768a1.234 1.234 0 00-.386-.063z" />
        <Path d="M11.026 15.17c-.47 0-.913-.182-1.246-.515a1.751 1.751 0 01-.516-1.246v-1.377a2.87 2.87 0 01-1.151-2.307A2.891 2.891 0 0111 6.837c.77 0 1.496.3 2.041.846a2.87 2.87 0 01.846 2.042c0 .895-.41 1.725-1.099 2.267v1.417c0 .47-.183.913-.516 1.246a1.753 1.753 0 01-1.246.516zM11 8.47a1.256 1.256 0 00-.557 2.379.816.816 0 01.453.73v1.83a.13.13 0 00.221.091.128.128 0 00.038-.091v-1.855c0-.302.167-.579.433-.72a1.253 1.253 0 00.299-1.997A1.248 1.248 0 0011 8.47z" />
      </G>
      <Defs>
        <ClipPath id="clip0_463_22313">
          <Path fill="#fff" d="M0 0H22V22H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default PrivacyIcon