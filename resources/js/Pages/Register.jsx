import { Button, Gap, Input, Loader, Togle } from "@/Components";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import { useState } from "react";
import { useAlert } from "react-alert";

const Register = () => {
  // prettier-ignore
  const [form, setForm] = useState({ email: "", password: "", confirm_password:"" });
  const [isloading, setIsLoading] = useState(false);

  const Alert = useAlert();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const registerHandler = async () => {
    const { email, password, confirm_password } = form;
    if (!email || !password || !confirm_password) {
      return Alert.info({
        msg: "email, password dan konfirmasi password tidak valid",
      });
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/api/auth/register", form);
      const { data, message } = response.data;
      setForm({ email: "", password: "", confirm_password: "" });
      setIsLoading(false);
      Alert.success(message);
      return Inertia.visit("/login");
    } catch (error) {
      setIsLoading(false);
      const { response } = error;
      if (response && response.data) {
        const { message = { title: "error", msg: "terjadi kesalahan" } } =
          response.data;
        return Alert.error(message);
      }
    }
  };

  return (
    <>
      <Head title="Daftar" />
      <div className="w-screen h-screen grid justify-items-center page">
        <Loader.Textloading loading={isloading}  />
        <div className="fixed top-4 md:top-6">
          <a href="/" className="text-3xl lg:text-4xl font-semibold">
            JORna
          </a>
        </div>
        <div className="form-container">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-3xl">Daftar</h1>
            <div>
              <a href="/login" className="text-sm ring-transparent">
                Masuk
              </a>
            </div>
          </div>
          <Gap heigh="h-8" />
          <h1 className="text-base">Email</h1>
          <div>
            <Input.Border
              type="email"
              name="email"
              inputClass="p-1.5 rounded-lg text-base"
              value={form["email"]}
              onChange={(e) => inputHandler(e)}
            />
            <Gap heigh="h-2" />
            <h1>Password</h1>
            <Input.Border
              type="password"
              name="password"
              autoComplete="new-off"
              inputClass="p-1.5 rounded-lg text-base"
              value={form["password"]}
              onChange={(e) => inputHandler(e)}
            />
            <Gap heigh="h-2" />
            <h1>Konfirmasi password</h1>
            <Input.Border
              type="password"
              name="confirm_password"
              autoComplete="off"
              inputClass="p-1.5 rounded-lg text-base"
              value={form["confirm_password"]}
              onChange={(e) => inputHandler(e)}
            />
            <Gap heigh="h-6" />
            <Button.Primary
              children="Daftar"
              buttonClass="w-full py-2 rounded-lg"
              onClick={registerHandler}
            />
          </div>
        </div>
        <Togle.Theme />
      </div>
    </>
  );
};

export default Register;
