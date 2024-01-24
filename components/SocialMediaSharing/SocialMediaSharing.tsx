import React from "react";
import {
  EmailIcon,
  EmailShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import styles from "../../styles/Assets.module.css";

interface SocialMediaSharingProps {
  socialMediaText: string;
}

const SocialMediaSharing: React.FC<SocialMediaSharingProps> = ({
  socialMediaText,
}) => {
  return (
    <div>
      <div className={styles.socialMedia}>
        <WhatsappShareButton url={socialMediaText}>
          <WhatsappIcon round={true} />
        </WhatsappShareButton>
        <TelegramShareButton url={socialMediaText}>
          <TelegramIcon round={true} />
        </TelegramShareButton>
        <TwitterShareButton url={socialMediaText}>
          <TwitterIcon round={true} />
        </TwitterShareButton>
        <EmailShareButton url={socialMediaText}>
          <EmailIcon round={true} />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default SocialMediaSharing;
