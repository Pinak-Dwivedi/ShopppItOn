export default function formatNumberAsPrice(number) {
  const priceFormatter = new Intl.NumberFormat("hi-in", {
    currency: "INR",
    style: "currency",
  });

  return priceFormatter.format(number);
}
