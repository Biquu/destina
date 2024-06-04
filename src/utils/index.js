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
    type: "select",
    placeholder: "Cinsiyet",
    label: "Cinsiyet",
    componentType: "select",
    options: [
      { value: "", label: "Cinsiyet Seçin" },
      { value: "male", label: "Erkek" },
      { value: "female", label: "Kadın" },
      { value: "other", label: "Diğer" }
    ]
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
