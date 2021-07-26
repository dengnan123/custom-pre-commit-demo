import { JSONSchema4 } from "json-schema";

export const GoldPartnerInfos: JSONSchema4 = {
  type: "array",
  title: "DiamondPartnerInfos",
  items: {
    type: "object",
    required: ["imgUrl"],
    properties: {
      imgUrl: { title: "imgUrl", type: "string" },
      jumpLink: { title: "jumpLink", type: "string" },
    },
  },
};
