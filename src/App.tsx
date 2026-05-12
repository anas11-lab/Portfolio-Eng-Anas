import React, { useState, useEffect, ReactNode, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from 'motion/react';
import { 
  Code2, 
  Network, 
  MapPin, 
  Github, 
  Linkedin, 
  Award,
  Briefcase,
  Monitor,
  X,
  Globe,
  ShoppingBag,
  Zap,
  Store,
  ShieldCheck,
  Terminal,
  Scan,
  Database,
  ArrowUpRight,
  GraduationCap,
  Smartphone,
  BookOpen,
  Video,
  Camera
} from 'lucide-react';

const Spotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const moveSpotlight = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveSpotlight);
    return () => window.removeEventListener('mousemove', moveSpotlight);
  }, []);

  return (
    <motion.div 
      style={{
        background: useTransform(
          [mouseX, mouseY],
          ([x, y]) => `radial-gradient(1000px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.03), transparent 70%)`
        )
      }}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

const SectionIndicator = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500">{label}</span>
  </div>
);

const BentoProjectCard = ({ project, onClick }: { project: Project, onClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div 
      ref={cardRef}
      layoutId={`project-${project.name}`}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] border border-white/5 bg-slate-950 flex flex-col h-[480px] shadow-2xl transition-all duration-500 hover:shadow-cyan-500/10 hover:border-cyan-500/20"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={project.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"} 
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      <div className="relative z-10 p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-auto">
          <motion.div 
            whileHover={{ rotate: 90 }}
            className="w-12 h-12 bg-slate-900/80 backdrop-blur-md rounded-xl flex items-center justify-center text-cyan-400 border border-white/5 shadow-inner"
          >
            {project.icon}
          </motion.div>
          <div className="flex items-center gap-2 bg-slate-900/50 backdrop-blur-md border border-white/5 px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
             <span className="text-[9px] font-mono font-bold text-white uppercase tracking-widest">{project.date}</span>
             <ArrowUpRight size={14} className="text-cyan-500" />
          </div>
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((t, idx) => (
              <span key={idx} className="text-[9px] font-mono text-cyan-500/80 bg-cyan-500/5 border border-cyan-500/20 px-2 py-0.5 rounded-md uppercase tracking-wider">
                {t}
              </span>
            ))}
          </div>
          
          <div className="overflow-hidden">
            <h4 className="text-white text-3xl md:text-3xl font-black font-display tracking-tight leading-none uppercase group-hover:text-cyan-400 transition-colors">
              {project.name}
            </h4>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 opacity-60 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0">
            {project.tagline || project.desc}
          </p>

          <div className="h-1 w-0 bg-cyan-500 group-hover:w-full transition-all duration-700" />
        </div>
      </div>
      
      {/* Scanline Effect */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-cyan-500/20 blur-sm transform -translate-y-full group-hover:animate-scan z-20 pointer-events-none" />
      
      {/* Corner Accents */}
      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity">
        <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-white" />
      </div>
      <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity">
        <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-white" />
      </div>
    </motion.div>
  );
};

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <motion.div 
        style={{ x: springX, y: springY }}
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-500/30 rounded-full pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference hidden md:flex"
      >
        <div className="w-1 h-1 bg-cyan-500 rounded-full" />
        <div className="absolute inset-0 border border-cyan-500/10 rounded-full scale-150 animate-pulse" />
      </motion.div>
      <motion.div 
        style={{ x: cursorX, y: cursorY }}
        className="fixed top-0 left-0 w-1 h-1 bg-cyan-400 rounded-full pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2 md:hidden"
      />
    </>
  );
};

