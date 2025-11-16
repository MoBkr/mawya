
import React, { useState, useEffect, useRef } from 'react';
import type { Certificate } from './types';

// --- EMBEDDED ASSETS ---
// The professor's personal photo, encoded in base64.
const profilePhoto = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAYEBAUEBAYFBQUGBgYHCQ4JCQgICRINDQoOFRIWFhUSFBQXGIctGyQpKSgvITEwUT04MkY4PCgoSDRCQTg2Py0pP/2wBDAQYHBwYIChgQEBcsGg8sLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCAEgAMsDASIAAhEBAxEB/8QAGwABAAIDAQEAAAAAAAAAAAAAAAQFAgMGAQf/xAAzEAACAQMCBAQEBAcAAAAAAAABAgMABBEFIRIiMUFRYQYTMnGBFCNSkaHB0fAVJENi4f/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAHBEBAQEAAwEAAwAAAAAAAAAAAAERIQISIUED/9oADAMBAAIRAxEAPwDcaUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUqG6u4bO3eeZtqIMmgJqV5tceIrqSQm3VUQHgVGTn3qI8SX/wD6x/YUD0yleY/iS//APWP7CjxJf8A/rH9hQPXK8tTiS/U5ExPuVB/ap7HxFPG4W7AkQ82Aww/pQelUpQRypNGskbB0YZDKcg0oFSlKBSlKBSlKBSlKBSlKBSlKBXlnia6M980IPyQYA9zya9TryHXrY2+p3CkcM5cfQ5NAjUqK53/TqGkR0fGxLch/m/em+9bY/U4x15qI7eQ55qWwtXvLqO3j5scZPYdSaCm6mYszMSx5JNTWGn3GoSmO3XOMFnPCr7mpde0lNNkWWBibdzhQeSn09q1XgyEQ6RkDBd2Y/wBKDCX+jXlgpaZAYwceKnI+vvUJAIwRkV73LFHNG0cqB0YYKsMg15H4g046dfugH5L/NF7fT6UDpSlApSlApSlApSlApSlApSlAqd7G5S1S6aMiFzhX7E1BXoHgvVEuLU2TsBLFyoPVD/Sg89r1HwRa+Vp7XLDBmbj/ACjivPbyEQXU0SnKo7KPoDivXvCmoJe6THGuPMgHlsPTgR+lBF4v00Xdl56L+bBzgDqp5FeT19FkA8RXz94c0w3+pb2H5MGGb3PIf1oNj4P0zyLb5rIvzS8F7KP61s1KVAry3xZZfZ9SlYDCy/OuPXn+tepVg/GVn59h56jLwnn2U8Gg8ypSo7mdba3kmfgibmgs9B0T5f/ALC8X8w8YIzyP9xq/qv6D06r/C/w/N61nNR1eS4ldLdykQOPN7+1d1jqk8UirO5kiJwSev1oN9SopLiOKPc7ACsLq2sS/LCh2r68zQT6lrCQgpAfMfsOFHrWJkkkmkMkjFnPJJoJJJpZpDJIxZz1NSWN89lNuXLRE/Mvv6isjZ6VcXWGYeXGeGavbXRLWMfvQZX9zwoLKx1CC9Q+WcOOaHga+wWlvaKVgQKD17mq5I44l2xqqqOgGKV+aUpQKUpQKUpQeR+JNPNjqUuB+XIfMQ+x5/rW+8GaolxbGyciOWP5Vz/Enh/X0rH+KbQXGmSSAYeEeYp9hzrBaBffaNNjUn54/lb/eg3teqeBLHyNPM7DDStx7KOleYIu91XOMkDNfQenWq2dnDAgwEUD696Caqt/Zx3ttJBKMo4wasqUGN0zRBZXz3IdjlSqg9FzmrPUNPg1GHypl45VhxU+xq3SooLHTLPTwRbptLdTyzV7SlApSlApSlApSlApSlApSlAqG8tYr23eCVdyOMGo6UGdGlX1izHSrramf9u45T/ACnqKpXN7qUey4jS3hPBWM5Zh6npWpSgwr6BCxyJ5R9cV9h8N2inLySuPVsVqFKBBDaQW/+3jVfcCrClKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKD//Z";

