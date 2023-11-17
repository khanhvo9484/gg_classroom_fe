import image8 from "../assets/images/khanh.png";
import image7 from "../assets/images/khang.png";
import image1 from "../assets/images/jack.png";
import { MemberModel } from "../models/member.model";

export const members: MemberModel[] = [
  {
    name: "Khang Duy",
    image: image7,
    description:
      "Khang, tư duy sắc bén, đam mê mã nguồn mở và lập trình. Sở thích của anh không chỉ giải quyết vấn đề mà còn nghiên cứu và áp dụng công nghệ mới.",
  },
  {
    name: "Khanh Võ",
    image: image8,
    description:
      "Khanh, người sáng tạo và năng động, tận hưởng niềm vui lập trình và đam mê mã nguồn mở để thách thức bản thân và đóng góp cho cộng đồng.",
  },
  {
    name: "Khoa Nguyễn",
    image: image1,
    description:
      "Jack, người đầy năng lượng tích cực, say mê mọi khía cạnh của lập trình và nghiên cứu. Với tâm huyết cao, Jack không chỉ giải quyết vấn đề một cách xuất sắc mà còn thích chia sẻ kiến thức và kinh nghiệm.",
  },
];
