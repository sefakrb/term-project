import { Grid } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { status, data } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/auth");
  }

  return (
    <div style={{ height: "100vh" }}>
      <Grid columns={12} style={{ display: "flex", justifyContent: "center" }}>
        DAHSBOARD
      </Grid>
    </div>
  );
}
