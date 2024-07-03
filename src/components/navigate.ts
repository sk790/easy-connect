"use server"
import { redirect } from "next/navigation";

export async function navigate(data:FormData){
    console.log(data.get("search"));
    
    redirect(`/profile/${data.get("search")}`)
}