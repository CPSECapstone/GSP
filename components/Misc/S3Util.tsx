/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from "react";
import { Storage } from "@aws-amplify/storage";
import { Image, ImageBackground } from "react-native";

const PLACEHOLDER_IMG_URL = {
  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1K8ypPsfNVQU8lVxl1i2_ajismMS_w6FA4Q&usqp=CAU",
};

const PLACEHOLDER_BANNER = require("./PlaceholderImages/banner.jpeg");

type S3ImageProps = { S3key: string; style: object };
export function S3Image({ S3key, style }: S3ImageProps) {
  const [source, setSource] = useState(PLACEHOLDER_IMG_URL);

  useEffect(() => {
    getImage(S3key).then((response) => {
      if (response) setSource({ uri: response });
    });
  }, [S3key]);

  return <Image source={source} style={style} />;
}

export function S3ImageBackground({ S3key, style }: S3ImageProps) {
  const [source, setSource] = useState(PLACEHOLDER_BANNER);

  useEffect(() => {
    getImage(S3key).then((response) => {
      if (response) setSource({ uri: response });
    });
  }, [S3key]);

  return <ImageBackground resizeMode="cover" source={source} style={style} />;
}

function isValidUrl(url: string) {
  return fetch(url)
    .then((res) => {
      if (res.status === 404) {
        return false;
      }
      return true;
    })
    .catch(() => false);
}

async function getImage(S3key: string) {
  const url = await Storage.get(S3key);

  // Amplify storage returns a URL even if the file doesn't exist...
  // we only return the returned URL if its fetchable, otherwise return null
  return (await isValidUrl(url)) ? url : null;
}
