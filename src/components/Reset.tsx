import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Reset = () => {
  const navigate = useNavigate();
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [done, setDone] = useState(true);

  const pass = localStorage.getItem("pass");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      toast.warning("Not match", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      setDone(true);
      toast.success("Please wait", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      axios
        .put("/api/forgot", { password: newPass })
        .then((res) => {
          if (res.status === 200) {
            setTimeout(() => {
              axios.get("/api/logout");
              localStorage.clear();
              navigate("/login");
            }, 5000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    axios
      .get("/api/forgot")
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("pass", "true");
          setDone(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 403 || err.response.status === 401) {
          localStorage.clear();
          navigate("/forgotPass");
        }
      });
  }, []);

  return (
    <div className="Reset">
      {pass && (
        <form className="form" onSubmit={handleSubmit}>
          Reset Password
          <input
            type="text"
            className="input"
            placeholder="new pass"
            required
            onChange={(e) => {
              setNewPass(e.target.value);
            }}
            readOnly={done}
          />
          <input
            type="text"
            className="input"
            placeholder="confirm pass"
            required
            onChange={(e) => {
              setConfirmPass(e.target.value);
            }}
            readOnly={done}
          />
          <button disabled={done}>Submit</button>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default Reset;
