import { JSONSchema4 } from "json-schema";
import configScheam from "./test1";

// const b: JSONSchema4 = {
//   type: "object",
//   title: "ImgLinkPane",
//   properties: {
//     config: configScheam,
//   },
// };

const b: JSONSchema4 = {
  type: "object",
  title: "ImgLinkPane",
  properties: {
    config: {
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
        GoldPartnerInfos: {
          type: "array",
          title: "GoldPartnerInfos",
          required: ["imgUrl"],
          items: {
            type: "object",
            properties: {
              imgUrl: { title: "imgUrl", type: "string" },
              jumpLink: { title: "jumpLink", type: "string" },
            },
          },
        },
      },
    },
  },
};

export default b;
