"use client";
import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const CardAbout = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const setCardRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      cardsRef.current.push(node);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-hovered");
          } else {
            entry.target.classList.remove("is-hovered");
          }
        });
      },
      {
        rootMargin: '-35% 0px -35% 0px', // ใช้เปอร์เซ็นต์แทน vh
        threshold: 0.5, // ค่านี้สามารถปรับเปลี่ยนตามต้องการได้
      }
    );

    cardsRef.current.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      cardsRef.current.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-20 md:gap-12 my-4 mx-4 py-12 justify-items-center items-center">
        {[
          {
            title: 'User-Centric Design',
            description: 'เรานำเสนอการออกแบบที่เน้นผู้ใช้ ด้วยหลักการ UX/UI Design เพื่อให้คุณได้รับประสบการณ์การใช้งานที่น่าสนใจและมีประสิทธิภาพ.',
            image: '/User-Centric-Design.png',
          },
          {
            title: 'Customer Satisfaction',
            description: 'เรามุ่งมั่นในการส่งมอบผลงานที่ตรงตามความต้องการของคุณทันเวลา และการออกแบบที่ทำให้คุณพึงพอใจ.',
            image: '/Customer-Satisfaction.png',
          },
          {
            title: 'Compelling Brand Storytelling',
            description: 'เราไม่เพียงแค่สร้างเว็บไซต์ แต่ยังช่วยในการบอกเล่าเรื่องราวที่ดีเกี่ยวกับธุรกิจของคุณ เพื่อเสริมความน่าเชื่อถือและประสบการณ์ผู้ใช้ที่ดี.',
            image: '/Compelling-Brand-Storytelling.png',
          },
          {
            title: 'Effective Marketing Strategy',
            description: 'ทีมของเรามีความเชี่ยวชาญในการผสมผสานรูปแบบการสร้างเว็บไซต์และกลยุทธ์การตลาด เพื่อยกระดับธุรกิจของคุณ.',
            image: '/Marketing-Strategy.png',
          },
        ].map((card, index) => (
          <div
            key={index}
            className="card-container"
          >
            <div
              className="card"
              ref={setCardRef}
            >
              <Image src={card.image} alt={card.title} width={48} height={48} />
              <h3 className="Title1">{card.title}</h3>
              <p className="Title2">{card.description}</p>
              <div className="Iconclick"></div>
              <div className="layers">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="layer"></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardAbout;
