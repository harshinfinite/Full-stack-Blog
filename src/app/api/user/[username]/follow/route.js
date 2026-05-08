import { auth } from "@/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request, { params }) {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
    const { username } = await params;

    try {

        const targetUser = await prisma.user.findUnique({
            where: {
                username
            }
        })

        const followExist = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followingId: targetUser.id,
                    followerId: parseInt(session.user.id)

                }
            }
        })

        if (!followExist) {
            await prisma.follow.create({
                data: {
                    followerId: parseInt(session.user.id),
                    followingId: targetUser.id
                }
            })
        } else {
            await prisma.follow.delete({
                where: {
                    followerId_followingId: {
                        followingId: targetUser.id,
                        followerId: parseInt(session.user.id)

                    }
                }
            })
        }
        return NextResponse.json({ followed: !followExist }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Something Went Wrong" }, { status: 500 })
    }

}