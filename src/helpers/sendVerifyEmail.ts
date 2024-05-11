import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/VerficationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerifyEmail(username: string, email: string, otp: string): Promise<ApiResponse> {
    try {
        console.log("Email is ", email)
        console.log("username is ", username)
        console.log("otp is ", otp)

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification OTP',
            react: VerificationEmail({ username, otp }),
        });
        console.log("Email send Successfully");
        return { success: true, message: "Email send successfully" }

    } catch (error) {
        console.error("Error while sending email")
        return { success: false, message: "Sending email failed" }
    }

}