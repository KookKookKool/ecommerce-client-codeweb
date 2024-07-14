// components\card-aboutus.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";

const CardAbout = () => {
  const [isClicked, setIsClicked] = useState([false, false, false, false]);

  const handleClick = (index) => {
    const newClickedState = [...isClicked];
    newClickedState[index] = !newClickedState[index];
    setIsClicked(newClickedState);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6 gap-y-20 md:gap-12 my-4 mx-4 py-12 justify-items-center items-center">
        <div className="card-container">
          <div
            className={`card card-${0} ${isClicked[0] ? "clicked" : ""}`}
            onClick={() => handleClick(0)}
          >
            <Image src="/User-Centric-Design.png" alt="User-Centric-Design" width={200} height={200} />
            <h3 className="Title1">User-Centric Design</h3>
            <p className="Title2">
              เรานำเสนอการออกแบบที่เน้นผู้ใช้ ด้วยหลักการ UX/UI Design
              เพื่อให้คุณได้รับประสบการณ์การใช้งานที่น่าสนใจและมีประสิทธิภาพ.
            </p>
            <div className="Iconclick"></div>
            <div className="layers">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="layer"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="card-container">
          <div
            className={`card card-${1} ${isClicked[1] ? "clicked" : ""}`}
            onClick={() => handleClick(1)}
          >
            <Image
              src="/Customer-Satisfaction.png"
              alt="Customer-Satisfaction"
              width={200} height={200}
            />
            <h3 className="Title1">Customer Satisfaction</h3>
            <p className="Title2">
              เรามุ่งมั่นในการส่งมอบผลงานที่ตรงตามความต้องการของคุณทันเวลา
              และการออกแบบที่ทำให้คุณพึงพอใจ.
            </p>
            <div className="Iconclick"></div>
            <div className="layers">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="layer"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="card-container">
          <div
            className={`card card-${2} ${isClicked[2] ? "clicked" : ""}`}
            onClick={() => handleClick(2)}
          >
            <Image
              src="/Compelling-Brand-Storytelling.png"
              alt="Compelling-Brand-Storytelling"
              width={200} height={200}
            />
            <h3 className="Title1">Compelling Brand Storytelling</h3>
            <p className="Title2">
              เราไม่เพียงแค่สร้างเว็บไซต์
              แต่ยังช่วยในการบอกเล่าเรื่องราวที่ดีเกี่ยวกับธุรกิจของคุณ
              เพื่อเสริมความน่าเชื่อถือและประสบการณ์ผู้ใช้ที่ดี.
            </p>
            <div className="Iconclick"></div>
            <div className="layers">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="layer"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="card-container">
          <div
            className={`card card-${3} ${isClicked[3] ? "clicked" : ""}`}
            onClick={() => handleClick(3)}
          >
            <Image
              src="/Marketing-Strategy.png"
              alt="Marketing-Strategy"
              width={200} height={200}
            />
            <h3 className="Title1">Effective Marketing Strategy</h3>
            <p className="Title2">
              ทีมของเรามีความเชี่ยวชาญในการผสมผสานรูปแบบการสร้างเว็บไซต์และกลยุทธ์การตลาด
              เพื่อยกระดับธุรกิจของคุณ.
            </p>
            <div className="Iconclick"></div>
            <div className="layers">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="layer"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAbout;
