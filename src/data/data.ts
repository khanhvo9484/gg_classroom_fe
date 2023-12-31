import image8 from "../assets/images/khanh.png";
import image7 from "../assets/images/khang.png";
import image1 from "../assets/images/jack.png";
import { IMember } from "../models/member.model";

export const members: IMember[] = [
  {
    id: "3",
    name: "Khang Duy",
    avatar: image7,
    bio: "Khang, tư duy sắc bén, đam mê mã nguồn mở và lập trình. Sở thích của anh không chỉ giải quyết vấn đề mà còn nghiên cứu và áp dụng công nghệ mới.",
  },
  {
    id: "4",
    name: "Khanh Võ",
    avatar: image8,
    bio: "Khanh, người sáng tạo và năng động, tận hưởng niềm vui lập trình và đam mê mã nguồn mở để thách thức bản thân và đóng góp cho cộng đồng.",
  },
  {
    id: "5",
    name: "Khoa Nguyễn",
    avatar: image1,
    bio: "Jack, người đầy năng lượng tích cực, say mê mọi khía cạnh của lập trình và nghiên cứu. Với tâm huyết cao, Jack không chỉ giải quyết vấn đề một cách xuất sắc mà còn thích chia sẻ kiến thức và kinh nghiệm.",
  },
];
