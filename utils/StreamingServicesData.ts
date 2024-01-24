interface StreamingService {
  title: string;
  originalPrice: string;
  discountedPrice: string;
  subscriptionInfo: string;
  logoUrl: string;
  brandColor?: string;
}

export const StreamingServiceData: StreamingService[] = [
  {
    title: "Netflix",
    originalPrice: "199",
    discountedPrice: "99",
    subscriptionInfo: "Get subscription at ₹99/-",
    brandColor: "red",
    logoUrl:
      "https://yt3.googleusercontent.com/ytc/AIf8zZQKCG8w7wVznj9sHhrHge3cKYVuUblDUuOaUp_psQ=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    title: "Amazon Prime Video",
    originalPrice: "129",
    discountedPrice: "89",
    subscriptionInfo: "Special offers available",
    brandColor: "yellow",
    logoUrl:
      "https://yt3.googleusercontent.com/ytc/AIf8zZQKCG8w7wVznj9sHhrHge3cKYVuUblDUuOaUp_psQ=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    title: "Disney+",
    originalPrice: "149",
    discountedPrice: "119",
    subscriptionInfo: "Watch exclusive Disney content",
    brandColor: "blue",
    logoUrl:
      "https://yt3.googleusercontent.com/ytc/AIf8zZQKCG8w7wVznj9sHhrHge3cKYVuUblDUuOaUp_psQ=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    title: "Hulu",
    originalPrice: "99",
    discountedPrice: "79",
    subscriptionInfo: "Enjoy your favorite shows and movies",
    brandColor: "green",
    logoUrl:
      "https://yt3.googleusercontent.com/ytc/AIf8zZQKCG8w7wVznj9sHhrHge3cKYVuUblDUuOaUp_psQ=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    title: "Apple TV+",
    originalPrice: "99",
    discountedPrice: "79",
    subscriptionInfo: "Original shows and movies from Apple",
    brandColor: "indigo",
    logoUrl:
      "https://yt3.googleusercontent.com/ytc/AIf8zZQKCG8w7wVznj9sHhrHge3cKYVuUblDUuOaUp_psQ=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    title: "HBO Max",
    originalPrice: "149",
    discountedPrice: "129",
    subscriptionInfo: "Access to HBO original content",
    brandColor: "purple",
    logoUrl:
      "https://yt3.googleusercontent.com/ytc/AIf8zZQKCG8w7wVznj9sHhrHge3cKYVuUblDUuOaUp_psQ=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    title: "Peacock",
    originalPrice: "99",
    discountedPrice: "69",
    subscriptionInfo: "Stream NBCUniversal content",
    brandColor: "pink",
    logoUrl:
      "https://yt3.googleusercontent.com/ytc/AIf8zZQKCG8w7wVznj9sHhrHge3cKYVuUblDUuOaUp_psQ=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    title: "Paramount+",
    originalPrice: "149",
    discountedPrice: "99",
    brandColor: "red-600",
    subscriptionInfo: "Home to CBS and Paramount movies",
    logoUrl:
      "https://yt3.googleusercontent.com/ytc/AIf8zZQKCG8w7wVznj9sHhrHge3cKYVuUblDUuOaUp_psQ=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    title: "ESPN+",
    originalPrice: "69",
    discountedPrice: "49",
    subscriptionInfo: "Exclusive sports content",
    logoUrl:
      "https://yt3.googleusercontent.com/ytc/AIf8zZQKCG8w7wVznj9sHhrHge3cKYVuUblDUuOaUp_psQ=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    title: "Discovery+",
    originalPrice: "99",
    discountedPrice: "79",
    subscriptionInfo: "Explore documentaries and reality TV",
    logoUrl:
      "https://yt3.googleusercontent.com/ytc/AIf8zZQKCG8w7wVznj9sHhrHge3cKYVuUblDUuOaUp_psQ=s900-c-k-c0x00ffffff-no-rj",
  },

  {
    title: "Crave",
    originalPrice: "129",
    discountedPrice: "109",
    subscriptionInfo: "Watch HBO, Showtime, and Starz content",
    logoUrl:
      "https://yt3.googleusercontent.com/ytc/AIf8zZQKCG8w7wVznj9sHhrHge3cKYVuUblDUuOaUp_psQ=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    title: "Tidal",
    originalPrice: "99",
    discountedPrice: "79",
    subscriptionInfo: "High-fidelity music streaming",
    logoUrl:
      "https://yt3.googleusercontent.com/ytc/AIf8zZQKCG8w7wVznj9sHhrHge3cKYVuUblDUuOaUp_psQ=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    title: "Funimation",
    originalPrice: "79",
    discountedPrice: "59",
    subscriptionInfo: "Anime streaming service",
    logoUrl:
      "https://yt3.googleusercontent.com/ytc/AIf8zZQKCG8w7wVznj9sHhrHge3cKYVuUblDUuOaUp_psQ=s900-c-k-c0x00ffffff-no-rj",
  },
  // {
  //   title: "Shudder",
  //   originalPrice: "59",
  //   discountedPrice: "39",
  //   subscriptionInfo: "Streaming service for horror fans",
  //   logoUrl:
  //     "https://yt3.googleusercontent.com/ytc/AIf8zZQKCG8w7wVznj9sHhrHge3cKYVuUblDUuOaUp_psQ=s900-c-k-c0x00ffffff-no-rj",
  // },
  // {
  //   title: "CuriosityStream",
  //   originalPrice: "69",
  //   discountedPrice: "49",
  //   subscriptionInfo: "Documentaries and non-fiction content",
  //   logoUrl:
  //     "https://yt3.googleusercontent.com/ytc/AIf8zZQKCG8w7wVznj9sHhrHge3cKYVuUblDUuOaUp_psQ=s900-c-k-c0x00ffffff-no-rj",
  // },
  // {
  //   title: "Sling TV",
  //   originalPrice: "35",
  //   discountedPrice: "25",
  //   subscriptionInfo: "Live TV streaming service",
  //   logoUrl:
  //     "https://yt3.googleusercontent.com/ytc/AIf8zZQKCG8w7wVznj9sHhrHge3cKYVuUblDUuOaUp_psQ=s900-c-k-c0x00ffffff-no-rj",
  // },
  // {
  //   title: "YouTube Premium",
  //   originalPrice: "119",
  //   discountedPrice: "99",
  //   subscriptionInfo: "Ad-free YouTube and original content",
  //   logoUrl:
  //     "https://yt3.googleusercontent.com/ytc/AIf8zZQKCG8w7wVznj9sHhrHge3cKYVuUblDUuOaUp_psQ=s900-c-k-c0x00ffffff-no-rj",
  // },

  // {
  //   title: "VRV",
  //   originalPrice: "499",
  //   discountedPrice: "199",
  //   subscriptionInfo: "Bundled streaming service",
  //   logoUrl:
  //     "https://yt3.googleusercontent.com/ytc/AIf8zZQKCG8w7wVznj9sHhrHge3cKYVuUblDUuOaUp_psQ=s900-c-k-c0x00ffffff-no-rj",
  // },
];
