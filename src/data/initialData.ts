import { Course, User, UserCourseProgress, Certificate, EmailNotification, CourseAnalytics } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin-1',
    name: 'ดร. กิตติศักดิ์ พงษ์ศิริ',
    email: 'admin@bbflexlearn.th',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    role: 'admin',
    createdAt: '2026-01-15',
    department: 'ฝ่ายพัฒนาเทคโนโลยีการศึกษา',
    phone: '081-456-7890',
    enrolledCourseIds: ['course-web-dev', 'course-ai-data']
  },
  {
    id: 'user-student-1',
    name: 'สมชาย มีความรู้',
    email: 'somchai@bbflexlearn.th',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    role: 'student',
    createdAt: '2026-02-10',
    department: 'Software Engineering',
    phone: '089-123-4567',
    enrolledCourseIds: ['course-web-dev', 'course-ux-ui', 'course-ai-data'],
    notes: [
      {
        id: 'note-init-1',
        userId: 'user-student-1',
        courseId: 'course-web-dev',
        courseTitle: 'Modern Full-Stack Web Development',
        lessonId: 'lesson-wd-1',
        lessonTitle: '01. สถาปัตยกรรม Web App ยุคใหม่ และการตั้งค่าโปรเจกต์',
        timestampSeconds: 75,
        text: 'Vite ทำ Hot Module Replacement เร็วกว่า Webpack แบบดั้งเดิมมาก เหมาะกับโปรเจกต์ระดับ Production ขนาดใหญ่',
        createdAt: '15 มี.ค. 2026, 10:25',
        tags: ['สรุปใจความ', 'สถาปัตยกรรม']
      },
      {
        id: 'note-init-2',
        userId: 'user-student-1',
        courseId: 'course-web-dev',
        courseTitle: 'Modern Full-Stack Web Development',
        lessonId: 'lesson-wd-1',
        lessonTitle: '01. สถาปัตยกรรม Web App ยุคใหม่ และการตั้งค่าโปรเจกต์',
        timestampSeconds: 240,
        text: 'การเปิด strict mode ใน tsconfig ช่วยป้องกัน runtime undefined error ได้อย่างมีประสิทธิภาพ',
        createdAt: '15 มี.ค. 2026, 10:32',
        tags: ['ข้อควรระวัง', 'TypeScript']
      },
      {
        id: 'note-init-3',
        userId: 'user-student-1',
        courseId: 'course-web-dev',
        courseTitle: 'Modern Full-Stack Web Development',
        lessonId: 'lesson-wd-2',
        lessonTitle: '02. ออกแบบ Modular Components ด้วย React & TypeScript',
        timestampSeconds: 150,
        text: 'แยก Props interface ออกจาก implementation เสมอ เพื่อให้ reuse และ export ได้สะดวก',
        createdAt: '16 มี.ค. 2026, 14:10',
        tags: ['React', 'เทคนิค']
      }
    ]
  },
  {
    id: 'user-student-2',
    name: 'กานดา สุขใจ',
    email: 'kanda@bbflexlearn.th',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    role: 'student',
    createdAt: '2026-02-14',
    department: 'Product Design',
    phone: '082-987-6543',
    enrolledCourseIds: ['course-ux-ui', 'course-marketing'],
    notes: [
      {
        id: 'note-init-4',
        userId: 'user-student-2',
        courseId: 'course-ux-ui',
        courseTitle: 'UX/UI & Design Systems for Cross-Platform Apps',
        lessonId: 'lesson-ux-1',
        lessonTitle: '01. หลักการ Ergonomics & Touch Target บนมือถือและแท็บเล็ต',
        timestampSeconds: 90,
        text: 'Touch Target ขนาดขั้นต่ำควรเป็น 48x48 dp ตามมาตรฐาน WCAG เพื่อความสะดวกในการสัมผัสด้วยนิ้วโป้ง',
        createdAt: '20 ก.พ. 2026, 11:15',
        tags: ['Design System', 'สรุปใจความ']
      }
    ]
  },
  {
    id: 'user-student-3',
    name: 'ธนากรณ์ รัตนโชติ',
    email: 'thanakorn@bbflexlearn.th',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    role: 'student',
    createdAt: '2026-03-01',
    department: 'Data Intelligence',
    phone: '086-333-2211',
    enrolledCourseIds: ['course-ai-data'],
    notes: []
  },
  {
    id: 'user-student-4',
    name: 'ณภัทร วัฒนพงศ์',
    email: 'napat@bbflexlearn.th',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    role: 'student',
    createdAt: '2026-02-01',
    department: 'Frontend Engineering',
    phone: '083-445-6677',
    enrolledCourseIds: ['course-web-dev', 'course-ux-ui'],
    notes: []
  },
  {
    id: 'user-student-5',
    name: 'พิมลดา ศิริโชค',
    email: 'pimlada@bbflexlearn.th',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    role: 'student',
    createdAt: '2026-02-05',
    department: 'Data Intelligence',
    phone: '085-667-8899',
    enrolledCourseIds: ['course-ai-data', 'course-web-dev'],
    notes: []
  },
  {
    id: 'user-student-6',
    name: 'วรเมธ เกียรติขจร',
    email: 'worameth@bbflexlearn.th',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    role: 'student',
    createdAt: '2026-02-08',
    department: 'Cloud Solutions',
    phone: '087-889-1122',
    enrolledCourseIds: ['course-web-dev', 'course-ai-data'],
    notes: []
  },
  {
    id: 'user-student-7',
    name: 'ชลธิชา มหานที',
    email: 'chonticha@bbflexlearn.th',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'student',
    createdAt: '2026-02-12',
    department: 'Product Design',
    phone: '089-990-2233',
    enrolledCourseIds: ['course-ux-ui', 'course-marketing'],
    notes: []
  },
  {
    id: 'user-student-8',
    name: 'อัครินทร์ เจริญสุข',
    email: 'akkarin@bbflexlearn.th',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    role: 'student',
    createdAt: '2026-02-15',
    department: 'Product Management',
    phone: '084-221-3344',
    enrolledCourseIds: ['course-marketing', 'course-web-dev'],
    notes: []
  },
  {
    id: 'user-teacher-1',
    name: 'อ. ดร. วิชัย เมธาวี',
    email: 'wichai.m@bbflexlearn.th',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'teacher',
    createdAt: '2026-01-20',
    department: 'Software Engineering & Cloud Computing',
    phone: '081-998-7766',
    enrolledCourseIds: ['course-web-dev', 'course-ai-data']
  },
  {
    id: 'user-teacher-2',
    name: 'อ. รัชนี กาญจนกุล',
    email: 'ratchanee.k@bbflexlearn.th',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    role: 'teacher',
    createdAt: '2026-02-01',
    department: 'Digital Design & Innovation Lab',
    phone: '083-221-9988',
    enrolledCourseIds: ['course-ux-ui']
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-web-dev',
    classroomCode: 'BB-CLS-101',
    title: 'Modern Full-Stack Web Development',
    slug: 'modern-full-stack-web-dev',
    subtitle: 'สร้างเว็บแอปพลิเคชันระดับองค์กรด้วย React, TypeScript, Tailwind และ REST API',
    description: 'หลักสูตรฟูลสแตกครอบคลุมตั้งแต่การออกแบบสถาปัตยกรรมเว็บสมัยใหม่ การเขียน React 19 ด้วย TypeScript การจัดการ State แบบมืออาชีพ การทำ Component-driven UI ตลอดจนการเชื่อมต่อ Backend API และการปรับปรุงประสิทธิภาพให้โหลดไวระดับเสี้ยววินาที',
    category: 'web_dev',
    categoryNameTh: 'เว็บและการเขียนโค้ด',
    level: 'ระดับปานกลาง',
    durationHours: 6.5,
    instructor: {
      name: 'อาจารย์ธีรภัทร ชาญวิทย์',
      title: 'Principal Software Architect, CloudTech TH',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      organization: 'สถาบันพัฒนาเทคโนโลยีซอฟต์แวร์แห่งประเทศไทย',
      signatureName: 'Teeraphat Chanwit, M.Sc.'
    },
    colorTheme: {
      primary: 'slate-900',
      secondary: 'blue-600',
      badgeBg: 'bg-blue-50 text-blue-700',
      textAccent: 'text-blue-600',
      gradient: 'from-blue-600 to-indigo-700'
    },
    iconType: 'code',
    learningOutcomes: [
      'เข้าใจโครงสร้าง React 19 และสถาปัตยกรรม Component สมัยใหม่',
      'ประยุกต์ใช้ TypeScript เพื่อความเสถียรและความปลอดภัยของโค้ด',
      'ออกแบบ UI แบบ Responsive รองรับทุกหน้าจอด้วย Tailwind CSS',
      'เชื่อมโยง API และจัดการข้อผิดพลาดตามหลักสากล',
      'ตรวจวัดและเพิ่มประสิทธิภาพ Core Web Vitals'
    ],
    requirements: [
      'พื้นฐานภาษา HTML, CSS และ JavaScript เบื้องต้น',
      'คอมพิวเตอร์ แท็บเล็ต หรือสมาร์ทโฟนที่เชื่อมต่ออินเทอร์เน็ตได้'
    ],
    published: true,
    updatedAt: '2026-03-15',
    lessons: [
      {
        id: 'lesson-wd-1',
        title: '01. สถาปัตยกรรม Web App ยุคใหม่ และการตั้งค่าโปรเจกต์',
        description: 'ทำความเข้าใจทิศทางเทคโนโลยีเว็บปี 2026 การแบ่ง Client-Server และโครงสร้างโฟลเดอร์ที่เป็นระบบระเบียบ',
        durationMinutes: 18,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        order: 1,
        keyTakeaways: [
          'Vite Build Tooling และความเร็วในการพัฒนา',
          'TypeScript Compiler Flags ที่สำคัญสำหรับการใช้งานจริง',
          'โครงสร้างโฟลเดอร์สำหรับ Clean Architecture'
        ],
        resources: [
          { id: 'res-1', title: 'สไลด์ประกอบการบรรยายบทที่ 1 (PDF)', type: 'pdf', url: '#', size: '2.4 MB' },
          { id: 'res-2', title: 'Source Code: Project Boilerplate', type: 'code', url: '#', size: '15 KB' }
        ]
      },
      {
        id: 'lesson-wd-2',
        title: '02. ออกแบบ Modular Components ด้วย React & TypeScript',
        description: 'เจาะลึกการสร้าง Component ที่ยืดหยุ่น การส่ง Props แบบ Type-Safe และแนวคิด Atomic Design System',
        durationMinutes: 24,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        order: 2,
        keyTakeaways: [
          'Interface vs Type Aliases ใน React Component',
          'Generic Component Patterns',
          'การจัดวาง Slot และ Compound Components'
        ],
        resources: [
          { id: 'res-3', title: 'React Pattern Cheat Sheet', type: 'pdf', url: '#', size: '1.1 MB' }
        ]
      },
      {
        id: 'lesson-wd-3',
        title: '03. Tailwind CSS & Responsive Layout รองรับมือถือและคอมพิวเตอร์',
        description: 'เทคนิคการทำ Responsive Breakpoint, Touch interactions สำหรับสมาร์ทโฟน และ Grid/Flexbox ที่ไร้รอยต่อ',
        durationMinutes: 22,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        order: 3,
        keyTakeaways: [
          'Mobile-first responsive design principles',
          'Fluid Typography และ Dynamic Spacing',
          'Touch Target Sizes และ Accessible Focus Rings'
        ]
      },
      {
        id: 'lesson-wd-4',
        title: '04. การเชื่อมต่อ REST API, Data Fetching & Caching',
        description: 'สร้าง Data Pipeline รับส่งข้อมูลกับเซิร์ฟเวอร์ การจัดการ Loading State, Error Boundaries และ Retry Logic',
        durationMinutes: 28,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        order: 4,
        keyTakeaways: [
          'Async/Await Error Handling Patterns',
          'Optimistic UI Updates เพื่อประสบการณ์ที่ราบรื่น',
          'Network Resilience สำหรับอุปกรณ์มือถือที่สัญญาณแกว่ง'
        ]
      },
      {
        id: 'lesson-wd-5',
        title: '05. Web Security, Deployment & Performance Optimization',
        description: 'การป้องกัน XSS, CSRF, การทำ Code Splitting และการ Deploy ขึ้น Production Cloud Server',
        durationMinutes: 30,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        order: 5,
        keyTakeaways: [
          'HTTP Security Headers และ Token Storage ที่ปลอดภัย',
          'Lighthouse Score 100/100 Optimization Checklist',
          'CI/CD Pipeline อัตโนมัติ'
        ]
      }
    ],
    preTest: {
      id: 'pre-wd',
      title: 'แบบทดสอบก่อนเรียน (Pre-test) - Modern Web Development',
      type: 'pre_test',
      passingScorePercent: 60,
      questions: [
        {
          id: 'q-wd-pre-1',
          question: 'ข้อใดคือข้อได้เปรียบหลักของการนำ TypeScript มาใช้คู่กับ React ในโปรเจกต์ขนาดใหญ่?',
          options: [
            'ทำให้หน้าเว็บโหลดเร็วขึ้น 10 เท่าโดยไม่ต้องปรับแต่งโค้ด',
            'ตรวจจับข้อผิดพลาดเรื่องชนิดข้อมูลล่วงหน้าตั้งแต่ตอนเขียนโค้ด (Compile-time)',
            'ช่วยให้สามารถเชื่อมต่อฐานข้อมูล SQL ได้โดยตรงจากฝั่งเบราว์เซอร์',
            'ลดขนาดไฟล์รูปภาพในเว็บไซต์โดยอัตโนมัติ'
          ],
          correctIndex: 1,
          explanation: 'TypeScript ช่วยให้เกิด Type Safety และตรวจจับข้อผิดพลาดของ Props และ State ตั้งแต่ระดับเขียนโค้ด (Compile-time) ลดบั๊กในระบบโปรดักชันอย่างมีนัยสำคัญ'
        },
        {
          id: 'q-wd-pre-2',
          question: 'หลักการออกแบบเว็บแบบ "Mobile-First" หมายถึงอะไร?',
          options: [
            'การพัฒนาแอปสำหรับดาวน์โหลดใน App Store เท่านั้น',
            'การออกแบบและเขียนโค้ดสำหรับหน้าจอขนาดเล็กก่อน แล้วค่อยขยายไปยังจอเดสก์ท็อป',
            'การห้ามผู้ใช้งานเข้าเว็บผ่านคอมพิวเตอร์ตั้งโต๊ะ',
            'การลดฟอนต์ในหน้าจอเดสก์ท็อปให้เล็กเท่ากับหน้าจอมือถือ'
          ],
          correctIndex: 1,
          explanation: 'Mobile-first คือแนวคิดการออกแบบ CSS/Layout โดยเริ่มต้นจากข้อจำกัดของหน้าจอมือถือเป็นหลัก แล้วใช้ Media Queries ค่อยๆ เพิ่มความซับซ้อนตามขนาดหน้าจอที่ใหญ่ขึ้น'
        },
        {
          id: 'q-wd-pre-3',
          question: 'ใน React การใช้ Clean-up function ใน useEffect มีวัตถุประสงค์เพื่ออะไร?',
          options: [
            'เพื่อลบแคชของเบราว์เซอร์',
            'เพื่อยกเลิก Subscription, Event Listener หรือ Timer ก่อน Component ถูก Unmount',
            'เพื่อรีสตาร์ตเซิร์ฟเวอร์ Node.js',
            'เพื่อบันทึกประวัติการคลิกของผู้ใช้'
          ],
          correctIndex: 1,
          explanation: 'Clean-up function ป้องกันปัญหา Memory Leak โดยการคืนหน่วยความจำและยกเลิก listener หรือ asynchronous task เมื่อ component สิ้นสุดอายุการใช้งาน'
        },
        {
          id: 'q-wd-pre-4',
          question: 'คำสั่งใดใน Tailwind CSS ที่ใช้กำหนดให้ความกว้างเต็มจอในมือถือ แต่กำหนดเป็น 50% บนจอขนาดกลาง (md) ขึ้นไป?',
          options: [
            'w-full md:w-1/2',
            'width-100 screen-md:50%',
            'mobile:full desktop:half',
            'max-w-screen min-md:50'
          ],
          correctIndex: 0,
          explanation: 'Tailwind CSS ใช้ Responsive prefix เช่น md:w-1/2 โดยค่าพื้นฐาน w-full จะทำงานในทุกหน้าจอและถูก Override เมื่อถึง breakpoint md (768px ขึ้นไป)'
        },
        {
          id: 'q-wd-pre-5',
          question: 'สถานะ HTTP Status Code 401 หมายถึงอะไร?',
          options: [
            'เซิร์ฟเวอร์ทำงานล้มเหลวภายใน (Internal Error)',
            'การร้องขอสำเร็จแต่ไม่มีเนื้อหา (No Content)',
            'ผู้ใช้ยังไม่ได้ยืนยันตัวตนหรือไม่ได้รับอนุญาต (Unauthorized)',
            'ไม่พบหน้าหรือทรัพยากรที่เรียกหา (Not Found)'
          ],
          correctIndex: 2,
          explanation: 'HTTP 401 Unauthorized บ่งบอกว่าผู้ใช้ยังไม่ได้ส่งข้อมูลยืนยันตัวตน (Authentication) ที่ถูกต้องมาพร้อมกับ Request'
        }
      ]
    },
    postTest: {
      id: 'post-wd',
      title: 'แบบทดสอบหลังเรียน (Post-test) - Modern Web Development',
      type: 'post_test',
      passingScorePercent: 80,
      questions: [
        {
          id: 'q-wd-post-1',
          question: 'หากต้องการจัดการ Asynchronous Data Fetching ให้ปลอดภัยจาก Race Condition เมื่อผู้ใช้สลับหน้าอย่างรวดเร็ว ควรใช้เทคนิคใด?',
          options: [
            'ใช้ AbortController เพื่อยกเลิก Fetch Request ที่ยังค้างอยู่',
            'เพิ่มเวลา setTimeout ให้ยาวขึ้นเป็น 10 วินาที',
            'ปิดไม่ให้ผู้ใช้คลิกเปลี่ยนหน้าได้จนกว่าข้อมูลจะมา',
            'โหลดข้อมูลทั้งหมดของระบบลงใน localStorage ล่วงหน้า'
          ],
          correctIndex: 0,
          explanation: 'การใช้ AbortController ร่วมกับ fetch API ใน Clean-up function จะยกเลิกคำขอเดิมทันทีเมื่อ component เปลี่ยน ช่วยป้องกัน State อัปเดตผิดลำดับและลดการใช้แบนด์วิดท์'
        },
        {
          id: 'q-wd-post-2',
          question: 'ในการเขียน TypeScript กับ React Props ข้อใดคือวิธีระบุว่าฟังก์ชัน callback รับค่า id เป็นตัวเลขและไม่คืนค่าอะไร?',
          options: [
            'onSelect: (id: number) => void',
            'onSelect: function(number) : null',
            'onSelect: Action<number>',
            'onSelect: { id: number, return: false }'
          ],
          correctIndex: 0,
          explanation: '(id: number) => void เป็นไวยากรณ์มาตรฐานของ TypeScript สำหรับกำหนดชนิดข้อมูลของฟังก์ชัน callback ที่รับพารามิเตอร์เป็นตัวเลขและไม่มีการส่งค่าคืน'
        },
        {
          id: 'q-wd-post-3',
          question: 'แนวคิด "Optimistic UI Update" มีประโยชน์หลักอย่างไรในการพัฒนาเว็บแอปพลิเคชัน?',
          options: [
            'ทำให้การคำนวณกราฟิก 3D ทำงานได้เร็วขึ้น',
            'อัปเดตหน้าจอทันทีที่ผู้ใช้กดปุ่ม โดยไม่ต้องรอเซิร์ฟเวอร์ตอบกลับ ทำให้รู้สึกรวดเร็วและตอบสนองทันใจ',
            'ลดการใช้แบตเตอรี่ของสมาร์ทโฟนลง 50%',
            'ป้องกันไม่ให้แฮกเกอร์มองเห็นรหัสผ่าน'
          ],
          correctIndex: 1,
          explanation: 'Optimistic UI ถือว่าการกระทำจะสำเร็จล่วงหน้า จึงอัปเดตหน้าจอทันที และหากเซิร์ฟเวอร์ตอบกลับว่าล้มเหลว จึงค่อย Rollback กลับสู่สถานะเดิม ทำให้แอปมีความลื่นไหลสูงสุด'
        },
        {
          id: 'q-wd-post-4',
          question: 'ตามมาตรฐานการออกแบบเพื่อผู้พิการและการเข้าถึง (WCAG 2.1 AA) ขนาดพื้นที่สัมผัส (Touch Target) บนหน้าจอมือถือควรมีขนาดอย่างน้อยเท่าใด?',
          options: [
            'อย่างน้อย 16 x 16 พิกเซล',
            'อย่างน้อย 24 x 24 พิกเซล',
            'อย่างน้อย 44 x 44 พิกเซล (หรือ 48 x 48 พิกเซล)',
            'อย่างน้อย 100 x 100 พิกเซล'
          ],
          correctIndex: 2,
          explanation: 'WCAG กำหนดขนาด Touch Target สำหรับหน้าจอสัมผัสอย่างน้อย 44x44 CSS pixels เพื่อให้นิ้วมือสัมผัสได้แม่นยำ ไม่กดพลาดไปโดนปุ่มใกล้เคียง'
        },
        {
          id: 'q-wd-post-5',
          question: 'เพื่อป้องกันช่องโหว่ความปลอดภัยแบบ Cross-Site Scripting (XSS) ใน React ควรหลีกเลี่ยงการใช้งานสิ่งใดหากไม่จำเป็น?',
          options: [
            'การใช้ console.log()',
            'การใช้ dangerouslySetInnerHTML',
            'การใช้ useState()',
            'การแยกโค้ดออกเป็นหลายๆ ไฟล์'
          ],
          correctIndex: 1,
          explanation: 'dangerouslySetInnerHTML จะแทรก raw HTML เข้าไปใน DOM โดยตรง หากข้อมูลนั้นมาจากผู้ใช้และไม่ถูก Sanitize อาจเปิดช่องให้มิจฉาชีพฝัง JavaScript ที่เป็นอันตรายได้'
        }
      ]
    }
  },
  {
    id: 'course-ux-ui',
    classroomCode: 'BB-CLS-102',
    title: 'UX/UI & Design Systems for Cross-Platform Apps',
    slug: 'ux-ui-design-systems',
    subtitle: 'หลักการออกแบบอินเตอร์เฟสชั้นเลิศ สถาปัตยกรรมข้อมูล และดีไซน์ซิสเต็มที่ตอบโจทย์ผู้ใช้จริง',
    description: 'เรียนรู้กระบวนการออกแบบผลิตภัณฑ์ดิจิทัลตั้งแต่ User Research, Wireframing, High-Fidelity Prototyping ไปจนถึงการสร้าง Design Token, Color Palette และ Reusable Component Library สำหรับทีมขนาดใหญ่',
    category: 'ux_ui',
    categoryNameTh: 'ออกแบบ UX/UI',
    level: 'ระดับเริ่มต้น',
    durationHours: 5.0,
    instructor: {
      name: 'คุณพัชริดา วรวงศ์สกุล',
      title: 'Design Director, Studio Craft UX',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      organization: 'สมาคมผู้ประกอบการออกแบบประสบการณ์ดิจิทัลไทย',
      signatureName: 'Patcharida Worawong, B.Arch.'
    },
    colorTheme: {
      primary: 'slate-900',
      secondary: 'purple-600',
      badgeBg: 'bg-purple-50 text-purple-700',
      textAccent: 'text-purple-600',
      gradient: 'from-purple-600 to-pink-600'
    },
    iconType: 'palette',
    learningOutcomes: [
      'เข้าใจกระบวนการ Design Thinking และ User Journey Mapping',
      'ออกแบบระบบ Typography, Grid 8-Point และ Color Contrast ตามมาตรฐาน WCAG',
      'สร้าง Design System ที่เชื่อมต่อระหว่าง Designer และ Developer ได้อย่างราบรื่น',
      'ทำ Usability Testing และวิเคราะห์ Feedback เพื่อปรับปรุง Product'
    ],
    requirements: [
      'ไม่มีความจำเป็นต้องมีพื้นฐานกราฟิกมาก่อน เหมาะสำหรับผู้เริ่มต้นและคนทำงาน'
    ],
    published: true,
    updatedAt: '2026-03-20',
    lessons: [
      {
        id: 'lesson-ux-1',
        title: '01. หลักจิตวิทยาและสถาปัตยกรรมข้อมูล (Information Architecture)',
        description: 'ทำความเข้าใจพฤติกรรมการกวาดสายตาของผู้ใช้ Hick’s Law, Fitts’s Law และการจัดหมวดหมู่เนื้อหาให้เข้าใจง่ายใน 3 วินาที',
        durationMinutes: 20,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        order: 1
      },
      {
        id: 'lesson-ux-2',
        title: '02. ระบบ 8-Point Grid และการจัดลำดับชั้นสายตา (Visual Hierarchy)',
        description: 'การกำหนด Spacing, Padding และความสัมพันธ์เชิงพื้นที่ที่ทำให้หน้าจอเรียบร้อย สบายตา และมีมาตรฐานสากล',
        durationMinutes: 25,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
        order: 2
      },
      {
        id: 'lesson-ux-3',
        title: '03. การสร้าง Design Tokens: สี, ฟอนต์ และรูปทรงส่วนประกอบ',
        description: 'เปลี่ยนจากค่าสุ่มสู่ Design Tokens เชิงระบบ ที่รองรับทั้ง Light Mode และ Dark Mode ได้อย่างเป็นเอกภาพ',
        durationMinutes: 22,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        order: 3
      },
      {
        id: 'lesson-ux-4',
        title: '04. Usability Testing & มอบหมายงานสู่นักพัฒนาซอฟต์แวร์ (Handoff)',
        description: 'วิธีการทดสอบกับผู้ใช้จริง การเขียน Specification และการร่วมงานกับทีม Frontend เพื่อผลลัพธ์ที่ตรงกับดีไซน์ 100%',
        durationMinutes: 26,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        order: 4
      }
    ],
    preTest: {
      id: 'pre-ux',
      title: 'แบบทดสอบก่อนเรียน (Pre-test) - UX/UI & Design Systems',
      type: 'pre_test',
      passingScorePercent: 60,
      questions: [
        {
          id: 'q-ux-pre-1',
          question: 'ความแตกต่างสำคัญที่สุดระหว่าง UX (User Experience) และ UI (User Interface) คือข้อใด?',
          options: [
            'UX คือการเลือกโทนสี ส่วน UI คือการเขียนโค้ด',
            'UX เน้นความรู้สึก ความง่าย และกระบวนการแก้ปัญหาของผู้ใช้ ส่วน UI เน้นการจัดวางหน้าตาความสวยงามและส่วนประกอบที่มองเห็น',
            'UX สำหรับโทรศัพท์มือถือ ส่วน UI สำหรับคอมพิวเตอร์',
            'ทั้งสองอย่างมีความหมายเหมือนกันทุกประการ'
          ],
          correctIndex: 1,
          explanation: 'UX คือประสบการณ์โดยรวม ความง่าย ความพึงพอใจในการใช้งาน ส่วน UI คือภาพและอินเตอร์เฟส เช่น ปุ่ม ตัวอักษร สี และเลย์เอาต์'
        },
        {
          id: 'q-ux-pre-2',
          question: 'กฎของฟิตต์ส (Fitts’s Law) ระบุว่าอย่างไรในการออกแบบส่วนติดต่อผู้ใช้?',
          options: [
            'ยิ่งตัวหนังสือเยอะ ยิ่งทำให้ผู้ใช้อยู่ในเว็บนานขึ้น',
            'เวลาที่ใช้ในการเคลื่อนที่ไปยังเป้าหมายขึ้นอยู่กับระยะทางและขนาดของเป้าหมายนั้น ยิ่งปุ่มใหญ่และใกล้ยิ่งกดยกง่าย',
            'ควรใช้สีคู่ตรงข้ามในทุกปุ่มบนหน้าจอ',
            'ห้ามวางรูปภาพเกิน 3 รูปในหนึ่งหน้า'
          ],
          correctIndex: 1,
          explanation: 'Fitts’s Law ชี้ให้เห็นว่าปุ่มที่สำคัญควรมีขนาดเหมาะสมและอยู่ในตำแหน่งที่นิ้วสัมผัสถึงได้ง่าย เช่น บริเวณด้านล่างหน้าจอมือถือ'
        },
        {
          id: 'q-ux-pre-3',
          question: 'ระบบ 8-Point Grid System คืออะไร?',
          options: [
            'การใส่ตัวหนังสือขนาด 8pt ทั้งหน้าจอ',
            'การกำหนดค่าระยะห่าง (Margin, Padding) และขนาดกล่องให้เป็นพหุคูณของ 8 (เช่น 8, 16, 24, 32px)',
            'การสร้างตาราง 8 คอลัมน์สำหรับทุกอุปกรณ์',
            'การให้ผู้ใช้กดปุ่มไม่เกิน 8 ครั้ง'
          ],
          correctIndex: 1,
          explanation: '8-Point Grid เป็นมาตรฐานอุตสาหกรรมที่ช่วยสร้างสัดส่วนที่สม่ำเสมอ และคำนวณลงตัวกับขนาดความหนาแน่นพิกเซลของหน้าจอเกือบทุกประเภท'
        }
      ]
    },
    postTest: {
      id: 'post-ux',
      title: 'แบบทดสอบหลังเรียน (Post-test) - UX/UI & Design Systems',
      type: 'post_test',
      passingScorePercent: 80,
      questions: [
        {
          id: 'q-ux-post-1',
          question: 'การใช้ Design Tokens ในระบบดีไซน์ซิสเต็มมีจุดประสงค์หลักเพื่อสิ่งใด?',
          options: [
            'เพื่อใช้เป็นเหรียญคริปโตสำหรับจ่ายเงินให้นักออกแบบ',
            'เพื่อจัดเก็บตัวแปรพื้นฐานทางภาพ (เช่น ค่าสี, ขนาดเงา, ขนาดฟอนต์) ในรูปแบบศูนย์กลางที่ใช้ร่วมกันได้ทั้ง Designer และ Developer',
            'เพื่อป้องกันไม่ให้ผู้ใช้บันทึกรูปภาพจากหน้าเว็บ',
            'เพื่อสุ่มโทนสีใหม่ทุกครั้งที่เปิดหน้าเว็บ'
          ],
          correctIndex: 1,
          explanation: 'Design Tokens ทำหน้าที่เป็น Single Source of Truth เก็บตัวแปรสไตล์ที่คอมไพล์เป็น CSS, iOS, Android ได้อย่างเป็นอัตโนมัติ'
        },
        {
          id: 'q-ux-post-2',
          question: 'ตามมาตรฐาน WCAG 2.1 อัตราส่วนคอนทราสต์ขั้นต่ำ (Contrast Ratio) สำหรับตัวอักษรเนื้อหาปกติ (Normal Text) ต้องมีค่าเท่าใดเป็นอย่างน้อย?',
          options: [
            '1.5 : 1',
            '3.0 : 1',
            '4.5 : 1',
            '10.0 : 1'
          ],
          correctIndex: 2,
          explanation: 'WCAG ระดับ AA กำหนดให้ Normal Text ต้องมีคอนทราสต์อย่างน้อย 4.5:1 เพื่อให้อ่านง่ายสำหรับผู้มีปัญหาทางสายตาหรือการใช้งานกลางแดดจัด'
        },
        {
          id: 'q-ux-post-3',
          question: 'เมื่อดำเนินการทดสอบ Usability Testing กับกลุ่มผู้ใช้เป้าหมาย ข้อใดคือแนวปฏิบัติที่ดีที่สุดของผู้ดำเนินการทดสอบ (Moderator)?',
          options: [
            'บอกคำตอบและชี้ว่าต้องกดปุ่มไหนทันทีเมื่อผู้ใช้ลังเล',
            'สังเกตการณ์ ให้ผู้ใช้คิดออกเสียง (Think-aloud) และไม่ชี้นำการกระทำของผู้ใช้',
            'โต้เถียงกับผู้ใช้เมื่อผู้ใช้แสดงความเห็นเชิงลบต่อดีไซน์',
            'ให้ผู้ใช้ทำแบบประเมินความพึงพอใจโดยไม่ต้องทดลองใช้งานจริง'
          ],
          correctIndex: 1,
          explanation: 'ผู้ทดสอบต้องเป็นกลาง ไม่ชี้นำ เพื่อให้เห็นปัญหาที่แท้จริงที่ผู้ใช้เผชิญในสภาวะการใช้งานจริง'
        }
      ]
    }
  },
  {
    id: 'course-ai-data',
    classroomCode: 'BB-CLS-103',
    title: 'Practical Generative AI & Data Analytics 2026',
    slug: 'practical-generative-ai-data-analytics',
    subtitle: 'ประยุกต์ใช้โมเดล AI ล่าสุด วิเคราะห์ข้อมูลธุรกิจ และสร้างระบบอัตโนมัติเพื่อเพิ่มประสิทธิภาพการทำงาน',
    description: 'เรียนรู้การทำงานร่วมกับ Generative AI ยุคใหม่ การเขียน Prompt ขั้นสูง การเชื่อมต่อ API สำหรับงานวิเคราะห์ข้อมูล และการแปลงข้อมูลดิบให้กลายเป็น Interactive Business Insights พร้อมมาตรการกำกับดูแลความปลอดภัยข้อมูล (Data Privacy)',
    category: 'ai_data',
    categoryNameTh: 'ปัญญาประดิษฐ์และข้อมูล',
    level: 'ระดับสูง',
    durationHours: 7.0,
    instructor: {
      name: 'ดร. นลินี ภาณุวงศ์',
      title: 'Head of AI Research, NextGen Lab',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      organization: 'สถาบันวิทยาการปัญญาประดิษฐ์เอเชียตะวันออกเฉียงใต้',
      signatureName: 'Nalinee Panuwong, Ph.D.'
    },
    colorTheme: {
      primary: 'slate-900',
      secondary: 'emerald-600',
      badgeBg: 'bg-emerald-50 text-emerald-700',
      textAccent: 'text-emerald-600',
      gradient: 'from-emerald-600 to-teal-700'
    },
    iconType: 'brain',
    learningOutcomes: [
      'เข้าใจกลไก Large Language Models, Multi-modal inputs และ Context Windows',
      'ออกแบบ Prompt Engineering ระดับ Production ด้วย Structured Output (JSON)',
      'การทำ Data Cleaning, Analysis และ Visualization ด้วย Python & SQL',
      'สร้าง Automated Workflow ลดเวลาทำงานประจำลงกว่า 70%'
    ],
    requirements: [
      'ความเข้าใจพื้นฐานเรื่องข้อมูลและไฟล์ Spreadsheet เช่น Excel หรือ CSV'
    ],
    published: true,
    updatedAt: '2026-03-22',
    lessons: [
      {
        id: 'lesson-ai-1',
        title: '01. พื้นฐานและสถาปัตยกรรมของ Generative AI ยุคปัจจุบัน',
        description: 'ทำความเข้าใจเบื้องลึกของ Foundation Models, การคำนวณ Token และความแม่นยำในการตอบสนอง',
        durationMinutes: 25,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        order: 1
      },
      {
        id: 'lesson-ai-2',
        title: '02. Advanced Prompt Engineering & Structured Data Generation',
        description: 'การบังคับโมเดลให้ตอบผลลัพธ์เป็น Schema ที่แน่นอน การใช้ Few-shot Prompting และ Chain of Thought',
        durationMinutes: 30,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        order: 2
      },
      {
        id: 'lesson-ai-3',
        title: '03. Data Analytics & Business Intelligence Dashboarding',
        description: 'นำข้อมูลการขายและพฤติกรรมลูกค้ามาสรุปเป็นตัวชี้วัดสำคัญ ค้นหารูปแบบแนวโน้ม และการกระจายตัวของข้อมูล',
        durationMinutes: 28,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        order: 3
      },
      {
        id: 'lesson-ai-4',
        title: '04. Data Governance, AI Ethics & การรักษาความลับข้อมูลองค์กร',
        description: 'แนวปฏิบัติในการรักษาความปลอดภัยของข้อมูลลูกค้า (PDPA / GDPR) และการป้องกันปัญหา Hallucination',
        durationMinutes: 24,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        order: 4
      }
    ],
    preTest: {
      id: 'pre-ai',
      title: 'แบบทดสอบก่อนเรียน (Pre-test) - Practical Generative AI & Data Analytics',
      type: 'pre_test',
      passingScorePercent: 60,
      questions: [
        {
          id: 'q-ai-pre-1',
          question: 'คำว่า "Hallucination" ในบริบทของ Large Language Model หมายถึงอะไร?',
          options: [
            'การที่เซิร์ฟเวอร์เกิดไฟฟ้าดับกะทันหัน',
            'การที่โมเดลสร้างข้อมูลหรือข้อเท็จจริงที่ไม่เป็นความจริงขึ้นมาอย่างมั่นใจ',
            'การแสดงผลภาพกราฟิกความละเอียดสูงผิดปกติ',
            'การที่ผู้ใช้งานจำรหัสผ่านเข้าสู่ระบบไม่ได้'
          ],
          correctIndex: 1,
          explanation: 'Hallucination คือสภาวะที่โมเดลสร้างเนื้อหาที่ฟังดูน่าเชื่อถือแต่ข้อเท็จจริงผิดเพี้ยน ซึ่งเป็นเรื่องที่ต้องมีระบบ Verification และ Grounding เสมอ'
        },
        {
          id: 'q-ai-pre-2',
          question: 'เทคนิค "Few-shot Prompting" มีลักษณะอย่างไร?',
          options: [
            'การส่งคำสั่งเพียง 1 พยางค์เท่านั้น',
            'การให้ตัวอย่างรูปแบบคำถาม-คำตอบที่ต้องการแก่โมเดลล่วงหน้า 2-3 ตัวอย่างก่อนให้ทำงานจริง',
            'การลดขนาดตัวหนังสือในกล่องข้อความ',
            'การสั่งให้โมเดลตอบเฉพาะคำว่า ใช่ หรือ ไม่ใช่'
          ],
          correctIndex: 1,
          explanation: 'Few-shot Prompting ช่วยนำทางโมเดลให้เข้าใจรูปแบบและโทนคำตอบที่คาดหวังอย่างแม่นยำยิ่งขึ้นผ่านตัวอย่างประกอบ'
        }
      ]
    },
    postTest: {
      id: 'post-ai',
      title: 'แบบทดสอบหลังเรียน (Post-test) - Practical Generative AI & Data Analytics',
      type: 'post_test',
      passingScorePercent: 80,
      questions: [
        {
          id: 'q-ai-post-1',
          question: 'ข้อใดคือแนวทางที่ดีที่สุดในการนำ AI มาประมวลผลข้อมูลที่มีความลับสูงขององค์กรตามกฎหมาย PDPA?',
          options: [
            'คัดลอกข้อมูลบัตรประชาชนและข้อมูลส่วนบุคคลใส่ลงในโมเดลสาธารณะทันที',
            'ทำ Data Masking / Anonymization เพื่อลบข้อมูลระบุตัวตนออกก่อนส่งประมวลผล และเลือกใช้ Enterprise API ที่ไม่นำข้อมูลไปเทรนซ้ำ',
            'ปิดไม่ให้ฝ่ายไอทีรับรู้การใช้งาน',
            'แปลงไฟล์ข้อมูลเป็นรูปภาพก่อนส่ง'
          ],
          correctIndex: 1,
          explanation: 'การทำ Anonymization และการใช้สัญญา Enterprise SLA ป้องกันข้อมูลรั่วไหลและสอดคล้องตามมาตรฐานความปลอดภัยระดับสากล'
        },
        {
          id: 'q-ai-post-2',
          question: 'หากต้องการให้ผลลัพธ์จาก AI สามารถนำไปเขียนโปรแกรมต่อได้ทันทีโดยไม่พัง ควรตั้งค่าอย่างไร?',
          options: [
            'สั่งให้ตอบเป็นร้อยกรอง',
            'กำหนด Response MIME Type เป็น application/json พร้อมระบุ JSON Schema ที่ชัดเจน',
            'ขอให้โมเดลตอบเป็นเสียงพูดเท่านั้น',
            'ให้โมเดลตอบยาวที่สุดเท่าที่จะทำได้'
          ],
          correctIndex: 1,
          explanation: 'การบังคับ Structured Output ด้วย JSON Schema ทำให้โมเดลสร้างข้อมูลที่ Valid เสมอ สามารถนำไปแปลงเป็น Object ในโปรแกรมต่อได้ 100%'
        }
      ]
    }
  },
  {
    id: 'course-marketing',
    classroomCode: 'BB-CLS-104',
    title: 'Digital Marketing & Omnichannel Growth Strategy',
    slug: 'digital-marketing-growth-strategy',
    subtitle: 'เจาะลึกกลยุทธ์การตลาดดิจิทัล การวิเคราะห์ต้นทุน CAC, LTV และการสื่อสารข้ามแพลตฟอร์ม',
    description: 'ติดอาวุธการวางแผนสื่อโฆษณา การสร้างสรรค์คอนเทนต์ที่เปลี่ยนผู้รับชมเป็นลูกค้า การทำ Email Marketing อัตโนมัติ และการติดตามผลตอบแทนจากการลงทุน (ROAS) ด้วยข้อมูลจริง',
    category: 'business',
    categoryNameTh: 'ธุรกิจและการตลาด',
    level: 'ระดับเริ่มต้น',
    durationHours: 4.5,
    instructor: {
      name: 'คุณวรัญญู รัตนศักดิ์',
      title: 'Managing Director, Horizon Growth Partners',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      organization: 'สถาบันกลยุทธ์การตลาดดิจิทัลแห่งประเทศไทย',
      signatureName: 'Waranyu Rattanasak, MBA'
    },
    colorTheme: {
      primary: 'slate-900',
      secondary: 'amber-600',
      badgeBg: 'bg-amber-50 text-amber-700',
      textAccent: 'text-amber-600',
      gradient: 'from-amber-600 to-orange-600'
    },
    iconType: 'trending',
    learningOutcomes: [
      'วางกรอบกลยุทธ์การตลาด Full Funnel (Awareness, Consideration, Conversion)',
      'คำนวณและบริหารตัวชี้วัด CAC, LTV, Retention Rate ได้อย่างแม่นยำ',
      'ออกแบบระบบ Email Nurturing Sequence อัตโนมัติ',
      'ปรับปรุงอัตราการเปลี่ยนเป็นลูกค้า (Conversion Rate Optimization)'
    ],
    requirements: [
      'สนใจด้านการตลาดหรือกำลังทำธุรกิจออนไลน์'
    ],
    published: true,
    updatedAt: '2026-03-24',
    lessons: [
      {
        id: 'lesson-mk-1',
        title: '01. กรอบแนวคิด Modern Growth Marketing และ Customer Funnel',
        description: 'การทำความเข้าใจความต้องการของลูกค้าในแต่ละช่วง และการเลือกเครื่องมือสื่อสารที่คุ้มค่า',
        durationMinutes: 20,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        order: 1
      },
      {
        id: 'lesson-mk-2',
        title: '02. การคำนวณ Unit Economics: CAC, LTV และ Payback Period',
        description: 'สูตรคำนวณต้นทุนต่อการได้มาซึ่งลูกค้าหนึ่งราย และคุณค่าตลอดอายุการใช้งานของลูกค้า',
        durationMinutes: 24,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
        order: 2
      },
      {
        id: 'lesson-mk-3',
        title: '03. ระบบการแจ้งเตือนและการตลาดผ่านอีเมลอัตโนมัติ (Email Automation)',
        description: 'การสร้าง Triggered Email เมื่อมีบทเรียนใหม่ หรือกระตุ้นเตือนการเรียนให้สำเร็จ',
        durationMinutes: 22,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        order: 3
      }
    ],
    preTest: {
      id: 'pre-mk',
      title: 'แบบทดสอบก่อนเรียน (Pre-test) - Digital Marketing Strategy',
      type: 'pre_test',
      passingScorePercent: 60,
      questions: [
        {
          id: 'q-mk-pre-1',
          question: 'ตัวชี้วัด CAC (Customer Acquisition Cost) หมายถึงอะไร?',
          options: [
            'จำนวนสินค้าที่ส่งคืนในแต่ละเดือน',
            'ต้นทุนค่าใช้จ่ายเฉลี่ยทั้งหมดที่ใช้เพื่อให้ได้ลูกค้าใหม่มา 1 ราย',
            'ความเร็วในการโหลดเว็บไซต์ขายของ',
            'เงินเดือนของพนักงานฝ่ายบริการลูกค้า'
          ],
          correctIndex: 1,
          explanation: 'CAC คือผลรวมงบการตลาดและการขาย หารด้วยจำนวนลูกค้าใหม่ที่ได้มาในช่วงเวลานั้น'
        }
      ]
    },
    postTest: {
      id: 'post-mk',
      title: 'แบบทดสอบหลังเรียน (Post-test) - Digital Marketing Strategy',
      type: 'post_test',
      passingScorePercent: 80,
      questions: [
        {
          id: 'q-mk-post-1',
          question: 'หากอัตราส่วน LTV : CAC ของธุรกิจอยู่ที่ 1 : 1 บ่งชี้ถึงสถานการณ์ใด?',
          options: [
            'ธุรกิจทำกำไรมหาศาลและมีความมั่นคงสูงมาก',
            'ธุรกิจกำลังมีความเสี่ยงขาดทุน เพราะเงินที่ลูกค้าจ่ายให้ตลอดอายุการใช้งานเท่ากับค่าใช้จ่ายในการยิงแอดเพื่อดึงเขาเข้ามาพอดี (ยังไม่หักต้นทุนสินค้า)',
            'เว็บไซต์ทำงานเร็วเป็นพิเศษ',
            'ลูกค้ามีอัตราการกลับมาซื้อซ้ำ 100%'
          ],
          correctIndex: 1,
          explanation: 'อัตราส่วน LTV : CAC ที่แข็งแรงในระดับสากลควรอยู่ที่ 3 : 1 ขึ้นไป หากอยู่ที่ 1 : 1 แปลว่าแทบไม่มีส่วนต่างเหลือกำไร'
        }
      ]
    }
  },
  {
    id: 'course-cloud-native',
    title: 'Cloud-Native Architecture & Microservices (ห้องเรียน อ.ดร.วิชัย)',
    slug: 'cloud-native-microservices',
    subtitle: 'ออกแบบระบบกระจายศูนย์ สถาปัตยกรรมคลาวด์ พร้อมการประเมินผลทั้งปรนัยและอัตนัย',
    description: 'ห้องเรียนออนไลน์สำหรับวิศวกรซอฟต์แวร์ยุคใหม่ ออกแบบและพัฒนา Microservices, Docker, Kubernetes, Distributed Caching และ Event-Driven Architecture โดยผู้เรียนจะได้ทำแบบทดสอบทั้งแบบปรนัย (Multiple choice, ถูก/ผิด, เลือกหลายคำตอบ) และแบบอัตนัย (วิเคราะห์ออกแบบระบบ พร้อมการตรวจ Rubric โดยอาจารย์ผู้สอน)',
    category: 'web_dev',
    categoryNameTh: 'เว็บและคลาวด์ซิสเต็ม',
    level: 'ระดับสูง',
    durationHours: 8.0,
    classroomCode: 'BB-CLS-701',
    createdById: 'user-teacher-1',
    classroomCapacity: 50,
    isClassroomOpen: true,
    instructor: {
      name: 'อ. ดร. วิชัย เมธาวี',
      title: 'อาจารย์ผู้เชี่ยวชาญด้าน Software Architecture & Distributed Systems',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      organization: 'BB FlexLearn Academic Faculty & Cloud Engineering Center',
      signatureName: 'Dr. Wichai Methawee, Ph.D.'
    },
    colorTheme: {
      primary: 'slate-950',
      secondary: 'cyan-600',
      badgeBg: 'bg-cyan-50 text-cyan-700',
      textAccent: 'text-cyan-600',
      gradient: 'from-cyan-600 to-blue-700'
    },
    iconType: 'code',
    learningOutcomes: [
      'เข้าใจหลักการสถาปัตยกรรม Microservices และ Domain-Driven Design (DDD)',
      'บริหารจัดการ Container orchestration ด้วย Kubernetes และ Helm',
      'ออกแบบ Event-driven message broker ด้วย Apache Kafka และ RabbitMQ',
      'วิเคราะห์และเลือกใช้ Distributed Cache (Redis) เพื่อรองรับ Load หลักแสน RPS',
      'ตอบข้อสอบอัตนัยวิเคราะห์เคสการออกแบบระบบตามเกณฑ์มาตรฐานอุตสาหกรรม'
    ],
    requirements: [
      'ความเข้าใจพื้นฐานด้าน Network, HTTP/REST API และ Linux',
      'ประสบการณ์เขียนโปรแกรม Backend หรือ Full-Stack อย่างน้อย 6 เดือน'
    ],
    published: true,
    updatedAt: '2026-03-20',
    lessons: [
      {
        id: 'lesson-cn-1',
        title: '01. วิวัฒนาการจาก Monolith สู่ Microservices Architecture',
        description: 'ทำความเข้าใจข้อดี ข้อเสีย และจุดคุ้มทุนในการแยกเซอร์วิสแบบกระจายศูนย์',
        durationMinutes: 25,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        order: 1,
        keyTakeaways: [
          'Conway’s Law และผลต่อการจัดโครงสร้างทีมซอฟต์แวร์',
          'Service Boundary และ Bounded Context ใน DDD',
          'Database per Service Pattern'
        ]
      },
      {
        id: 'lesson-cn-2',
        title: '02. Containerization & Orchestration ด้วย Docker และ Kubernetes',
        description: 'การทำ Packaging แอปพลิเคชันและการจัดการ Pod, Service, Ingress และ Auto-scaling',
        durationMinutes: 30,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        order: 2,
        keyTakeaways: [
          'Multi-stage Docker build เพื่อลดขนาด Image',
          'Horizontal Pod Autoscaler (HPA)',
          'Zero-downtime rolling deployment'
        ]
      },
      {
        id: 'lesson-cn-3',
        title: '03. High-Throughput Caching & Event-Driven Messaging',
        description: 'การใช้ Redis Cluster และ Message Queue เพื่อลด Latency และป้องกัน Bottlenecks',
        durationMinutes: 28,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        order: 3,
        keyTakeaways: [
          'Cache-Aside vs Write-Through caching patterns',
          'Cache Invalidation strategies & TTL',
          'At-least-once delivery semantics'
        ]
      }
    ],
    preTest: {
      id: 'pre-cn',
      title: 'แบบทดสอบก่อนเรียน (Pre-test) - Cloud-Native Architecture',
      type: 'pre_test',
      passingScorePercent: 60,
      questions: [
        {
          id: 'q-cn-pre-1',
          question: 'ข้อใดคือข้อดีที่เด่นชัดที่สุดของการเลือกใช้สถาปัตยกรรม Microservices เทียบกับ Monolith?',
          type: 'multiple_choice',
          options: [
            'ลดความซับซ้อนของระบบเครือข่ายให้เป็นศูนย์',
            'แต่ละเซอร์วิสสามารถแยก Deploy และขยายขนาด (Scale) ได้อย่างอิสระตามภาระงาน',
            'ทำให้ไม่ต้องมีการบันทึก Log ในระบบ',
            'ใช้ฐานข้อมูลกลางเพียงตัวเดียวสำหรับทุกงานเสมอ'
          ],
          correctIndex: 1,
          points: 1,
          explanation: 'Microservices ช่วยให้แต่ละบริการมีอิสระในการ Deploy, Scale เฉพาะจุดที่โหลดสูง และเลือกเทคโนโลยีที่เหมาะสมที่สุดสำหรับแต่ละโดเมน'
        },
        {
          id: 'q-cn-pre-2',
          question: 'จริงหรือไม่: "ในระบบ Kubernetes การกำหนด Ingress Controller ทำหน้าที่กระจายทราฟฟิก HTTP/HTTPS จากภายนอกคลัสเตอร์เข้าสู่ Services ภายใน"',
          type: 'true_false',
          options: [
            'จริง (True)',
            'เท็จ (False)'
          ],
          correctIndex: 0,
          points: 1,
          explanation: 'Ingress เป็น API object ที่จัดการการเข้าถึง Services ในคลัสเตอร์จากภายนอก ทำหน้าที่เป็น Reverse Proxy, SSL Termination และ Name-based virtual hosting'
        },
        {
          id: 'q-cn-pre-3',
          question: 'คำสั่งหรือแนวคิดใดใน Dockerfile ที่ช่วยลดขนาด Image ให้มีขนาดเล็กลงมากที่สุด?',
          type: 'subjective_short',
          points: 2,
          sampleAnswer: 'Multi-stage build (การแบ่งขั้นการคอมไพล์หลายสเตจ)',
          keywords: ['multi-stage', 'multistage', 'multi stage', 'หลายขั้นตอน', 'สเตจ'],
          explanation: 'Multi-stage builds ช่วยให้เราคอมไพล์โค้ดใน stage แรก แล้วคัดลอกเฉพาะ Binary หรือ Artifact สำเร็จรูปไปยัง image ฐานที่มีขนาดเล็กมาก เช่น Alpine หรือ Distroless'
        }
      ]
    },
    postTest: {
      id: 'post-cn',
      title: 'แบบทดสอบหลังเรียนวัดผล (Post-test) - หลากหลายรูปแบบ (ปรนัย + อัตนัย)',
      type: 'post_test',
      passingScorePercent: 75,
      questions: [
        {
          id: 'q-cn-post-1',
          question: 'ข้อใดเป็นลักษณะสำคัญของ Event-Driven Architecture (ปรนัย 4 ตัวเลือก)?',
          type: 'multiple_choice',
          options: [
            'การเรียกใช้แบบ Synchronous Blocking RPC ตลอดเวลา',
            'การส่งข้อความผ่าน Message Broker ทำให้ Producer และ Consumer แยกขาดจากกัน (Decoupled)',
            'การแชร์ตารางฐานข้อมูลเดียวกันระหว่างทุก Component',
            'การห้ามใช้งานระบบ Cloud'
          ],
          correctIndex: 1,
          points: 2,
          explanation: 'Event-driven ช่วยลด Coupling ระหว่างระบบ โดย Producer ส่ง Event เข้า Message Broker แล้ว Consumer สมัครรับฟังเมื่อต้องการ จึงทนทานต่อกรณีเซอร์วิสใดเซอร์วิสหนึ่งล่ม'
        },
        {
          id: 'q-cn-post-2',
          question: 'จริงหรือไม่: "Cache Stampede (Thundering Herd) เกิดขึ้นเมื่อข้อมูลยอดนิยมในแคชหมดอายุพร้อมกัน ทำให้รีเควสต์จำนวนมหาศาลทะลักไปที่ฐานข้อมูลหลักพร้อมกัน"',
          type: 'true_false',
          options: [
            'จริง (True)',
            'เท็จ (False)'
          ],
          correctIndex: 0,
          points: 2,
          explanation: 'เมื่อ Cache Key หมดอายุ แล้วมีทราฟฟิกเข้ามานับพันในเสี้ยววินาที ทุก Thread จะวิ่งไป Query ฐานข้อมูลพร้อมกัน ทำให้ DB เกิด Bottleneck ล่มได้'
        },
        {
          id: 'q-cn-post-3',
          question: 'ข้อใดคือเทคนิคที่ช่วยแก้ไขปัญหา Cache Stampede? (เลือกตอบได้มากกว่า 1 ข้อ)',
          type: 'multiple_select',
          options: [
            'การใช้ Mutex / Distributed Lock ป้องกันไม่ให้หลาย Thread วิ่งไปอ่าน DB พร้อมกัน',
            'การสุ่มบวกเวลาหมดอายุแบบ Probabilistic Early Expiration (Jitter)',
            'การลบฐานข้อมูลทิ้งทุกครั้งที่เกิดปัญหา',
            'การทำ Background Prefetching ข้อมูลก่อนหมดอายุจริง'
          ],
          correctIndices: [0, 1, 3],
          points: 3,
          explanation: 'การใช้ Distributed Lock, Cache Jitter (สุ่ม TTL) และ Background Warm-up ล้วนเป็น Best Practices สากลในการป้องกัน Cache Stampede'
        },
        {
          id: 'q-cn-post-4',
          question: 'ให้ระบุชื่อโปรโตคอลการสื่อสารความเร็วสูงแบบ Binary RPC ที่สร้างบน HTTP/2 ซึ่งเป็นที่นิยมสูงสุดในการสื่อสารระหว่าง Microservices ภายในคลัสเตอร์ (อัตนัย ตอบสั้น)',
          type: 'subjective_short',
          points: 3,
          sampleAnswer: 'gRPC (Google Remote Procedure Call)',
          keywords: ['grpc', 'g-rpc', 'protocol buffers', 'protobuf'],
          explanation: 'gRPC ใช้ HTTP/2 เป็น Transport Layer และใช้ Protocol Buffers เข้ารหัสไบนารี ส่งผลให้ Latency ต่ำและ Throughput สูงกว่า JSON/REST อย่างมาก'
        },
        {
          id: 'q-cn-post-5',
          question: 'กรณีศึกษา: หากระบบชำระเงินของ e-Commerce มีปัญหาชำระเงินสำเร็จแล้วแต่ระบบออกใบเสร็จส่งอีเมลล่มกะทันหัน ท่านจะนำสถาปัตยกรรมแบบใดมาแก้ไขเพื่อให้การทำงานมีความเสถียรและข้อมูลไม่สูญหาย? (อัตนัย ความเรียง/วิเคราะห์)',
          type: 'subjective_essay',
          points: 5,
          maxWords: 200,
          rubricGuide: 'เกณฑ์การให้คะแนน (5 คะแนน): 1. เสนอการใช้ Message Queue/Event Broker (เช่น Kafka/RabbitMQ) หรือ Outbox Pattern (2 คะแนน), 2. อธิบายกระบวนการ Retry และ Dead Letter Queue (DLQ) (2 คะแนน), 3. ความสมบูรณ์ของภาพรวมสถาปัตยกรรม (1 คะแนน)',
          sampleAnswer: 'แนวทางที่แนะนำ: 1. นำ Transactional Outbox Pattern หรือ Message Broker (เช่น Kafka/RabbitMQ) มาคั่น เมื่อบันทึกการชำระเงินแล้วให้ Emit Event "PaymentCompleted" เข้าสู่คิว 2. ออกแบบ Consumer ฝั่งออกใบเสร็จให้ทำงานแบบ Asynchronous 3. กำหนด Exponential Backoff Retry Policy และ Dead Letter Queue (DLQ) เพื่อรองรับกรณีระบบปลายทางมีปัญหาชั่วคราว โดยไม่กระทบรายการชำระเงินหลัก',
          explanation: 'สถาปัตยกรรมแบบ Event-Driven ร่วมกับ Transactional Outbox Pattern ช่วยรับประกัน At-least-once delivery และแยกความพร้อมใช้งานของเซอร์วิสออกจากกัน'
        }
      ]
    }
  }
];

