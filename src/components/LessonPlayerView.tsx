import React, { useState, useEffect } from 'react';
import { Course, Lesson, Certificate } from '../types';
import { useApp } from '../context/AppContext';
import { VideoPlayer } from './VideoPlayer';
import { MyNotesSidebar } from './MyNotesSidebar';
import {
  ArrowLeft,
  CheckCircle,
  PlayCircle,
  Award,
  ClipboardCheck,
  ChevronRight,
  ShieldCheck,
  Lock,
  Bookmark,
  ListOrdered
} from 'lucide-react';

interface LessonPlayerViewProps {
  course: Course;
  initialLessonId?: string;
  onBack: () => void;
  onOpenPreTest: () => void;
  onOpenPostTest: () => void;
  onOpenCertificate: (certificate: Certificate) => void;
}

export const LessonPlayerView: React.FC<LessonPlayerViewProps> = ({
  course,
  initialLessonId,
  onBack,
  onOpenPreTest,
  onOpenPostTest,
  onOpenCertificate
}) => {
  const {
    currentUser,
    progressList,
    markLessonComplete,
    updateLastAccessedLesson,
    calculateCourseProgressPercentage,
    getCertificate,
    getUserNotes
  } = useApp();

  const progress = progressList.find(p => p.courseId === course.id && p.userId === currentUser.id);
  const completedLessons = progress?.completedLessonIds || [];
  const progressPercent = calculateCourseProgressPercentage(course.id);

  // Active Lesson State
  const [activeLessonId, setActiveLessonId] = useState<string>(() => {
    return initialLessonId || progress?.lastAccessedLessonId || course.lessons[0]?.id || '';
  });

  // Playback & Notes State
  const [rightSidebarTab, setRightSidebarTab] = useState<'playlist' | 'notes'>('playlist');
  const [currentVideoTime, setCurrentVideoTime] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [seekTimestamp, setSeekTimestamp] = useState<{ timestamp: number; key: number } | null>(null);

  // Notes in profile for this course
  const courseNotes = getUserNotes(course.id);
  const currentLessonNotes = courseNotes.filter(n => n.lessonId === activeLessonId);

  useEffect(() => {
    if (activeLessonId) {
      updateLastAccessedLesson(course.id, activeLessonId);
    }
  }, [activeLessonId, course.id]);

  const activeLessonIndex = course.lessons.findIndex(l => l.id === activeLessonId);
  const currentLesson: Lesson = course.lessons[activeLessonIndex] || course.lessons[0];
  const isCurrentCompleted = completedLessons.includes(currentLesson.id);

  const handleNextLesson = () => {
    if (activeLessonIndex < course.lessons.length - 1) {
      setActiveLessonId(course.lessons[activeLessonIndex + 1].id);
    } else if (allLessonsFinished) {
      onOpenPostTest();
    }
  };

  const handleSeekToNoteTimestamp = (timestampSeconds: number, targetLessonId?: string) => {
    if (targetLessonId && targetLessonId !== activeLessonId) {
      setActiveLessonId(targetLessonId);
    }
    setSeekTimestamp({ timestamp: timestampSeconds, key: Date.now() });
  };

  const allLessonsFinished = completedLessons.length >= course.lessons.length;
  const certificateUnlocked = !!progress?.certificateIssued;
  const userCert = progress?.certificateId ? getCertificate(progress.certificateId) : undefined;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Top Header Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปยังหน้ารายละเอียดหลักสูตร</span>
        </button>

        <div className="flex items-center gap-3 text-xs">
          {/* Quick Tab Toggle in Header */}
          <div className="inline-flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200">
            <button
              onClick={() => setRightSidebarTab('playlist')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 ${
                rightSidebarTab === 'playlist'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListOrdered className="w-3 h-3" />
              <span>สารบัญ</span>
            </button>
            <button
              onClick={() => setRightSidebarTab('notes')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 ${
                rightSidebarTab === 'notes'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bookmark className="w-3 h-3" />
              <span>บันทึกของฉัน</span>
              <span className="px-1 py-0.2 rounded-full bg-indigo-100 text-indigo-800 text-[9px] font-bold font-mono">
                {courseNotes.length}
              </span>
            </button>
          </div>

          <span className="text-slate-300">|</span>

          <span className="text-slate-500 hidden sm:inline">ความก้าวหน้า:</span>
          <div className="w-24 sm:w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${allLessonsFinished ? 'bg-emerald-500' : 'bg-indigo-600'}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="font-mono font-bold text-indigo-700">{progressPercent}%</span>
        </div>
      </div>

      {/* Two-Zone Layout (Left: Video Player; Right: Sidebar - Playlist or My Notes) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Video Player */}
        <div className="lg:col-span-8">
          <VideoPlayer
            lesson={currentLesson}
            courseId={course.id}
            courseTitle={course.title}
            isCompleted={isCurrentCompleted}
            onToggleComplete={() => markLessonComplete(course.id, currentLesson.id)}
            onNextLesson={activeLessonIndex < course.lessons.length - 1 ? handleNextLesson : undefined}
            onTimeUpdate={(t, d) => {
              setCurrentVideoTime(t);
              setVideoDuration(d);
            }}
            seekTimestamp={seekTimestamp}
            onOpenNotesSidebar={() => setRightSidebarTab('notes')}
          />
        </div>

        {/* Right 4 Cols: Sidebar (Switchable between Playlist & My Notes) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Sidebar Top Tab Selector */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100/90 border border-slate-200 text-xs shadow-2xs">
            <button
              onClick={() => setRightSidebarTab('playlist')}
              className={`py-2 px-3 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
                rightSidebarTab === 'playlist'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5 text-indigo-600" />
              <span>สารบัญ & ข้อสอบ</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px] font-mono">
                {completedLessons.length}/{course.lessons.length}
              </span>
            </button>

            <button
              onClick={() => setRightSidebarTab('notes')}
              className={`py-2 px-3 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
                rightSidebarTab === 'notes'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
              <span>บันทึกช่วยจำ</span>
              <span className="px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-mono font-bold">
                {courseNotes.length}
              </span>
            </button>
          </div>

          {/* Conditional Rendering: My Notes Sidebar vs Playlist/Exam Deck */}
          {rightSidebarTab === 'notes' ? (
            <MyNotesSidebar
              course={course}
              currentLesson={currentLesson}
              currentVideoTime={currentVideoTime}
              onSeekToTimestamp={handleSeekToNoteTimestamp}
              onSelectLesson={(lessonId) => setActiveLessonId(lessonId)}
              onClose={() => setRightSidebarTab('playlist')}
            />
          ) : (
            <div className="space-y-4">
          {/* Certificate Banner if issued */}
          {certificateUnlocked && userCert && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Award className="w-6 h-6 text-amber-200 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-100">
                    สำเร็จการศึกษาแล้ว!
                  </span>
                  <p className="text-xs font-bold leading-tight">ใบประกาศนียบัตรของคุณพร้อมแล้ว</p>
                </div>
              </div>
              <button
                onClick={() => onOpenCertificate(userCert)}
                className="px-3 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-bold hover:bg-amber-50 transition-colors whitespace-nowrap shadow"
              >
                ดูใบประกาศ
              </button>
            </div>
          )}

          {/* Pre-test & Post-test Step Strip */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              ขั้นตอนการวัดผลการเรียนรู้:
            </h3>

            {/* Pre-test Item */}
            <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 text-xs">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="font-semibold text-slate-800 block">แบบทดสอบก่อนเรียน</span>
                  <span className="text-[10px] text-slate-500">
                    {progress?.preTestScore
                      ? `สอบแล้ว: ${progress.preTestScore.score}/${progress.preTestScore.total} (${progress.preTestScore.percentage}%)`
                      : 'ยังไม่ได้ทำแบบทดสอบ'}
                  </span>
                </div>
              </div>
              <button
                onClick={onOpenPreTest}
                className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              >
                {progress?.preTestScore ? 'ดูผลสอบ' : 'ทำแบบทดสอบ'}
              </button>
            </div>

            {/* Post-test Item */}
            <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 text-xs">
              <div className="flex items-center gap-2">
                {allLessonsFinished ? (
                  <Award className="w-4 h-4 text-indigo-600" />
                ) : (
                  <Lock className="w-4 h-4 text-slate-400" />
                )}
                <div>
                  <span className="font-semibold text-slate-800 block">แบบทดสอบหลังเรียน</span>
                  <span className="text-[10px] text-slate-500">
                    {progress?.postTestScore
                      ? `คะแนน: ${progress.postTestScore.percentage}% (${progress.postTestScore.passed ? 'ผ่าน' : 'ไม่ผ่าน'})`
                      : allLessonsFinished
                      ? 'ปลดล็อคแล้ว (เกณฑ์ผ่าน 80%)'
                      : 'ต้องเรียนครบทุกบทก่อน'}
                  </span>
                </div>
              </div>
              <button
                onClick={onOpenPostTest}
                disabled={!allLessonsFinished && !progress?.postTestScore}
                className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:pointer-events-none"
              >
                {progress?.postTestScore ? 'ดูผล/สอบใหม่' : 'เริ่มทำข้อสอบ'}
              </button>
            </div>
          </div>

          {/* Playlist Container */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                บทเรียนทั้งหมด ({completedLessons.length}/{course.lessons.length})
              </h3>
              <span className="text-[11px] font-mono text-slate-400">{course.durationHours} ชม.</span>
            </div>

            <div className="space-y-1.5 max-h-[460px] overflow-y-auto">
              {course.lessons.map((lesson, idx) => {
                const isSelected = lesson.id === activeLessonId;
                const isDone = completedLessons.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLessonId(lesson.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-sm'
                        : 'border-slate-100 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-700'
                          : isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {isDone ? <CheckCircle className="w-3.5 h-3.5" /> : idx + 1}
                      </div>

                      <div className="truncate">
                        <span className={`text-xs block truncate ${isSelected ? 'font-bold text-indigo-950' : 'text-slate-800'}`}>
                          {lesson.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {lesson.durationMinutes} นาที
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
