import React from "react";

function Footer() {
  return (
<footer className="flex flex-col space-y-10 justify-center p-18 bg-background2 w-full ">

<nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium pt-12">
    <a className="hover:text-primary" href="/">Home</a>
    <a className="hover:text-primary" href="/about">About</a>
    <a className="hover:text-primary" href="/service">Service</a>
    <a className="hover:text-primary" href="/contact">Contact</a>
</nav>

<div className="flex justify-center space-x-5">
    <a href="https://lin.ee/Kj6s0ghF" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/?size=48&id=21746&format=png" />
    </a>
    <a href="https://www.facebook.com/CodeWebTH/" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/?size=48&id=YFbzdUk7Q3F8&format=png" />
    </a>
</div>
<p className="text-center pb-12 text-gray-700 font-medium">&copy; 2024 CodeWeb Company. All rights reservered.</p>
</footer>
  );
}

export default Footer;
