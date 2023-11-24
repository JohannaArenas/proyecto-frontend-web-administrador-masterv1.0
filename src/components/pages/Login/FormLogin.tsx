import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SECTION_ROUTE_PROFILE } from "../../Sidebar/sections";
import "./styles.css";

export const FormLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();
  const [badCredentials, setBadCredentials] = useState<String>();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const getData = () => {
    if (localStorage.getItem("token")) {
      const token: string = JSON.stringify(localStorage.getItem("token"));

      const config: any = {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      };

      const payload = token.split(".")[1];
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      const email = values.email;

      const URL: string =
        "https://proyecto-backend-web-production.up.railway.app/sensor/api/users";

      axios.get(URL, config).then((res) => {
        const user = {
          id: res.data.id,
          name: res.data.name,
          lastname: res.data.lastname,
          country: res.data.country,
          datesBirth: res.data.datesBirth,
          email: res.data.email,
        };
        window.localStorage.setItem("user", JSON.stringify(user));
        //console.log(res.data)

        navigate(SECTION_ROUTE_PROFILE.route);
      });
    }
  };

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const URL =
      "https://proyecto-backend-web-production.up.railway.app/sensor/api/auth/login-admin";

    const data = {
      email,
      password,
    };

    axios
      .post(URL, data)
      .then((response) => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");

        //console.log(response.data)
        window.localStorage.setItem("token", response.data.token);
        getData();

        //navigate(SECTION_ROUTE_PROFILE.route);
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.data.error.message);
        setBadCredentials(error.response.data.error.message);
      });
  };

  return (
    <main className="main-content  mt-0">
      <div className="bg-login">
        <span className="mask bg-gradient-dark opacity-6"></span>
        <div className="container my-auto">
          <div className="row">
            <div className="col-lg-4 col-md-8 col-12 mx-auto">
              <div className="card z-index-0 fadeIn3 fadeInBottom">
                {/* titulo */}
                <div className="container-title">
                  <div className="bg-gradient-primary shadow-primary border-radius-lg py-2 pe-1">
                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                      Iniciar sesion
                    </h4>
                  </div>
                </div>

                {/* formulario */}
                <div className="card-body">
                  {!!badCredentials && (
                    <h4 className=" alert alert-danger text-center">
                      {badCredentials}
                    </h4>
                  )}

                  <form className="text-start" onSubmit={login}>
                    <div className="input-group input-group-outline my-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                          setEmail(e.currentTarget.value)
                        }
                      />
                    </div>
                    <div className="input-group input-group-outline mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                          setPassword(e.currentTarget.value)
                        }
                      />
                    </div>
                    <div className="text-center ">
                      <button
                        className="btn bg-gradient-primary w-100 my-4 mb-2 text-white"
                        type="submit"
                      >
                        Iniciar sesion
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
