import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Course,
  UserCourseProgress,
  Certificate,
  EmailNotification,
  CourseAnalytics,
  Lesson,
  QuizSubmission,
  UserNote,
  SubjectiveGradeItem,
  AppSettings
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_COURSES,
  INITIAL_PROGRESS,
  INITIAL_CERTIFICATES,
  INITIAL_NOTIFICATIONS,
  INITIAL_ANALYTICS
} from '../data/initialData';

export const DEFAULT_APP_SETTINGS: AppSettings = {
  appName: 'BB FlexLearn',
  appShortName: 'BB',
  tagline: 'มาตรฐานการเรียนรู้ออนไลน์ระดับองค์กร 2026',
  logoType: 'monogram',
  logoBgColor: 'indigo',
  logoUrl: '',
  presetLogoId: 'flexlearn_badge'
};

interface AppContextType {
  currentUser: User;
  users: User[];
  courses: Course[];
  progressList: UserCourseProgress[];
  certificates: Certificate[];
  notifications: EmailNotification[];
  analytics: CourseAnalytics[];
  // App Branding & Settings
  appSettings: AppSettings;
  updateAppSettings: (newSettings: Partial<AppSettings>) => void;
  // User Actions
  loginAsUser: (userId: string) => void;
  addUser: (userData: Omit<User, 'id' | 'createdAt' | 'enrolledCourseIds'>) => User;
  deleteUser: (userId: string) => void;
  // Course Actions
  addCourse: (courseData: Omit<Course, 'id' | 'updatedAt'>) => Course;
  updateCourse: (course: Course) => void;
  deleteCourse: (courseId: string) => void;
  addLessonToCourse: (courseId: string, lessonData: Omit<Lesson, 'id' | 'order'>, notifyStudents?: boolean) => void;
  enrollInCourse: (courseId: string) => void;
  markLessonComplete: (courseId: string, lessonId: string) => void;
  updateLastAccessedLesson: (courseId: string, lessonId: string) => void;
  submitQuiz: (
    courseId: string,
    type: 'pre_test' | 'post_test',
    answers: (number | number[] | string)[]
  ) => { submission: QuizSubmission; certificateGenerated?: Certificate };
  gradeSubjectiveSubmission: (params: {
    courseId: string;
    userId: string;
    quizType: 'pre_test' | 'post_test';
    grades: Record<string, { scoreAwarded: number; teacherComment?: string }>;
  }) => void;
  // Certificate Actions
  getCertificate: (certId: string) => Certificate | undefined;
  getUserCertificates: (userId?: string) => Certificate[];
  // Notifications & Announcements
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  sendCustomEmail: (toEmail: string, toName: string, subject: string, message: string, courseId?: string) => void;
  broadcastAnnouncement: (courseId: string, subject: string, message: string) => void;
  // User Notes Actions (Stored in User Profile)
  addUserNote: (noteData: {
    courseId: string;
    courseTitle: string;
    lessonId: string;
    lessonTitle: string;
    timestampSeconds: number;
    text: string;
    tags?: string[];
  }) => UserNote;
  updateUserNote: (noteId: string, text: string, tags?: string[]) => void;
  deleteUserNote: (noteId: string) => void;
  getUserNotes: (courseId?: string, lessonId?: string) => UserNote[];
  // Progress helpers
  getCurrentUserCourseProgress: (courseId: string) => UserCourseProgress | undefined;
  calculateCourseProgressPercentage: (courseId: string, userId?: string) => number;
  resetAllData: () => void;
}

