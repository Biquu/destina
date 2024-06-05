import Female1 from '../assets/profilePictures/Female1.png';
import Female2 from '../assets/profilePictures/Female2.png';
import Female3 from '../assets/profilePictures/Female3.png';
import Female4 from '../assets/profilePictures/Female4.png';
import Female5 from '../assets/profilePictures/Female5.png';
import Male1 from '../assets/profilePictures/Male1.png';
import Male2 from '../assets/profilePictures/Male2.png';
import Male3 from '../assets/profilePictures/Male3.png';
import Male4 from '../assets/profilePictures/Male4.png';
import Male5 from '../assets/profilePictures/Male5.png';
import Coyote from '../assets/mascots/Coyote.png';
import Lion from '../assets/mascots/Lion.png';
import Flag from '../assets/logos/Turkiye.png';
import Logo from '../assets/logos/Logo.png';
import Arrow from '../assets/components/arrow-down-orange.png'
import Pencil from '../assets/components/pencil.png'
import Leave from '../assets/components/leave.png'
import Copy from '../assets/components/copy.png'
import Butterfly from '../assets/mascots/Butterfly.png';
import Bear3 from '../assets/mascots/Bear3.png';
import Bear2 from '../assets/mascots/Bear2.png';
import Bear from '../assets/mascots/Bear.png';
import Eye from '../assets/components/eye.png';


export const images = [
  { src: Female1, alt: "Female1" },
  { src: Female2, alt: "Female2" },
  { src: Female3, alt: "Female3" },
  { src: Female4, alt: "Female4" },
  { src: Female5, alt: "Female5" },
  { src: Male1, alt: "Male1" },
  { src: Male2, alt: "Male2" },
  { src: Male3, alt: "Male3" },
  { src: Male4, alt: "Male4" },
  { src: Male5, alt: "Male5" }
];

export const imageAssets = {
  Copy, Leave, Pencil, Arrow, Logo, Flag, Lion, Coyote, Butterfly,
  Bear, Bear2, Bear3, Eye
};
export const playerImages = {
  Female1, Female2, Female3, Female4, Female5,
  Male1, Male2, Male3, Male4, Male5
};

export const registrationFormControls = [
  {
    id: "age",
    type: "number",
    placeholder: "Yaş",
    label: "Yaş",
    componentType: "input",
  },
  {
    id: "gender",
    type: "text",
    placeholder: "Cinsiyet",
    label: "Cinsiyet",
    componentType: "input",
  },
  {
    id: "username",
    type: "text",
    placeholder: "Rumuz",
    label: "Kullanıcı Adı",
    componentType: "input",
  },
  {
    id: "email",
    type: "email",
    placeholder: "E-posta",
    label: "E-posta",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Parola",
    label: "Parola",
    componentType: "input",
  },

];

export const loginFormControls = [
  {
    id: "email",
    type: "email",
    placeholder: "E-posta",
    label: "E-posta",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Parola",
    label: "Parola",
    componentType: "input",
  },
];
