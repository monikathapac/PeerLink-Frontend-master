import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "styles/Faq.module.css";

const Faq = () => {
  const router = useRouter();
  const { status } = useSession();

  return (
    <div id="faq">
      <div className={styles.mainfaq}>
        <div className={styles.mainfaq}>
          <div className={styles.headfaq}>FAQs</div>

          <div className={styles.faqbox}>
            <div className={styles.question}>
              <p>What is Peer Link?</p>
            </div>
            <div className={styles.answer}>
              <p>
                Peer Link is a community platform, made for discovery of assets
                among peers.
              </p>
            </div>
          </div>

          <div className={styles.faqbox}>
            <div className={styles.question}>
              <p>How Peer Link Works?</p>
            </div>
            <div className={styles.answer}>
              <p>
                Once you make a profile, you can add other people as your
                friends on the platform. And then you can add assets you want,
                if someone else wants the same you will be notified and you guys
                can club and purchase.
              </p>
            </div>
          </div>

          <div className={styles.faqbox}>
            <div className={styles.question}>
              <p>Is sharing safe on Peer Link?</p>
            </div>
            <div className={styles.answer}>
              <p>
                Peer Link strictly advises to make friends only if they know the
                other person unlike any other social media reason being, this
                community involves sharing of tangible values and hence its
                users responsibility to add people they know.
              </p>
            </div>
          </div>

          <div className={styles.faqbox}>
            <div className={styles.question}>
              <p>Is my card details safe on Peer Link?</p>
            </div>
            <div className={styles.answer}>
              <p>
                You need not add any card details, you can just select the card
                type.
              </p>
            </div>
          </div>

          <div className={styles.faqbox}>
            <div className={styles.question}>
              <p>Why should I tell Peer Link about my digital subscriptions?</p>
            </div>
            <div className={styles.answer}>
              <p>
                First of all, users need not give us any personal details, they
                just tell what they own, and if they do it enables us to save
                money for them by bringing other users who wants to club with
                them.
              </p>
            </div>
          </div>
        </div>

        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Faq;
