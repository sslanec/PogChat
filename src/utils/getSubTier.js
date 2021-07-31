export default function getSubTier(methods) {
  switch (methods.plan) {
    case "1000":
      return "Tier 1";
    case "2000":
      return "Tier 2";
    case "3000":
      return "Tier 3";
    default:
      return "Prime";
  }
}