import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AccountListComponent from "./ui/accounts-list.component";

const AdminAcountsPage = () => {
  return (
    <Box sx={{ marginY: "2rem", minHeight: "600px" }}>
      <Container
        maxWidth={false}
        sx={{
          //   height: "500px",
          maxWidth: "1400px",
        }}
      >
        <AccountListComponent />
      </Container>
    </Box>
  );
};

export default AdminAcountsPage;