// --- CONTENT TO BE DISPLAYED ---
// All content is extracted from the provided CV.
const portfolioContent = {
  name: "معاوية يوسف المهدي",
  title: "أستاذ مساعد ومحاضر في تعليم اللغة العربية للناطقين بغيرها",
  about: "أسعى للعمل كمحاضر في تعليم اللغة العربية للناطقين بغيرها، مستفيدًا من خبرتي الأكاديمية والعملية في تدريس مهارات اللغة الأربع وتقديم المقررات المتخصصة، مع الإسهام في تطوير المناهج، ودعم البحث العلمي، وتعزيز بيئة تعليمية فعالة تسهم في نشر اللغة العربية وثقافتها بين المتعلمين من مختلف الجنسيات.",
  cvUrl: "https://drive.google.com/file/d/1Gmj4ZxfYoV_x4KHkQUvQ2JsNB7BkNXz2/view?usp=sharing", // Replace with the actual link to the CV PDF file
  contact: {
    phone: "249927246751",
    email: "mawyaalyousify@gmail.com",
    address: "أم درمان، السودان"
  },
  experience: [
    { title: "أستاذ مساعد", institution: "كلية اللغة العربية، جامعة أفريقيا العالمية", period: "2018 - 2019", description: "تدريس مهارات اللغة العربية للناطقين بغيرها (تحدث - قراءة - استماع - ثقافة اسلامية)." },
    { title: "محاضر متعاقد", institution: "معهد اللغة العربية للناطقين بغيرها، جامعة أفريقيا العالمية", period: "2013 - 2017", description: "تدريس مهارات اللغة العربية للناطقين بغيرها (تحدث - قراءة - استماع - ثقافة اسلامية)." },
    { title: "محاضر", institution: "جامعة كرري", period: "2015 - 2016", description: "تدريس متطلبات جامعة (لغة عربية)." },
    { title: "معلم بمرحلة الأساس", institution: "وزارة التربية والتعليم السودانية", period: "2004 - 2015", description: "معلم في مرحلة التعليم الأساسي." }
  ],
  education: [
    { degree: "دكتوراة علم اللغة التطبيقي", institution: "جامعة السودان للعلوم والتكنولوجيا", year: "2018" },
    { degree: "ماجستير تعليم اللغة العربية للناطقين بغيرها", institution: "معهد الخرطوم الدولي", year: "2011" },
    { degree: "دبلوم عالي تعليم اللغة العربية للناطقين بغيرها", institution: "معهد الخرطوم الدولي", year: "2011" },
    { degree: "بكالوريوس تعليم اللغة العربية للناطقين بغيرها", institution: "معهد الخرطوم الدولي", year: "2010" }
  ],
  skills: [
    "استعمال الحاسب الآلي", "مهارات التواصل", "العمل ضمن فريق", "القيادة والإشراف",
    "التكيف والمرونة", "مهارات العرض والتقديم", "إدارة الوقت", "التعامل مع الجنسيات والثقافات المختلفة"
  ],
  training: [
    "دورة اعداد المعلمين - وزارة التربية والتعليم",
    "دورة الأئمة والدعاة - جامعة القرآن الكريم - كلية الدعوى والاعلام",
    "دورة مراقبي التعداد السكاني",
    "دورة في تكنولوجيا التعليم (استخدام السبورة الذكية)",
    "دبلوم عالي من المركز القومي للدراسات الدبلوماسية - وزارة الخارجية السودانية"
  ],
  certificates: [
    { id: 1, title: 'دكتوراه علم اللغة التطبيقي', thumbnailUrl: 'https://i.postimg.cc/XNRGkVfC/shhadt-aldktwrah-ʿrby.jpg', fullUrl: 'https://i.postimg.cc/XNRGkVfC/shhadt-aldktwrah-ʿrby.jpg' },
    { id: 2, title: 'شهادة إعداد المعلمين', thumbnailUrl: 'https://via.placeholder.com/400x250/bfa06b/263238?text=Certificate', fullUrl: 'https://via.placeholder.com/1200x800/bfa06b/263238?text=Certificate' },
    { id: 3, title: 'شهادة الدراسات الدبلوماسية', thumbnailUrl: 'https://via.placeholder.com/400x250/bfa06b/263238?text=Certificate', fullUrl: 'https://via.placeholder.com/1200x800/bfa06b/263238?text=Certificate' },
  ]
};


// --- HELPER & UI COMPONENTS ---