const STORAGE_KEYS = {
  USERS: 'ls_users_v1',
  CURRENT_USER_ID: 'ls_current_user_id_v1',
  COURSES: 'ls_courses_v1',
  PROGRESS: 'ls_progress_v1',
  CERTIFICATES: 'ls_certificates_v1',
  NOTIFICATIONS: 'ls_notifications_v1',
  ANALYTICS: 'ls_analytics_v1',
  SETTINGS: 'ls_app_settings_v1',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 0. App Branding & Settings
  const [appSettings, setAppSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!saved) return DEFAULT_APP_SETTINGS;
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_APP_SETTINGS, ...parsed };
    } catch {
      return DEFAULT_APP_SETTINGS;
    }
  });

  // 1. Initialize Users (with user notes in profile)
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      if (!saved) return INITIAL_USERS;
      const parsed: User[] = JSON.parse(saved);
      const existingIds = new Set(parsed.map(u => u.id));
      const missingUsers = INITIAL_USERS.filter(u => !existingIds.has(u.id));
      return [...parsed, ...missingUsers].map(u => {
        const initUser = INITIAL_USERS.find(iu => iu.id === u.id);
        return {
          ...u,
          notes: u.notes !== undefined ? u.notes : (initUser?.notes || [])
        };
      });
    } catch {
      return INITIAL_USERS;
    }
  });

  // Current active user ID
  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
      return saved || 'user-student-1';
    } catch {
      return 'user-student-1';
    }
  });

  // 2. Initialize Courses
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
      if (!saved) return INITIAL_COURSES;
      const parsed: Course[] = JSON.parse(saved);
      const existingIds = new Set(parsed.map(c => c.id));
      const missingCourses = INITIAL_COURSES.filter(c => !existingIds.has(c.id));
      return [...parsed, ...missingCourses].map(c => {
        const init = INITIAL_COURSES.find(ic => ic.id === c.id);
        return {
          ...c,
          classroomCode: c.classroomCode || init?.classroomCode
        };
      });
    } catch {
      return INITIAL_COURSES;
    }
  });

  // 3. Initialize Progress
  const [progressList, setProgressList] = useState<UserCourseProgress[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      if (!saved) return INITIAL_PROGRESS;
      const parsed: UserCourseProgress[] = JSON.parse(saved);
      const existingKeys = new Set(parsed.map(p => `${p.courseId}_${p.userId}`));
      const missing = INITIAL_PROGRESS.filter(p => !existingKeys.has(`${p.courseId}_${p.userId}`));
      return [...parsed, ...missing];
    } catch {
      return INITIAL_PROGRESS;
    }
  });

  // 4. Initialize Certificates
  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
      return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
    } catch {
      return INITIAL_CERTIFICATES;
    }
  });

  // 5. Initialize Notifications
  const [notifications, setNotifications] = useState<EmailNotification[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // 6. Analytics
  const [analytics, setAnalytics] = useState<CourseAnalytics[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
      return saved ? JSON.parse(saved) : INITIAL_ANALYTICS;
    } catch {
      return INITIAL_ANALYTICS;
    }
  });

  // Persistent storage effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progressList));
  }, [progressList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
  }, [analytics]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(appSettings));
    if (appSettings.appName) {
      document.title = `${appSettings.appName} - แพลตฟอร์มการเรียนรู้ออนไลน์`;
    }
  }, [appSettings]);

  const updateAppSettings = (newSettings: Partial<AppSettings>) => {
    setAppSettings(prev => {
      const updated = { ...prev, ...newSettings };
      return updated;
    });
  };

  const currentUser = users.find(u => u.id === currentUserId) || users[0] || INITIAL_USERS[0];

  const loginAsUser = (userId: string) => {
    const found = users.find(u => u.id === userId);
    if (found) {
      setCurrentUserId(userId);
    }
  };

  const addUser = (userData: Omit<User, 'id' | 'createdAt' | 'enrolledCourseIds'>): User => {
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      enrolledCourseIds: ['course-web-dev']
    };
    setUsers(prev => [newUser, ...prev]);

    // Send welcome simulated email
    const welcomeEmail: EmailNotification = {
      id: `notif-${Date.now()}`,
      toEmail: newUser.email,
      toName: newUser.name,
      subject: '🎉 ยินดีต้อนรับสู่ระบบการเรียนรู้ BB FlexLearn',
      type: 'course_enrolled',
      previewText: `บัญชีผู้ใช้งานของคุณถูกสร้างขึ้นเรียบร้อยแล้ว ในบทบาท ${newUser.role === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้เรียน'}`,
      sentAt: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' วันนี้',
      isRead: false,
      htmlBody: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <h2 style="color: #0f172a; margin: 0 0 12px;">ยินดีต้อนรับสู่ BB FlexLearn</h2>
          <p style="color: #334155;">เรียนคุณ ${newUser.name},</p>
          <p style="color: #334155;">ผู้ดูแลระบบได้สร้างบัญชีผู้ใช้งานให้ท่านเรียบร้อยแล้ว ท่านสามารถเข้าสู่ระบบและเริ่มต้นเรียนรู้คอร์สออนไลน์ได้ทันทีทุกที่ทุกเวลาบนทุกอุปกรณ์</p>
          <div style="background: #f1f5f9; padding: 12px; border-radius: 6px; margin: 16px 0;">
            <p style="margin: 0; font-size: 13px; color: #475569;"><strong>อีเมล:</strong> ${newUser.email}</p>
            <p style="margin: 4px 0 0; font-size: 13px; color: #475569;"><strong>บทบาท:</strong> ${newUser.role === 'admin' ? 'ผู้ดูแลระบบ (Admin)' : 'ผู้เรียน (Student)'}</p>
          </div>
        </div>
      `
    };
    setNotifications(prev => [welcomeEmail, ...prev]);
    return newUser;
  };

  const deleteUser = (userId: string) => {
    if (userId === currentUser.id) return; // Prevent deleting oneself
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const addCourse = (courseData: Omit<Course, 'id' | 'updatedAt'>): Course => {
    if (currentUser.role === 'student') {
      console.warn('Unauthorized: Students cannot create courses');
      throw new Error('ผู้เรียนไม่มีสิทธิ์ในการสร้างคอร์สใหม่');
    }
    const newCourse: Course = {
      ...courseData,
      id: `course-${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setCourses(prev => [newCourse, ...prev]);
    return newCourse;
  };

  const updateCourse = (updated: Course) => {
    if (currentUser.role === 'student') {
      console.warn('Unauthorized: Students cannot edit courses or quizzes');
      return;
    }
    setCourses(prev => prev.map(c => c.id === updated.id ? { ...updated, updatedAt: new Date().toISOString().split('T')[0] } : c));
  };

  const deleteCourse = (courseId: string) => {
    if (currentUser.role === 'student') {
      console.warn('Unauthorized: Students cannot delete courses');
      return;
    }
    setCourses(prev => prev.filter(c => c.id !== courseId));
    setProgressList(prev => prev.filter(p => p.courseId !== courseId));
  };

  const addLessonToCourse = (courseId: string, lessonData: Omit<Lesson, 'id' | 'order'>, notifyStudents: boolean = true) => {
    if (currentUser.role === 'student') {
      console.warn('Unauthorized: Students cannot add lessons');
      return;
    }
    const targetCourse = courses.find(c => c.id === courseId);
    if (!targetCourse) return;

    const newLessonId = `lesson-${Date.now()}`;
    const newLesson: Lesson = {
      ...lessonData,
      id: newLessonId,
      order: targetCourse.lessons.length + 1
    };

    const updatedCourse: Course = {
      ...targetCourse,
      lessons: [...targetCourse.lessons, newLesson],
      durationHours: Number((targetCourse.durationHours + (lessonData.durationMinutes / 60)).toFixed(1)),
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setCourses(prev => prev.map(c => c.id === courseId ? updatedCourse : c));

    // If notifyStudents is enabled, dispatch notification emails to enrolled users
    if (notifyStudents) {
      const enrolledStudents = users.filter(u => u.enrolledCourseIds.includes(courseId));
      const newNotifs: EmailNotification[] = enrolledStudents.map(student => ({
        id: `notif-${Date.now()}-${student.id}`,
        toEmail: student.email,
        toName: student.name,
        subject: `🔔 อัปเดตใหม่: มีบทเรียนใหม่ในคอร์ส "${targetCourse.title}"`,
        type: 'lesson_update',
        previewText: `บทเรียนใหม่: ${lessonData.title} (${lessonData.durationMinutes} นาที) พร้อมให้เข้าชมแล้ว`,
        sentAt: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' วันนี้',
        isRead: false,
        relatedCourseId: courseId,
        htmlBody: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
            <div style="border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 16px;">
              <h2 style="color: #0f172a; margin: 0; font-size: 18px;">บทเรียนใหม่ถูกอัปโหลดเรียบร้อยแล้ว</h2>
              <p style="color: #64748b; margin: 4px 0 0; font-size: 13px;">${targetCourse.title}</p>
            </div>
            <p style="color: #1e293b; font-size: 15px;">เรียนคุณ ${student.name},</p>
            <p style="color: #334155; line-height: 1.6; font-size: 14px;">ผู้สอนได้ทำการเพิ่มบทเรียนใหม่ในคอร์สที่คุณลงทะเบียนไว้:</p>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px; margin: 16px 0;">
              <p style="margin: 0; font-weight: 600; color: #1e293b; font-size: 15px;">${lessonData.title}</p>
              <p style="margin: 6px 0 0; color: #64748b; font-size: 13px;">ความยาว: ${lessonData.durationMinutes} นาที</p>
              <p style="margin: 6px 0 0; color: #475569; font-size: 13px;">${lessonData.description}</p>
            </div>
            <p style="color: #64748b; font-size: 13px;">คุณสามารถล็อกอินเข้าสู่ BB FlexLearn เพื่อรับชมวิดีโอบทเรียนนี้ได้ทันที</p>
          </div>
        `
      }));

      setNotifications(prev => [...newNotifs, ...prev]);
    }
  };

  const enrollInCourse = (courseId: string) => {
    // Add to user's enrolledCourseIds
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        if (!u.enrolledCourseIds.includes(courseId)) {
          return { ...u, enrolledCourseIds: [...u.enrolledCourseIds, courseId] };
        }
      }
      return u;
    }));

    // Check if progress already exists
    const existing = progressList.find(p => p.courseId === courseId && p.userId === currentUser.id);
    if (!existing) {
      const course = courses.find(c => c.id === courseId);
      const firstLesson = course?.lessons[0]?.id;
      const newProgress: UserCourseProgress = {
        courseId,
        userId: currentUser.id,
        enrolledDate: new Date().toISOString().split('T')[0],
        completedLessonIds: [],
        certificateIssued: false,
        lastAccessedLessonId: firstLesson,
        totalWatchSeconds: 0
      };
      setProgressList(prev => [...prev, newProgress]);

      // Notification
      const enrollNotif: EmailNotification = {
        id: `notif-${Date.now()}`,
        toEmail: currentUser.email,
        toName: currentUser.name,
        subject: `📖 ยืนยันการลงทะเบียนคอร์ส: ${course?.title}`,
        type: 'course_enrolled',
        previewText: 'คุณได้ลงทะเบียนเรียนเรียบร้อยแล้ว แนะนำให้ทำแบบทดสอบก่อนเรียน (Pre-test) ก่อนเริ่มบทเรียนแรก',
        sentAt: 'เมื่อสักครู่',
        isRead: false,
        relatedCourseId: courseId,
        htmlBody: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
            <h2 style="color: #0f172a; margin: 0 0 12px;">ยืนยันการลงทะเบียนเรียนสำเร็จ</h2>
            <p style="color: #334155;">เรียนคุณ ${currentUser.name},</p>
            <p style="color: #334155;">คุณได้ลงทะเบียนเรียนในหลักสูตร <strong>${course?.title}</strong> เรียบร้อยแล้ว</p>
            <p style="color: #334155;">เพื่อประโยชน์สูงสุดในการวัดผลพัฒนาการ กรุณาทำแบบทดสอบก่อนเรียน (Pre-test) ก่อนเริ่มต้นรับชมบทเรียนแรก</p>
          </div>
        `
      };
      setNotifications(prev => [enrollNotif, ...prev]);
    }
  };

  const markLessonComplete = (courseId: string, lessonId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    setProgressList(prev => {
      const existing = prev.find(p => p.courseId === courseId && p.userId === currentUser.id);
      if (existing) {
        const isAlreadyComplete = existing.completedLessonIds.includes(lessonId);
        const updatedCompleted = isAlreadyComplete
          ? existing.completedLessonIds
          : [...existing.completedLessonIds, lessonId];

        // Check if now all lessons are complete AND postTest was passed
        let certIssued = existing.certificateIssued;
        let certId = existing.certificateId;
        let certDate = existing.certificateDate;

        const allLessonsFinished = updatedCompleted.length >= course.lessons.length;
        const postTestPassed = !!existing.postTestScore?.passed;

        if (allLessonsFinished && postTestPassed && !certIssued) {
          // Generate certificate
          certIssued = true;
          certId = `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
          certDate = new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });

          const newCert: Certificate = {
            id: `cert-${Date.now()}`,
            credentialId: certId,
            courseId: course.id,
            courseTitle: course.title,
            userId: currentUser.id,
            userName: currentUser.name,
            userEmail: currentUser.email,
            issuedDate: certDate,
            instructorName: course.instructor.name,
            instructorTitle: course.instructor.title,
            scorePercentage: existing.postTestScore?.percentage || 100,
            verificationHash: Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 10),
            certificateTemplate: course.certificateTemplate
          };

          setCertificates(cList => [newCert, ...cList]);
        }

        return prev.map(p => p.courseId === courseId && p.userId === currentUser.id ? {
          ...p,
          completedLessonIds: updatedCompleted,
          lastAccessedLessonId: lessonId,
          certificateIssued: certIssued,
          certificateId: certId,
          certificateDate: certDate,
          totalWatchSeconds: p.totalWatchSeconds + 300
        } : p);
      } else {
        // Create initial progress
        return [...prev, {
          courseId,
          userId: currentUser.id,
          enrolledDate: new Date().toISOString().split('T')[0],
          completedLessonIds: [lessonId],
          certificateIssued: false,
          lastAccessedLessonId: lessonId,
          totalWatchSeconds: 300
        }];
      }
    });
  };

  const updateLastAccessedLesson = (courseId: string, lessonId: string) => {
    setProgressList(prev => prev.map(p => {
      if (p.courseId === courseId && p.userId === currentUser.id) {
        return { ...p, lastAccessedLessonId: lessonId };
      }
      return p;
    }));
  };

  const submitQuiz = (
    courseId: string,
    type: 'pre_test' | 'post_test',
    answers: (number | number[] | string)[]
  ) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) throw new Error('Course not found');

    const quiz = type === 'pre_test' ? course.preTest : course.postTest;
    let earnedPoints = 0;
    let maxPoints = 0;
    let hasPendingSubjective = false;
    const subjectiveAnswers: Record<string, SubjectiveGradeItem> = {};

    quiz.questions.forEach((q, idx) => {
      const qType = q.type || 'multiple_choice';
      const qMaxPoints = q.points && q.points > 0 ? q.points : 1;
      maxPoints += qMaxPoints;

      const studentAns = answers[idx];

      if (qType === 'multiple_choice' || qType === 'true_false') {
        if (typeof studentAns === 'number' && studentAns === q.correctIndex) {
          earnedPoints += qMaxPoints;
        }
      } else if (qType === 'multiple_select') {
        const correct = (q.correctIndices || []).slice().sort();
        const userSelected = (Array.isArray(studentAns) ? (studentAns as number[]) : []).slice().sort();
        if (JSON.stringify(correct) === JSON.stringify(userSelected)) {
          earnedPoints += qMaxPoints;
        }
      } else if (qType === 'subjective_short') {
        const text = typeof studentAns === 'string' ? studentAns.trim() : '';
        let matched = false;
        if (text) {
          if (q.sampleAnswer && text.toLowerCase().includes(q.sampleAnswer.toLowerCase().trim())) {
            matched = true;
          } else if (q.keywords && q.keywords.length > 0) {
            matched = q.keywords.some(k => text.toLowerCase().includes(k.toLowerCase().trim()));
          }
        }
        const pts = matched ? qMaxPoints : 0;
        earnedPoints += pts;
        subjectiveAnswers[q.id] = {
          questionId: q.id,
          studentAnswer: text,
          scoreAwarded: pts,
          maxScore: qMaxPoints,
          isGraded: true,
          teacherComment: matched
            ? 'คำตอบตรงกับคีย์เวิร์ดที่ผู้สอนกำหนด (ตรวจอัตโนมัติ)'
            : 'คำตอบเบื้องต้นไม่พบคีย์เวิร์ดหลัก ครูผู้สอนสามารถพิจารณาปรับคะแนนเพิ่มเติมได้',
          gradedAt: new Date().toISOString().split('T')[0]
        };
      } else if (qType === 'subjective_essay') {
        const text = typeof studentAns === 'string' ? studentAns.trim() : '';
        hasPendingSubjective = true;
        subjectiveAnswers[q.id] = {
          questionId: q.id,
          studentAnswer: text,
          scoreAwarded: 0,
          maxScore: qMaxPoints,
          isGraded: false
        };
      }
    });

    const percentage = Math.round((earnedPoints / (maxPoints || 1)) * 100);
    const passed = !hasPendingSubjective && percentage >= quiz.passingScorePercent;

    const submission: QuizSubmission = {
      score: earnedPoints,
      total: maxPoints,
      percentage,
      passed,
      date: new Date().toISOString().split('T')[0],
      answers,
      subjectiveAnswers: Object.keys(subjectiveAnswers).length > 0 ? subjectiveAnswers : undefined,
      pendingTeacherReview: hasPendingSubjective
    };

    let generatedCert: Certificate | undefined = undefined;

    setProgressList(prev => {
      const existing = prev.find(p => p.courseId === courseId && p.userId === currentUser.id);
      const currentCompletedLessons = existing ? existing.completedLessonIds : [];
      const allLessonsDone = currentCompletedLessons.length >= course.lessons.length;

      let certIssued = existing?.certificateIssued || false;
      let certId = existing?.certificateId;
      let certDate = existing?.certificateDate;

      // Auto-issue Certificate when Post-test is passed and all lessons are finished
      if (type === 'post_test' && passed && allLessonsDone && !certIssued) {
        certIssued = true;
        certId = `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        certDate = new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });

        generatedCert = {
          id: `cert-${Date.now()}`,
          credentialId: certId,
          courseId: course.id,
          courseTitle: course.title,
          userId: currentUser.id,
          userName: currentUser.name,
          userEmail: currentUser.email,
          issuedDate: certDate,
          instructorName: course.instructor.name,
          instructorTitle: course.instructor.title,
          scorePercentage: percentage,
          verificationHash: Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 10),
          certificateTemplate: course.certificateTemplate
        };

        setCertificates(cList => [generatedCert!, ...cList]);

        // Send simulated congratulatory email
        const certNotif: EmailNotification = {
          id: `notif-${Date.now()}`,
          toEmail: currentUser.email,
          toName: currentUser.name,
          subject: `🎓 ยินดีด้วย! คุณสำเร็จหลักสูตร ${course.title}`,
          type: 'certificate_issued',
          previewText: `ผลการสอบหลังเรียน ${percentage}% (ผ่านเกณฑ์) คุณได้รับใบประกาศนียบัตรอย่างเป็นทางการแล้ว`,
          sentAt: 'เมื่อสักครู่',
          isRead: false,
          relatedCourseId: course.id,
          htmlBody: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
              <h2 style="color: #0f172a; margin: 0 0 12px;">ยินดีด้วย! คุณสำเร็จการศึกษา</h2>
              <p style="color: #334155;">เรียนคุณ ${currentUser.name},</p>
              <p style="color: #334155;">คุณได้ผ่านการทดสอบหลังเรียนในหลักสูตร <strong>${course.title}</strong> ด้วยคะแนน <strong>${percentage}%</strong> (${earnedPoints}/${maxPoints} คะแนน)</p>
              <p style="color: #334155;">ระบบได้สร้างใบประกาศนียบัตรอิเล็กทรอนิกส์ รหัส <strong>${certId}</strong> ให้ท่านแล้ว</p>
            </div>
          `
        };
        setNotifications(nList => [certNotif, ...nList]);
      }

      if (existing) {
        return prev.map(p => p.courseId === courseId && p.userId === currentUser.id ? {
          ...p,
          [type === 'pre_test' ? 'preTestScore' : 'postTestScore']: submission,
          certificateIssued: certIssued,
          certificateId: certId,
          certificateDate: certDate
        } : p);
      } else {
        return [...prev, {
          courseId,
          userId: currentUser.id,
          enrolledDate: new Date().toISOString().split('T')[0],
          completedLessonIds: [],
          [type === 'pre_test' ? 'preTestScore' : 'postTestScore']: submission,
          certificateIssued: certIssued,
          certificateId: certId,
          certificateDate: certDate,
          totalWatchSeconds: 0
        }];
      }
    });

    return { submission, certificateGenerated: generatedCert };
  };

  const gradeSubjectiveSubmission = ({
    courseId,
    userId,
    quizType,
    grades
  }: {
    courseId: string;
    userId: string;
    quizType: 'pre_test' | 'post_test';
    grades: Record<string, { scoreAwarded: number; teacherComment?: string }>;
  }) => {
    if (currentUser.role === 'student') {
      console.warn('Unauthorized: Students cannot grade submissions');
      return;
    }
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    const quiz = quizType === 'pre_test' ? course.preTest : course.postTest;

    setProgressList(prev => {
      return prev.map(p => {
        if (p.courseId === courseId && p.userId === userId) {
          const currentSubmission = quizType === 'pre_test' ? p.preTestScore : p.postTestScore;
          if (!currentSubmission) return p;

          const updatedSubjective = { ...(currentSubmission.subjectiveAnswers || {}) };
          Object.entries(grades).forEach(([qId, gradeData]) => {
            if (updatedSubjective[qId]) {
              updatedSubjective[qId] = {
                ...updatedSubjective[qId],
                scoreAwarded: gradeData.scoreAwarded,
                teacherComment: gradeData.teacherComment,
                gradedBy: currentUser.name,
                gradedAt: new Date().toISOString().split('T')[0],
                isGraded: true
              };
            }
          });

          // Check if all subjective questions are graded
          const allGraded = Object.values(updatedSubjective).every(item => item.isGraded);

          // Recalculate total score
          let newEarned = 0;
          let newMax = 0;

          quiz.questions.forEach((q, idx) => {
            const qType = q.type || 'multiple_choice';
            const qMax = q.points && q.points > 0 ? q.points : 1;
            newMax += qMax;

            if (qType === 'multiple_choice' || qType === 'true_false') {
              const ans = currentSubmission.answers[idx];
              if (ans === q.correctIndex) newEarned += qMax;
            } else if (qType === 'multiple_select') {
              const correct = (q.correctIndices || []).slice().sort();
              const userSelected = (Array.isArray(currentSubmission.answers[idx]) ? currentSubmission.answers[idx] as number[] : []).slice().sort();
              if (JSON.stringify(correct) === JSON.stringify(userSelected)) newEarned += qMax;
            } else {
              const subItem = updatedSubjective[q.id];
              if (subItem) {
                newEarned += subItem.scoreAwarded;
              }
            }
          });

          const newPercentage = Math.round((newEarned / (newMax || 1)) * 100);
          const newPassed = allGraded && newPercentage >= quiz.passingScorePercent;

          const updatedSubmission: QuizSubmission = {
            ...currentSubmission,
            score: newEarned,
            total: newMax,
            percentage: newPercentage,
            passed: newPassed,
            pendingTeacherReview: !allGraded,
            subjectiveAnswers: updatedSubjective
          };

          // Auto-issue certificate if post-test passed and all lessons complete
          let certIssued = p.certificateIssued;
          let certId = p.certificateId;
          let certDate = p.certificateDate;

          const allLessonsDone = (p.completedLessonIds || []).length >= course.lessons.length;
          if (quizType === 'post_test' && newPassed && allLessonsDone && !certIssued) {
            certIssued = true;
            certId = `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
            certDate = new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });

            const newCert: Certificate = {
              id: `cert-${Date.now()}`,
              credentialId: certId,
              courseId: course.id,
              courseTitle: course.title,
              userId: p.userId,
              userName: users.find(u => u.id === p.userId)?.name || 'ผู้เรียน',
              userEmail: users.find(u => u.id === p.userId)?.email || '',
              issuedDate: certDate,
              instructorName: course.instructor.name,
              instructorTitle: course.instructor.title,
              scorePercentage: newPercentage,
              verificationHash: Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 10),
              certificateTemplate: course.certificateTemplate
            };

            setCertificates(cList => [newCert, ...cList]);

            // Dispatch notification to student
            const studentUser = users.find(u => u.id === p.userId);
            if (studentUser) {
              const gradeNotif: EmailNotification = {
                id: `notif-${Date.now()}`,
                toEmail: studentUser.email,
                toName: studentUser.name,
                subject: `📝 ครูผู้สอนตรวจข้อสอบและประเมินผลเสร็จสิ้น: ${course.title}`,
                type: 'exam_passed',
                previewText: `คุณได้คะแนนรวม ${newPercentage}% (${newPassed ? 'ผ่านเกณฑ์' : 'รอปรับปรุง'}) พร้อมคำแนะนำจากครูผู้สอน`,
                sentAt: 'เมื่อสักครู่',
                isRead: false,
                relatedCourseId: course.id,
                htmlBody: `
                  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
                    <h2 style="color: #0f172a; margin: 0 0 12px;">ผลการตรวจข้อสอบอัตนัย</h2>
                    <p style="color: #334155;">เรียนคุณ ${studentUser.name},</p>
                    <p style="color: #334155;">อาจารย์ผู้สอนได้ทำการตรวจและให้คะแนนข้อสอบอัตนัยในหลักสูตร <strong>${course.title}</strong> เรียบร้อยแล้ว</p>
                    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 14px; border-radius: 8px; margin: 16px 0;">
                      <p style="margin: 0; color: #166534; font-weight: bold; font-size: 16px;">คะแนนรวม: ${newPercentage}% (${newEarned}/${newMax} คะแนน) - ${newPassed ? 'ผ่านเกณฑ์สำเร็จ 🎓' : 'ยังไม่ผ่านเกณฑ์'}</p>
                    </div>
                  </div>
                `
              };
              setNotifications(nList => [gradeNotif, ...nList]);
            }
          }

          return {
            ...p,
            [quizType === 'pre_test' ? 'preTestScore' : 'postTestScore']: updatedSubmission,
            certificateIssued: certIssued,
            certificateId: certId,
            certificateDate: certDate
          };
        }
        return p;
      });
    });
  };

  const getCertificate = (certId: string) => {
    return certificates.find(c => c.id === certId || c.credentialId === certId);
  };

  const getUserCertificates = (userId?: string) => {
    const targetId = userId || currentUser.id;
    return certificates.filter(c => c.userId === targetId);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const sendCustomEmail = (toEmail: string, toName: string, subject: string, message: string, courseId?: string) => {
    const notif: EmailNotification = {
      id: `notif-${Date.now()}`,
      toEmail,
      toName,
      subject,
      type: 'course_announcement',
      previewText: message.slice(0, 90) + '...',
      sentAt: 'เมื่อสักครู่',
      isRead: false,
      relatedCourseId: courseId,
      htmlBody: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <h2 style="color: #0f172a; margin: 0 0 12px;">${subject}</h2>
          <p style="color: #334155;">เรียนคุณ ${toName},</p>
          <div style="color: #334155; line-height: 1.6; white-space: pre-line;">${message}</div>
          <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">BB FlexLearn Automated Notification Service</p>
        </div>
      `
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const broadcastAnnouncement = (courseId: string, subject: string, message: string) => {
    const targetCourse = courses.find(c => c.id === courseId);
    const enrolledUsers = users.filter(u => u.enrolledCourseIds.includes(courseId));
    
    const newNotifs: EmailNotification[] = enrolledUsers.map(u => ({
      id: `notif-${Date.now()}-${u.id}`,
      toEmail: u.email,
      toName: u.name,
      subject: `📣 ประกาศหลักสูตร ${targetCourse?.title}: ${subject}`,
      type: 'course_announcement',
      previewText: message.slice(0, 80) + '...',
      sentAt: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' วันนี้',
      isRead: false,
      relatedCourseId: courseId,
      htmlBody: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <h3 style="color: #0f172a; margin: 0 0 8px;">${subject}</h3>
          <p style="color: #64748b; font-size: 13px; margin: 0 0 16px;">หลักสูตร: ${targetCourse?.title}</p>
          <p style="color: #1e293b; font-size: 14px;">เรียนคุณ ${u.name},</p>
          <div style="color: #334155; line-height: 1.6; font-size: 14px; white-space: pre-line; background: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 16px 0;">${message}</div>
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">ส่งจากผู้สอนผ่านระบบ BB FlexLearn</p>
        </div>
      `
    }));

    setNotifications(prev => [...newNotifs, ...prev]);
  };

  const getCurrentUserCourseProgress = (courseId: string) => {
    return progressList.find(p => p.courseId === courseId && p.userId === currentUser.id);
  };

  const calculateCourseProgressPercentage = (courseId: string, userId?: string) => {
    const targetUserId = userId || currentUser.id;
    const course = courses.find(c => c.id === courseId);
    if (!course || course.lessons.length === 0) return 0;
    const progress = progressList.find(p => p.courseId === courseId && p.userId === targetUserId);
    if (!progress) return 0;
    const completedCount = progress.completedLessonIds.length;
    return Math.min(100, Math.round((completedCount / course.lessons.length) * 100));
  };

  // User Notes Operations (Stored in User Profile)
  const addUserNote = (noteData: {
    courseId: string;
    courseTitle: string;
    lessonId: string;
    lessonTitle: string;
    timestampSeconds: number;
    text: string;
    tags?: string[];
  }): UserNote => {
    const newNote: UserNote = {
      id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId: currentUser.id,
      courseId: noteData.courseId,
      courseTitle: noteData.courseTitle,
      lessonId: noteData.lessonId,
      lessonTitle: noteData.lessonTitle,
      timestampSeconds: noteData.timestampSeconds,
      text: noteData.text.trim(),
      tags: noteData.tags || [],
      createdAt: new Date().toLocaleDateString('th-TH', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }) + ', ' + new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
    };

    setUsers(prevUsers =>
      prevUsers.map(u => {
        if (u.id === currentUser.id) {
          const userNotes = u.notes || [];
          return {
            ...u,
            notes: [newNote, ...userNotes]
          };
        }
        return u;
      })
    );

    return newNote;
  };

  const updateUserNote = (noteId: string, text: string, tags?: string[]) => {
    setUsers(prevUsers =>
      prevUsers.map(u => {
        if (u.id === currentUser.id && u.notes) {
          return {
            ...u,
            notes: u.notes.map(n =>
              n.id === noteId
                ? {
                    ...n,
                    text: text.trim(),
                    tags: tags !== undefined ? tags : n.tags,
                    updatedAt: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
                  }
                : n
            )
          };
        }
        return u;
      })
    );
  };

  const deleteUserNote = (noteId: string) => {
    setUsers(prevUsers =>
      prevUsers.map(u => {
        if (u.id === currentUser.id && u.notes) {
          return {
            ...u,
            notes: u.notes.filter(n => n.id !== noteId)
          };
        }
        return u;
      })
    );
  };

  const getUserNotes = (courseId?: string, lessonId?: string): UserNote[] => {
    const userNotes = currentUser.notes || [];
    return userNotes.filter(n => {
      if (courseId && n.courseId !== courseId) return false;
      if (lessonId && n.lessonId !== lessonId) return false;
      return true;
    });
  };

  const resetAllData = () => {
    setUsers(INITIAL_USERS);
    setCurrentUserId('user-student-1');
    setCourses(INITIAL_COURSES);
    setProgressList(INITIAL_PROGRESS);
    setCertificates(INITIAL_CERTIFICATES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAnalytics(INITIAL_ANALYTICS);
    setAppSettings(DEFAULT_APP_SETTINGS);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        courses,
        progressList,
        certificates,
        notifications,
        analytics,
        appSettings,
        updateAppSettings,
        loginAsUser,
        addUser,
        deleteUser,
        addCourse,
        updateCourse,
        deleteCourse,
        addLessonToCourse,
        enrollInCourse,
        markLessonComplete,
        updateLastAccessedLesson,
        submitQuiz,
        gradeSubjectiveSubmission,
        getCertificate,
        getUserCertificates,
        markNotificationRead,
        markAllNotificationsRead,
        sendCustomEmail,
        broadcastAnnouncement,
        getCurrentUserCourseProgress,
        calculateCourseProgressPercentage,
        addUserNote,
        updateUserNote,
        deleteUserNote,
        getUserNotes,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
