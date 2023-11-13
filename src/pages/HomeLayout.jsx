import { Outlet, useNavigation } from "react-router-dom";
import { Header, Navbar, Loading } from "../components";
export default function HomeLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      <Header />
      <nav>
        <span className="text-4xl text-primary">
          <Navbar />
        </span>
      </nav>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet />
        </section>
      )}
    </>
  );
}
