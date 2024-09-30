"use client";
import Link from "next/link";
import { useState } from "react";

function MyUserProfile(action) {

    return (
        
        
                <div className="MyUserProfile" >
                <img className = "userPicture"src="user.png" alt="Girl in a jacket" width={40} height={40}onclick={action}></img>
                </div>
        

    );
}

export default MyUserProfile;