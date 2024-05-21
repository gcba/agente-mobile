import * as React from "react"
import Svg, { Path, Circle, G, Defs, ClipPath } from "react-native-svg"

function ResetAppBigIcon(props) {
  return (
    <Svg
      width={150}
      height={150}
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M75 150c41.421 0 75-33.579 75-75S116.421 0 75 0 0 33.579 0 75s33.579 75 75 75z"
        fill="#fff"
      />
      <Path
        d="M27.737 43.666a.3.3 0 00-.5-.332l.5.332zm15.469-16.238a.3.3 0 00.235.353l2.646.534a.3.3 0 00.119-.588l-2.353-.474.475-2.353a.3.3 0 10-.588-.119l-.534 2.647zM26.23 44.903a.3.3 0 10.51.316l-.51-.316zm-1.752 4.332a.3.3 0 00-.535-.273l.535.273zm-2.121 3.1a.3.3 0 10.55.237l-.55-.237zm-1.1 4.541a.3.3 0 10-.568-.192l.568.192zm-1.643 3.378a.3.3 0 00.58.154l-.58-.154zm-.42 4.654a.3.3 0 00-.59-.106l.59.106zm-1.13 3.582a.3.3 0 10.597.068l-.596-.068zm.264 4.665a.3.3 0 10-.6-.019l.6.02zm-.595 3.849a.3.3 0 10.6-.021l-.6.02zm.983 4.91a.3.3 0 00-.595.073l.595-.072zm.026 4.024a.3.3 0 00.589-.114l-.59.114zm1.74 4.697a.3.3 0 10-.577.165l.577-.165zm.658 3.968a.3.3 0 10.564-.205l-.564.205zm2.459 4.365a.3.3 0 10-.544.254l.544-.254zm1.275 3.816a.3.3 0 00.525-.291l-.525.291zm3.113 3.924a.3.3 0 00-.497.336l.497-.336zm1.857 3.571a.3.3 0 00.472-.37l-.472.37zm3.687 3.39a.3.3 0 00-.439.41l.439-.41zm2.39 3.238a.3.3 0 00.409-.439l-.41.439zm4.169 2.776a.3.3 0 00-.37.472l.37-.472zm2.865 2.826a.3.3 0 10.336-.497l-.336.497zm4.55 2.091a.3.3 0 00-.29.525l.29-.525zm3.272 2.344a.3.3 0 00.254-.544l-.254.544zm4.824 1.351a.3.3 0 00-.205.564l.205-.564zm3.598 1.799a.3.3 0 00.165-.577l-.165.577zm4.976.574a.3.3 0 00-.114.589l.114-.589zm3.837 1.21a.3.3 0 10.072-.595l-.072.595zm5.004-.212a.3.3 0 10-.02.6l.02-.6zm3.987.6a.3.3 0 00-.021-.6l.02.6zm4.91-.983a.3.3 0 10.073.595l-.072-.595zm4.024-.026a.3.3 0 10-.114-.589l.114.589zm4.697-1.74a.3.3 0 00.165.577l-.165-.577zm3.968-.658a.3.3 0 00-.205-.564l.205.564zm4.365-2.459a.3.3 0 00.254.544l-.254-.544zm3.816-1.275a.3.3 0 00-.291-.525l.291.525zm3.924-3.113a.3.3 0 00.336.497l-.336-.497zm3.571-1.857a.3.3 0 00-.37-.472l.37.472zm3.39-3.687a.3.3 0 00.41.439l-.41-.439zm3.238-2.389a.3.3 0 00-.439-.41l.439.41zm2.776-4.17a.3.3 0 00.472.37l-.472-.37zm2.826-2.865a.3.3 0 00-.497-.336l.497.336zm2.091-4.551a.3.3 0 00.525.291l-.525-.291zm2.344-3.27a.3.3 0 00-.544-.255l.544.254zm1.351-4.825a.3.3 0 00.564.205l-.564-.205zm1.799-3.598a.3.3 0 00-.577-.165l.577.165zm.574-4.976a.3.3 0 00.589.114l-.589-.114zm1.21-3.837a.3.3 0 10-.595-.072l.595.072zm-.212-5.004a.3.3 0 10.6.02l-.6-.02zm.6-3.987a.3.3 0 00-.6.021l.6-.02zm-.983-4.91a.3.3 0 10.595-.073l-.595.072zm-.026-4.024a.3.3 0 10-.589.114l.589-.114zm-1.74-4.697a.3.3 0 00.577-.165l-.577.165zm-.658-3.968a.3.3 0 00-.564.205l.564-.205zm-2.459-4.365a.3.3 0 00.544-.254l-.544.254zm-1.275-3.816a.3.3 0 00-.525.29l.525-.29zm-3.113-3.924a.3.3 0 10.497-.336l-.497.336zm-1.857-3.57a.3.3 0 10-.472.369l.472-.37zm-3.687-3.391a.3.3 0 00.439-.41l-.439.41zm-2.389-3.238a.3.3 0 00-.41.439l.41-.439zm-4.17-2.776a.3.3 0 10.37-.472l-.37.472zm-2.865-2.826a.3.3 0 10-.336.497l.336-.497zm-4.551-2.091a.3.3 0 10.291-.525l-.291.525zm-3.27-2.344a.3.3 0 10-.255.544l.254-.544zm-4.825-1.351a.3.3 0 10.205-.564l-.205.564zM90.8 19.906a.3.3 0 00-.165.577l.165-.577zm-4.976-.574a.3.3 0 00.114-.59l-.114.59zm-3.837-1.21a.3.3 0 10-.072.595l.072-.595zm-5.004.212a.3.3 0 00.02-.6l-.02.6zm-3.847-.604a.3.3 0 00.02.6l-.02-.6zm-4.578.932a.3.3 0 00-.068-.596l.068.596zm-3.757-.057a.3.3 0 00.107.59l-.106-.59zm-4.393 1.59a.3.3 0 00-.154-.58l.154.58zm-3.724.495a.3.3 0 00.192.568l-.192-.568zm-4.112 2.218a.3.3 0 00-.237-.55l.237.55zm-3.61 1.036a.3.3 0 00.273.535l-.273-.535zm-3.743 2.798a.3.3 0 10-.316-.51l.316.51zM27.237 43.334a57.38 57.38 0 00-1.005 1.569l.51.316c.323-.524.655-1.041.995-1.553l-.5-.332zm-3.293 5.628a57.004 57.004 0 00-1.586 3.373l.55.237a56.43 56.43 0 011.57-3.337l-.534-.273zm-3.254 7.722a56.847 56.847 0 00-1.075 3.57l.58.154c.317-1.193.672-2.371 1.063-3.532l-.568-.192zm-2.085 8.118a57.246 57.246 0 00-.54 3.688l.597.068c.139-1.23.317-2.447.534-3.65l-.591-.106zm-.875 8.334c-.02.619-.03 1.24-.03 1.864h.6c0-.617.01-1.232.03-1.845l-.6-.019zM17.7 75c0 .67.012 1.338.034 2.004l.6-.021A57.77 57.77 0 0118.3 75h-.6zm.422 6.987c.162 1.332.37 2.649.62 3.95l.59-.113a56.559 56.559 0 01-.615-3.91l-.595.073zm1.784 8.813c.369 1.287.78 2.555 1.235 3.803l.564-.205a56.254 56.254 0 01-1.222-3.763l-.577.165zm3.15 8.422a57.054 57.054 0 001.82 3.562l.524-.291a56.38 56.38 0 01-1.8-3.525l-.544.254zm4.435 7.822a57.506 57.506 0 002.354 3.235l.472-.37a56.653 56.653 0 01-2.329-3.201l-.497.336zm5.602 7.035c.91.975 1.853 1.918 2.828 2.828l.41-.439a56.963 56.963 0 01-2.8-2.799l-.438.41zm6.628 6.076a57.72 57.72 0 003.235 2.354l.336-.497a57.159 57.159 0 01-3.201-2.329l-.37.472zm7.495 4.97a57.343 57.343 0 003.562 1.819l.254-.544a56.282 56.282 0 01-3.525-1.8l-.291.525zm8.18 3.734c1.249.454 2.517.866 3.804 1.235l.165-.577a55.74 55.74 0 01-3.763-1.222l-.205.564zm8.666 2.398c1.302.252 2.62.459 3.95.621l.073-.595a57.048 57.048 0 01-3.909-.615l-.114.589zm8.934 1.009c.666.022 1.333.034 2.004.034v-.6a56.77 56.77 0 01-1.983-.034l-.02.6zM75 132.3c.67 0 1.338-.012 2.004-.034l-.021-.6A56.77 56.77 0 0175 131.7v.6zm6.987-.422a57.015 57.015 0 003.95-.621l-.113-.589a57.048 57.048 0 01-3.91.615l.073.595zm8.813-1.784a57.444 57.444 0 003.803-1.235l-.205-.564a55.74 55.74 0 01-3.763 1.222l.165.577zm8.422-3.15a57.33 57.33 0 003.562-1.819l-.291-.525a56.17 56.17 0 01-3.525 1.8l.254.544zm7.822-4.435a57.658 57.658 0 003.235-2.354l-.37-.472a56.946 56.946 0 01-3.201 2.329l.336.497zm7.035-5.602a58.019 58.019 0 002.828-2.828l-.439-.41c-.9.965-1.834 1.899-2.799 2.799l.41.439zm6.076-6.628a57.658 57.658 0 002.354-3.235l-.497-.336a56.946 56.946 0 01-2.329 3.201l.472.37zm4.97-7.495a57.33 57.33 0 001.819-3.562l-.544-.254a56.17 56.17 0 01-1.8 3.525l.525.291zm3.734-8.18a57.444 57.444 0 001.235-3.804l-.577-.165a55.74 55.74 0 01-1.222 3.763l.564.205zm2.398-8.666c.252-1.302.459-2.62.621-3.95l-.595-.073a57.048 57.048 0 01-.615 3.909l.589.114zm1.009-8.934c.022-.666.034-1.333.034-2.004h-.6c0 .664-.011 1.325-.034 1.983l.6.02zM132.3 75c0-.67-.012-1.338-.034-2.004l-.6.021c.023.658.034 1.32.034 1.983h.6zm-.422-6.987a57.015 57.015 0 00-.621-3.95l-.589.113c.249 1.288.454 2.592.615 3.91l.595-.073zm-1.784-8.813a57.444 57.444 0 00-1.235-3.803l-.564.205a55.74 55.74 0 011.222 3.763l.577-.165zm-3.15-8.422a57.313 57.313 0 00-1.819-3.562l-.525.29a56.282 56.282 0 011.8 3.526l.544-.254zm-4.435-7.822a57.681 57.681 0 00-2.354-3.235l-.472.37a57.159 57.159 0 012.329 3.2l.497-.335zm-5.602-7.035a57.845 57.845 0 00-2.828-2.828l-.41.439c.965.9 1.899 1.834 2.799 2.799l.439-.41zm-6.628-6.076a57.506 57.506 0 00-3.235-2.354l-.336.497a56.602 56.602 0 013.201 2.33l.37-.473zm-7.495-4.97a57.108 57.108 0 00-3.562-1.819l-.254.544a56.38 56.38 0 013.525 1.8l.291-.525zm-8.18-3.734a56.861 56.861 0 00-3.804-1.235l-.165.577c1.273.364 2.528.772 3.763 1.222l.205-.564zm-8.666-2.398a57.135 57.135 0 00-3.95-.621l-.073.595c1.317.16 2.62.366 3.909.615l.114-.59zm-8.934-1.009A58.218 58.218 0 0075 17.7v.6c.664 0 1.325.011 1.983.034l.02-.6zM75 17.7c-.624 0-1.245.01-1.864.03l.02.6c.612-.02 1.227-.03 1.844-.03v-.6zm-6.51.366c-1.242.14-2.472.32-3.688.539l.106.59a56.555 56.555 0 013.65-.533l-.068-.596zm-8.236 1.55c-1.206.32-2.396.678-3.57 1.074l.192.568a56.174 56.174 0 013.532-1.063l-.154-.58zm-7.92 2.742a57.004 57.004 0 00-3.372 1.586l.273.535a56.43 56.43 0 013.337-1.57l-.237-.551zm-7.431 3.873a57.38 57.38 0 00-1.569 1.006l.332.5a57.05 57.05 0 011.553-.995l-.316-.51zM27.987 43.832a.6.6 0 10-1-.664l1 .664zm14.925-16.463a.6.6 0 00.47.707l5.293 1.067a.6.6 0 00.237-1.176l-4.705-.95.949-4.704a.6.6 0 10-1.176-.238l-1.068 5.294zM25.976 44.745a.6.6 0 101.02.631l-1.02-.63zm-1.23 4.626a.6.6 0 00-1.069-.546l1.069.546zm-2.664 2.845a.6.6 0 101.102.475l-1.102-.475zm-.54 4.756a.6.6 0 00-1.137-.383l1.138.383zm-2.217 3.205a.6.6 0 001.16.308l-1.16-.308zm.166 4.784a.6.6 0 10-1.181-.212l1.18.212zm-1.723 3.495a.6.6 0 101.192.135l-1.192-.135zm.861 4.709a.6.6 0 00-1.2-.039l1.2.039zm-1.195 3.849a.6.6 0 001.2-.041l-1.2.04zm1.581 4.865a.6.6 0 10-1.191.144l1.191-.144zm-.567 4.116a.6.6 0 101.178-.228l-1.178.228zm2.323 4.558a.6.6 0 10-1.153.33l1.154-.33zm.088 4.153a.6.6 0 101.128-.41l-1.128.41zm3.013 4.135a.6.6 0 10-1.087.508l1.087-.508zm.74 4.089a.6.6 0 101.05-.583l-1.05.583zm3.625 3.61a.6.6 0 00-.995.672l.995-.672zm1.372 3.924a.599.599 0 10.945-.74l-.945.74zm4.142 3.001a.6.6 0 10-.877.818l.877-.818zm1.966 3.661a.6.6 0 00.818-.877l-.818.877zm4.559 2.32a.6.6 0 00-.74.945l.74-.945zm2.512 3.312a.6.6 0 00.672-.995l-.672.995zm4.865 1.58a.6.6 0 00-.583 1.049l.583-1.049zm2.998 2.877a.6.6 0 10.508-1.087l-.508 1.087zm5.054.798a.6.6 0 00-.41 1.128l.41-1.128zm3.412 2.369a.6.6 0 00.33-1.153l-.33 1.153zm5.116-.008a.6.6 0 10-.228 1.178l.228-1.178zm3.743 1.802a.6.6 0 10.145-1.191l-.144 1.191zm5.052-.81a.6.6 0 00-.042 1.199l.041-1.199zm3.986 1.199a.6.6 0 10-.041-1.199l.04 1.199zm4.865-1.58a.6.6 0 10.144 1.191l-.144-1.191zm4.116.567a.6.6 0 00-.228-1.178l.228 1.178zm4.558-2.323a.6.6 0 10.33 1.153l-.33-1.153zm4.153-.088a.6.6 0 00-.41-1.128l.41 1.128zm4.135-3.013a.6.6 0 10.508 1.087l-.508-1.087zm4.089-.741a.6.6 0 10-.583-1.049l.583 1.049zm3.61-3.624a.601.601 0 00.672.995l-.672-.995zm3.924-1.372a.6.6 0 00-.74-.945l.74.945zm3.001-4.142a.6.6 0 10.818.877l-.818-.877zm3.661-1.966a.6.6 0 10-.877-.818l.877.818zm2.32-4.559a.6.6 0 00.945.74l-.945-.74zm3.312-2.512a.6.6 0 00-.995-.672l.995.672zm1.58-4.865a.6.6 0 001.049.583l-1.049-.583zm2.877-2.998a.6.6 0 10-1.087-.508l1.087.508zm.798-5.054a.6.6 0 001.128.41l-1.128-.41zm2.369-3.412a.6.6 0 00-1.153-.33l1.153.33zm-.008-5.116a.6.6 0 101.178.228l-1.178-.228zm1.802-3.743a.6.6 0 10-1.191-.145l1.191.144zm-.81-5.052a.6.6 0 001.199.042l-1.199-.041zm1.199-3.986a.6.6 0 10-1.199.041l1.199-.04zm-1.58-4.865a.6.6 0 101.191-.144l-1.191.144zm.567-4.116a.6.6 0 00-1.178.228l1.178-.228zm-2.323-4.558a.6.6 0 101.153-.33l-1.153.33zm-.088-4.153a.6.6 0 00-1.128.41l1.128-.41zm-3.013-4.135a.6.6 0 101.087-.508l-1.087.508zm-.741-4.09a.6.6 0 10-1.049.584l1.049-.583zm-3.624-3.61a.6.6 0 00.995-.671l-.995.672zm-1.372-3.923a.6.6 0 10-.945.74l.945-.74zm-4.142-3a.6.6 0 10.877-.82l-.877.82zm-1.966-3.662a.6.6 0 10-.818.877l.818-.877zm-4.559-2.32a.6.6 0 00.74-.945l-.74.945zm-2.512-3.312a.6.6 0 00-.672.995l.672-.995zm-4.865-1.58a.6.6 0 10.583-1.05l-.583 1.05zm-2.998-2.877a.6.6 0 00-.508 1.087l.508-1.087zm-5.054-.798a.6.6 0 00.41-1.128l-.41 1.128zm-3.412-2.37a.6.6 0 10-.33 1.154l.33-1.153zm-5.116.01a.6.6 0 10.228-1.179l-.228 1.178zm-3.743-1.803a.6.6 0 10-.145 1.191l.144-1.191zm-5.052.81a.6.6 0 10.042-1.2l-.041 1.2zm-3.846-1.204a.6.6 0 00.039 1.2l-.039-1.2zm-4.535 1.53a.6.6 0 00-.135-1.192l.135 1.192zm-3.842-.65a.6.6 0 10.212 1.18l-.212-1.18zm-4.264 2.175a.6.6 0 10-.308-1.16l.308 1.16zm-3.896-.08a.6.6 0 10.383 1.138l-.383-1.137zm-3.898 2.779a.6.6 0 10-.475-1.102l.475 1.102zm-3.866.493a.6.6 0 10.546 1.069l-.546-1.069zm-3.449 3.32a.6.6 0 10-.63-1.02l.63 1.02zM26.988 43.168a57.68 57.68 0 00-1.012 1.577l1.02.631c.323-.52.653-1.035.991-1.544l-1-.664zm-3.31 5.657a57.29 57.29 0 00-1.596 3.39l1.102.476a56.145 56.145 0 011.562-3.32l-1.069-.546zm-3.273 7.764a57.14 57.14 0 00-1.08 3.588l1.16.308a55.95 55.95 0 011.058-3.513l-1.137-.383zm-2.095 8.16c-.22 1.223-.401 2.459-.542 3.707l1.192.135c.138-1.222.316-2.433.53-3.63l-1.18-.212zm-.88 8.377A58.6 58.6 0 0017.4 75h1.2c0-.614.01-1.226.03-1.835l-1.2-.039zM17.4 75c0 .674.012 1.345.035 2.014l1.199-.041A57.43 57.43 0 0118.6 75h-1.2zm.424 7.023c.163 1.339.371 2.663.624 3.972l1.178-.228a56.272 56.272 0 01-.61-3.888l-1.192.144zm1.794 8.86c.37 1.293.784 2.568 1.241 3.823l1.128-.41a55.904 55.904 0 01-1.215-3.743l-1.154.33zm3.167 8.466a57.22 57.22 0 001.828 3.581l1.049-.583a56.045 56.045 0 01-1.79-3.506l-1.087.508zm4.457 7.863a57.809 57.809 0 002.367 3.252l.945-.74a56.564 56.564 0 01-2.317-3.184l-.995.672zm5.632 7.071a57.88 57.88 0 002.843 2.843l.818-.877a56.886 56.886 0 01-2.784-2.784l-.877.818zm6.662 6.108a57.72 57.72 0 003.252 2.367l.672-.995a56.246 56.246 0 01-3.184-2.317l-.74.945zm7.534 4.996c1.17.65 2.363 1.26 3.58 1.828l.509-1.087a56.304 56.304 0 01-3.506-1.79l-.583 1.049zm8.224 3.754c1.255.457 2.53.871 3.823 1.241l.33-1.153a56.315 56.315 0 01-3.742-1.216l-.41 1.128zm8.711 2.411c1.309.253 2.633.461 3.972.624l.144-1.191a57.07 57.07 0 01-3.888-.611l-.228 1.178zm8.981 1.013c.669.023 1.34.035 2.014.035v-1.2c-.66 0-1.318-.011-1.972-.034l-.042 1.199zM75 132.6c.674 0 1.345-.012 2.014-.035l-.041-1.199c-.655.023-1.313.034-1.973.034v1.2zm7.023-.424a57.594 57.594 0 003.972-.624l-.228-1.178a57.07 57.07 0 01-3.888.611l.144 1.191zm8.86-1.794a56.826 56.826 0 003.823-1.241l-.41-1.128a56.315 56.315 0 01-3.743 1.216l.33 1.153zm8.466-3.167a56.576 56.576 0 003.581-1.828l-.583-1.049a56.1 56.1 0 01-3.506 1.79l.508 1.087zm7.863-4.457a57.772 57.772 0 003.252-2.367l-.74-.945a56.214 56.214 0 01-3.184 2.317l.672.995zm7.071-5.632a57.748 57.748 0 002.843-2.843l-.877-.818a57.106 57.106 0 01-2.784 2.784l.818.877zm6.108-6.662a57.772 57.772 0 002.367-3.252l-.995-.672a56.214 56.214 0 01-2.317 3.184l.945.74zm4.996-7.534a56.576 56.576 0 001.828-3.58l-1.087-.509a56.1 56.1 0 01-1.79 3.506l1.049.583zm3.754-8.224c.457-1.255.871-2.53 1.241-3.823l-1.153-.33a56.315 56.315 0 01-1.216 3.742l1.128.41zm2.411-8.711c.253-1.309.461-2.633.624-3.972l-1.191-.144a57.07 57.07 0 01-.611 3.888l1.178.228zm1.013-8.981c.023-.669.035-1.34.035-2.014h-1.2c0 .66-.011 1.318-.034 1.972l1.199.042zM132.6 75c0-.674-.012-1.345-.035-2.014l-1.199.041c.023.655.034 1.313.034 1.973h1.2zm-.424-7.023a57.594 57.594 0 00-.624-3.972l-1.178.228a57.07 57.07 0 01.611 3.888l1.191-.144zm-1.794-8.86a56.826 56.826 0 00-1.241-3.823l-1.128.41a56.315 56.315 0 011.216 3.743l1.153-.33zm-3.167-8.466a56.768 56.768 0 00-1.828-3.581l-1.049.583a56.304 56.304 0 011.79 3.506l1.087-.508zm-4.457-7.863a57.72 57.72 0 00-2.367-3.252l-.945.74a56.246 56.246 0 012.317 3.184l.995-.672zm-5.632-7.071a57.88 57.88 0 00-2.843-2.843l-.818.877a56.93 56.93 0 012.784 2.784l.877-.818zm-6.662-6.108a57.859 57.859 0 00-3.252-2.367l-.672.995a56.564 56.564 0 013.184 2.317l.74-.945zm-7.534-4.996a57.22 57.22 0 00-3.58-1.828l-.509 1.087a56.045 56.045 0 013.506 1.79l.583-1.05zm-8.224-3.754a57.172 57.172 0 00-3.823-1.241l-.33 1.154c1.266.362 2.514.768 3.742 1.215l.41-1.128zm-8.711-2.41a57.473 57.473 0 00-3.972-.625l-.144 1.191c1.31.16 2.607.364 3.888.611l.228-1.178zm-8.981-1.015A58.819 58.819 0 0075 17.4v1.2c.66 0 1.318.011 1.972.034l.042-1.2zM75 17.4a58.6 58.6 0 00-1.874.03l.039 1.2c.61-.02 1.22-.03 1.835-.03v-1.2zm-6.544.368a57.482 57.482 0 00-3.707.542l.212 1.18a56.233 56.233 0 013.63-.53l-.135-1.192zm-8.28 1.557a57.14 57.14 0 00-3.587 1.08l.383 1.138a55.95 55.95 0 013.513-1.058l-.308-1.16zm-7.96 2.757a57.29 57.29 0 00-3.39 1.595l.545 1.069a56.145 56.145 0 013.32-1.562l-.475-1.102zm-7.47 3.894a57.68 57.68 0 00-1.578 1.012l.664 1c.51-.34 1.024-.67 1.544-.991l-.63-1.02z"
        fill="#404267"
      />
      <Path
        d="M43.01 27.389a.5.5 0 00.391.588l4.411.89a.5.5 0 00.198-.98l-3.921-.79.79-3.922a.5.5 0 00-.98-.198l-.89 4.412zM75 18.5a.5.5 0 000-1v1zm-31.223 9.404C52.72 21.962 63.456 18.5 75 18.5v-1c-11.747 0-22.673 3.523-31.777 9.57l.554.834z"
        fill="#404267"
      />
      <Circle cx={75} cy={75} r={36} fill="#F3F6F9" stroke="#404267" />
      <G clipPath="url(#clip0_13_4678)">
        <G clipPath="url(#clip1_13_4678)">
          <Path
            d="M84.625 67.125H80.25v-.875a2.625 2.625 0 00-2.625-2.625h-5.25a2.625 2.625 0 00-2.625 2.625v.875h-4.375a.875.875 0 100 1.75h.875v15.75a1.75 1.75 0 001.75 1.75h14a1.75 1.75 0 001.75-1.75v-15.75h.875a.875.875 0 100-1.75zM71.5 66.25a.875.875 0 01.875-.875h5.25a.875.875 0 01.875.875v.875h-7v-.875zM82 84.625H68v-15.75h14v15.75zM73.25 73.25v7a.875.875 0 11-1.75 0v-7a.875.875 0 111.75 0zm5.25 0v7a.875.875 0 11-1.75 0v-7a.875.875 0 111.75 0z"
            fill="#404267"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_13_4678">
          <Path fill="#fff" transform="translate(61 61)" d="M0 0H28V28H0z" />
        </ClipPath>
        <ClipPath id="clip1_13_4678">
          <Path fill="#fff" transform="translate(61 61)" d="M0 0H28V28H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default ResetAppBigIcon
