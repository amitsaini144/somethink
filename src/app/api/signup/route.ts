import dbConnect from "@/lib/db";
import UserModel from "@/model/User";
import bcrypt from "bcrypt";

import { sendVerifyEmail } from "@/helpers/sendVerifyEmail";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        dbConnect();
        const { username, email, password } = await request.json()

        const verifiedExistingUser = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (verifiedExistingUser) {
            console.log("Username already exist")
            return Response.json({
                success: false,
                message: "Username already exist"
            }, { status: 400 })
        }

        const existingUserByEmail = await UserModel.findOne({ email })
        const otp = Math.floor(100000 + Math.random() * 900000).toString()

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "Email already exist"
                }, { status: 400 })
            } else {
                const hashPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashPassword
                existingUserByEmail.verifyCode = otp
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existingUserByEmail.save()
            }

        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password: hashPassword,
                verifyCode: otp,
                isVerified: false,
                verifyCodeExpiry: expiryDate,
                isAcceptingMessage: true,
                messages: []
            })
            await newUser.save()
        }

        const emailResponse = await sendVerifyEmail(username, email, otp)

        if (!emailResponse.success) {
            console.log("Username already exist")
            return Response.json({
                success: false,
                message: emailResponse.message
            }, { status: 500 })
        }
        return Response.json({
            success: true,
            message: "User registered successfully, please verify your email"
        }, { status: 200 })


    } catch (error) {
        return Response.json({
            success: false,
            message: "Error while sign-up"
        }, { status: 403 }
        )
    }

}