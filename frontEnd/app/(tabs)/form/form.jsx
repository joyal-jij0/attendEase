import FormComponent from "../../../components/FormComponent";
import { Provider } from "react-redux";
import store from "../../../redux/store";

export default function form() {
  return (
    <>
      <Provider store={store}>
        <FormComponent />
      </Provider>
    </>
  );
}
