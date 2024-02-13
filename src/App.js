import { useEffect, useState } from "react";
import cookie from "react-cookies";
import { useDispatch } from "react-redux";
import { onMessageListener } from "./firebase";
import { toast } from "material-react-toastify";
import AllRoute from "./route/AllRoute"
import { userDetails } from "./store/actions/userActions";
function App() {

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log("notification payload", payload)

      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  if (show == true) {
    toast.info(`${notification?.title},  ${notification?.body}`, {

      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setShow(false)
    setNotification({ title: "", body: "" })
  }

  useEffect(() => {
    if (cookie.load('userDetails')) {
      dispatch(userDetails(cookie.load('userDetails')))
    }
  }, []);

  return (
    <>
      <AllRoute />
    </>
  );
}

export default App;
