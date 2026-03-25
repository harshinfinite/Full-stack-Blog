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
            {error:"Email already axists"},
            {status:400}
        )
    }


}

