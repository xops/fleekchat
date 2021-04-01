import { createStore } from "reusable";
import useSpaceUser, { ILoginInfo } from "../hooks/useSpaceUser";
import { SpaceUser } from "@spacehq/sdk";
import { Dispatch } from "react";

export default createStore(() => {
  const spaceUser = useSpaceUser() as [SpaceUser | undefined, Dispatch<ILoginInfo>, Dispatch<ILoginInfo>];
  return spaceUser;
});
