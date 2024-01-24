import Image from "next/image";
import Styles from "styles/Contact.module.css";

const Contact = () => {
  return (
    <div id="contact">
      <div className={Styles.conhead}>
        <p>
          <span className={Styles.cspan}>Connect with us on</span>
        </p>
        <br></br>

        <div className={Styles.mail}>
          <p>
            <span>
              <Image
                src={require("assets/9356937.png")}
                alt="mail"
                height={20}
                width={20}
                className={Styles.cimage}
              />
              peerlink@gmail.com
            </span>
          </p>
          <br></br>
        </div>
        <div className={Styles.mail}>
          <p>
            <span>
              <Image
                src={require("assets/call.png")}
                alt="mail"
                height={20}
                width={20}
                className={Styles.cimage}
              />
              +91 8984 542 890
            </span>
          </p>
          <br></br>
        </div>

        <a href="https://www.facebook.com/peerlink.network">
          {" "}
          <Image
            src={require("assets/fb.png")}
            alt="facebook"
            height={24}
            width={24}
            className={Styles.cimage}
          />
        </a>
        <a href="https://www.linkedin.com">
          <Image
            src={require("assets/linkedin.png")}
            alt="linkedino"
            height={22}
            width={22}
            className={Styles.cimage}
          />
        </a>
        <a href="https://wa.link/n04u6e">
          <Image
            src={require("assets/whatsapp.png")}
            alt="whatsapp"
            height={22}
            width={22}
            className={Styles.cimage}
          />
        </a>
        <a href="https://www.telegram.com">
          <Image
            src={require("assets/telegram.png")}
            alt="telegram"
            height={22}
            width={22}
            className={Styles.cimage}
          />
        </a>
        <a href="https://www.instagram.com/peerlink.network/">
          <Image
            src={require("assets/ig.png")}
            alt="instagram"
            height={22}
            width={22}
            className={Styles.cimage}
          />
        </a>
      </div>
    </div>
  );
};

export default Contact;
