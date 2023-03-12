import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import loginCss from "./login.module.css";
import Button from "@mui/material/Button";
import { UsersService } from "../api/users";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    if (userName && password) {
      UsersService.login({
        userName: userName,
        password: password,
      }).then((response) => {
        console.log(response);
        if (response.id) {
          router.push("/");
        }
      });
    } else {
      console.log("null");
    }
  }

  return (
    <div style={{ height: "100vh" }} className={loginCss.mainLayout}>
      <Grid className={loginCss.mainLayout} container spacing={0}>
        <Grid className={loginCss.gridPart} item xs={5}>
          <TextField
            required
            id="outlined-required"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            label="username"
            className={loginCss.login}
          ></TextField>
        </Grid>
        <Grid className={loginCss.gridPart} item xs={5}>
          <TextField
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-required"
            label="password"
            type="password"
            className={loginCss.login}
          ></TextField>
        </Grid>
      </Grid>

      <Grid className={loginCss.buttonStyle}>
        <Grid className={loginCss.gridPart} item xs={4}>
          <Button onClick={login} variant="outlined">
            Login
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
