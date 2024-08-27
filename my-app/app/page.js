"use client"
import Header from './common/Header';
import Footer from './common/Footer';
/* import ListConsultation from './common/ListConsultation'; */
import ListConsultation from '@/app/common/ListConsultation';

export default function Home() {
    return (
        <div className="container">
            <Header />
            <main className="main-content">
                <ListConsultation />
            </main>
            <Footer />
        </div>
    );
}
