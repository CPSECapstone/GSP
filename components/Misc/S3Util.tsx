/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from "react";
import { Storage } from "@aws-amplify/storage";
import { Image, ImageBackground } from "react-native";

const PLACEHOLDER_IMG_URL = require("./PlaceholderImages/profile.png");

const PLACEHOLDER_BANNER = require("./PlaceholderImages/banner.jpeg");

type S3ImageProps = { S3key: string; style: object };
export function S3Image({ S3key, style }: S3ImageProps) {
  const [source, setSource] = React.useState(PLACEHOLDER_IMG_URL);
  getImage(S3key).then((response) => {
    if (response) setSource({ uri: response });
  });
  return <Image source={source} style={style} />;
}

export function S3ImageBackground({ S3key, style }: S3ImageProps) {
  const [source, setSource] = React.useState(PLACEHOLDER_BANNER);
  getImage(S3key).then((response) => {
    if (response) setSource({ uri: response });
  });

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
