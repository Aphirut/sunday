import React, { useState, useRef, useEffect } from 'react';
import { Lesson, UserNote } from '../types';
import { useApp } from '../context/AppContext';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  CheckCircle,
  FileText,
  Clock,
  Plus,
  Trash2,
  Video,
  Bookmark,
  Sparkles
} from 'lucide-react';

interface VideoPlayerProps {
  lesson: Lesson;
  courseId: string;
  courseTitle: string;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onNextLesson?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  seekTimestamp?: { timestamp: number; key: number } | null;
  onOpenNotesSidebar?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  lesson,
  courseId,
  courseTitle,
  isCompleted,
  onToggleComplete,
  onNextLesson,
  onTimeUpdate,
  seekTimestamp,
  onOpenNotesSidebar
}) => {
  const { currentUser, addUserNote, deleteUserNote, getUserNotes } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(lesson.durationMinutes * 60);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'notes'>('overview');

  // User notes from profile
  const profileNotes = getUserNotes(courseId, lesson.id);
  const [newNoteText, setNewNoteText] = useState('');

  // Handle external seek requests from MyNotesSidebar or timestamp clicks
  useEffect(() => {
    if (seekTimestamp && typeof seekTimestamp.timestamp === 'number') {
      const targetSec = seekTimestamp.timestamp;
      setCurrentTime(targetSec);
      if (videoRef.current) {
        videoRef.current.currentTime = targetSec;
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(true));
      }
    }
  }, [seekTimestamp]);

  // Reset states on lesson change
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setHasError(false);
  }, [lesson.id]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        // Fallback for autoplay policy or error
        setIsPlaying(true);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      setCurrentTime(cur);
      const dur = (videoRef.current.duration && !isNaN(videoRef.current.duration))
        ? videoRef.current.duration
        : lesson.durationMinutes * 60;
      setDuration(dur);
      if (onTimeUpdate) {
        onTimeUpdate(cur, dur);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    if (onTimeUpdate) {
      onTimeUpdate(time, duration);
    }
  };

  const handleSkip = (seconds: number) => {
    if (videoRef.current) {
      const nextTime = Math.min(duration, Math.max(0, videoRef.current.currentTime + seconds));
      videoRef.current.currentTime = nextTime;
      setCurrentTime(nextTime);
      if (onTimeUpdate) {
        onTimeUpdate(nextTime, duration);
      }
    }
  };

  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMute = !isMuted;
      videoRef.current.muted = nextMute;
      setIsMuted(nextMute);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    addUserNote({
      courseId,
      courseTitle,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      timestampSeconds: Math.floor(currentTime),
      text: newNoteText.trim(),
      tags: ['💡 สรุปใจความ']
    });
    setNewNoteText('');
  };

  const handleDeleteNote = (id: string) => {
    deleteUserNote(id);
  };

  const handleJumpToTimestamp = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      setCurrentTime(seconds);
      if (onTimeUpdate) {
        onTimeUpdate(seconds, duration);
      }
    }
  };

  return (
    <div className="flex flex-col rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
      {/* Video Screen Container */}
      <div className="relative aspect-video bg-slate-950 w-full overflow-hidden flex items-center justify-center group">
        {!hasError ? (
          <video
            ref={videoRef}
            src={lesson.videoUrl}
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => {
              setIsPlaying(false);
              if (!isCompleted) onToggleComplete();
            }}
            onError={() => setHasError(true)}
            playsInline
            preload="metadata"
          />
        ) : (
          /* High-Fidelity Animated Interactive Playback Fallback */
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-6 text-center text-white">
            <div className="w-16 h-16 rounded-full bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center mb-4 text-indigo-400">
              <Video className="w-8 h-8" />
            </div>
            <p className="text-base font-semibold text-slate-100">{lesson.title}</p>
            <p className="text-xs text-slate-400 mt-1 max-w-md">{lesson.description}</p>
            <div className="mt-4 px-3 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-mono">
              สตรีมวิดีโอระดับความคมชัด 1080p Full HD · ระบบความปลอดภัยสูงสุด
            </div>
          </div>
        )}

        {/* Video Overlay Control Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 sm:p-4 text-white opacity-95 transition-opacity">
          {/* Progress Timeline Slider */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono text-slate-300 shrink-0">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
            />
            <span className="text-[11px] font-mono text-slate-400 shrink-0">
              {formatTime(duration)}
            </span>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-2 text-xs">
            {/* Left Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                aria-label={isPlaying ? 'หยุดวิดีโอ' : 'เล่นวิดีโอ'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <button
                onClick={() => handleSkip(-10)}
                className="p-1.5 hover:text-indigo-400 transition-colors text-slate-300 hidden sm:block"
                title="ย้อนหลัง 10 วินาที"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleSkip(10)}
                className="p-1.5 hover:text-indigo-400 transition-colors text-slate-300 hidden sm:block"
                title="ข้ามไปข้างหน้า 10 วินาที"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              {/* Volume */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={toggleMute}
                  className="p-1.5 hover:text-indigo-400 transition-colors text-slate-300"
                  aria-label={isMuted ? 'เปิดเสียง' : 'ปิดเสียง'}
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-14 sm:w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Playback speed selector */}
              <div className="flex items-center gap-1 bg-black/40 rounded-md p-0.5 border border-white/10">
                {[0.75, 1, 1.25, 1.5, 2].map(rate => (
                  <button
                    key={rate}
                    onClick={() => handleRateChange(rate)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                      playbackRate === rate ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>

              {/* Fullscreen */}
              <button
                onClick={handleFullscreen}
                className="p-1.5 hover:text-indigo-400 transition-colors text-slate-300"
                title="เต็มหน้าจอ"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Details & Actions Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs text-slate-400 font-medium">{courseTitle}</span>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
            {lesson.title}
          </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onOpenNotesSidebar && (
            <button
              onClick={onOpenNotesSidebar}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors shadow-2xs"
              title="เปิดแถบด้านข้าง 'บันทึกช่วยจำ' (My Notes)"
            >
              <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
              <span>บันทึกช่วยจำ</span>
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-indigo-600 text-white text-[10px] font-mono font-bold">
                {profileNotes.length}
              </span>
            </button>
          )}

          <button
            onClick={onToggleComplete}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isCompleted ? 'เรียนจบบทนี้แล้ว ✓' : 'ทำเครื่องหมายว่าเรียนจบ'}</span>
          </button>

          {onNextLesson && (
            <button
              onClick={onNextLesson}
              className="px-3.5 py-2 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white transition-colors"
            >
              บทถัดไป
            </button>
          )}
        </div>
      </div>

      {/* Content Tabs: Overview vs Interactive Notes */}
      <div className="flex items-center gap-1 px-5 pt-3 border-b border-slate-100 bg-slate-50/50">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
            activeTab === 'overview'
              ? 'border-indigo-600 text-indigo-700 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>รายละเอียดบทเรียน</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
            activeTab === 'notes'
              ? 'border-indigo-600 text-indigo-700 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>บันทึกช่วยจำในบทนี้ ({profileNotes.length})</span>
        </button>
      </div>

      {/* Tab Body */}
      <div className="p-5">
        {activeTab === 'overview' ? (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600">
            <p className="leading-relaxed text-slate-700">{lesson.description}</p>

            {/* Key takeaways */}
            {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
                <span className="font-semibold text-slate-900 block text-xs">
                  📌 ประเด็นสำคัญในบทนี้ (Key Takeaways):
                </span>
                <ul className="space-y-1 list-disc list-inside text-xs text-slate-600">
                  {lesson.keyTakeaways.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Attached Resources */}
            {lesson.resources && lesson.resources.length > 0 && (
              <div className="pt-2">
                <span className="font-semibold text-slate-800 block text-xs mb-2">
                  📎 เอกสารและโค้ดตัวอย่างประกอบบทเรียน:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {lesson.resources.map(res => (
                    <div
                      key={res.id}
                      className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span className="font-medium text-slate-800 truncate">{res.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">{res.size || 'ดาวน์โหลด'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Interactive Notes Tab */
          <div className="space-y-4">
            {/* Note input form */}
            <form onSubmit={handleAddNote} className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>บันทึกความเข้าใจ ณ เวลาปัจจุบัน ({formatTime(currentTime)})</span>
                {onOpenNotesSidebar && (
                  <button
                    type="button"
                    onClick={onOpenNotesSidebar}
                    className="text-[11px] text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    <span>เปิดแถบด้านข้างเต็มรูปแบบ ↗</span>
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="พิมพ์ข้อความสรุปหรือคำถามที่ต้องการบันทึก..."
                  value={newNoteText}
                  onChange={e => setNewNoteText(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-600 bg-slate-50/50"
                />
                <button
                  type="submit"
                  disabled={!newNoteText.trim()}
                  className="flex items-center gap-1 px-3.5 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-40"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>บันทึก</span>
                </button>
              </div>
            </form>

            {/* Notes List */}
            <div className="space-y-2 pt-2">
              {profileNotes.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs">
                  ยังไม่มีบันทึกช่วยจำในบทนี้ สามารถพิมพ์บันทึกพร้อมประทับเวลาได้ทันที หรือใช้แถบด้านข้าง My Notes
                </div>
              ) : (
                profileNotes.map(note => (
                  <div
                    key={note.id}
                    className="p-3 rounded-lg border border-slate-200/80 bg-white flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleJumpToTimestamp(note.timestampSeconds)}
                          className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono text-[10px] font-semibold hover:bg-indigo-100 transition-colors"
                          title="คลิกเพื่อกระโดดไปยังเวลานี้ในวิดีโอ"
                        >
                          ▶ {formatTime(note.timestampSeconds)}
                        </button>
                        <span className="text-[10px] text-slate-400">{note.createdAt}</span>
                      </div>
                      <p className="text-slate-800 leading-relaxed">{note.text}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                      title="ลบบันทึก"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
