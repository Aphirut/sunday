import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  ShieldCheck,
  Award,
  TrendingUp,
  Pause,
  Play
} from 'lucide-react';

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  courseTitle: string;
  credentialId: string;
  rating: number;
  metricBadge: string;
  quote: string;
  beforeAfter: {
    before: string;
    after: string;
  };
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'สมชาย มีความรู้',
    role: 'Senior Frontend Engineer',
    company: 'Fintech Innovation Co., Ltd.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    courseTitle: 'Modern Full-Stack Web Development',
    credentialId: 'CERT-2026-WD-8910',
    rating: 5,
    metricBadge: '+65% เงินเดือนหลังปรับตำแหน่งใน 4 เดือน',
    quote: 'เนื้อหาในคอร์สนี้ทันสมัยมาก ไม่ใช่แค่อธิบาย Syntax แต่สอนสถาปัตยกรรมระดับ Production การจัดวาง Component และการป้องกัน Race Condition ใน React 19 ช่วยให้ผมสอบผ่านสัมภาษณ์และได้เลื่อนขั้นเป็น Senior ภายใน 4 เดือน',
    beforeAfter: {
      before: 'สับสนเรื่อง State Architecture และเขียนโค้ดเกิดบั๊กบ่อย',
      after: 'นำ Clean Component Architecture ไปใช้สร้างระบบจริงในองค์กร'
    }
  },
  {
    id: 'test-2',
    name: 'กานดา สุขใจ',
    role: 'Lead Product Designer',
    company: 'Craft Studio Bangkok',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    courseTitle: 'UX/UI & Design Systems for Cross-Platform Apps',
    credentialId: 'CERT-2026-UX-9901',
    rating: 5,
    metricBadge: 'ลดเวลา Handoff สู่นักพัฒนาลง 60%',
    quote: 'ระบบ 8-Point Grid และ Design Tokens ในคอร์สนี้คือจุดเปลี่ยนสำคัญ ทีมเราสร้าง Reusable Component Library ที่เชื่อมต่อทั้งฝั่งดีไซน์และโค้ดได้ 100% แถมใบประกาศนียบัตรยังมี QR Code ตรวจสอบความถูกต้องได้จริง น่าเชื่อถือมาก',
    beforeAfter: {
      before: 'ส่งงานให้ Dev แล้วหน้าตาไม่ตรงดีไซน์ ต้องแก้หลายรอบ',
      after: 'สร้าง Design Token System ที่ใช้ร่วมกันได้ทั้งทีมโดยไม่มีข้อผิดพลาด'
    }
  },
  {
    id: 'test-3',
    name: 'ธนากรณ์ รัตนโชติ',
    role: 'Data & Growth Specialist',
    company: 'Nexus Media Thailand',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    courseTitle: 'Practical Generative AI & Data Analytics 2026',
    credentialId: 'CERT-2026-AI-7723',
    rating: 5,
    metricBadge: 'ประหยัดเวลาทำรายงานจาก 8 ชม. เหลือ 20 นาที',
    quote: 'แบบทดสอบก่อนเรียนและหลังเรียนทำให้เห็นจุดอ่อนของตัวเองชัดเจน เมื่อเรียนจบคลิปและฝึกเขียน Structured JSON Output กับ API สามารถนำไปสร้างระบบอัตโนมัติสรุปข้อมูลวิเคราะห์ธุรกิจ ลดเวลาการทำรายงานประจำสัปดาห์ได้อย่างมหาศาล',
    beforeAfter: {
      before: 'ต้องคัดลอกข้อมูลใน Excel มาทำกราฟสรุปด้วยมือทีละแผ่นงาน',
      after: 'เชื่อมต่อ AI Pipeline ดึงข้อมูลและสร้าง Interactive Dashboard อัตโนมัติ'
    }
  },
  {
    id: 'test-4',
    name: 'ศุภพร เจริญทรัพย์',
    role: 'Marketing Operations Manager',
    company: 'Growth Velocity Group',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    courseTitle: 'Digital Marketing & Omnichannel Growth Strategy',
    credentialId: 'CERT-2026-MK-6512',
    rating: 5,
    metricBadge: 'เพิ่ม ROAS จาก 2.1x เป็น 4.8x ใน 3 เดือน',
    quote: 'บทเรียนเรื่อง Unit Economics และ Email Automation ช่วยให้วางแผนแคมเปญได้อย่างมีหลักการ ที่สำคัญคือระบบเปิดดูได้ลื่นไหลทั้งบนมือถือและคอมพิวเตอร์ จดโน้ตตามช่วงเวลาวิดีโอได้จริง ทำให้กลับมาทบทวนสูตรคำนวณ CAC/LTV ได้สะดวกรวดเร็วมาก',
    beforeAfter: {
      before: 'ยิงแอดโดยดูแค่ยอดคลิก แต่ไม่รู้กำไรสุทธิต่อลูกค้า',
      after: 'บริหารงบโฆษณาด้วย LTV:CAC Ratio จนคืนทุนเร็วขึ้น 2 เท่า'
    }
  }
];

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play effect
  useEffect(() => {
    if (isPlaying && !isHovered) {
      timerRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length);
      }, 6500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="relative rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 shadow-sm overflow-hidden space-y-6">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-50/60 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 tracking-wider">
            <span className="uppercase font-mono">เสียงตอบรับและเรื่องราวความสำเร็จ</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Verified Student Feedback</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
            พิสูจน์แล้วจากผู้เรียนจบหลักสูตรจริงกว่า 12,500+ คน
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            เรื่องราวจริงจากการนำความรู้ไปต่อยอดในหน้าที่การงานและสร้างการเปลี่ยนแปลงที่วัดผลได้
          </p>
        </div>

        {/* Carousel Control Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors"
            title={isPlaying ? 'หยุดเล่นอัตโนมัติ' : 'เล่นอัตโนมัติ'}
            aria-label={isPlaying ? 'หยุดเล่นอัตโนมัติ' : 'เล่นอัตโนมัติ'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={handlePrev}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors active:scale-95"
            aria-label="เรื่องราวก่อนหน้า"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors active:scale-95 shadow-sm"
            aria-label="เรื่องราวถัดไป"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Testimonial Stage */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      >
        {/* Quote watermark icon */}
        <Quote className="absolute top-6 right-6 w-20 h-20 text-white/5 pointer-events-none" />

        {/* Left Column: Student Bio & Verified Credential */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={current.avatar}
              alt={current.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-indigo-400/50 shadow-lg"
            />
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                {current.name}
              </h3>
              <p className="text-xs text-indigo-300 font-medium">
                {current.role}
              </p>
              <p className="text-xs text-slate-400">
                {current.company}
              </p>
            </div>
          </div>

          {/* Course and Credential Tag */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>หลักสูตรที่สำเร็จการศึกษา:</span>
              <span className="font-mono text-indigo-400 font-semibold">{current.credentialId}</span>
            </div>
            <p className="font-bold text-white text-xs sm:text-sm line-clamp-1">
              {current.courseTitle}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 pt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ผู้สำเร็จการศึกษาและได้รับใบประกาศนียบัตรแล้ว</span>
            </div>
          </div>

          {/* Quantitative Impact Metric Badge */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
            <TrendingUp className="w-4 h-4 shrink-0" />
            <span>ผลลัพธ์: {current.metricBadge}</span>
          </div>
        </div>

        {/* Right Column: In-depth Story & Transformation */}
        <div className="lg:col-span-7 space-y-6">
          {/* Star Rating */}
          <div className="flex items-center gap-1">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2 text-xs font-mono font-bold text-amber-400">5.0 / 5.0 ยอดเยี่ยม</span>
          </div>

          {/* Testimonial Quote */}
          <blockquote className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed italic">
            "{current.quote}"
          </blockquote>

          {/* Before & After Concrete Impact Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider block">
                ก่อนเริ่มเรียน (Before):
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {current.beforeAfter.before}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-indigo-500/40 space-y-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                หลังสำเร็จหลักสูตร (After):
              </span>
              <p className="text-indigo-200 text-[11px] leading-relaxed">
                {current.beforeAfter.after}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Indicators & Thumbnails */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        {/* Step dots */}
        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all rounded-full ${
                idx === currentIndex
                  ? 'w-8 h-2 bg-indigo-600'
                  : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`ไปยังเรื่องราวที่ ${idx + 1}`}
            />
          ))}
        </div>

        {/* Thumbnail Selector list */}
        <div className="flex items-center gap-3 overflow-x-auto max-w-full pb-1">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setCurrentIndex(idx)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all whitespace-nowrap ${
                idx === currentIndex
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold shadow-sm'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <img src={t.avatar} alt={t.name} className="w-5 h-5 rounded-full object-cover" />
              <span>{t.name.split(' ')[0]}</span>
              <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">({t.company.split(' ')[0]})</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
