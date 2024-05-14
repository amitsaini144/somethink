import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/VerficationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerifyEmail(username: string, email: string, otp: string): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'SomeThink <verify@somethinknow.com>',
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