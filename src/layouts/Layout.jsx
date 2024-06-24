import PropTypes from "prop-types";
import NavBar from "../components/NavBar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
