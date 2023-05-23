import { useEffect, useState } from "react";

import axios from "axios";
import { faStar as thinStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStarHalfStroke,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BakedGoodies from "../components/BakedGoodies";

const Cakes = () => {
  const allCakes = [
    {
      pic: "https://res.cloudinary.com/dzobqin7p/image/upload/f_auto/q_auto/c_scale,w_550,h_500/v1682646335/cakes/bento/239599791_311216154023994_8336706390727573416_n_vhcsus",
      name: "Bento Cake",
    },
    {
      pic: "https://res.cloudinary.com/dzobqin7p/image/upload/f_auto/q_auto/c_scale,w_550,h_500/v1682646378/cakes/bento%20number/286488397_490620449416896_5592879891610369435_n_er3tmp",
      name: "Bento Number Cake",
    },
    {
      pic: "https://res.cloudinary.com/dzobqin7p/image/upload/f_auto/q_auto/c_scale,w_550,h_500/v1682646518/cakes/number/341834905_1498533090677095_3457164394052989162_n_xm3bgk",
      name: "Number Cake",
    },
    {
      pic: "https://res.cloudinary.com/dzobqin7p/image/upload/f_auto/q_auto/c_scale,w_550,h_500/v1682646535/cakes/number%20mini/307329446_499889612147933_8360939395956161884_n_whujzl",
      name: "Mini Number Cake",
    },
    {
      pic: "https://res.cloudinary.com/dzobqin7p/image/upload/f_auto/q_auto/c_scale,w_550,h_500/v1682646411/cakes/bento%20bundle/274047035_422819422863666_5155302756378845466_n_waljtw",
      name: "Bento Bundle",
    },
    {
      pic: "https://res.cloudinary.com/dzobqin7p/image/upload/f_auto/q_auto/c_scale,w_550,h_500/v1682646467/cakes/minimalist/241787935_326918785787064_3848301957404113004_n_aymwap",
      name: "Minimalist Cake",
    },
    {
      pic: "https://res.cloudinary.com/dzobqin7p/image/upload/f_auto/q_auto/c_scale,w_550,h_500/v1682646489/cakes/money/276014828_440120714466870_3431955178153519258_n_c8qqwa",
      name: "Money Cake",
    },
    {
      pic: "https://res.cloudinary.com/dzobqin7p/image/upload/f_auto/q_auto/c_scale,w_550,h_500/v1682646432/cakes/theme/340986981_769348191464320_5130781697956801415_n_g03bli",
      name: "Theme Cake",
    },
    {
      pic: "https://res.cloudinary.com/dzobqin7p/image/upload/f_auto/q_auto/c_scale,w_550,h_500/v1682646566/cakes/tier%20baby/262028726_377676887377920_3764481159814570587_n_qehluv",
      name: "Baby Tier Cake",
    },
    {
      pic: "https://res.cloudinary.com/dzobqin7p/image/upload/f_auto/q_auto/c_scale,w_550,h_500/v1682646591/cakes/tier%20mini/262812233_380368670442075_320688180572110207_n_opcwtn",
      name: "Mini Tier Cake",
    },
    {
      pic: "https://res.cloudinary.com/dzobqin7p/image/upload/f_auto/q_auto/c_scale,w_550,h_500/v1682646625/cakes/tier%20small/272444114_408768177602124_5141190135202257324_n_lasxys",
      name: "Small Tier Cake",
    },
    {
      pic: "https://res.cloudinary.com/dzobqin7p/image/upload/f_auto/q_auto/c_scale,w_550,h_500/v1682646638/cakes/tier%20big/317642458_564938698976357_8265570710492379660_n_irh9db",
      name: "Big Tier Cake",
    },
    {
      pic: "https://res.cloudinary.com/dzobqin7p/image/upload/f_auto/q_auto/c_scale,w_550,h_500/v1682646735/cakes/tier%20small%203/301221522_540641871081420_5322157655041135661_n_ggolmx",
      name: "Small 3 Tier Cake",
    },
    {
      pic: "https://res.cloudinary.com/dzobqin7p/image/upload/f_auto/q_auto/c_scale,w_550,h_500/v1682646822/cakes/tier%203/337682583_721621466115335_831895035612238752_n_krcu3h",
      name: "3 Tier Cake",
    },
    {
      pic: "https://res.cloudinary.com/dzobqin7p/image/upload/f_auto/q_auto/c_scale,w_550,h_500/v1682646867/cakes/pullapart%20cupcake/341938851_240544015304858_8163858992927578139_n_qqeoow",
      name: "Pullapart Cupcake",
    },
    {
      pic: "https://res.cloudinary.com/dzobqin7p/image/upload/f_auto/q_auto/c_scale,w_550,h_500/v1682646845/cakes/cupcake/324729950_5882574711795452_4857290879969187527_n_vhxdj5",
      name: "Cupcake",
    },
  ];

  const [show, toggleShow] = useState({
    typeCake: "",
    picCake: "",
  });
  const [wait, toggleWait] = useState(false);
  const [feedbacks, setFeedback] = useState([]);

  const [addStar, setAddStar] = useState(0);
  const [sumStar, setSumStar] = useState([]);

  useEffect(() => {
    if (feedbacks.length > 0) {
      for (let index = 0; index < feedbacks.length; index++) {
        const element: any = feedbacks[index];
        if (element.feedback) {
          setAddStar((old) => old + element.feedback.rating);
          //@ts-ignore
          setSumStar((prev) => {
            return [...prev, element.feedback.rating];
          });
        }
      }
    }
  }, [feedbacks.length]);

  const getDetails = (cakeType: any, cakePick: any) => {
    toggleWait(true);
    axios
      .get(
        `https://baked-goodies-api.vercel.app/api/order?type=${cakeType}&&status=getCake`
      )
      .then((res) => {
        setFeedback(res.data);
        toggleShow({
          typeCake: cakeType,
          picCake: cakePick,
        });
        toggleWait(false);
      });
  };

  return (
    <>
      <BakedGoodies />
      <div className="Pages5">
        {wait && (
          <div className="waiting">
            <div className="loader"></div>
          </div>
        )}

        {allCakes.map((allCake, index) => (
          <div
            className="cardCake"
            key={index}
            onClick={() => {
              getDetails(allCake.name, allCake.pic);
            }}
          >
            <img src={allCake.pic} alt="cakes" />
            <p>{allCake.name}</p>
          </div>
        ))}
        {show.typeCake !== "" && (
          <>
            <div className="BG"></div>
            <div className="Sales">
              <div>
                <button
                  className="btn btn-danger"
                  style={{ position: "absolute" }}
                  onClick={() => {
                    toggleShow({
                      typeCake: "",
                      picCake: "",
                    });
                    setFeedback([]);
                    setAddStar(0);
                    setSumStar([]);
                  }}
                >
                  X
                </button>
                <img src={show.picCake} alt="" />
                <p>{show.typeCake}</p>
              </div>

              {feedbacks.length === 0 && (
                <>
                  <div>
                    <p>No rating yet</p>
                    <p>0 sold</p>
                  </div>
                  <div className="No-feedback">
                    <b>No feedback</b>
                  </div>
                </>
              )}
              {feedbacks.length > 0 && (
                <>
                  <div>
                    <p>
                      {sumStar.length === 0 && <p>No rarting yet </p>}
                      {sumStar.length > 0 && (
                        <>
                          {addStar / sumStar.length <= 5 &&
                            addStar / sumStar.length > 4 && (
                              <>
                                <FontAwesomeIcon
                                  icon={solidStar}
                                  className="star"
                                />
                                <FontAwesomeIcon
                                  icon={solidStar}
                                  className="star"
                                />
                                <FontAwesomeIcon
                                  icon={solidStar}
                                  className="star"
                                />
                                <FontAwesomeIcon
                                  icon={solidStar}
                                  className="star"
                                />
                                {addStar / sumStar.length === 5 && (
                                  <FontAwesomeIcon
                                    icon={solidStar}
                                    className="star"
                                  />
                                )}
                                {addStar / sumStar.length <= 4.99 &&
                                  addStar / sumStar.length >= 4.5 && (
                                    <FontAwesomeIcon
                                      icon={faStarHalfStroke}
                                      className="star"
                                    />
                                  )}
                                {addStar / sumStar.length <= 4.49 &&
                                  addStar / sumStar.length >= 4 && (
                                    <FontAwesomeIcon
                                      icon={thinStar}
                                      className="star"
                                    />
                                  )}
                                <span style={{ paddingLeft: "20px" }}>
                                  {addStar / sumStar.length} rate
                                </span>
                              </>
                            )}
                          {addStar / sumStar.length <= 4 &&
                            addStar / sumStar.length > 3 && (
                              <>
                                <FontAwesomeIcon
                                  icon={solidStar}
                                  className="star"
                                />
                                <FontAwesomeIcon
                                  icon={solidStar}
                                  className="star"
                                />
                                <FontAwesomeIcon
                                  icon={solidStar}
                                  className="star"
                                />
                                {addStar / sumStar.length === 4 && (
                                  <FontAwesomeIcon
                                    icon={solidStar}
                                    className="star"
                                  />
                                )}
                                {addStar / sumStar.length <= 3.99 &&
                                  addStar / sumStar.length >= 3.5 && (
                                    <FontAwesomeIcon
                                      icon={faStarHalfStroke}
                                      className="star"
                                    />
                                  )}
                                {addStar / sumStar.length <= 3.49 &&
                                  addStar / sumStar.length >= 3 && (
                                    <FontAwesomeIcon
                                      icon={thinStar}
                                      className="star"
                                    />
                                  )}
                                <FontAwesomeIcon
                                  icon={thinStar}
                                  className="star"
                                />
                                <span style={{ paddingLeft: "20px" }}>
                                  {addStar / sumStar.length} rate
                                </span>
                              </>
                            )}
                          {addStar / sumStar.length <= 3 &&
                            addStar / sumStar.length > 2 && (
                              <>
                                <FontAwesomeIcon
                                  icon={solidStar}
                                  className="star"
                                />
                                <FontAwesomeIcon
                                  icon={solidStar}
                                  className="star"
                                />
                                {addStar / sumStar.length === 3 && (
                                  <FontAwesomeIcon
                                    icon={solidStar}
                                    className="star"
                                  />
                                )}
                                {addStar / sumStar.length <= 2.99 &&
                                  addStar / sumStar.length >= 2.5 && (
                                    <FontAwesomeIcon
                                      icon={faStarHalfStroke}
                                      className="star"
                                    />
                                  )}
                                {addStar / sumStar.length <= 2.49 &&
                                  addStar / sumStar.length >= 2 && (
                                    <FontAwesomeIcon
                                      icon={thinStar}
                                      className="star"
                                    />
                                  )}

                                <FontAwesomeIcon
                                  icon={thinStar}
                                  className="star"
                                />
                                <FontAwesomeIcon
                                  icon={thinStar}
                                  className="star"
                                />
                                <span style={{ paddingLeft: "20px" }}>
                                  {addStar / sumStar.length} rate
                                </span>
                              </>
                            )}
                          {addStar / sumStar.length <= 2 &&
                            addStar / sumStar.length > 1.1 && (
                              <>
                                <FontAwesomeIcon
                                  icon={solidStar}
                                  className="star"
                                />
                                {addStar / sumStar.length === 2 && (
                                  <FontAwesomeIcon
                                    icon={solidStar}
                                    className="star"
                                  />
                                )}
                                {addStar / sumStar.length <= 1.99 &&
                                  addStar / sumStar.length >= 1.5 && (
                                    <FontAwesomeIcon
                                      icon={faStarHalfStroke}
                                      className="star"
                                    />
                                  )}
                                {addStar / sumStar.length <= 1.49 &&
                                  addStar / sumStar.length >= 1 && (
                                    <FontAwesomeIcon
                                      icon={thinStar}
                                      className="star"
                                    />
                                  )}
                                <FontAwesomeIcon
                                  icon={thinStar}
                                  className="star"
                                />
                                <FontAwesomeIcon
                                  icon={thinStar}
                                  className="star"
                                />
                                <FontAwesomeIcon
                                  icon={thinStar}
                                  className="star"
                                />
                                <span style={{ paddingLeft: "20px" }}>
                                  {addStar / sumStar.length} rate
                                </span>
                              </>
                            )}
                          {addStar / sumStar.length <= 1 &&
                            addStar / sumStar.length > 0 && (
                              <>
                                {addStar / sumStar.length === 1 && (
                                  <FontAwesomeIcon
                                    icon={solidStar}
                                    className="star"
                                  />
                                )}
                                {addStar / sumStar.length <= 0.99 &&
                                  addStar / sumStar.length >= 0.5 && (
                                    <FontAwesomeIcon
                                      icon={faStarHalfStroke}
                                      className="star"
                                    />
                                  )}
                                <FontAwesomeIcon
                                  icon={thinStar}
                                  className="star"
                                />
                                <FontAwesomeIcon
                                  icon={thinStar}
                                  className="star"
                                />
                                <FontAwesomeIcon
                                  icon={thinStar}
                                  className="star"
                                />
                                <FontAwesomeIcon
                                  icon={thinStar}
                                  className="star"
                                />
                                <span style={{ paddingLeft: "20px" }}>
                                  {addStar / sumStar.length} rate
                                </span>
                              </>
                            )}
                        </>
                      )}
                    </p>

                    <p>{feedbacks.length} sold</p>
                  </div>

                  {feedbacks.map((feedback: any, index) => (
                    <>
                      {feedback.feedback && (
                        <>
                          <div className="feedback" key={index}>
                            <b>{feedback.customer.name}</b>
                            {feedback.feedback.rating === 5 && (
                              <p>Rating: ⭐⭐⭐⭐⭐</p>
                            )}
                            {feedback.feedback.comment && (
                              <p>Comment: {feedback.feedback.comment}</p>
                            )}
                          </div>
                        </>
                      )}
                    </>
                  ))}
                  <footer>
                    <p>No more rating</p>
                  </footer>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cakes;
