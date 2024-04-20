import CameraViewFinderComponent from "../../../components/CameraViewFinderComponent";
import { Provider } from "react-redux";
import store from "../../../redux/store";

export default function cameraViewFinder() {
  return (
    <>
      <Provider store={store}>
        <CameraViewFinderComponent />
      </Provider>
    </>
  );
}
