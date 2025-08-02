import "../styles/AboutUs.css";
import CloseIcon from "../assets/close-btn.png";
import Rocket from "../assets/rocket.png";
import AddView from "../assets/add and view.png";
import Category from "../assets/category.png";
import Analytics from "../assets/analytics.png";
import EditProfile from "../assets/edit profile.png";
import Dashboard from "../assets/dashboard.png";
import PasswordRecovery from "../assets/password recovery.png";
import Bulb from "../assets/idea.png";
import FB from "../assets/facebook.png";
import IG from "../assets/instagram logo.png";
import GitHub from "../assets/github logo.png";
import Tiktok from "../assets/tik-tok logo.png";
import Programmer from "../assets/programmer.png";
import { motion } from "framer-motion";

export const AboutUsModal = ({ onClose }) => {
  return (
    <div className="aboutUsWrapper">
      <motion.div
        className="aboutUsContent"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="aboutUsHeader">
          <p className="title">About SpenSyd</p>
          <img
            src={CloseIcon}
            alt="close-icon"
            className="closeIcon"
            onClick={onClose}
          />
        </div>

        <div className="aboutUsBody">
          <div className="aboutUsText">
            SpenSyd is a simple and intuitive expense tracker system built to
            help users manage their finances effortlessly. Whether you're
            tracking groceries, bills, transportation, or income, SpenSyd gives
            you a clear overview of your spending habits.
          </div>

          <div className="whyText">
            <img src={Bulb} alt="rocketIcon" />
            <p>Why SpenSyd?</p>
          </div>

          <div className="featuresContainer">
            <div className="features">
              <div className="addViewIcon">
                <img src={AddView} alt="add&view" className="whyIcon" />
              </div>
              <p className="whyDesc">Add & view expenses & income</p>
            </div>
            <div className="features">
              <div className="categorizeIcon">
                <img src={Category} alt="add&view" className="whyIcon" />
              </div>
              <p className="whyDesc">Categorize Transactions</p>
            </div>
            <div className="features">
              <div className="analyticsIcon">
                <img src={Analytics} alt="add&view" className="whyIcon" />
              </div>
              <p className="whyDesc">Add and view expenses and income</p>
            </div>
            <div className="features">
              <div className="editProfileIcon">
                <img src={EditProfile} alt="add&view" className="whyIcon" />
              </div>
              <p className="whyDesc">Edit profile & manage password</p>
            </div>
            <div className="features">
              <div className="passwordRecoIcon">
                <img
                  src={PasswordRecovery}
                  alt="add&view"
                  className="whyIcon"
                />
              </div>
              <p className="whyDesc">Account recovery & verification</p>
            </div>
            <div className="features">
              <div className="dashboardIcon">
                <img src={Dashboard} alt="add&view" className="whyIcon" />
              </div>
              <p className="whyDesc">Dashboard overview</p>
            </div>
          </div>

          <div className="missionContainer">
            <div className="top">
              <img src={Rocket} className="bulbIcon" />
              <h1 className="divTitle">Our Mission</h1>
            </div>
            <p>
              To make money management accessible, intuitive, and stress-free
              for everyone—regardless of age or financial background. At
              SpenSyd, we believe that understanding your finances shouldn't
              require complicated tools or spreadsheets.
            </p>
          </div>

          <div className="socials">
            <a
              href="https://www.facebook.com/sydney.santos.7773"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={FB} alt="fbIcon" className="socialsIcon" />
            </a>

            <a
              href="https://www.instagram.com/jst.sydd/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={IG} alt="fbIcon" className="socialsIcon" />
            </a>

            <a
              href="https://github.com/Syddevv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={GitHub} alt="fbIcon" className="socialsIcon" />
            </a>

            <a
              href="https://www.tiktok.com/@sydd_dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Tiktok} alt="fbIcon" className="socialsIcon" />
            </a>
          </div>

          <div className="aboutDev">
            <img src={Programmer} />
            <p>
              SpenSyd is a project developed by Sydney Santos as part of a
              learning journey in full-stack web development.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