const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>);
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.75 13.96c.25.13.43.2.5.33.07.13.07.55.03.63-.04.08-.25.2-.53.34-.28.14-1.2.55-1.48.55-.28 0-.58-.1-.8-.3-.23-.2-.6-.45-1.13-.93-.63-.58-1.03-1.3-1.13-1.53-.1-.23-.03-.35.08-.48.1-.1.23-.25.33-.35.1-.1.15-.18.23-.3.08-.12.04-.25 0-.4-.04-.15-.28-.68-.38-.93-.1-.25-.2-.2-.28-.2-.08 0-.18-.03-.28-.03-.1 0-.25.04-.38.2-.12.16-.48.45-.48.93 0 .48.5.95.55 1.03.05.08 1.03 1.6 2.5 2.2.35.14.68.2.9.28.43.15.73.13.98.08.25-.05.78-.3.88-.6.1-.3.1-.55.08-.6-.04-.05-.13-.08-.28-.13zM12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18.2c-4.5 0-8.2-3.7-8.2-8.2S7.5 3.8 12 3.8s8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2z"></path></svg>);

// Custom hook for scroll animations
const useScrollAnimation = <T extends HTMLElement,>() => {
  const ref = useRef<T>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-10');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);
  return ref;
};

// Generic Section component
const AnimatedSection: React.FC<{id: string, children: React.ReactNode, className?: string}> = ({ id, children, className }) => {
    const ref = useScrollAnimation<HTMLElement>();
    return (
        <section ref={ref} id={id} className={`py-20 px-6 md:px-12 lg:px-24 opacity-0 transform translate-y-10 transition-all duration-700 ease-out ${className}`}>
            {children}
        </section>
    );
};

// --- SECTION COMPONENTS ---

const Header: React.FC<{ onNavigate: (id: string) => void }> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { id: 'hero', text: 'الرئيسية' },
    { id: 'about', text: 'عني' },
    { id: 'experience', text: 'الخبرات' },
    { id: 'education', text: 'التعليم' },
    { id: 'skills', text: 'المهارات' },
    { id: 'courses', text: 'الدورات والشهادات' },
    { id: 'contact', text: 'للتواصل' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-primary/80 backdrop-blur-sm shadow-lg z-50 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-title text-accent font-bold">معاوية يوسف المهدي</h1>
        <nav className="hidden md:flex space-x-6 space-x-reverse">
          {navLinks.map(link => (<button key={link.id} onClick={() => handleLinkClick(link.id)} className="hover:text-accent transition-colors duration-300 font-semibold">{link.text}</button>))}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">{isOpen ? <CloseIcon className="w-7 h-7"/> : <MenuIcon className="w-7 h-7" />}</button>
        </div>
      </div>
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
          <nav className="flex flex-col items-center p-4 bg-primary/90">
            {navLinks.map(link => (<button key={link.id} onClick={() => handleLinkClick(link.id)} className="py-2 hover:text-accent transition-colors duration-300 w-full text-center">{link.text}</button>))}
          </nav>
      </div>
    </header>
  );
};

