import axios from "axios";
import Papa from "papaparse";

import {Field as IField, RadioField, TextField} from "./types";

interface RawField {
  title: string;
  type: "radio" | "text";
  text: string;
  note: string;
  required: boolean;
}

function normalize(data: RawField[]): IField[] {
  return data.map((field) => {
    if (field.type === "radio") {
      return {
        title: field.title,
        options: field.text.split(",").map((option) => option.trim()),
        required: field.required,
        note: field.note || "",
        type: "radio",
      } as RadioField;
    } else if (field.type === "text") {
      return {
        title: field.title,
        placeholder: field.text,
        required: field.required,
        note: field.note || "",
        type: "text",
      } as TextField;
    }

    throw new Error("Unknown field type");
  }, []);
}

export default {
  list: async (): Promise<IField[]> => {
    return axios
      .get("https://docs.google.com/spreadsheets/d/e/2PACX-1vTFFhkafmk3Rd1mSSR3Zcfb96xuGWChgDIBlfwYEkgHNct5plKpqaXQxLYj_sXQVKt0t5JzfoK3Tqyi/pub?gid=1940693758&single=true&output=csv", {
        responseType: "blob",
      })
      .then(
        (response) =>
          new Promise<IField[]>((resolve, reject) => {
            Papa.parse(response.data, {
              header: true,
              complete: (results) => {
                const data = normalize(results.data as RawField[]);

                return resolve(data);
              },
              error: (error) => reject(error.message),
            });
          }),
      );
  },
};
