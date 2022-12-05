import { availableAlgorithms } from "../sorting/algorithms"

export default {
  color: {
    default: "orange",
    available: ["orange", "white"],
  },
  count: {
    default: 10,
  },
  minimum: {
    default: 1,
  },
  maximum: {
    default: 100,
  },
  algorithm: {
    default: Object.keys(availableAlgorithms)[0],
    available: availableAlgorithms,
  },
}
