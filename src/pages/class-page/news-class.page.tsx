import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ImageRead from "@/assets/images/img_read.jpg";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ClassCodeComponent from "./ui/class-code.component";
import PostComponent from "./ui/card-post.component";

// import { useState } from "react";

const NewsClassPage = () => {
  return (
    <Box sx={{ marginY: "2rem" }}>
      <Container maxWidth="md" sx={{ paddingX: "none !important" }}>
        {/* hahaha */}
        <Box sx={{ position: "relative" }}>
          <Box
            component="img"
            src={ImageRead}
            sx={{ objectFit: "cover", width: "100%", borderRadius: "0.5rem" }}
          />
          <Typography
            variant="h4"
            sx={{ color: "white", bottom: 16, left: 24, position: "absolute" }}
          >
            20CTT4
          </Typography>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Grid container sx={{ width: "100%" }}>
            <Grid xs={3}>
              <ClassCodeComponent />
            </Grid>

            <Grid
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              xs={9}
            >
              <PostComponent />
              <PostComponent />
              <PostComponent />
              <PostComponent />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default NewsClassPage;
