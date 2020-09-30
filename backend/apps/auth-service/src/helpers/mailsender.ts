import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.SENDER_EMAIL}`,
    pass: `${process.env.SENDER_PASSWORD}`,
  },
});

export const confirmEmail = async (email: string, code: string) => {
  return await transporter
    .sendMail({
      from: `${process.env.SENDER_EMAIL}`,
      to: email,
      subject: "Verificae your email",
      html: `<h3>We are glad to see you in our community!</h3> 
        <p>Please enter this code ${code} to confirm your email. </p><br>
        <p>If you didnt sign up, then please ignore this message.</p>`,
    })
    .then(() => console.log("success"))
    .catch((err) => console.log(err));
};

export const forgotPassEmail = async (email: string, code: string) => {
  return await transporter
    .sendMail({
      from: `${process.env.SENDER_EMAIL}`,
      to: email,
      subject: "Forgot your password?",
      html: `<h3>We are sorry to hear you forgot your password</h3> 
        <p>Please enter this code ${code} to renew your password. </p><br>
        <p>If you didn't send requst to restore your passport, then please contact our support.</p>`,
    })
    .then(() => console.log("success"))
    .catch((err) => console.log(err));
};
