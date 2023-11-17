import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { MemberModel } from "../../models/member.model";
import image7 from "../../assets/images/khang.png";
import EditProfileForm from "../../components/ui/form/edit-profile.form";

const member: MemberModel = {
  name: "Khang Duy",
  image: image7,
  description:
    "Khang, tư duy sắc bén, đam mê mã nguồn mở và lập trình. Sở thích của anh không chỉ giải quyết vấn đề mà còn nghiên cứu và áp dụng công nghệ mới.",
};

const EditProfilePage = () => {
  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box>
          <EditProfileForm member={member} />
        </Box>
      </Container>
    </Box>
  );
};

export default EditProfilePage;
