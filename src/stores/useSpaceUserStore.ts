import { createStore } from "reusable";
import useSpaceUser, { LoginInfo } from "../hooks/useSpaceUser";
import { SpaceUser } from "@spacehq/sdk";
import { Dispatch } from "react";

export default createStore(() => {
  const spaceUser = useSpaceUser() as [SpaceUser | undefined, Dispatch<LoginInfo>, Dispatch<LoginInfo>];
  return spaceUser;
});
