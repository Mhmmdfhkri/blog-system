import React from "react";

function Navbar() {
  return (
    <header className="bg-white py-6 border">
      <navbar className="container mx-auto flex justify-between px-5">
        <a href="/">
          <img src="/logo.png" alt="" className="h-12"/>
        </a>
      </navbar>
    </header>
  );
}

export default Navbar;
