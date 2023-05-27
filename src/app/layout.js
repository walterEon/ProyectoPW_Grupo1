'use client';
import './globals.css'
import { Inter } from 'next/font/google'
import { useEffect } from "react"; //Esto es para cargar el js de bootstrap

import "bootstrap/dist/css/bootstrap.min.css";
import styles from './page.module.css'
import 'animate.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faCalendarDay } from '@fortawesome/free-solid-svg-icons'

const inter = Inter({ subsets: ['latin'] })


 
export default function LoginLayout({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
 return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
