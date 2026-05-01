import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs"


export async function POST(request) {
    const body = await request.json();
    const {name ,email , password , username} = body;

    const [existingUser,existUsername] = await Promise.all([
        prisma.user.findUnique({
            where:{email}
        }),
        prisma.user.findUnique({
            where:{username}
        })
    ]);

    if (existingUser){
        return NextResponse.json(
            {error:"Email already exists"},
            {status:400}
        );
    };
    if (existUsername){
        return NextResponse.json(
            {error:"Username already taken"},
            {status:400}
        );
    };

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await prisma.user.create({
        data: 
        {
            name,
            username,
            email,
            password: hashedPassword
        }
    });

    return NextResponse.json(
        {message:"User created successfully" ,userId : user.id},
        {status:201}
    );
}

