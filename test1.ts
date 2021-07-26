import { GoldPartnerInfos } from "./test2";
import { JSONSchema4 } from "json-schema";

const test = {
  type: "object",
  title: "ImgLinkPane Config",
  properties: {
    title: { title: "title", type: "string" },
    subTitle: { title: "subTitle", type: "string" },
    DiamondPartnerTitle: { title: "DiamondPartnerTitle", type: "string" },
    DiamondPartnerInfos: {
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
    },
    GoldPartnerTitle: { title: "GoldPartnerTitle", type: "string" },
    GoldPartnerInfos,
  },
};

export default {
  type: "object",
  title: "ImgLinkPane Config",
  properties: {
    title: { title: "title", type: "string" },
    subTitle: { title: "subTitle", type: "string" },
    DiamondPartnerTitle: { title: "DiamondPartnerTitle", type: "string" },
    DiamondPartnerInfos: {
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
    },
    GoldPartnerTitle: { title: "GoldPartnerTitle", type: "string" },
    GoldPartnerInfos,
  },
} as JSONSchema4