const InteractiveAvatar = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="relative w-48 h-48 md:w-64 md:h-64 group cursor-crosshair mb-12"
    >
      <div className="absolute inset-0 bg-cyan-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative w-full h-full bg-slate-950 border border-slate-800 rounded-[3rem] overflow-hidden flex items-center justify-center group-hover:border-cyan-500/30 transition-all shadow-2xl p-4">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
           <img 
              src="/src/assets/images/regenerated_image_1778546735708.jpg" 
              alt="3D Male Engineer Avatar"
              className="w-full h-full object-cover rounded-2xl"
           />
        </div>
        
        {/* Decorative elements */}
        <motion.div 
           animate={{ scale: [1, 1.2, 1] }}
           transition={{ duration: 2, repeat: Infinity }}
           className="absolute top-4 left-4 w-2 h-2 rounded-full bg-cyan-500" 
        />
        <div className="absolute bottom-4 right-4 w-12 h-1 w-24 bg-cyan-500/10 rounded-full blur-sm" />
      </div>

      {/* Floating labels */}
      <motion.div 
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -right-12 bg-slate-900 border border-white/10 px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 z-20"
      >
        <Video size={14} className="text-cyan-500" />
        <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Editor</span>
      </motion.div>
      <motion.div 
        animate={{ x: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 -right-16 bg-slate-900 border border-white/10 px-3 py-3 rounded-2xl shadow-2xl flex items-center justify-center z-20"
      >
        <Camera size={16} className="text-cyan-400" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-4 -left-12 bg-slate-900 border border-white/10 px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 z-20"
      >
        <Monitor size={14} className="text-cyan-500" />
        <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">Architect</span>
      </motion.div>
    </motion.div>
  );
};