export const INITIAL_PROGRESS: UserCourseProgress[] = [
  // --- Modern Full-Stack Web Development ---
  {
    courseId: 'course-web-dev',
    userId: 'user-student-4',
    enrolledDate: '2026-02-10',
    completedLessonIds: ['lesson-wd-1', 'lesson-wd-2', 'lesson-wd-3', 'lesson-wd-4'],
    preTestScore: {
      score: 4,
      total: 5,
      percentage: 80,
      passed: true,
      date: '2026-02-10',
      answers: [1, 1, 1, 0, 1]
    },
    postTestScore: {
      score: 5,
      total: 5,
      percentage: 100,
      passed: true,
      date: '2026-02-12',
      answers: [1, 1, 1, 1, 1]
    },
    certificateIssued: true,
    certificateId: 'CERT-2026-WD-7712',
    certificateDate: '2026-02-12',
    lastAccessedLessonId: 'lesson-wd-4',
    totalWatchSeconds: 4320
  },
  {
    courseId: 'course-web-dev',
    userId: 'user-student-6',
    enrolledDate: '2026-02-08',
    completedLessonIds: ['lesson-wd-1', 'lesson-wd-2', 'lesson-wd-3', 'lesson-wd-4'],
    preTestScore: {
      score: 3,
      total: 5,
      percentage: 60,
      passed: true,
      date: '2026-02-08',
      answers: [1, 0, 1, 0, 1]
    },
    postTestScore: {
      score: 5,
      total: 5,
      percentage: 100,
      passed: true,
      date: '2026-02-11',
      answers: [1, 1, 1, 1, 1]
    },
    certificateIssued: true,
    certificateId: 'CERT-2026-WD-6641',
    certificateDate: '2026-02-11',
    lastAccessedLessonId: 'lesson-wd-4',
    totalWatchSeconds: 5100
  },
  {
    courseId: 'course-web-dev',
    userId: 'user-student-5',
    enrolledDate: '2026-02-14',
    completedLessonIds: ['lesson-wd-1', 'lesson-wd-2', 'lesson-wd-3', 'lesson-wd-4'],
    preTestScore: {
      score: 3,
      total: 5,
      percentage: 60,
      passed: true,
      date: '2026-02-14',
      answers: [1, 1, 0, 0, 1]
    },
    postTestScore: {
      score: 4,
      total: 5,
      percentage: 80,
      passed: true,
      date: '2026-02-18',
      answers: [1, 1, 1, 0, 1]
    },
    certificateIssued: true,
    certificateId: 'CERT-2026-WD-5519',
    certificateDate: '2026-02-18',
    lastAccessedLessonId: 'lesson-wd-4',
    totalWatchSeconds: 5400
  },
  {
    courseId: 'course-web-dev',
    userId: 'user-student-8',
    enrolledDate: '2026-02-20',
    completedLessonIds: ['lesson-wd-1', 'lesson-wd-2', 'lesson-wd-3', 'lesson-wd-4'],
    preTestScore: {
      score: 2,
      total: 5,
      percentage: 40,
      passed: true,
      date: '2026-02-20',
      answers: [1, 0, 0, 0, 1]
    },
    postTestScore: {
      score: 4,
      total: 5,
      percentage: 80,
      passed: true,
      date: '2026-02-26',
      answers: [1, 1, 1, 0, 1]
    },
    certificateIssued: true,
    certificateId: 'CERT-2026-WD-4412',
    certificateDate: '2026-02-26',
    lastAccessedLessonId: 'lesson-wd-4',
    totalWatchSeconds: 5900
  },
  {
    courseId: 'course-web-dev',
    userId: 'user-student-1',
    enrolledDate: '2026-02-12',
    completedLessonIds: ['lesson-wd-1', 'lesson-wd-2'],
    preTestScore: {
      score: 3,
      total: 5,
      percentage: 60,
      passed: true,
      date: '2026-02-12',
      answers: [1, 1, 1, 0, 0]
    },
    certificateIssued: false,
    lastAccessedLessonId: 'lesson-wd-3',
    totalWatchSeconds: 2520
  },

  // --- UX/UI & Design Systems ---
  {
    courseId: 'course-ux-ui',
    userId: 'user-student-7',
    enrolledDate: '2026-02-18',
    completedLessonIds: ['lesson-ux-1', 'lesson-ux-2', 'lesson-ux-3', 'lesson-ux-4'],
    preTestScore: {
      score: 2,
      total: 3,
      percentage: 66,
      passed: true,
      date: '2026-02-18',
      answers: [1, 1, 0]
    },
    postTestScore: {
      score: 3,
      total: 3,
      percentage: 100,
      passed: true,
      date: '2026-02-19',
      answers: [1, 2, 1]
    },
    certificateIssued: true,
    certificateId: 'CERT-2026-UX-1190',
    certificateDate: '2026-02-19',
    lastAccessedLessonId: 'lesson-ux-4',
    totalWatchSeconds: 4200
  },
  {
    courseId: 'course-ux-ui',
    userId: 'user-student-4',
    enrolledDate: '2026-02-20',
    completedLessonIds: ['lesson-ux-1', 'lesson-ux-2', 'lesson-ux-3', 'lesson-ux-4'],
    preTestScore: {
      score: 3,
      total: 3,
      percentage: 100,
      passed: true,
      date: '2026-02-20',
      answers: [1, 2, 1]
    },
    postTestScore: {
      score: 3,
      total: 3,
      percentage: 100,
      passed: true,
      date: '2026-02-22',
      answers: [1, 2, 1]
    },
    certificateIssued: true,
    certificateId: 'CERT-2026-UX-2281',
    certificateDate: '2026-02-22',
    lastAccessedLessonId: 'lesson-ux-4',
    totalWatchSeconds: 4500
  },
  {
    courseId: 'course-ux-ui',
    userId: 'user-student-1',
    enrolledDate: '2026-02-15',
    completedLessonIds: ['lesson-ux-1', 'lesson-ux-2', 'lesson-ux-3', 'lesson-ux-4'],
    preTestScore: {
      score: 2,
      total: 3,
      percentage: 66,
      passed: true,
      date: '2026-02-15',
      answers: [1, 1, 0]
    },
    postTestScore: {
      score: 3,
      total: 3,
      percentage: 100,
      passed: true,
      date: '2026-02-28',
      answers: [1, 2, 1]
    },
    certificateIssued: true,
    certificateId: 'CERT-2026-UX-9901',
    certificateDate: '2026-02-28',
    lastAccessedLessonId: 'lesson-ux-4',
    totalWatchSeconds: 5580
  },
  {
    courseId: 'course-ux-ui',
    userId: 'user-student-2',
    enrolledDate: '2026-02-16',
    completedLessonIds: ['lesson-ux-1', 'lesson-ux-2', 'lesson-ux-3', 'lesson-ux-4'],
    preTestScore: {
      score: 2,
      total: 3,
      percentage: 66,
      passed: true,
      date: '2026-02-16',
      answers: [1, 1, 0]
    },
    postTestScore: {
      score: 3,
      total: 3,
      percentage: 100,
      passed: true,
      date: '2026-03-02',
      answers: [1, 2, 1]
    },
    certificateIssued: true,
    certificateId: 'CERT-2026-UX-8412',
    certificateDate: '2026-03-02',
    lastAccessedLessonId: 'lesson-ux-4',
    totalWatchSeconds: 5800
  },

  // --- AI & Data Intelligence ---
  {
    courseId: 'course-ai-data',
    userId: 'user-student-5',
    enrolledDate: '2026-02-14',
    completedLessonIds: ['lesson-ai-1', 'lesson-ai-2', 'lesson-ai-3', 'lesson-ai-4'],
    preTestScore: {
      score: 3,
      total: 4,
      percentage: 75,
      passed: true,
      date: '2026-02-14',
      answers: [1, 1, 0, 1]
    },
    postTestScore: {
      score: 4,
      total: 4,
      percentage: 100,
      passed: true,
      date: '2026-02-16',
      answers: [1, 1, 1, 1]
    },
    certificateIssued: true,
    certificateId: 'CERT-2026-AI-3301',
    certificateDate: '2026-02-16',
    lastAccessedLessonId: 'lesson-ai-4',
    totalWatchSeconds: 4800
  },
  {
    courseId: 'course-ai-data',
    userId: 'user-student-3',
    enrolledDate: '2026-03-01',
    completedLessonIds: ['lesson-ai-1', 'lesson-ai-2', 'lesson-ai-3', 'lesson-ai-4'],
    preTestScore: {
      score: 2,
      total: 4,
      percentage: 50,
      passed: true,
      date: '2026-03-01',
      answers: [1, 0, 0, 1]
    },
    postTestScore: {
      score: 4,
      total: 4,
      percentage: 100,
      passed: true,
      date: '2026-03-04',
      answers: [1, 1, 1, 1]
    },
    certificateIssued: true,
    certificateId: 'CERT-2026-AI-2201',
    certificateDate: '2026-03-04',
    lastAccessedLessonId: 'lesson-ai-4',
    totalWatchSeconds: 5200
  },
  {
    courseId: 'course-ai-data',
    userId: 'user-student-6',
    enrolledDate: '2026-03-02',
    completedLessonIds: ['lesson-ai-1', 'lesson-ai-2', 'lesson-ai-3', 'lesson-ai-4'],
    preTestScore: {
      score: 2,
      total: 4,
      percentage: 50,
      passed: true,
      date: '2026-03-02',
      answers: [1, 0, 0, 1]
    },
    postTestScore: {
      score: 3,
      total: 4,
      percentage: 75,
      passed: true,
      date: '2026-03-07',
      answers: [1, 1, 0, 1]
    },
    certificateIssued: true,
    certificateId: 'CERT-2026-AI-1102',
    certificateDate: '2026-03-07',
    lastAccessedLessonId: 'lesson-ai-4',
    totalWatchSeconds: 5600
  },
  {
    courseId: 'course-ai-data',
    userId: 'user-student-1',
    enrolledDate: '2026-03-05',
    completedLessonIds: ['lesson-ai-1', 'lesson-ai-2', 'lesson-ai-3'],
    preTestScore: {
      score: 3,
      total: 4,
      percentage: 75,
      passed: true,
      date: '2026-03-05',
      answers: [1, 1, 0, 1]
    },
    certificateIssued: false,
    lastAccessedLessonId: 'lesson-ai-4',
    totalWatchSeconds: 3800
  },

  // --- Digital Marketing & Growth Strategy ---
  {
    courseId: 'course-marketing',
    userId: 'user-student-8',
    enrolledDate: '2026-02-10',
    completedLessonIds: ['lesson-mk-1', 'lesson-mk-2', 'lesson-mk-3'],
    preTestScore: {
      score: 2,
      total: 3,
      percentage: 66,
      passed: true,
      date: '2026-02-10',
      answers: [1, 1, 0]
    },
    postTestScore: {
      score: 3,
      total: 3,
      percentage: 100,
      passed: true,
      date: '2026-02-11',
      answers: [1, 1, 1]
    },
    certificateIssued: true,
    certificateId: 'CERT-2026-MK-8890',
    certificateDate: '2026-02-11',
    lastAccessedLessonId: 'lesson-mk-3',
    totalWatchSeconds: 3600
  },
  {
    courseId: 'course-marketing',
    userId: 'user-student-7',
    enrolledDate: '2026-02-12',
    completedLessonIds: ['lesson-mk-1', 'lesson-mk-2', 'lesson-mk-3'],
    preTestScore: {
      score: 2,
      total: 3,
      percentage: 66,
      passed: true,
      date: '2026-02-12',
      answers: [1, 1, 0]
    },
    postTestScore: {
      score: 3,
      total: 3,
      percentage: 100,
      passed: true,
      date: '2026-02-14',
      answers: [1, 1, 1]
    },
    certificateIssued: true,
    certificateId: 'CERT-2026-MK-7761',
    certificateDate: '2026-02-14',
    lastAccessedLessonId: 'lesson-mk-3',
    totalWatchSeconds: 4100
  },
  {
    courseId: 'course-marketing',
    userId: 'user-student-2',
    enrolledDate: '2026-02-15',
    completedLessonIds: ['lesson-mk-1', 'lesson-mk-2', 'lesson-mk-3'],
    preTestScore: {
      score: 1,
      total: 3,
      percentage: 33,
      passed: true,
      date: '2026-02-15',
      answers: [1, 0, 0]
    },
    postTestScore: {
      score: 3,
      total: 3,
      percentage: 100,
      passed: true,
      date: '2026-02-18',
      answers: [1, 1, 1]
    },
    certificateIssued: true,
    certificateId: 'CERT-2026-MK-6652',
    certificateDate: '2026-02-18',
    lastAccessedLessonId: 'lesson-mk-3',
    totalWatchSeconds: 4500
  },

  // --- Cloud-Native Architecture & Microservices (ห้องเรียน อ.ดร.วิชัย) ---
  {
    courseId: 'course-cloud-native',
    userId: 'user-student-1',
    enrolledDate: '2026-03-10',
    completedLessonIds: ['lesson-cn-1', 'lesson-cn-2', 'lesson-cn-3'],
    preTestScore: {
      score: 3,
      total: 3,
      percentage: 100,
      passed: true,
      date: '2026-03-10',
      answers: [1, 0, 'Multi-stage build ช่วยลดขนาด Image']
    },
    postTestScore: {
      score: 11,
      total: 15,
      percentage: 73,
      passed: false,
      date: '2026-03-18',
      answers: [
        1,
        0,
        [0, 1, 3],
        'gRPC binary protocol',
        'ควรนำ Message Broker เช่น Kafka เข้ามาคั่นการทำงานระหว่างระบบชำระเงินกับระบบออกใบเสร็จ พร้อมทั้งทำ Dead Letter Queue เพื่อ Retry ส่งอีเมลซ้ำเมื่อระบบกู้คืนสำเร็จ โดยไม่ทำให้กระบวนการชำระเงินค้าง'
      ],
      pendingTeacherReview: true,
      subjectiveAnswers: {
        'q-cn-post-4': {
          questionId: 'q-cn-post-4',
          studentAnswer: 'gRPC binary protocol',
          scoreAwarded: 3,
          maxScore: 3,
          isGraded: true,
          teacherComment: 'ตอบได้ถูกต้องและตรงประเด็นมากครับ gRPC มีประสิทธิภาพสูง เหมาะกับ Microservices',
          gradedBy: 'อ. ดร. วิชัย เมธาวี',
          gradedAt: '2026-03-19'
        },
        'q-cn-post-5': {
          questionId: 'q-cn-post-5',
          studentAnswer: 'ควรนำ Message Broker เช่น Kafka เข้ามาคั่นการทำงานระหว่างระบบชำระเงินกับระบบออกใบเสร็จ พร้อมทั้งทำ Dead Letter Queue เพื่อ Retry ส่งอีเมลซ้ำเมื่อระบบกู้คืนสำเร็จ โดยไม่ทำให้กระบวนการชำระเงินค้าง',
          scoreAwarded: 0,
          maxScore: 5,
          isGraded: false
        }
      }
    },
    certificateIssued: false,
    lastAccessedLessonId: 'lesson-cn-3',
    totalWatchSeconds: 5200
  },
  {
    courseId: 'course-cloud-native',
    userId: 'user-student-6',
    enrolledDate: '2026-03-11',
    completedLessonIds: ['lesson-cn-1', 'lesson-cn-2', 'lesson-cn-3'],
    preTestScore: {
      score: 2,
      total: 3,
      percentage: 66,
      passed: true,
      date: '2026-03-11',
      answers: [1, 0, 'ใช้ docker squash']
    },
    postTestScore: {
      score: 14,
      total: 15,
      percentage: 93,
      passed: true,
      date: '2026-03-19',
      answers: [
        1,
        0,
        [0, 1, 3],
        'gRPC',
        'แนวทางแก้ไข: 1. นำ Transactional Outbox Pattern และ RabbitMQ มาใช้ส่ง Payment Event 2. ออกแบบ Consumer แบบ Idempotent สำหรับออกใบเสร็จ 3. ใช้ Dead Letter Exchange (DLX) พร้อม Alerting แจ้งเตือนทีมเมื่อมีข้อความค้าง'
      ],
      pendingTeacherReview: false,
      subjectiveAnswers: {
        'q-cn-post-4': {
          questionId: 'q-cn-post-4',
          studentAnswer: 'gRPC',
          scoreAwarded: 3,
          maxScore: 3,
          isGraded: true,
          teacherComment: 'ถูกต้องยอดเยี่ยม',
          gradedBy: 'อ. ดร. วิชัย เมธาวี',
          gradedAt: '2026-03-20'
        },
        'q-cn-post-5': {
          questionId: 'q-cn-post-5',
          studentAnswer: 'แนวทางแก้ไข: 1. นำ Transactional Outbox Pattern และ RabbitMQ มาใช้ส่ง Payment Event 2. ออกแบบ Consumer แบบ Idempotent สำหรับออกใบเสร็จ 3. ใช้ Dead Letter Exchange (DLX) พร้อม Alerting แจ้งเตือนทีมเมื่อมีข้อความค้าง',
          scoreAwarded: 5,
          maxScore: 5,
          isGraded: true,
          teacherComment: 'วิเคราะห์ได้อย่างครอบคลุม ทั้ง Outbox Pattern, Idempotency และ DLX ยอดเยี่ยมมากครับ',
          gradedBy: 'อ. ดร. วิชัย เมธาวี',
          gradedAt: '2026-03-20'
        }
      }
    },
    certificateIssued: true,
    certificateId: 'CERT-2026-CN-8801',
    certificateDate: '2026-03-20',
    lastAccessedLessonId: 'lesson-cn-3',
    totalWatchSeconds: 6100
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    credentialId: 'CERT-2026-UX-9901',
    courseId: 'course-ux-ui',
    courseTitle: 'UX/UI & Design Systems for Cross-Platform Apps',
    userId: 'user-student-1',
    userName: 'สมชาย มีความรู้',
    userEmail: 'somchai@bbflexlearn.th',
    issuedDate: '28 กุมภาพันธ์ 2026',
    instructorName: 'คุณพัชริดา วรวงศ์สกุล',
    instructorTitle: 'Design Director, Studio Craft UX',
    scorePercentage: 100,
    verificationHash: '9a84f3e210b64cc7d98823f9'
  },
  {
    id: 'cert-2',
    credentialId: 'CERT-2026-UX-8412',
    courseId: 'course-ux-ui',
    courseTitle: 'UX/UI & Design Systems for Cross-Platform Apps',
    userId: 'user-student-2',
    userName: 'กานดา สุขใจ',
    userEmail: 'kanda@bbflexlearn.th',
    issuedDate: '2 มีนาคม 2026',
    instructorName: 'คุณพัชริดา วรวงศ์สกุล',
    instructorTitle: 'Design Director, Studio Craft UX',
    scorePercentage: 100,
    verificationHash: '8b73e210a5531bb6c87712e4'
  }
];

