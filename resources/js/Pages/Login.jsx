import { Button, Gap, Input, Loader, Togle } from "@/Components";
import { actions } from "@/utils/reducers/store";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

const Login = ({ message }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isloading, setIsLoading] = useState(false);

  const { setToken } = actions.authAction;
  const { setUser } = actions.userAction;
  const dispatch = useDispatch();
  const Alert = useAlert();

  const loginHandler = async () => {
    const { email, password } = form;
    if (!email || !password) {
      return Alert.info({ msg: "email dan password tidak valid" });
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/api/auth/login", form);
      const { data, message } = response.data;
      const { access_token, user } = data;
      dispatch(setToken({ type: "save", data: access_token }));
      dispatch(setUser({ type: "save", data: user }));
      setForm({ email: "", password: "" });
      setIsLoading(false);
      Alert.success(message);
      return Inertia.visit("/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    } catch (error) {
      setIsLoading(false);
      const { response } = error;
      if (response && response.data) {
        // prettier-ignore
        const { message = { title: "error", msg: "terjadi kesalahan" } } = response.data;
        return Alert.error(message);
      }
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    if (message) {
      Alert.error(message);
    }
  }, []);

  return (
    <>
      <Head title="Masuk" />
      <div className="w-screen h-screen grid justify-items-center page">
      <Loader.Textloading loading={isloading} />
        <div className="fixed top-4 md:top-6">
          <a href="/" className="text-3xl lg:text-4xl font-semibold">
            JORna
          </a>
        </div>
        <div className="form-container">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-3xl">Masuk</h1>
            <div>
              <a href="/register" className="text-sm">
                Daftar
              </a>
            </div>
          </div>
          <Gap heigh="h-8" />
          <h1 className="text-base">Email</h1>
          <Input.Border
            type="email"
            name="email"
            inputClass="p-1.5 rounded-lg text-base"
            autoComplete="off"
            value={form["email"]}
            onChange={(e) => inputHandler(e)}
          />
          <Gap heigh="h-2" />
          <h1>Password</h1>
          <Input.Border
            inputPassword={true}
            name="password"
            divClass="rounded-lg py-1.5 pr-1"
            inputClass="text-base py-0 px-2.5"
            autoComplete="off"
            value={form["password"]}
            onChange={(e) => inputHandler(e)}
          />
          <Gap heigh="h-6" />
          <Button.Primary
            children="Masuk"
            buttonClass="w-full py-2 rounded-lg"
            onClick={loginHandler}
          />
        </div>
        <Togle.Theme />
      </div>
    </>
  );
};

export default Login;
