import React from "react";
import LogoTera from "../../../assets/terapy.jpeg";

const Footer = () => {
  return (
    <>
      <div className="bg-white flex">
        <div className="flex-col m-10 pl-10 text-2xl">
          <div className="flex items-center">
            <img
              src={LogoTera}
              alt="Logo"
              className="h-12 border-transparent rounded-full"
            />
            <h1 className="p-3 text-3xl font-bold">Terapy</h1>
          </div>
          <a
            href="https://github.com/Lucao-Bala/ProjetoTerapy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className='bx bxl-github text-5xl'></i>
          </a>
          <i className="bx bxs-envelope text-5xl p-2"></i>
          <h2 className="p-2">© 2025 Terapy. Todos os direitos são reservados.</h2>
        </div>
      </div>
    </>
  );
};

export default Footer;
