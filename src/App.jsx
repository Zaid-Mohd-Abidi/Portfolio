import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Bot, ArrowRight, ArrowLeft, Code, PieChart, Cpu, Zap, Activity, 
  Shield, Database, Globe, Lock, Mail, Smartphone, ExternalLink, 
  CheckCircle, AlertTriangle, Download, Menu, X, MapPin, 
  Linkedin, Github, Send, Server, User, Terminal, Sparkles
} from 'lucide-react';

// --- UTILS: DECRYPT TEXT EFFECT ---
const DecryptText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text
        .split("")
        .map((letter, index) => {
          if (index < iteration) return text[index];
          return "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"[Math.floor(Math.random() * 26)];
        })
        .join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

// --- DATA LAYER: 8 ELITE PROJECTS ---
const PROJECTS = [
  {
    id: 1,
    title: "HEDGE_FUND_SWARM",
    subtitle: "Multi-Agent Stock Analysis System",
    category: "AGENTIC AI",
    role: "Architect",
    img: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2070&auto=format&fit=crop",
    challenge: "Financial analysis requires synthesizing real-time news, technical indicators, and fundamental data. Doing this manually is slow, biased, and difficult to scale.",
    methodology: "Built a hierarchical agent swarm using LangGraph. A 'Manager' agent delegates tasks to a 'Researcher' (Tavily Search API) and an 'Analyst' (Python/Pandas). The system utilizes a self-reflection loop to critique its own drafts before finalizing the investment memo.",
    concepts: ["Multi-Agent Orchestration", "Chain-of-Thought Prompting", "Tool Use (Function Calling)"],
    tech: ["LangGraph", "Python", "Tavily API", "OpenAI GPT-4"],
    metrics: [
      { label: "Agents", value: "3", trend: "Autonomous" }, 
      { label: "Speed", value: "30s", trend: "-99% Time" }, 
      { label: "Output", value: "PDF", trend: "Structured" }
    ]
  },
  {
    id: 2,
    title: "ENTERPRISE_IDP_ENGINE",
    subtitle: "Intelligent Document Processing",
    category: "NLP / AUTOMATION",
    role: "ML Engineer",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
    challenge: "Intellect Design Arena processed confidential financial documents manually. This led to high error rates and a 4-hour turnaround time per batch.",
    methodology: "Fine-tuned LayoutLMv3 (a multimodal transformer) to understand both text and spatial layout (bounding boxes). Built a complete pipeline: OCR -> Classification -> Entity Extraction -> SQL Database.",
    concepts: ["Multimodal Transformers", "Token Classification", "OCR Post-processing"],
    tech: ["LayoutLMv3", "HuggingFace", "PostgreSQL", "Docker"],
    metrics: [
      { label: "Efficiency", value: "99.2%", trend: "4hrs → 2mins" }, 
      { label: "Accuracy", value: "99.8%", trend: "+Human Level" }, 
      { label: "Security", value: "100%", trend: "On-Prem" }
    ]
  },
  {
    id: 3,
    title: "BANK_CHURN_PREDICTOR",
    subtitle: "Customer Retention Engine",
    category: "DATA SCIENCE",
    role: "Data Scientist",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    challenge: "High-value customers were leaving the bank without warning signals, costing millions in lost AUM.",
    methodology: "Developed an XGBoost ensemble model analyzing transaction logs. Used SMOTE to handle class imbalance (few churners vs many stayers). Integrated SHAP values to give retention agents 'Explainable' reasons for why a customer is at risk.",
    concepts: ["Ensemble Learning", "Class Imbalance (SMOTE)", "Explainable AI (SHAP)"],
    tech: ["XGBoost", "Python", "Scikit-learn", "SHAP"],
    metrics: [
      { label: "AUM Saved", value: "$15M", trend: "Assets" }, 
      { label: "Accuracy", value: "88%", trend: "Precision" }, 
      { label: "Reduction", value: "20%", trend: "Churn Rate" }
    ]
  },
  {
    id: 4,
    title: "LEAD_SCORING_AI",
    subtitle: "Sales Optimization Model",
    category: "PREDICTIVE ANALYTICS",
    role: "Data Scientist",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    challenge: "Sales teams at ZS Associates wasted hours calling low-intent leads, reducing overall conversion efficiency.",
    methodology: "Built a LightGBM scoring engine that ingests firmographic data and website interaction logs. It assigns a propensity score to every lead, routing 'Hot Leads' directly to senior sales reps.",
    concepts: ["Gradient Boosting", "Feature Engineering", "Pipeline Automation"],
    tech: ["LightGBM", "Azure ML", "Salesforce", "SQL"],
    metrics: [
      { label: "Conversion", value: "+33%", trend: "Lift" }, 
      { label: "Revenue", value: "$10M", trend: "Impact" }, 
      { label: "Time", value: "-40%", trend: "Closure" }
    ]
  },
  {
    id: 5,
    title: "AI_POSE_COACH",
    subtitle: "Real-time Computer Vision",
    category: "COMPUTER VISION",
    role: "Lead Engineer",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    challenge: "Users exercise with poor form, leading to injury. Personal trainers are expensive and not always available.",
    methodology: "Implemented a real-time pose estimation pipeline using MediaPipe. Calculated geometric angles (e.g., knee flexion) on the edge to detect 'Bad Form' and trigger immediate audio feedback without sending video to the cloud.",
    concepts: ["Pose Estimation", "Geometric Heuristics", "Edge AI"],
    tech: ["MediaPipe", "OpenCV", "Flask", "Python"],
    metrics: [
      { label: "Latency", value: "30ms", trend: "Real-time" }, 
      { label: "Safety", value: "-80%", trend: "Injury Risk" }, 
      { label: "Users", value: "500+", trend: "Tested" }
    ]
  },
  {
    id: 6,
    title: "GEMINI_IOS_PROTOTYPE",
    subtitle: "Conversational Programming",
    category: "MOBILE / GENAI",
    role: "Prototyper",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1470&auto=format&fit=crop",
    challenge: "Testing the limits of LLM-assisted coding. Challenge: Build a complex iOS taxi app with zero Swift experience in under 3 hours.",
    methodology: "Leveraged Gemini 1.5 Pro's massive context window to generate full Xcode structures. Used 'Conversational Programming' to iteratively prompt for MapKit integration and booking logic without manually writing boilerplate.",
    concepts: ["Prompt Engineering", "LLM Code Generation", "Rapid Prototyping"],
    tech: ["Gemini 1.5", "Swift", "Xcode", "Google Maps"],
    metrics: [
      { label: "Build Time", value: "3 Hrs", trend: "Record" }, 
      { label: "Code", value: "0", trend: "Manual Lines" }, 
      { label: "Status", value: "Live", trend: "App Store" }
    ]
  },
  {
    id: 7,
    title: "LOCAL_RAG_VAULT",
    subtitle: "Privacy-First Chatbot",
    category: "AI SECURITY",
    role: "Security Eng",
    img: "https://images.unsplash.com/photo-1558494949-ef526b01201b?q=80&w=1287&auto=format&fit=crop",
    challenge: "Enterprise clients needed GPT-4 capabilities but could not send confidential data to the public cloud.",
    methodology: "Designed an air-gapped RAG system. It runs quantized Llama 3 models locally on consumer hardware, ensuring 100% data sovereignty while maintaining high retrieval accuracy via ChromaDB.",
    concepts: ["Model Quantization", "Local Inference", "Data Sovereignty"],
    tech: ["Ollama", "Llama 3", "ChromaDB", "Streamlit"],
    metrics: [
      { label: "Privacy", value: "100%", trend: "Air-Gapped" }, 
      { label: "Cost", value: "$0", trend: "Per Token" }, 
      { label: "Latency", value: "15ms", trend: "Local" }
    ]
  },
  {
    id: 8,
    title: "GVESTOR_STARTUP_BOT",
    subtitle: "Investment Due Diligence",
    category: "GENAI / RAG",
    role: "Lead Developer",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    challenge: "Investors struggle to find specific details (burn rate, team, market fit) across thousands of unstructured pitch decks.",
    methodology: "Developed a Context-Aware RAG pipeline. Pitch decks are ingested, chunked, and stored in a vector database. The system retrieves semantic matches to answer complex queries like 'Show me startups with >20% MoM growth' with citations.",
    concepts: ["Vector Embeddings", "Semantic Search", "Hallucination Guardrails"],
    tech: ["LangChain", "Pinecone", "Next.js", "OpenAI"],
    metrics: [
      { label: "Retrieval", value: "<2s", trend: "Latency" }, 
      { label: "Accuracy", value: "95%", trend: "Factuality" }, 
      { label: "Scale", value: "10k+", trend: "Docs" }
    ]
  }
];

