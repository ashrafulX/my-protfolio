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
  website: "https://ashrafulx.vercel.app",
  jobTitle: "Jr software Engineer",
  // Fresher — no professional job yet, so these are placeholders describing my
  // current focus. Once I start working, replace with { title, company, website }.
  jobs: [
    {
      title: "Computer Science Student",
      company: "Northern University Bangladesh",
      website: "#",
    },
    {
      title: "",
      company:"",
      website: "",
    },
  ],
  about: `
- **Computer Science Student** at **Northern University Bangladesh**.
- **Competitive Programmer** preparing for **ICPC** and other programming contests.
- Continuously improving my problem-solving skills and learning through coding challenges.
- Building my foundation in software development while growing as a programmer and student.
`,
  avatar: "https://ui-avatars.com/api/?name=Md+Ashraful+Islam&background=0D8ABC&color=fff&size=256",
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
