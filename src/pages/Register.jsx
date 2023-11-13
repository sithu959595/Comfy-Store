import { FormInput, SubmitBtn } from "../components";
import { Link, Form, redirect } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
export default function Register() {
  // console.log(dafd);
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Create an account</h4>
        <FormInput type="text" name="username" label="Username"></FormInput>
        <FormInput type="email" name="email" label="Email"></FormInput>
        <FormInput type="password" name="password" label="Password"></FormInput>

        <div className="mt-4">
          <SubmitBtn text="REGISTER" />
        </div>

        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="link link-hover link-primary capitalize ml-3"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
}

export async function action({ request }) {
  console.log("registeration work");
  const formData = await request.formData();
  // const username = data.get("username");
  // const identifier = data.get("identifier");
  // const password = data.get("password");
  const data = Object.fromEntries(formData);
  // console.log(data);
  try {
    const response = await customFetch.post("/auth/local/register", data);
    toast.success("account registered");
    return redirect("/login");
  } catch (error) {
    toast.error(
      error?.response?.data?.error?.message || "please double check the input"
    );
    return null;
  }
  return null;
}
