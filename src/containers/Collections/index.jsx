import FeaturedCollections from "@/app/(website)/components/FeaturedCollections";

const collectionsData = [
  {
    id: 1,
    title: "Elegant Evening Shoes",
    description: "Perfect for your glamorous night outs.",
    price: "₦120,000",
    image: "/images/man-shoe-3.jpg",
  },
  {
    id: 2,
    title: "Casual Chic",
    description: "Trendy and comfortable everyday wear.",
    price: "₦45,000",
    image: "/images/man-shoe-4.jpg",
  },
  {
    id: 3,
    title: "Luxury Slippers",
    description: "A statement accessory for every occasion.",
    price: "₦40,000",
    image: "/images/slippers-1.jpg",
  },
  {
    id: 4,
    title: "Classic Heels",
    description: "Elegant heels designed for confidence.",
    price: "₦55,000",
    image: "/images/shoe-3.jpg",
  },
  {
    id: 5,
    title: "Silver Diamond Shoes",
    description: "Light, breezy, and perfect for sunny days.",
    price: "₦35,000",
    image: "/images/shoe-4.jpg",
  },
  {
    id: 6,
    title: "Designer Black Shoes",
    description: "Stay stylish and appear elegant.",
    price: "₦95,000",
    image: "/images/man-shoe-3.jpg",
  },
];

export default function Collections() {
  return <FeaturedCollections collections={collectionsData} />;
}
