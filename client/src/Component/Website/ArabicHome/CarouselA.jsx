import React, { useState, useEffect } from 'react';
import img1 from '../../Images/logo3.png'; // استبدل بالمصدر الصحيح للصورة الأولى
import img2 from '../../Images/logo2.png'; // استبدل بالمصدر الصحيح للصورة الثانية
import img3 from '../../Images/heroImage.jpg'; // استبدل بالمصدر الصحيح للصورة الثالثة
import img4 from '../../Images/map.jpg'; 

const CarouselA = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      const nextSlide = currentSlide === 4 ? 1 : currentSlide + 1;
      setCurrentSlide(nextSlide);
    }, 4000); // تحريك السلايدر كل 3 ثواني

    return () => {
      clearInterval(slideInterval); // إلغاء مؤقت التحريك عند تفكيك العنصر
    };
  }, [currentSlide]);

  return (
    <div>
      <div className="carousel w-[80%]">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i + 1}
            id={`slide${i + 1}`}
            className={`carousel-item relative w-full ${
              currentSlide === i + 1 ? 'visible' : 'hidden'
            }`}
          >
            <img
              src={i === 0 ? img1 : i === 1 ? img2 : i === 2 ? img3 : img4}
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide${i === 0 ? 4 : i}`}
                className="btn btn-circle"
                onClick={() => setCurrentSlide(i === 0 ? 4 : i)}
              >
                ❮
              </a>
              <a
                href={`#slide${i === 3 ? 1 : i + 2}`}
                className="btn btn-circle"
                onClick={() => setCurrentSlide(i === 3 ? 1 : i + 2)}
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarouselA;
