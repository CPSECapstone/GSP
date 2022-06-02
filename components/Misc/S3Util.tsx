/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, ImageSourcePropType } from "react-native";
import { Storage } from "@aws-amplify/storage";
import ImageCache from "./ImageCache";
import { Business } from "../../src/API";
import store from "../../redux/store";
import { updateBusinessRedux } from "../../redux/slices/business";

const PLACEHOLDER_IMG_URL = require("./PlaceholderImages/placeholderBusiness.png");
const PLACEHOLDER_BANNER = require("./PlaceholderImages/banner.jpeg");

type S3ImageProps = { S3key: string; style: object };
export function S3Image({ S3key, style }: S3ImageProps) {
  const [source, setSource] = useState(PLACEHOLDER_IMG_URL);

  useEffect(() => {
    ImageCache.checkCache(S3key).then((response) => {
      if (response) {
        setSource({ uri: response });
      }
    });
  }, [S3key]);

  return (
    <Image defaultSource={PLACEHOLDER_IMG_URL} source={source} style={style} />
  );
}

export function S3ImageBackground({ S3key, style }: S3ImageProps) {
  const [source, setSource] = useState(PLACEHOLDER_BANNER);

  useEffect(() => {
    ImageCache.checkCache(S3key).then((response) => {
      if (response) setSource({ uri: response });
    });
  }, [S3key]);

  return (
    <ImageBackground
      resizeMode="cover"
      defaultSource={PLACEHOLDER_BANNER}
      source={source}
      style={style}
    />
  );
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

// async function getImage(S3key: string) {
//   const url = await Storage.get(S3key);

//   // Amplify storage returns a URL even if the file doesn't exist...
//   // we only return the returned URL if its fetchable, otherwise return null
//   return (await isValidUrl(url)) ? url : null;
// }

export function getProfileImage(business: Business): ImageSourcePropType {
  if (!business.profileImage) {
    const pendingBusiness = { ...business };
    pendingBusiness.profileImage = "pending";
    store.dispatch(updateBusinessRedux(pendingBusiness));
    Storage.get(`${business.id}/profile`).then((url) => {
      isValidUrl(url).then((valid) => {
        if (valid) {
          const updatedBusiness = { ...business };
          updatedBusiness.profileImage = valid ? url : "default";
          store.dispatch(updateBusinessRedux(updatedBusiness));
        }
      });
    });
  }

  return { uri: business.profileImage };
}

export function getBannerImage(business: Business): ImageSourcePropType {
  if (!business.bannerImage) {
    const pendingBusiness = { ...business };
    pendingBusiness.bannerImage = "pending";
    store.dispatch(updateBusinessRedux(pendingBusiness));
    Storage.get(`${business.id}/banner`).then((url) => {
      isValidUrl(url).then((valid) => {
        if (valid) {
          console.log("GETTING b");
          const updatedBusiness = { ...business };
          updatedBusiness.bannerImage = valid ? url : "default";
          store.dispatch(updateBusinessRedux(updatedBusiness));
        }
      });
    });
  }

  return { uri: business.bannerImage };
}