const Hero: React.FC = () => (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-background text-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23263238' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0h1v5h9V0h1v5h9V0h1v5h9V0h1v5h9V0h1v5h9V0h1v5h9V0h1v5h9V0h1v5h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h-1v-9h-9v9h-1v-9h-9v9h-1v-9h-9v9h-1v-9h-9v9h-1v-9h-9v9h-1v-9h-9v9h-1v-9H5v-1h15v-9H5v-1h15v-9H5v-1h15v-9H5v-1h15v-9H5v-1h15v-9H5v-1h15v-9H5v-1h15V5H6zm10 0h9V0h-9v5zm10 0h9V0h-9v5zm10 0h9V0h-9v5zm10 0h9V0h-9v5zm10 0h9V0h-9v5zm10 0h9V0h-9v5zm10 0h9V0h-9v5zm9 1v9h-9V6h9zm-10 0v9h-9V6h9zm-10 0v9h-9V6h9zm-10 0v9h-9V6h9zm-10 0v9h-9V6h9zm-10 0v9h-9V6h9zm-10 0v9h-9V6h9zm-10 0v9h-9V6h9zm0 10h9v9h-9v-9zm10 0h9v9h-9v-9zm10 0h9v9h-9v-9zm10 0h9v9h-9v-9zm10 0h9v9h-9v-9zm10 0h9v9h-9v-9zm10 0h9v9h-9v-9zm10 0h9v9h-9v-9zm9 1v9h-9v-9h9zm-10 0v9h-9v-9h9zm-10 0v9h-9v-9h9zm-10 0v9h-9v-9h9zm-10 0v9h-9v-9h9zm-10 0v9h-9v-9h9zm-10 0v9h-9v-9h9zm-10 0v9h-9v-9h9zm0 10h9v9h-9v-9zm10 0h9v9h-9v-9zm10 0h9v9h-9v-9zm10 0h9v9h-9v-9zm10 0h9v9h-9v-9zm10 0h9v9h-9v-9zm10 0h9v9h-9v-9zm10 0h9v9h-9v-9zm9 1v9h-9v-9h9zm-10 0v9h-9v-9h9zm-10 0v9h-9v-9h9zm-10 0v9h-9v-9h9zm-10 0v9h-9v-9h9zm-10 0v9h-9v-9h9zm-10 0v9h-9v-9h9zm-10 0v9h-9v-9h9zm0 10h9v9h-9v-9zm10 0h9v9h-9v-9zm10 0h9v9h-9v-9zm10 0h9v9h-9v-9zm10 0h9v9h-9v-9zm10 0h9v9h-9v-9zm10 0h9v9h-9v-9zm10 0h9v9h-9v-9zm9 1v9h-9v-9h9zm-10 0v9h-9v-9h9zm-10 0v9h-9v-9h9zm-10 0v9h-9v-9h9zm-10 0v9h-9v-9h9zm-10 0v9h-9v-9h9zm-10 0v9h-9v-9h9zm-10 0v9h-9v-9h9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: 'auto'}}></div>
        <div className="text-center p-6 pt-24 z-10">
            <img 
                src="https://i.postimg.cc/fRNJ9BxY/Whats-App-Image-2025-11-15-at-19-31-04-b5fa406b.jpg"
                alt="صورة شخصية لمعاوية يوسف المهدي" 
                className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-accent shadow-lg object-cover"
            />
            <h1 className="text-5xl md:text-7xl font-title font-bold text-accent mb-4">{portfolioContent.name}</h1>
            <p className="text-xl md:text-2xl font-body max-w-3xl mx-auto">{portfolioContent.title}</p>
             <a 
                href={portfolioContent.cvUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-8 inline-block bg-accent text-white font-bold py-3 px-8 rounded-lg hover:bg-yellow-700/80 transition-all duration-300 shadow-md transform hover:scale-105"
            >
                تحميل السيرة الذاتية (PDF)
            </a>
        </div>
    </section>
);

const About: React.FC = () => (
  <AnimatedSection id="about" className="bg-background printable-section">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-title font-bold text-primary mb-6">الهدف الوظيفي</h2>
      <p className="max-w-4xl mx-auto text-lg leading-relaxed text-text-secondary">
        {portfolioContent.about}
      </p>
    </div>
  </AnimatedSection>
);

const Experience: React.FC = () => (
    <AnimatedSection id="experience" className="bg-primary/5 printable-section">
      <div className="container mx-auto">
        <h2 className="text-4xl font-title font-bold text-primary text-center mb-12">الخبرات العملية</h2>
        <div className="relative border-r-2 border-accent/30 md:mx-auto md:w-full md:max-w-3xl">
          <div className="absolute -top-1 -right-[9px] w-4 h-4 rounded-full bg-accent ring-4 ring-background"></div>
          {portfolioContent.experience.map((item, index) => (
            <div key={index} className="mb-10 ms-8 relative">
                <div className="absolute -right-[41px] top-1 w-4 h-4 rounded-full bg-primary border-2 border-accent"></div>
                <h3 className="text-2xl font-bold font-title text-primary">{item.title}</h3>
                <p className="text-md font-semibold text-accent mb-1">{item.institution}</p>
                <span className="text-sm text-text-secondary">{item.period}</span>
                <p className="mt-2 text-text-primary">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
);

const Education: React.FC = () => (
    <AnimatedSection id="education" className="bg-background printable-section">
      <div className="container mx-auto">
        <h2 className="text-4xl font-title font-bold text-primary text-center mb-12">التعليم والمؤهلات</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {portfolioContent.education.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 border-r-4 border-accent">
                <h3 className="text-2xl font-bold font-title text-primary">{item.degree}</h3>
                <p className="text-md font-semibold text-accent mb-1">{item.institution}</p>
                <span className="text-sm text-text-secondary">{item.year}</span>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
);

const Skills: React.FC = () => (
  <AnimatedSection id="skills" className="bg-primary/5 printable-section">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-title font-bold text-primary mb-12">المهارات الشخصية</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {portfolioContent.skills.map((skill, index) => (
          <span key={index} className="bg-primary text-background text-lg font-semibold py-2 px-5 rounded-md shadow-sm hover:bg-primary/90 hover:shadow-md transition-all transform hover:scale-105">
            {skill}
          </span>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

const CoursesAndCertificates: React.FC<{onCertClick: (cert: Certificate) => void}> = ({ onCertClick }) => (
  <AnimatedSection id="courses" className="bg-background printable-section">
    <div className="container mx-auto">
      <h2 className="text-4xl font-title font-bold text-primary text-center mb-12">الدورات والشهادات</h2>
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
            <h3 className="text-2xl font-title text-primary mb-6 text-center lg:text-right">دورات تدريبية</h3>
            <ul className="max-w-3xl mx-auto text-right list-inside space-y-3">
                {portfolioContent.training.map((course, index) => (
                <li key={index} className="text-lg text-text-primary flex items-start">
                    <span className="text-accent font-bold text-2xl me-3 mt-1 rtl:ml-3 rtl:mr-0">&#x2727;</span>
                    <span>{course}</span>
                </li>
                ))}
            </ul>
        </div>
        <div>
            <h3 className="text-2xl font-title text-primary mb-6 text-center lg:text-right">معرض الشهادات</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {portfolioContent.certificates.map(cert => (
                    <div key={cert.id} onClick={() => onCertClick(cert)} className="relative aspect-video rounded-lg overflow-hidden shadow-lg cursor-pointer group">
                        <img src={cert.thumbnailUrl} alt={cert.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-center font-bold px-2">{cert.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  </AnimatedSection>
);

const CertificateModal: React.FC<{certificate: Certificate | null, onClose: () => void}> = ({ certificate, onClose }) => {
    if (!certificate) return null;
    return (
        <div onClick={onClose} className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 animate-fade-in" aria-modal="true" role="dialog">
            <div onClick={e => e.stopPropagation()} className="relative max-w-4xl max-h-[90vh] bg-background p-4 rounded-lg shadow-2xl">
                <button onClick={onClose} className="absolute -top-3 -right-3 bg-white text-primary rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold z-10" aria-label="Close">
                    &times;
                </button>
                <img src={certificate.fullUrl} alt={certificate.title} className="max-w-full max-h-[85vh] object-contain rounded" />
            </div>
        </div>
    );
};

const Contact: React.FC = () => {
    return (
        <AnimatedSection id="contact" className="bg-primary text-background">
            <div className="container mx-auto text-center py-12">
                <h2 className="text-4xl font-title font-bold text-accent mb-4">للتواصل</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">يمكنكم التواصل معي عبر إحدى القنوات التالية لمناقشة فرص التعاون أو الاستفسارات الأكاديمية.</p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-x-12 gap-y-6">
                    <a href={`mailto:${portfolioContent.contact.email}`} className="text-lg hover:text-accent transition-colors">{portfolioContent.contact.email}</a>
                    <a href={`https://wa.me/${portfolioContent.contact.phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 text-lg hover:text-accent transition-colors">
                        <WhatsAppIcon className="w-6 h-6"/>
                        <span dir="ltr" className="font-semibold">{`+${portfolioContent.contact.phone}`}</span>
                    </a>
                    <p className="text-lg">{portfolioContent.contact.address}</p>
                </div>
            </div>
        </AnimatedSection>
    );
};

const Footer: React.FC = () => (
    <footer className="bg-primary text-gray-400 text-center p-6 border-t border-accent/20">
        <p>&copy; {new Date().getFullYear()} {portfolioContent.name}. جميع الحقوق محفوظة.</p>
    </footer>
);

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (selectedCert) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
  }, [selectedCert]);

  return (
    <div className="overflow-x-hidden">
      <Header onNavigate={scrollToSection} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <CoursesAndCertificates onCertClick={setSelectedCert} />
        <Contact />
      </main>
      <Footer />
      <CertificateModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />
    </div>
  );
};

export default App;
