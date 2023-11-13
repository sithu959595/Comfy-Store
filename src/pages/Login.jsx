import { FormInput, SubmitBtn } from "../components";
import { Link, Form, redirect, useNavigate } from "react-router-dom";
import { loginUser } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import { useDispatch } from "react-redux";
export default function Login() {
  // console.log(dafd);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginAsGuest = async () => {
    try {
      const response = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(loginUser(response.data));
      toast.success("welcome guest user");
      navigate("/");
      // redirect("/");
    } catch (err) {
      console.log(err);
      toast.error("try again");
    }
  };
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" name="identifier" label="Email"></FormInput>
        <FormInput type="password" name="password" label="Password"></FormInput>
        <div className="mt-4">
          <SubmitBtn text="LOGIN" />
        </div>
        <button
          onClick={loginAsGuest}
          type="button"
          className="btn btn-secondary btn-block"
        >
          GUEST USER
        </button>
        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="link link-hover link-primary capitalize ml-3"
          >
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
}
export function action(store) {
  return async ({ request }) => {
    const formData = await request.formData();

    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      const response = await customFetch.post("/auth/local", data);
      console.log(response);
      store.dispatch(loginUser(response.data));
      toast.success("account logged in");
      return new Response("", {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message || "please double check the input"
      );
      return null;
    }
  };
}
