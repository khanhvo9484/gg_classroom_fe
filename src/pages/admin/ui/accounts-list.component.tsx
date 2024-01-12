import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, Pagination, Stack } from "@mui/material";
import useAllUser from "@/hooks/all-users.hook";
import AccountComponent from "./account.component";
import { ChangeEvent, useState } from "react";

interface Props {}

const AccountListComponent: React.FC<Props> = () => {
  const { users } = useAllUser();

  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const usersPagination = users?.slice(
    (currentPageNumber - 1) * 15,
    currentPageNumber * 15
  );

  const handlePageChange = (
    event: ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setCurrentPageNumber(pageNumber);
  };

  return (
    <Box sx={{ marginTop: 4, marginBottom: 10 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgb(95,99,104)",
          paddingBottom: 1,
        }}
      >
        <Grid container>
          <Grid xs={2} item>
            <Typography
              variant="h6"
              sx={{ marginLeft: 9, color: "rgb(25,103,210)" }}
            >
              {`Tên`}
            </Typography>
          </Grid>
          <Grid xs={2} item>
            <Typography
              variant="h6"
              sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
            >
              {`Email`}
            </Typography>
          </Grid>
          <Grid xs={2} item>
            <Typography
              variant="h6"
              sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
            >
              {`Điện thoại`}
            </Typography>
          </Grid>
          <Grid xs={2} item>
            <Typography
              variant="h6"
              sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
            >
              {`Ngày sinh`}
            </Typography>
          </Grid>
          <Grid xs={2} item>
            <Typography
              variant="h6"
              sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
            >
              {`MSSV`}
            </Typography>
          </Grid>
          <Grid xs={2} item>
            <Typography
              variant="h6"
              sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
            >
              {`Tình trạng`}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {users &&
          usersPagination.map((user) => {
            return <AccountComponent account={user} />;
          })}
      </List>
      {users && (
        <Stack alignItems="center">
          <Pagination
            count={Math.ceil(users?.length / 15)}
            color="primary"
            onChange={(event, pageNumber) =>
              handlePageChange(event, pageNumber)
            }
          />
        </Stack>
      )}
    </Box>
  );
};

export default AccountListComponent;
