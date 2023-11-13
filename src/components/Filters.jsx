import { Form, Link, useLoaderData, useSearchParams } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";
const Filters = () => {
  // const [par, setPar] = useSearchParams();
  // const companyValue = par.get("company");
  // console.log("par", companyValue);
  const { products, meta, params } = useLoaderData();
  console.log("filter", products, meta);
  // const companies = products.map((each) => {
  //   return each.attributes.company;
  // });
  return (
    <Form
      method="GET"
      className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center"
    >
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue={params.search}
      ></FormInput>
      <FormSelect
        list={meta.categories}
        name="category"
        label="select categories"
        size="select-sm"
        defaultValue={params.category}
      ></FormSelect>
      <FormSelect
        list={meta.companies}
        name="company"
        label="select company"
        size="select-sm"
        // value={companyValue}
        defaultValue={params.company}
      ></FormSelect>
      <FormSelect
        list={["a-z", "z-a", "high", "low"]}
        name="order"
        size="select-sm"
        label="sort by"
        defaultValue={params.order}
      ></FormSelect>
      <FormRange
        price={params.price}
        label="select price"
        name="price"
        size="range-sm"
      />
      <FormCheckbox
        defaultValue={params.shipping === "on"}
        name="shipping"
        label="free shipping"
        size="checkbox-sm"
      ></FormCheckbox>
      <button className="btn btn-primary btn-sm">search</button>
      <Link to="/products" className="btn btn-accent btn-sm">
        Reset
      </Link>
    </Form>
  );
};
export default Filters;
