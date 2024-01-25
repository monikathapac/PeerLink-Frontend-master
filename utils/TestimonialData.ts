




export interface TestimonialCardProps {
  rating: number;
  quote: string;
  authorName: string;
  authorRole: string;
  authorImage: string;

}
const testimonialData: TestimonialCardProps[] = [
  {
    rating: 5,
    quote:
      "It's innovative, it's classy and it saved me 8000 bucks while I shopped for my Apple using HDFC CC gathered from Peer Link.",
    authorName: "Raushan Ara",
    authorRole: "Web Developer",
    authorImage: "/first.jpeg",
  },
  {
    rating: 4,
    quote:
      "Nice, now I can get any OTT for unbelievably low price, That's what I call truly Made in India.",
    authorName: "Monika Thapa",
    authorRole: "Graphic Designer",
    authorImage: "/monika.jpeg",
  },
  {
    rating: 4.5,
    quote:
      "In this co-subscription space, it's like attending a potluck dinner with friends. Everyone brings something special to the table, creating a delightful, shared experience.",
    authorName: "Tanuj Agrawal",
    authorRole: "Product Manager",
    authorImage: "/tanuj.jpeg",
  },
  // Three new entries
  
];

export default testimonialData;
