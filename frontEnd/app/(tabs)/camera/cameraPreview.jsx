import CameraPreviewComponent from "../../../components/CameraPreviewComponent";
import { Provider } from "react-redux";
import store from "../../../redux/store";

export default function CameraPreview() {
  return (
    <>
      <Provider store={store}>
        <CameraPreviewComponent />
      </Provider>
    </>
  );
}