export const INITIAL_NOTIFICATIONS: EmailNotification[] = [
  {
    id: 'notif-1',
    toEmail: 'somchai@bbflexlearn.th',
    toName: 'สมชาย มีความรู้',
    subject: '🎓 ยินดีด้วย! คุณได้รับใบประกาศนียบัตรสำเร็จหลักสูตร UX/UI Design Systems',
    type: 'certificate_issued',
    previewText: 'ขอแสดงความยินดีที่คุณสอบผ่าน Post-test ด้วยคะแนน 100% เต็ม สามารถดาวน์โหลดใบประกาศนียบัตรได้ทันที',
    sentAt: '2026-02-28 14:30',
    isRead: false,
    relatedCourseId: 'course-ux-ui',
    htmlBody: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
        <div style="border-bottom: 2px solid #6366f1; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #0f172a; margin: 0; font-size: 20px;">BB FlexLearn Platform Notifications</h2>
          <p style="color: #64748b; margin: 4px 0 0; font-size: 13px;">ระบบแจ้งเตือนการเรียนรู้อัตโนมัติ</p>
        </div>
        <p style="color: #1e293b; font-size: 16px;">เรียน คุณสมชาย มีความรู้,</p>
        <p style="color: #334155; line-height: 1.6; font-size: 14px;">
          ทางสถาบันขอแสดงความยินดีเป็นอย่างยิ่งที่คุณได้สำเร็จการศึกษาในหลักสูตร <strong>UX/UI & Design Systems for Cross-Platform Apps</strong> ครบถ้วนทุกบทเรียน และผ่านการทดสอบหลังเรียน (Post-test) ด้วยผลคะแนนยอดเยี่ยม 100%
        </p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 6px; font-size: 13px; color: #64748b;">รหัสใบประกาศนียบัตร (Credential ID):</p>
          <p style="margin: 0; font-size: 18px; font-weight: bold; color: #4338ca; letter-spacing: 0.5px;">CERT-2026-UX-9901</p>
        </div>
        <p style="color: #334155; line-height: 1.6; font-size: 14px;">คุณสามารถคลิกเข้าไปที่หน้าแดชบอร์ดเพื่อดู พิมพ์ หรือดาวน์โหลดใบประกาศนียบัตรความละเอียดสูง พร้อมคิวอาร์โค้ดตรวจสอบความถูกต้องได้ทันที</p>
        <div style="text-align: center; margin: 28px 0;">
          <span style="background: #0f172a; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500; display: inline-block;">เข้าสู่ระบบเพื่อดูใบประกาศนียบัตร</span>
        </div>
        <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 24px 0;" />
        <p style="color: #94a3b8; font-size: 12px; margin: 0; text-align: center;">BB FlexLearn Online Academy · ปลอดภัย เชื่อถือได้ ตรวจสอบสถานะได้ตลอด 24 ชั่วโมง</p>
      </div>
    `
  },
  {
    id: 'notif-2',
    toEmail: 'somchai@bbflexlearn.th',
    toName: 'สมชาย มีความรู้',
    subject: '📢 อัปเดตบทเรียนใหม่: Modern Web Development มีเนื้อหาบทใหม่แล้ว!',
    type: 'lesson_update',
    previewText: 'ผู้สอนได้เพิ่มบทเรียน "05. Web Security, Deployment & Performance Optimization" เรียบร้อยแล้ว',
    sentAt: '2026-03-15 09:15',
    isRead: true,
    relatedCourseId: 'course-web-dev',
    htmlBody: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
        <div style="border-bottom: 2px solid #0284c7; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #0f172a; margin: 0; font-size: 20px;">แจ้งเตือนเนื้อหาบทเรียนใหม่</h2>
          <p style="color: #64748b; margin: 4px 0 0; font-size: 13px;">BB FlexLearn Course Update</p>
        </div>
        <p style="color: #1e293b; font-size: 16px;">เรียน ผู้เรียนหลักสูตร Modern Full-Stack Web Development ทุกท่าน,</p>
        <p style="color: #334155; line-height: 1.6; font-size: 14px;">
          อาจารย์ธีรภัทร ชาญวิทย์ ได้ทำการอัปโหลดคลิปวิดีโอบทเรียนตอนใหม่: <strong>บทที่ 05: Web Security, Deployment & Performance Optimization</strong> ความยาว 30 นาที พร้อมเอกสารสรุป Core Web Vitals Checklist เรียบร้อยแล้ว
        </p>
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #166534; font-weight: 500;">✓ สิทธิพิเศษสำหรับผู้เรียน: เข้าชมวิดีโอระดับ Full HD ได้ทั้งบนคอมพิวเตอร์และมือถือได้ทันที</p>
        </div>
        <p style="color: #64748b; font-size: 12px; margin-top: 24px; text-align: center;">อีเมลนี้ส่งอัตโนมัติจากระบบ BB FlexLearn</p>
      </div>
    `
  }
];