const MinimalButton = ({ children, onClick, active = false, className = "" }: { children: ReactNode, onClick?: () => void, active?: boolean, className?: string }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-8 py-4 rounded-full text-[10px] font-mono tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 border ${
      active 
        ? 'bg-white text-black border-white shadow-xl' 
        : 'bg-transparent border-white/10 text-slate-400 hover:text-white hover:border-white/30'
    } ${className}`}
  >
    {children}
  </motion.button>
);

const SectionHeading = ({ children, sectionLabel = "Section" }: { children: ReactNode, sectionLabel?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-12 relative group"
  >
    <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-cyan-500/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left hidden md:block" />
    <SectionIndicator label={sectionLabel} />
    <h2 className="text-6xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none mb-4 flex items-center gap-4">
      {children}
      <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/20 to-transparent" />
    </h2>
  </motion.div>
);

interface Project {
  name: string;
  tagline: string;
  desc: string;
  tech: string[];
  date: string;
  demo?: string;
  repo?: string;
  icon?: ReactNode;
  image?: string;
}

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const t = {
    en: {
      name: "Anas Awadh",
      role: "Software Engineer • System Architect • Video Designer",
      phone: "+967 773 289524",
      email: "aawadhhebahtalh@gmail.com",
      hero: {
        system: "[ Digital Identity Matrix: ONLINE ]",
        desc: "Software engineer and Video Designer. Expert in full-stack ERP systems, monitoring solutions, and cinematic visual storytelling.",
        title1: "Software",
        title2: "Engineer",
        btnGithub: "Source Code",
        btnLinkedin: "Connect Node"
      },
      nav: {
        home: "Home",
        projects: "Projects",
        skills: "Skills",
        experience: "Experience",
        education: "Education",
        archive: "Deployments",
      },
      projects: {
        label: "Operational Portfolio",
        title: "Strategic Deployments"
      },
      skills: {
        label: "Technological Core",
        title: "Expertise Matrix"
      },
      performance: {
        label: "Scale & Efficiency",
        title: "Engineered for Excellence.",
        desc: "Over a year of practical experience in web/mobile development and system monitoring. Proven track record in supervising academic graduation projects.",
        stat1: "Guided Projects (7)",
        stat2: "Live Platforms"
      },
      edu: {
        label: "Academic Foundation",
        title: "Education Logic"
      },
      logs: {
        label: "Service History",
        title: "Career Timeline"
      },
      certs: {
        label: "Verified Credentials",
        title: "Professional Licenses"
      },
      footer: {
        rights: "ANAS AWADH © 2026 • ALL SYSTEMS OPERATIONAL",
        contact: "Contact",
        contactDesc: "Open for high-impact collaborations and architectural challenges. Operating from",
        system: "System",
        framework: "Framework: React 18",
        engine: "Engine: Motion",
        env: "Environment: Cloud Dev",
        status: "Status: Online"
      },
      modal: {
        btnDemo: "Live Interface",
        btnRepo: "Decrypt Source"
      }
    },
    ar: {
      name: "أنس عوض",
      role: "مهندس برمجيات • معماري أنظمة • مصمم فيديو",
      phone: "+967 773 289524",
      email: "aawadhhebahtalh@gmail.com",
      hero: {
        system: "[ مصفوفة الهوية الرقمية: متصل ]",
        desc: "مهندس برمجيات ومصمم فيديو. خبير في بناء أنظمة ERP المتكاملة، حلول المراقبة، وسرد القصص المرئية السينمائية.",
        title1: "مهندس",
        title2: "برمجيات",
        btnGithub: "كود المصدر",
        btnLinkedin: "رابط الاتصال"
      },
      nav: {
        home: "الرئيسية",
        projects: "المشاريع",
        skills: "المهارات",
        experience: "الخبرة",
        education: "التعليم",
        archive: "الانتشارات",
      },
      projects: {
        label: "سجل العمليات",
        title: "الانتشارات الاستراتيجية"
      },
      skills: {
        label: "الجوهر التقني",
        title: "مصفوفة الخبرات"
      },
      performance: {
        label: "النطاق والكفاءة",
        title: "صُمم من أجل التميز.",
        desc: "أكثر من عام من الخبرة العملية في تطوير الويب والهاتف ومراقبة الأنظمة. سجل حافل في الإشراف على مشاريع التخرج الأكاديمية.",
        stat1: "مشاريع مُشرف عليها (7)",
        stat2: "منصات مباشرة"
      },
      edu: {
        label: "الأساس الأكاديمي",
        title: "منطق التعليم"
      },
      logs: {
        label: "سجل الخدمة",
        title: "المسار المهني"
      },
      certs: {
        label: "الاعتمادات الموثقة",
        title: "التراخيص المهنية"
      },
      footer: {
        rights: "أنس عوض © 2026 • جميع الأنظمة تعمل",
        contact: "اتصال",
        contactDesc: "متاح للتعاون عالي التأثير والتحديات المعمارية. أعمل من",
        system: "النظام",
        framework: "الإطار: React 18",
        engine: "المحرك: Motion",
        env: "البيئة: Cloud Dev",
        status: "الحالة: متصل"
      },
      modal: {
        btnDemo: "الواجهة المباشرة",
        btnRepo: "فك تشفير المصدر"
      }
    }
  };

  const current = t[lang];

  const skills = [
    { name: 'C# / .NET / Java', level: 92, icon: <Code2 size={14} /> },
    { name: 'PHP / Laravel', level: 95, icon: <Code2 size={14} /> },
    { name: 'Python / Django', level: 90, icon: <Database size={14} /> },
    { name: 'Dart / Flutter', level: 88, icon: <Smartphone size={14} /> },
    { name: 'SQL / Oracle / MySQL', level: 92, icon: <Database size={14} /> },
    { name: 'Adobe Premiere / AE', level: 94, icon: <Monitor size={14} /> },
    { name: 'CapCut / Davinci', level: 90, icon: <Video size={14} /> },
    { name: 'Windows / Linux Server', level: 85, icon: <Terminal size={14} /> },
    { name: 'UI/UX / WordPress', level: 88, icon: <Monitor size={14} /> },
  ];

  const projects: Project[] = [
    { 
      name: lang === 'en' ? 'Hummy Cake ERP' : 'نظام همي كيك ERP', 
      tagline: lang === 'en' ? 'Enterprise Bakery OS' : 'نظام إدارة المخابز الحلزوني',
      desc: lang === 'en' ? 'A full-scale E-commerce and ERP platform for bakery management. Integrated inventory, sales tracking, and professional storefront.' : 'منصة تجارة إلكترونية ونظام ERP متكامل لإدارة المخابز. يتضمن تتبع المخزون والمبيعات واجهة متجر احترافية.',
      tech: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
      date: '2025',
      demo: 'https://hummy-cake-stores.lovestoblog.com',
      icon: <ShoppingBag size={16} />,
      image: "https://images.unsplash.com/photo-1555503771-5056a70e7f42?auto=format&fit=crop&q=80&w=800"
    },
    { 
      name: lang === 'en' ? 'Taiz Tourism' : 'تعز السياحية', 
      tagline: lang === 'en' ? 'Regional Travel Hub' : 'مركز السفر الإقليمي',
      desc: lang === 'en' ? 'Managed project phases from design to live execution. Features hotel booking synchronization and advanced database architecture.' : 'إدارة مراحل المشروع من التصميم إلى التنفيذ المباشر. يتميز بمزامنة حجز الفنادق ومعمارية قواعد بيانات متقدمة.',
      tech: ['PHP', 'Android', 'MySQL', 'API Integration'],
      date: '2024',
      icon: <MapPin size={16} />,
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800"
    },
    { 
      name: lang === 'en' ? 'Smart Eng SaaS' : 'سمارت إنج SaaS', 
      tagline: lang === 'en' ? 'Engineering Resource ERP' : 'نظام ERP للموارد الهندسية',
      desc: lang === 'en' ? 'Specialized SaaS solution for engineering firms to manage blueprints, resource allocation, and project timelines with real-time collaboration.' : 'حل برمجيات كخدمة متخصص لشركات الهندسة لإدارة المخططات، وتخصيص الموارد، والجداول الزمنية للمشاريع مع تعاون فوري.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      date: '2024',
      icon: <Zap size={16} />,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800"
    },
    { 
      name: lang === 'en' ? 'Aman Healthcare' : 'منصة أمان الصحية', 
      tagline: lang === 'en' ? 'Clinical Data System' : 'نظام البيانات السريرية',
      desc: lang === 'en' ? 'Secure healthcare platform for patient record management and clinic workflow optimization.' : 'منصة رعاية صحية آمنة لإدارة سجلات المرضى وتحسين سير العمل في العيادات.',
      tech: ['Python', 'Django', 'React', 'PostgreSQL'],
      date: '2025',
      demo: 'https://aman-home-healthcare-platform.lovestoblog.com',
      icon: <ShieldCheck size={16} />,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
    },
    { 
      name: lang === 'en' ? 'Tulsi Wellness' : 'منصة تولسي', 
      tagline: lang === 'en' ? 'Mental Health Guardian' : 'نظام الصحة النفسية',
      desc: lang === 'en' ? 'Full-stack development of a mental health support application focusing on stress and anxiety management.' : 'تطوير متكامل لتطبيق دعم الصحة النفسية يركز على إدارة التوتر والقلق.',
      tech: ['Node.js', 'React', 'MongoDB'],
      date: '2024',
      icon: <Zap size={16} />,
      image: "https://images.unsplash.com/photo-1527137342181-19aab11a8ee1?auto=format&fit=crop&q=80&w=800"
    },
    { 
      name: lang === 'en' ? 'Doctorak App' : 'تطبيق دكتورك', 
      tagline: lang === 'en' ? 'Appointment Matrix' : 'مصفوفة المواعيد',
      desc: lang === 'en' ? 'Medical appointment booking hub streamlining patient-doctor interactions through automated scheduling.' : 'مركز حجز المواعيد الطبية الذي يبسط التفاعل بين المريض والطبيب من خلال الجدولة الآلية.',
      tech: ['Dart', 'Flutter', 'Firebase'],
      date: '2024',
      icon: <Terminal size={16} />,
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800"
    },
    { 
      name: lang === 'en' ? 'Multi-Vendor Marketplace' : 'سوق متعدد البائعين', 
      tagline: lang === 'en' ? 'Scalable B2B/B2C Hub' : 'مركز B2B/B2C قابل للتوسع',
      desc: lang === 'en' ? 'A scalable multi-vendor marketplace platform allowing diverse sellers to manage storefronts with advanced commission and payout logic.' : 'منصة سوق متعدد البائعين قابلة للتوسع تتيح لمختلف البائعين إدارة متاجرهم مع منطق متقدم للعمولات والمدفوعات.',
      tech: ['PHP', 'Laravel', 'Vue.js', 'MySQL'],
      date: '2024',
      icon: <Store size={16} />,
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800"
    },
  ];

  const experiences = [
    {
      role: lang === 'en' ? 'Graduation Projects Assistant' : 'مساعد مشاريع تخرج',
      period: '2024',
      desc: lang === 'en' ? 'Supervised 7 university graduation projects in software engineering, providing expert guidance on system design and full-stack development.' : 'الإشراف على 7 مشاريع تخرج جامعية في هندسة البرمجيات، وتقديم إرشادات الخبراء حول تصميم الأنظمة والتطوير المتكامل.',
      icon: <Briefcase className="text-cyan-500" />
    },
  ];

  const githubUrl = "https://github.com/AnasAwadh";
  const linkedinUrl = "https://www.linkedin.com/in/anas-awadh-249a7a380";
  const email = "aawadhhebahtalh@gmail.com";
  const phone = "+967 773 289524";
  const location = lang === 'en' ? "Taiz, Yemen" : "تعز، اليمن";

  const certifications = [
    { 
      title: lang === 'en' ? 'One Million Prompters - Generative AI Prompt Engineering' : 'مبادرة مليون خبير - هندسة الأوامر', 
      issuer: 'Dubai Future Foundation',
      date: 'May 2026',
      id: 'M-2026',
    },
    { 
      title: 'Building AI', 
      issuer: 'University of Helsinki & Elements of AI',
      grade: '92%',
    },
    { 
      title: lang === 'en' ? 'Python Automation Testing from Beginners' : 'اختبار الأتمتة ببايثون للمبتدئين', 
      issuer: 'Mind Luster',
      id: '0723db95',
      url: 'www.mindluster.com'
    },
    { 
      title: 'Cisco Certified Network Associate (CCNA)', 
      issuer: lang === 'en' ? 'M3aarf Platform' : 'منصة معارف',
      id: '6dd8763d'
    },
    { 
      title: 'User Interface & User Experience (UI/UX) Design', 
      issuer: lang === 'en' ? 'M3aarf Platform' : 'منصة معارف',
      id: '8d696619'
    },
    { 
      title: 'Fundamentals of Digital Marketing', 
      issuer: 'Google Digital Garage',
    },
    { 
      title: 'English Mastery (10 Courses)', 
      issuer: 'Globel Institute, Yemen',
    }
  ];

  const education = [
    {
      degree: lang === 'en' ? 'Bachelor of Information Technology (BIT)' : 'بكالوريوس في تقنية المعلومات',
      institution: lang === 'en' ? 'Al-Hikma University - Faculty of Engineering' : 'جامعة الحكمة - كلية الهندسة',
      period: '2025 - 2026',
      desc: lang === 'en' 
        ? "Specialized in Information Technology within the Faculty of Engineering. My academic journey focuses on software engineering principles, system architecture, and advanced networking. I have leveraged this technical foundation to supervise 7 graduation projects, ensuring high-quality implementation of database systems and full-stack applications like php and C++and flutter & Dart."
        : "متخصص في تقنية المعلومات ضمن كلية الهندسة. ركزت دراستي الأكاديمية على مبادئ هندسة البرمجيات، بنية الأنظمة، والشبكات المتقدمة. قمت بتطبيق هذه الأسس التقنية في الإشراف على 7 مشاريع تخرج، حيث ضمنت التنفيذ عالي الجودة لأنظمة قواعد البيانات والتطبيقات المتكاملة باستخدام تقنيات مثل php and C++and flutter & Dart.",
      icon: <GraduationCap size={14} />
    },
    {
      degree: lang === 'en' ? 'English Mastery (Intermediate Diploma)' : 'دبلوم متوسط - إتقان اللغة الإنجليزية',
      institution: lang === 'en' ? 'Globel Institute - Taiz (10 Courses)' : 'معهد جلوبل - تعز (10 دورات)',
      period: '2024',
      icon: <BookOpen size={14} />
    }
  ];

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-[#020617] text-slate-300 selection:bg-cyan-500/30 overflow-x-hidden p-6 md:p-12 font-sans">
      <CustomCursor />
      <Spotlight />
      
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />
      
      <main className="max-w-6xl mx-auto w-full relative z-10 flex flex-col gap-24">
        
        {/* Navigation */}
        <header className="flex justify-between items-center py-8 relative z-[100]">
           <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
           >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-black text-xl group-hover:bg-cyan-500 transition-colors">A</div>
              <div className="flex flex-col">
                <span className="text-white font-bold tracking-tight text-lg leading-none uppercase">{current.name}</span>
                <span className="text-slate-500 font-mono text-[9px] uppercase tracking-[0.2em] mt-1">{current.role}</span>
              </div>
           </motion.div>

           <nav className="hidden lg:flex items-center gap-8 bg-slate-900/50 backdrop-blur-md px-8 py-3 rounded-full border border-white/5 mx-4">
              {[
                { id: 'projects', label: current.nav.projects },
                { id: 'skills', label: current.nav.skills },
                { id: 'experience', label: current.nav.experience },
                { id: 'education', label: current.nav.education }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {item.label}
                </button>
              ))}
           </nav>
           
           <div className="flex items-center gap-4">
              <MinimalButton 
                 onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                 className="px-6 py-2 rounded-full h-10"
              >
                 <Globe size={14} className={lang === 'ar' ? 'ml-2' : 'mr-2'} />
                 {lang === 'en' ? 'AR' : 'EN'}
              </MinimalButton>
           </div>
        </header>

        {/* Hero Section */}
        <section id="home" className="flex flex-col items-center text-center mt-12 mb-24 min-h-[70vh] justify-center">
           <InteractiveAvatar />
           <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="w-full"
           >
              <SectionIndicator label={current.hero.system} />
              <h1 className="text-6xl md:text-[10rem] font-black font-display text-white uppercase tracking-[-0.05em] leading-[0.85] mb-12 flex flex-col items-center">
                 <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">{current.hero.title1}</span>
                 <span className="text-slate-800 drop-shadow-[0_0_2px_rgba(34,211,238,0.2)]" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>{current.hero.title2}</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed mb-16 tracking-tight px-4">
                 {current.hero.desc}
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                 <MinimalButton active onClick={() => window.open(githubUrl)}>{current.hero.btnGithub}</MinimalButton>
                 <MinimalButton onClick={() => window.open(linkedinUrl)}>{current.hero.btnLinkedin}</MinimalButton>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-8 text-slate-500 font-mono text-[10px] uppercase tracking-[0.2em]">
                 <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-cyan-500" />
                    {location}
                 </div>
                 <div className="flex items-center gap-2">
                    <Zap size={12} className="text-cyan-500" />
                    {email}
                 </div>
                 <div className="flex items-center gap-2">
                    <Monitor size={12} className="text-cyan-500" />
                    {phone}
                 </div>
              </div>
           </motion.div>
        </section>

        {/* Project Grid */}
        <section id="projects">
           <SectionHeading sectionLabel={current.projects.label}>{current.projects.title}</SectionHeading>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {projects.map((p) => (
                <div key={p.name}>
                  <BentoProjectCard project={p} onClick={() => setSelectedProject(p)} />
                </div>
              ))}
           </div>
        </section>

        {/* Skills & Capabilities */}
        <section id="skills" className="grid grid-cols-1 lg:grid-cols-2 gap-24 py-24 border-t border-white/5">
           <div>
              <SectionHeading sectionLabel={current.skills.label}>{current.skills.title}</SectionHeading>
              <div className="grid grid-cols-2 gap-12 mt-12">
                 {skills.map((skill, i) => (
                    <div key={i} className="group">
                       <div className="flex items-center gap-3 mb-4">
                          <div className="text-cyan-500">{skill.icon}</div>
                          <span className="text-white font-bold uppercase tracking-tight">{skill.name}</span>
                       </div>
                       <div className="h-0.5 bg-slate-900 w-full relative">
                          <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: `${skill.level}%` }}
                             viewport={{ once: true }}
                             className="h-full bg-cyan-500 absolute top-0 left-0"
                          />
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="flex flex-col justify-center">
              <SectionIndicator label={current.performance.label} />
              <h3 className="text-5xl md:text-6xl font-black font-display text-white uppercase tracking-tighter mb-8 leading-none">
                 {current.performance.title.split(' ')[0]} <br /> {current.performance.title.split(' ').slice(1).join(' ')}
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-12 opacity-80">
                 {current.performance.desc}
              </p>
              <div className="flex gap-12">
                 <div>
                    <span className="block text-4xl font-black text-white font-display">7</span>
                    <span className="text-slate-500 font-mono text-[9px] uppercase tracking-widest">{current.performance.stat1}</span>
                 </div>
                 <div>
                    <span className="block text-4xl font-black text-white font-display">40+</span>
                    <span className="text-slate-500 font-mono text-[9px] uppercase tracking-widest">{current.performance.stat2}</span>
                 </div>
              </div>
           </div>
        </section>

        {/* Experience, Education & Certs */}
        <section className="py-24 border-t border-white/5 grid grid-cols-1 lg:grid-cols-3 gap-24">
           <div id="experience" className="lg:col-span-2 space-y-24">
              <div>
                 <SectionHeading sectionLabel={current.logs.label}>{current.logs.title}</SectionHeading>
                 <div className="space-y-12">
                    {experiences.map((exp, i) => (
                       <div key={i} className="flex gap-8 group">
                          <div className="mt-2 text-slate-700 group-hover:text-cyan-500 transition-colors">{exp.icon}</div>
                          <div>
                             <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-2 underline-offset-8 group-hover:underline">{exp.role}</h4>
                             <span className="text-cyan-500 font-mono text-[10px] uppercase tracking-widest block mb-4">{exp.period}</span>
                             <p className="text-slate-400 leading-relaxed max-w-xl">{exp.desc}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div id="education" className="relative">
                 {/* Schematic Background Decor */}
                 <div className="absolute -right-24 top-0 w-64 h-64 opacity-[0.03] pointer-events-none select-none hidden lg:block">
                    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rotate-12">
                       <path d="M10 10H190V190H10V10Z" stroke="white" strokeWidth="0.5"/>
                       <path d="M10 50H190" stroke="white" strokeWidth="0.5"/>
                       <path d="M10 90H190" stroke="white" strokeWidth="0.5"/>
                       <path d="M10 130H190" stroke="white" strokeWidth="0.5"/>
                       <path d="M10 170H190" stroke="white" strokeWidth="0.5"/>
                       <path d="M50 10V190" stroke="white" strokeWidth="0.5"/>
                       <path d="M90 10V190" stroke="white" strokeWidth="0.5"/>
                       <path d="M130 10V190" stroke="white" strokeWidth="0.5"/>
                       <path d="M170 10V190" stroke="white" strokeWidth="0.5"/>
                       <circle cx="90" cy="90" r="40" stroke="cyan" strokeWidth="0.5" strokeDasharray="4 4"/>
                    </svg>
                 </div>

                 <SectionHeading sectionLabel={current.edu.label}>{current.edu.title}</SectionHeading>
                 <div className="space-y-12">
                    {education.map((edu: any, i) => (
                       <div key={i} className="flex gap-8 group relative">
                          <div className="absolute -left-12 top-0 bottom-0 w-[1px] bg-slate-800 group-hover:bg-cyan-500/30 transition-colors hidden md:block" />
                          <div className="mt-2 text-slate-700 group-hover:text-cyan-500 transition-colors relative z-10 transition-transform group-hover:scale-110">
                            {edu.icon}
                            <div className="absolute inset-0 bg-cyan-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="relative z-10">
                             <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2 underline-offset-8 group-hover:underline transition-all">{edu.degree}</h4>
                             <div className="flex items-center gap-3 mb-1">
                                <span className="text-cyan-500 font-mono text-[10px] uppercase tracking-widest">{edu.period}</span>
                                <div className="w-1 h-1 rounded-full bg-slate-700" />
                                <span className="text-white font-bold text-sm">{edu.institution}</span>
                             </div>
                             {edu.desc && <p className="text-slate-400 leading-relaxed max-w-2xl text-sm md:text-base opacity-70 group-hover:opacity-100 transition-opacity mt-4">{edu.desc}</p>}
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="bg-slate-900/40 p-12 rounded-[4rem] border border-white/5 h-fit lg:sticky lg:top-12">
              <SectionIndicator label={current.certs.label} />
              <div className="space-y-6 mt-8">
                 {certifications.map((cert: any, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                       <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 group-hover:scale-150 transition-transform" />
                       <div className="flex-1">
                          <h5 className="text-white font-bold text-xs uppercase tracking-tight group-hover:text-cyan-400 transition-colors">{cert.title}</h5>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                             <span className="text-slate-500 text-[9px] font-mono uppercase">{cert.issuer}</span>
                             {cert.id && <span className="text-cyan-500/40 text-[8px] font-mono uppercase tracking-tighter">ID: {cert.id}</span>}
                             {cert.grade && <span className="text-green-500/60 text-[8px] font-mono uppercase">{cert.grade}</span>}
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Footer */}
        <footer className="py-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-start gap-12">
           <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                 <span className="text-white font-black tracking-tighter text-4xl uppercase leading-none">{current.name}</span>
                 <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">{current.footer.rights}</span>
              </div>
              <div className="flex gap-4">
                 <a href={githubUrl} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all"><Github size={18} /></a>
                 <a href={linkedinUrl} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all"><Linkedin size={18} /></a>
                 <a href={`mailto:${email}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all"><Zap size={18} /></a>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-md w-full">
              <div className="space-y-4">
                 <SectionIndicator label={current.footer.contact} />
                 <p className="text-slate-400 text-sm leading-relaxed">
                    {current.footer.contactDesc} {location}.
                 </p>
                 <div className="text-white font-mono text-xs uppercase tracking-widest">
                    {email} <br />
                    {phone}
                 </div>
              </div>
              <div className="space-y-4">
                 <SectionIndicator label={current.footer.system} />
                 <p className="text-slate-500 font-mono text-[9px] uppercase tracking-widest leading-loose">
                    {current.footer.framework}<br />
                    {current.footer.engine}<br />
                    {current.footer.env}<br />
                    {current.footer.status}
                 </p>
              </div>
           </div>
        </footer>
      </main>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#020617]/98 backdrop-blur-xl"
            />
            
            <motion.div 
              layoutId={`project-${selectedProject.name}`}
              className="relative w-full max-w-4xl bg-slate-950 border border-white/10 rounded-[4rem] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-12 md:p-20 flex flex-col gap-12">
                 <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-4">
                       <SectionIndicator label={selectedProject.tagline} />
                       <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none font-display">
                          {selectedProject.name}
                       </h2>
                    </div>
                    <MinimalButton 
                       onClick={() => setSelectedProject(null)}
                       className="w-16 h-16 p-0 rounded-full"
                    >
                       <X size={24} />
                    </MinimalButton>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div className="space-y-8">
                       <p className="text-2xl text-slate-400 font-light leading-relaxed">
                          {selectedProject.desc}
                       </p>
                       <div className="flex flex-wrap gap-4">
                          {selectedProject.tech.map(t => (
                             <span key={t} className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-cyan-500 tracking-widest uppercase">{t}</span>
                          ))}
                       </div>
                    </div>
                    <div className="flex flex-col gap-6 justify-center">
                       {selectedProject.demo && (
                          <MinimalButton active onClick={() => window.open(selectedProject.demo)} className="w-full">
                             {current.modal.btnDemo}
                          </MinimalButton>
                       )}
                       {selectedProject.repo && (
                          <MinimalButton onClick={() => window.open(selectedProject.repo)} className="w-full">
                             {current.modal.btnRepo}
                          </MinimalButton>
                       )}
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