// --- COMPONENT: 3D TILT CARD ---
const TiltCard = ({ children, className, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      className={`relative transform-style-3d cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- COMPONENT: NAV BAR ---
const NavBar = ({ setView, view }) => (
  <motion.nav 
    initial={{ y: -100 }} animate={{ y: 0 }}
    className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center"
  >
    <div onClick={() => setView('home')} className="flex items-center gap-2 cursor-pointer group">
       <Bot size={24} className="text-primary group-hover:rotate-12 transition-transform"/>
       <span className="font-display font-bold tracking-widest text-lg text-white group-hover:text-primary transition-colors">ZAID.AI</span>
    </div>
    <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
       {['About', 'Projects', 'Contact'].map((item) => (
          <button 
            key={item} 
            onClick={() => setView(item.toLowerCase())} 
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${view === item.toLowerCase() ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
             {item}
          </button>
       ))}
    </div>
    <a href="/Resume_Oct25-2.pdf" download className="hidden md:flex items-center gap-2 border border-white/20 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors text-white">
       CV <Download size={14}/>
    </a>
  </motion.nav>
);

// --- VIEW: HOME ---
const Home = ({ setView }) => (
  <div className="min-h-screen relative flex flex-col justify-center items-center bg-background px-4 overflow-hidden">
     <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
     <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }} 
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] pointer-events-none"
     />
     
     <div className="relative z-10 text-center max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md">
           <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
           <span className="text-xs font-mono text-green-400 tracking-[0.2em]">AVAILABLE FOR HIRE</span>
        </motion.div>
        
        <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter text-white mb-8 leading-[0.85]">
           <DecryptText text="HUMAN" /> <br/>
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">+ ARTIFICIAL</span> <br/>
           <DecryptText text="INTELLECT" />
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
           I engineer autonomous systems that solve expensive problems. From <span className="text-white font-bold">$10M revenue impact</span> at ZS Associates to AI agents that code themselves.
        </motion.p>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-6 justify-center">
           <button onClick={() => setView('projects')} className="group px-8 py-4 bg-white text-black font-bold tracking-widest uppercase hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 rounded-sm shadow-[4px_4px_0px_#22d3ee]">
              Explore Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
           </button>
           <button onClick={() => setView('contact')} className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold tracking-widest uppercase hover:border-primary hover:text-primary transition-all rounded-sm">
              Contact Me
           </button>
        </motion.div>
     </div>
  </div>
);

// --- VIEW: PROJECTS ---
const Projects = ({ onSelect }) => (
  <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-20">
        <h1 className="text-5xl md:text-8xl font-black text-white uppercase mb-4 tracking-tighter"><DecryptText text="CASE STUDIES" /></h1>
        <p className="text-gray-400 font-mono text-sm tracking-widest">DEPLOYING INTELLIGENCE INTO PRODUCTION</p>
     </motion.div>
     
     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {PROJECTS.map((p, i) => (
           <TiltCard key={p.id} onClick={() => onSelect(p)} className="group bg-surface border border-white/10 rounded-2xl overflow-hidden">
              <div className="aspect-video bg-gray-900 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                 <img src={p.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110" />
                 <div className="absolute bottom-6 left-6 z-20">
                    <div className="inline-block px-3 py-1 bg-primary/20 backdrop-blur border border-primary/50 rounded-lg text-primary text-xs font-bold uppercase tracking-wider mb-2">
                       {p.category}
                    </div>
                 </div>
              </div>
              <div className="p-8 relative">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all"></div>
                 <h3 className="text-2xl font-bold text-white mb-3 uppercase font-display relative z-10">{p.title}</h3>
                 <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed relative z-10">{p.challenge}</p>
                 <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:text-primary transition-colors relative z-10">
                    Deep Dive <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                 </div>
              </div>
           </TiltCard>
        ))}
     </div>
  </div>
);

// --- VIEW: PROJECT DETAIL ---
const ProjectDetail = ({ project, onBack }) => (
  <div className="min-h-screen pt-32 px-6 pb-20 max-w-6xl mx-auto">
     <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 text-xs font-bold uppercase tracking-widest group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Back to Grid
     </button>
     
     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
        <div className="flex items-center gap-3 text-primary font-mono text-sm mb-4 tracking-widest border-b border-white/10 pb-4">
           <Sparkles size={16}/> {project.category} // {project.role}
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white uppercase mb-6 leading-none tracking-tighter">{project.title}</h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl font-light leading-relaxed">{project.subtitle}</p>
     </motion.div>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="bg-surface border border-white/10 p-8 rounded-2xl relative group hover:border-primary/50 transition-colors">
           <h3 className="text-white font-bold uppercase mb-4 flex items-center gap-3"><AlertTriangle className="text-primary" size={24}/> The Challenge</h3>
           <p className="text-gray-400 leading-relaxed text-lg">{project.challenge}</p>
        </div>
        <div className="bg-surface border border-white/10 p-8 rounded-2xl relative group hover:border-primary/50 transition-colors">
           <h3 className="text-white font-bold uppercase mb-4 flex items-center gap-3"><CheckCircle className="text-primary" size={24}/> The Methodology</h3>
           <p className="text-gray-400 leading-relaxed text-lg">{project.methodology}</p>
        </div>
     </div>

     {/* METRICS */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {project.metrics.map((m, i) => (
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.1 }}
             key={i} 
             className="bg-[#0f0f0f] border border-white/10 p-8 rounded-2xl relative overflow-hidden group"
           >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                 <Activity size={80} className="text-primary"/>
              </div>
              <p className="text-gray-500 text-xs font-bold uppercase mb-2 tracking-widest">{m.label}</p>
              <p className="text-5xl font-black text-white mb-2 tracking-tight">{m.value}</p>
              <p className="text-primary text-xs font-mono bg-primary/10 w-fit px-3 py-1 rounded-full">{m.trend}</p>
           </motion.div>
        ))}
     </div>

     {/* TECH & CONCEPTS */}
     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-surface border border-white/10 p-10 rounded-2xl">
        <div>
           <h4 className="text-white font-bold uppercase mb-6 flex items-center gap-2 text-xl"><Code size={20} className="text-primary"/> Tech Stack</h4>
           <div className="flex flex-wrap gap-3">
              {project.tech.map(t => <span key={t} className="px-4 py-2 bg-white/5 border border-white/10 text-sm text-gray-300 font-mono rounded-lg hover:border-primary hover:text-white transition-colors cursor-default">{t}</span>)}
           </div>
        </div>
        <div>
           <h4 className="text-white font-bold uppercase mb-6 flex items-center gap-2 text-xl"><Cpu size={20} className="text-primary"/> Key Concepts</h4>
           <ul className="space-y-3">
              {project.concepts.map(c => <li key={c} className="text-base text-gray-400 flex items-center gap-3"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> {c}</li>)}
           </ul>
        </div>
     </div>
  </div>
);

// --- VIEW: ABOUT ---
const About = () => (
  <div className="min-h-screen pt-32 px-6 max-w-5xl mx-auto pb-20">
     <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gray-800 border-4 border-primary/20 overflow-hidden relative shadow-[0_0_50px_rgba(192,132,252,0.2)] shrink-0">
           <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110" alt="Profile" />
        </div>
        <div className="text-center md:text-left">
           <h1 className="text-6xl md:text-8xl font-black text-white uppercase mb-4 tracking-tighter"><DecryptText text="ZAID ABIDI" /></h1>
           <p className="text-primary font-mono text-base tracking-widest mb-8">DATA SCIENTIST | AI ARCHITECT | HACKER</p>
           <p className="text-gray-300 leading-relaxed text-xl font-light">
              I don't just train models; I engineer <strong className="text-white font-bold">autonomous systems</strong> that drive tangible business value. My philosophy is simple: AI should be invisible, reliable, and relentlessly efficient.
           </p>
        </div>
     </div>
     
     <div className="space-y-16">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="border-l-2 border-primary/30 pl-8 relative">
           <span className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full shadow-[0_0_10px_#c084fc]"></span>
           <h3 className="text-3xl font-bold text-white mb-4">The Foundation: Enterprise Scale</h3>
           <p className="text-gray-400 text-lg leading-relaxed">
              At <strong className="text-white">ZS Associates</strong> and <strong className="text-white">Intellect Design Arena</strong>, I didn't just write scripts. I built production-grade ML pipelines that processed confidential financial data and predicted customer churn, delivering over <strong className="text-white">$10M in annual impact</strong> and reducing manual labor by 99%.
           </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="border-l-2 border-secondary/30 pl-8 relative">
           <span className="absolute -left-[9px] top-0 w-4 h-4 bg-secondary rounded-full shadow-[0_0_10px_#22d3ee]"></span>
           <h3 className="text-3xl font-bold text-white mb-4">The Pivot: Agentic AI</h3>
           <p className="text-gray-400 text-lg leading-relaxed">
              In 2024, I shifted focus to the bleeding edge: <strong className="text-white">Multi-Agent Systems</strong>. I realized that RAG and LLMs are just the engine—Agents are the steering wheel. I now build systems where AI agents recursively solve problems, write code, and conduct research autonomously.
           </p>
        </motion.div>
     </div>
  </div>
);

// --- VIEW: CONTACT ---
const Contact = () => (
  <div className="min-h-screen pt-32 px-4 flex items-center justify-center bg-background relative overflow-hidden">
     <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
     <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-16 relative z-10">
        <div className="space-y-10">
           <div>
              <h1 className="text-6xl md:text-8xl font-black text-white uppercase mb-6 tracking-tighter">Establish<br/>Connection</h1>
              <p className="text-gray-400 text-xl font-light">Sending encrypted data across the void.</p>
           </div>
           <div className="space-y-6">
              <a href="mailto:bugzaid@gmail.com" className="block bg-surface p-8 border border-white/10 hover:border-primary transition-all group relative overflow-hidden rounded-2xl">
                 <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                 <h3 className="text-gray-500 text-xs font-bold uppercase mb-2 tracking-widest relative z-10">Frequency</h3>
                 <p className="text-3xl text-white group-hover:text-primary transition-colors font-mono relative z-10">bugzaid@gmail.com</p>
              </a>
              <div className="bg-surface p-8 border border-white/10 rounded-2xl">
                 <h3 className="text-gray-500 text-xs font-bold uppercase mb-2 tracking-widest">Coordinates</h3>
                 <p className="text-2xl text-white">Bengaluru, India</p>
              </div>
           </div>
        </div>
        
        <form action="mailto:bugzaid@gmail.com" method="post" encType="text/plain" className="bg-surface border border-white/10 p-10 rounded-3xl relative shadow-2xl">
           <div className="space-y-8">
              <div>
                 <label className="text-xs font-bold text-gray-500 block mb-3 uppercase tracking-widest">Identity</label>
                 <input type="text" name="name" className="w-full bg-black border border-white/20 p-4 text-white focus:border-primary outline-none transition-colors font-mono rounded-lg" placeholder="Your Name" />
              </div>
              <div>
                 <label className="text-xs font-bold text-gray-500 block mb-3 uppercase tracking-widest">Payload</label>
                 <textarea name="message" rows="4" className="w-full bg-black border border-white/20 p-4 text-white focus:border-primary outline-none transition-colors font-mono resize-none rounded-lg" placeholder="Message content..."></textarea>
              </div>
              <button type="submit" className="w-full bg-white text-black font-black uppercase py-5 hover:bg-primary transition-colors flex items-center justify-center gap-3 tracking-widest rounded-lg shadow-lg text-lg">
                 Transmit Data <Send size={20}/>
              </button>
           </div>
        </form>
     </div>
  </div>
);

// --- APP ROOT ---
const App = () => {
  const [view, setView] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  // Robot Component (Internal to App to access state)
  const RobotAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="fixed bottom-8 right-8 z-50 group">
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{opacity:0, y:20, scale:0.9}} animate={{opacity:1, y:0, scale:1}} exit={{opacity:0, y:20, scale:0.9}} className="absolute bottom-full mb-6 right-0 w-64 bg-surface border border-primary/30 p-4 rounded-2xl backdrop-blur-xl shadow-2xl">
               <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                     <Bot size={20} className="text-primary"/>
                  </div>
                  <div>
                     <h4 className="text-white font-bold text-sm">Zaid's Assistant</h4>
                     <p className="text-green-400 text-[10px] font-mono uppercase tracking-wider">● Online</p>
                  </div>
               </div>
               <div className="space-y-2">
                  <button onClick={() => {window.location.href="mailto:bugzaid@gmail.com"}} className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 rounded-lg flex items-center gap-3 transition-colors">
                     <Mail size={14}/> Send Email
                  </button>
                  <button onClick={() => {setView('projects'); setIsOpen(false)}} className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 rounded-lg flex items-center gap-3 transition-colors">
                     <Server size={14}/> View Case Studies
                  </button>
                  <a href="https://linkedin.com/in/zaid-mohd-abidi" target="_blank" className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 rounded-lg flex items-center gap-3 transition-colors block">
                     <Linkedin size={14}/> LinkedIn Profile
                  </a>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 bg-black border-2 border-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(192,132,252,0.4)] hover:scale-110 transition-transform cursor-pointer animate-float bg-gradient-to-br from-black to-purple-900/80">
           {isOpen ? <X size={28} className="text-white"/> : <Bot size={32} className="text-primary"/>}
        </button>
      </div>
    );
  };

  return (
    <div className="bg-background min-h-screen text-white font-body selection:bg-primary selection:text-black overflow-x-hidden">
      <NavBar setView={setView} view={view} />
      <RobotAssistant />
      
      <AnimatePresence mode="wait">
        {view === 'home' && <motion.div key="home" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.5}}><Home setView={setView}/></motion.div>}
        {view === 'about' && <motion.div key="about" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} transition={{duration:0.5}}><About/></motion.div>}
        {view === 'projects' && <motion.div key="projects" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.5}}><Projects onSelect={p => {setSelectedProject(p); setView('detail');}} /></motion.div>}
        {view === 'detail' && <motion.div key="detail" initial={{x:100, opacity:0}} animate={{x:0, opacity:1}} exit={{x:-100, opacity:0}} transition={{type:"spring", stiffness:50}}><ProjectDetail project={selectedProject} onBack={() => setView('projects')} /></motion.div>}
        {view === 'contact' && <motion.div key="contact" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:1.05}} transition={{duration:0.5}}><Contact/></motion.div>}
      </AnimatePresence>
    </div>
  );
};

export default App;