export const INITIAL_ANALYTICS: CourseAnalytics[] = [
  {
    courseId: 'course-web-dev',
    courseTitle: 'Modern Full-Stack Web Development',
    totalEnrolled: 148,
    completionRate: 68,
    avgPreTestScore: 54,
    avgPostTestScore: 86,
    avgImprovementDelta: 32,
    dropOffLessonTitle: '04. การเชื่อมต่อ REST API, Data Fetching & Caching',
    satisfactionRating: 4.9,
    lessonCompletions: [
      { lessonTitle: '01. สถาปัตยกรรม Web App ยุคใหม่', completionPercentage: 96 },
      { lessonTitle: '02. Modular Components React & TS', completionPercentage: 88 },
      { lessonTitle: '03. Tailwind & Responsive Layout', completionPercentage: 82 },
      { lessonTitle: '04. REST API & Data Fetching', completionPercentage: 71 },
      { lessonTitle: '05. Security & Optimization', completionPercentage: 68 }
    ]
  },
  {
    courseId: 'course-ux-ui',
    courseTitle: 'UX/UI & Design Systems for Cross-Platform Apps',
    totalEnrolled: 215,
    completionRate: 84,
    avgPreTestScore: 48,
    avgPostTestScore: 92,
    avgImprovementDelta: 44,
    dropOffLessonTitle: '03. การสร้าง Design Tokens',
    satisfactionRating: 4.95,
    lessonCompletions: [
      { lessonTitle: '01. จิตวิทยาและสถาปัตยกรรมข้อมูล', completionPercentage: 98 },
      { lessonTitle: '02. ระบบ 8-Point Grid', completionPercentage: 92 },
      { lessonTitle: '03. Design Tokens', completionPercentage: 86 },
      { lessonTitle: '04. Usability Testing & Handoff', completionPercentage: 84 }
    ]
  },
  {
    courseId: 'course-ai-data',
    courseTitle: 'Practical Generative AI & Data Analytics 2026',
    totalEnrolled: 182,
    completionRate: 72,
    avgPreTestScore: 42,
    avgPostTestScore: 88,
    avgImprovementDelta: 46,
    dropOffLessonTitle: '02. Advanced Prompt Engineering',
    satisfactionRating: 4.88,
    lessonCompletions: [
      { lessonTitle: '01. พื้นฐานและสถาปัตยกรรม LLM', completionPercentage: 95 },
      { lessonTitle: '02. Advanced Prompt Engineering', completionPercentage: 78 },
      { lessonTitle: '03. Data Analytics & Dashboarding', completionPercentage: 74 },
      { lessonTitle: '04. Data Governance & Ethics', completionPercentage: 72 }
    ]
  },
  {
    courseId: 'course-marketing',
    courseTitle: 'Digital Marketing & Omnichannel Growth Strategy',
    totalEnrolled: 120,
    completionRate: 79,
    avgPreTestScore: 50,
    avgPostTestScore: 89,
    avgImprovementDelta: 39,
    dropOffLessonTitle: '02. Unit Economics: CAC & LTV',
    satisfactionRating: 4.82,
    lessonCompletions: [
      { lessonTitle: '01. Growth Marketing & Funnel', completionPercentage: 94 },
      { lessonTitle: '02. Unit Economics CAC & LTV', completionPercentage: 81 },
      { lessonTitle: '03. Email Automation', completionPercentage: 79 }
    ]
  }
];
