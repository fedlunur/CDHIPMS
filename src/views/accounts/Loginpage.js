import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Button, Input } from "antd";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    
    email.length > 0 && loginUser(email, password);
    console.log(email);
    console.log(password);
  };

  return (
    <div>
      <>
        {/* <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card" style={{ borderRadius: "1rem" }}>
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                      <img
                        src="dist/img/proj.jpeg"
                        alt="login form"
                        className="img-fluid"
                        style={{  width:600,height:508, borderRadius: "1rem 0 0 1rem" }}
                      />
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">
                        <form onSubmit={handleSubmit}>
                          <div className="d-flex align-items-center mb-3 pb-1">
                            <i
                              className="fas fa-cubes fa-2x me-3"
                              style={{ color: "#ff6219" }}
                            />
                            <div className="d-flex align-items-center mb-3 pb-1">
                              <i
                                className="fas fa-cubes fa-2x me-3"
                                style={{ color: "#ff6219" }}
                              />
                              <span className="h2 fw-bold mb-0">
                                Welcome ack 👋
                              </span>
                            </div>
                          </div>
                          <h5
                            className="fw-normal mb-3 pb-3"
                            style={{ letterSpacing: 1 }}
                          >
                            Sign into your account
                          </h5>

                          <div className="form-outline mb-4">
                            <input
                              type="email"
                              name="email"
                              id="form2Example17"
                              className="form-control form-control-lg"
                            />
                            <label
                              className="form-label"
                              htmlFor="form2Example17"
                            >
                              Email address
                            </label>
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              id="form2Example27"
                              name="password"
                              className="form-control form-control-lg"
                            />
                            <label
                              className="form-label"
                              htmlFor="form2Example27"
                            >
                              Password
                            </label>
                          </div>
                          <div className="pt-1 mb-4">
                            <button
                              className="btn btn-dark btn-lg btn-block"
                              type="submit"
                            >
                              Login
                            </button>
                          </div>

                          <a className="small text-muted" href="#!">
                            Forgot password?
                          </a>
                          <p
                            className="mb-5 pb-lg-2"
                            style={{ color: "#393f81" }}
                          >
                            Don't have an account?{""}
                            <Link to="/register" style={{ color: "#393f81" }}>
                              Register
                            </Link>
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="bg-light text-center text-lg-start">
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2024 Copyright:
            <a className="text-dark" href="https://mdbootstrap.com/">
              cdhi
            </a>
          </div>
        </footer> */}
        <section className="vh-100 bg-blue-50 flex items-center justify-center ">
          <div className="border w-max h-max flex bg-white rounded- overflow-hidden shadow-lg">
            <div className="px-10 py-12 w-full space-y-6">
              <h1 className="font-bold text-3xl ">Welcome Back</h1>
              <span className="text-sm w-full text-center">Welcome to your account</span>{" "}
              <div>
                <label>Email:</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full"
                  style={{
                    width: "100%",
                    height: "40px",
                  }}
                />
              </div>
              <div>
                <label>Password:</label>
                <Input
                  placeholder="Password"
                  className="w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  style={{
                    width: "100%",
                    height: "40px",
                  }}
                />
              </div>
              <button className="py-2 px-5 w-full bg-blue-500 text-white font-semibold rounded-md" onClick={handleSubmit}>
                Login
              </button>
              <p className="text-xs text-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500">
                  Register
                </Link>
              </p>{" "}
            </div>
            
          </div>
        </section>
      </>
    </div>
  );
};

export default Loginpage;
