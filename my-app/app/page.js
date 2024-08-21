'use client'
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import Link from "next/link"
import Header from './common/Header';
import Footer from './common/Footer';

export default function Home() 
{
    return (
        <main >

            <Header />
            <Footer />

        </main>
    );
}

