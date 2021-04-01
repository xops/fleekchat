import React, { Dispatch, useEffect } from "react";
import { Users, SpaceUser, VaultBackupType, BrowserStorage } from "@spacehq/sdk";

export interface ILoginInfo {
  uuid: string;
  passphrase: string;
  backupType: VaultBackupType;
}

export default function useSpaceUser(): [SpaceUser | undefined, Dispatch<ILoginInfo>, Dispatch<ILoginInfo>] {
  const [users, setUsers] = React.useState<Users>();
  const [user, setUser] = React.useState<SpaceUser>();
  const [loginInfo, setLoginInfo] = React.useState<ILoginInfo>();
  const [registerInfo, setRegisterInfo] = React.useState<ILoginInfo>();

  const [userList, setUserList] = React.useState();

  useEffect(() => {
    const bs = new BrowserStorage();

    const asyncStuff = async () => {
      setUsers(await Users.withStorage(
        bs,
        { endpoint: "wss://auth-dev.space.storage" },
      ));
    };

    asyncStuff();
  }, []);

  useEffect(() => {
    if (users === undefined) { return; }
    if (user !== undefined) { return; }

    const authdUsers = users.list();
    if (authdUsers.length > 0) {
      setUser(authdUsers[0]);
    }
  }, [users]);

  useEffect(() => {
    if (users === undefined) { return; }
    if (loginInfo === undefined) { return; }

    users.recoverKeysByPassphrase(
      loginInfo.uuid,
      loginInfo.passphrase,
      loginInfo.backupType,
    )
      .then(setUser);

  }, [users, loginInfo]);

  useEffect(() => {
    if (users === undefined) { return; }
    if (registerInfo === undefined) { return; }

    users.createIdentity()
      .then((ident) => {
        return users.authenticate(ident);
      })
      .then((authdUser) => {
        return setUser(authdUser);
      });
  }, [users, registerInfo]);

  return [user, setLoginInfo, setRegisterInfo];
}
