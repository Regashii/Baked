import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ForgotPass = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [resend, setResend] = useState(false);
  const [pleaseWait, togglePleaseWait] = useState(false);
  const [reachLimit, toggleReachLimit] = useState(false);

  const [countdown, setCountDown] = useState(0);

  let timer: any;
  useEffect(() => {
    timer = setInterval(() => {
      setCountDown(countdown - 1);
    }, 1000);
    return () => clearInterval(timer);
  });

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timer);
      setResend(false);
    }
  }, [countdown]);

  async function handleOtp() {
    axios
      .post("/api/verify", { otp: input })

      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("pass", "true");
          navigate("/Reset");
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error("You use an Expired OTP!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else if (err.response.status === 500) {
          toast.error("Not match", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  }

  async function sendOtp() {
    togglePleaseWait(true);
    axios.get("https://ipapi.co/json").then((res) => {
      axios
        .post("/api/limit", { ip: res.data.ip })
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            axios.post("/api/otp").then((res) => {
              if (res.status === 200) {
                togglePleaseWait(false);
                toast.success("OTP succesfully send to your gmail", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
                setCountDown(15);
                setResend(true);
              }
            });
          }
        })
        .catch((err) => {
          if (err.response.status === 500) {
            setCountDown(15);
            setResend(true);
            togglePleaseWait(false);
            toggleReachLimit(true);
          }
        });
    });
  }

  return (
    <div className="Forgot">
      <Modal show={pleaseWait}>
        <Modal.Body>Please wait...</Modal.Body>
      </Modal>
      <Modal show={reachLimit}>
        <Modal.Body>You reach your limit, try again later</Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary"
            onClick={() => {
              toggleReachLimit(false);
            }}
          >
            Ok
          </button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
      <div className="form">
        <span className="close" onClick={() => navigate("/")}>
          X
        </span>

        <div className="info">
          <span className="title">OTP Verification</span>
          <p className="description">
            Please enter the code we have sent you.{" "}
          </p>
        </div>
        <div className="inputs">
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            maxLength={6}
          />
        </div>
        <a className="validate" onClick={handleOtp}>
          Verify
        </a>
        <p className="sending" style={{ color: "white" }}>
          Click to send the otp number -
          <button
            disabled={resend}
            className="btn btn-warning"
            onClick={sendOtp}
            style={{ color: "white" }}
          >
            Send
          </button>
        </p>
        {resend && <p style={{ color: "white" }}>To resend: {countdown}</p>}
      </div>
    </div>
  );
};

export default ForgotPass;
