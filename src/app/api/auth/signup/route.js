import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs"


export async function POST(request) {
    const body = await request.json();
    const {name ,email , password } = body;

    const existingUser = await prisma.user.findUnique({
        where: {email}
    });

    if (existingUser){
        return NextResponse.json(
            {error:"Email already exists"},
            {status:400}
        );
    };

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await prisma.user.create({
        data: 
        {
            name,
            email,
            password: hashedPassword
        }
    });

    return NextResponse.json(
        {message:"User created successfully" ,userId : user.id},
        {status:201}
    );
}

