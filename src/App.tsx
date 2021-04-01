import { AppBar, CssBaseline, Toolbar, Typography, IconButton, Grid, InputBase, Tooltip, CircularProgress, Button } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Link from "@material-ui/core/Link";
import React, { Dispatch, ChangeEvent, KeyboardEvent, useState, useEffect } from "react";
import { Link as RouterLink, Router, Route, Switch } from "react-router-dom";
import useDarkMode from "use-dark-mode";
import "./App.css";
import Dashboard from "./containers/Dashboard";
import { darkTheme, lightTheme } from "./themes/jadeTheme";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import CodeIcon from "@material-ui/icons/Code";
import { useTranslation } from "react-i18next";
import LanguageMenu from "./containers/LanguageMenu";
import { createBrowserHistory } from "history";
import { QueryParamProvider } from "use-query-params";
import { createPreserveQueryHistory } from "./helpers/createPreserveHistory";
import fleekChatLogo from "./fleekchat.png";
import { UserStorage } from "@spacehq/sdk";
import { useInterval } from "use-interval";
import useSpaceUserStore from "./stores/useSpaceUserStore";
import LoginDialog from "./components/LoginDialog/LoginDialog";
import { LoginInfo } from "./hooks/useSpaceUser";

const history = createPreserveQueryHistory(createBrowserHistory, ["network", "rpcUrl"])();

function App(props: any) {
  const { t } = useTranslation();
  const darkMode = useDarkMode();
  const theme = darkMode.value ? darkTheme : lightTheme;

  const [user, setLoginInfo, setRegisterInfo] = useSpaceUserStore();
  const [storage, setStorage] = useState<UserStorage>();

  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);

  const submitRegisterDialog = (registerInfo: LoginInfo) => {
    setLoginDialogOpen(false);
    setRegisterInfo(registerInfo);
  };

  const cancelLoginDialog = () => {
    setLoginDialogOpen(false);
  };

  const submitLoginDialog = (loginInfo: LoginInfo) => {
    setLoginDialogOpen(false);
    setLoginInfo(loginInfo);
  };

  useInterval(() => {
    if (user === undefined) { return; }

    const store = new UserStorage(user);
    store.listDirectory({ bucket: "fleekchat", path: "" }).then((res) => {
      debugger;
      console.log(res);
    });

  }, 10000, true);

  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <AppBar position="sticky" color="default" elevation={0}>
          <Toolbar>
            <Grid justify="space-between" alignItems="center" alignContent="center" container>
              <Grid item style={{ marginTop: "8px" }}>
                <Link
                  component={({ className, children }: { children: any, className: string }) => (
                    <RouterLink className={className} to={"/"}>
                      {children}
                    </RouterLink>
                  )}>
                  <Grid container>
                    <Grid>
                      <img
                        alt="expedition-logo"
                        height="30"
                        style={{ marginRight: "10px" }}
                        src={fleekChatLogo}
                      />
                    </Grid>
                    <Grid>
                      <Typography color="textSecondary" variant="h6">
                        {t("FleekChat")}
                      </Typography>
                    </Grid>
                  </Grid>
                </Link>
              </Grid>
              <Grid item>
                { user ? undefined : <Button variant="outlined" onClick={() => setLoginDialogOpen(true)}> Login </Button> }
                <LanguageMenu />
                <Tooltip title={t("FleekChat Github") as string}>
                  <IconButton
                    onClick={() =>
                      window.open("https://github.com/xops/fleekchat")
                    }>
                    <CodeIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t("Toggle Dark Mode") as string}>
                  <IconButton onClick={darkMode.toggle}>
                    {darkMode.value ? <Brightness3Icon /> : <WbSunnyIcon />}
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <LoginDialog
          open={loginDialogOpen}
          onRegister={submitRegisterDialog}
          onLogin={submitLoginDialog}
          onCancel={cancelLoginDialog}
        />
        <div style={{ margin: "0px 25px 0px 25px" }}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <CssBaseline />
            <Switch>
              <Route path={"/"} component={Dashboard} exact={true} />
            </Switch>
          </QueryParamProvider>
        </div>
      </ThemeProvider >
    </Router >
  );
}

export default App;
