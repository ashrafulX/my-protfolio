import type { User } from "@/features/profile/types/user";

export const USER: User = {
  firstName: "Md. Ashraful",
  lastName: "Islam",
  displayName: "Md. Ashraful Islam",
  username: "ashrafulX",
  gender: "male",
  pronouns: "he/him",
  bio: "Building with code. Learning one problem at a time.",
  timeZone: "Asia/Dhaka",
  flipSentences: [
    "Computer Science Student",
    "Competitive Programmer",
  ],
  address: "Dhaka, Bangladesh",
  // TODO: replace with your real phone number(s), base64 encoded (https://t.io.vn/base64-string-converter)
  phoneNumber: "Kzg4MDE1OTAwMjYyODU=", // +8801590026285
  secondPhoneNumber: "Kzg4MDE1OTAwMjYyODU=", // +8801590026285
  // TODO: replace with your real email, base64 encoded
  email: "YXNocmFmdWx3aG9AZ21haWwuY29t", // ashrafulwho@gmail.com
  // TODO: replace with your real website/domain once you have one
  website: "https://historoam.com",
  // resume link
  resumeUrl:
    "https://drive.google.com/file/d/1Kc6RL2Z7bJdBbA12L5JMKcOA58-5PXkh/view?usp=sharing",
  jobTitle: "Django & React Developer",
  jobs: [
    {
      title: "Django & React Developer",
      company: "",
      website: "",
    },
  ],
  about: `
I am a Computer Science student at **Northern University Bangladesh** and a Django & React developer focused on building scalable, user-friendly web applications. I combine strong problem-solving skills, developed through competitive programming, with practical experience in Django, React, and Tailwind CSS.
`,
  avatar: "/images/profile/avatar.jpg",
  ogImage: "https://ui-avatars.com/api/?name=Md+Ashraful+Islam&background=0D8ABC&color=fff&size=630",
  namePronunciationUrl: "",
  keywords: [
    "md ashraful islam",
    "ashraful islam",
    "ashrafulx",
    "computer science student",
    "competitive programmer",
    "icpc preparation",
    "cse undergraduate",
  ],
  dateCreated: "2026-07-17", // YYYY-MM-DD
};
