import { Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import loginCss from "../styles/login.module.css";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function Login() {
  return (
    <div style={{ height: "100vh" }} className={loginCss.mainLayout}>
      <Grid className={loginCss.mainLayout} container spacing={0}>
        <Grid className={loginCss.gridPart} item xs={5}>
          <TextField
            required
            id="outlined-required"
            label="username"
            className={loginCss.login}
          ></TextField>
        </Grid>
        <Grid className={loginCss.gridPart} item xs={5}>
          <TextField
            required
            id="outlined-required"
            label="password"
            type="password"
            className={loginCss.login}
          ></TextField>
        </Grid>
      </Grid>

      <Grid className={loginCss.buttonStyle}>
        <Grid className={loginCss.gridPart} item xs={4}>
          <Button variant="outlined">Login</Button>
        </Grid>
      </Grid>
      <Link href="/register">
        <Typography variant="body2" color="gray" component="div">
          Don't you have an account?
        </Typography>
      </Link>
    </div>
  );
}
