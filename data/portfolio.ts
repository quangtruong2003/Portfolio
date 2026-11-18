export type LocalizedText = Record<"vi" | "en", string>;
export type ProjectCategory = "work" | "thesis" | "personal";

export interface ArchitectureNode {
  id: string;
  code: string;
  label: LocalizedText;
  detail: LocalizedText;
  metricOrTag: string;
}

export interface ProjectItem {
  slug: "smoothscroll" | "property-management" | "medical-booking" | "chatbot";
  figureCode: string;
  title: string;
  category: ProjectCategory;
  period: LocalizedText;
  role: LocalizedText;
  summary: LocalizedText;
  technologies: string[];
  href?: string;
  website?: string;
  sourceStatus: LocalizedText;
  highlightBadge?: {
    value: string;
    caption: LocalizedText;
  };
  architectureTitle: LocalizedText;
  architectureNodes: ArchitectureNode[];
  caseStudy: {
    context: LocalizedText;
    architecture: LocalizedText[];
    craftNotes: LocalizedText;
  };
}

export interface CapabilityGroup {
  id: string;
  plateCode: string;
  title: LocalizedText;
  summary: LocalizedText;
  architectureFocus: LocalizedText;
  technologies: string[];
}

export interface ExperienceEntry {
  id: string;
  ledgerCode: string;
  company: string;
  location: LocalizedText;
  role: LocalizedText;
  period: LocalizedText;
  summary: LocalizedText;
  contributions: LocalizedText[];
  technologies: string[];
}

export const OWNER_INFO = {
  nameEn: "Nguyen Quang Truong",
  nameVi: "Nguyễn Quang Trường",
  email: "nguyentruongk530042003@gmail.com",
  phoneDisplay: "(094) 789 0450",
  phoneHref: "tel:+84947890450",
  githubUrl: "https://github.com/quangtruong2003",
  linkedinUrl: "https://www.linkedin.com/in/quangtruong2003",
  cvPath: "/cv.pdf",
  cvDownloadName: "Nguyen-Quang-Truong-CV.pdf",
} as const;

export const PROJECTS: ProjectItem[] = [
  {
    slug: "smoothscroll",
    figureCode: "FIG. I",
    title: "SmoothScroll",
    category: "personal",
    period: { en: "May 2026–Present", vi: "05/2026–nay" },
    role: { en: "Creator · Windows Desktop Utility", vi: "Tác giả · Tiện ích Desktop Windows" },
    summary: {
      en: "An open-source Windows mouse-wheel engine built in Rust and Tauri 2 with low-level input hooks, custom easing physics, and per-application exclusion rules.",
      vi: "Tiện ích cuộn chuột Windows mã nguồn mở viết bằng Rust và Tauri 2 với low-level input hook, thuật toán vật lý cuộn tùy chỉnh và quy tắc loại trừ theo từng ứng dụng.",
    },
    technologies: ["Rust", "Tauri 2", "React", "TypeScript", "Win32 Hooks"],
    href: "https://github.com/quangtruong2003/SmoothScroll",
    website: "https://smoothscroll.top/",
    sourceStatus: {
      en: "Public open-source repository & official release site",
      vi: "Mã nguồn mở công khai & trang phát hành chính thức",
    },
    highlightBadge: {
      value: "LIVE",
      caption: {
        en: "GitHub release downloads",
        vi: "lượt tải GitHub Releases",
      },
    },
    architectureTitle: {
      en: "Low-Latency Wheel Interception & Spring Pipeline",
      vi: "Chuỗi xử lý sự kiện cuộn & nội suy vật lý",
    },
    architectureNodes: [
      {
        id: "wheel-hook",
        code: "S1",
        label: { en: "Native Wheel Hook", vi: "Input Hook Native" },
        detail: {
          en: "Intercepts discrete Windows mouse-wheel notches in Rust before application dispatch with minimal overhead.",
          vi: "Đón tín hiệu nấc cuộn chuột Windows ở tầng thấp bằng Rust trước khi gửi vào cửa sổ đích với độ trễ tối thiểu.",
        },
        metricOrTag: "Win32 · Rust",
      },
      {
        id: "app-rules",
        code: "S2",
        label: { en: "Per-App Exclusion Gate", vi: "Bộ lọc theo ứng dụng" },
        detail: {
          en: "Evaluates active foreground process rules so games, CAD tools, or excluded apps bypass interpolation cleanly.",
          vi: "Kiểm tra tiến trình cửa sổ đang mở để các phần mềm đặc thù hoặc danh sách loại trừ giữ nguyên tín hiệu gốc.",
        },
        metricOrTag: "Process Match",
      },
      {
        id: "easing-core",
        code: "S3",
        label: { en: "Custom Rust Physics", vi: "Thuật toán nội suy Rust" },
        detail: {
          en: "Accumulates wheel impulses into a continuous velocity curve for natural acceleration and smooth deceleration.",
          vi: "Tích lũy xung lực cuộn thành đường cong vận tốc liên tục, tạo cảm giác tăng tốc và dừng tự nhiên.",
        },
        metricOrTag: "Custom Curve",
      },
      {
        id: "tauri-shell",
        code: "S4",
        label: { en: "Lightweight Tauri 2 UI", vi: "Giao diện Tauri 2 gọn nhẹ" },
        detail: {
          en: "Pairs a lean Rust background core with a clean React configuration panel to keep memory usage low.",
          vi: "Kết hợp nhân Rust chạy nền nhẹ nhàng cùng bảng điều khiển React trực quan, tiết kiệm bộ nhớ hệ thống.",
        },
        metricOrTag: "Tauri 2 · React",
      },
    ],
    caseStudy: {
      context: {
        en: "Standard Windows mouse wheels scroll in coarse discrete jumps. Many existing utilities either consume excessive background RAM or lack per-application control. SmoothScroll was engineered in Rust and Tauri 2 to bring fluid, customizable scrolling to Windows while keeping system footprint minimal.",
        vi: "Con lăn chuột mặc định trên Windows thường di chuyển theo từng nấc giật cục, trong khi nhiều công cụ sẵn có chiếm nhiều bộ nhớ nền hoặc thiếu tùy chỉnh riêng cho từng phần mềm. SmoothScroll được phát triển bằng Rust và Tauri 2 nhằm mang lại chuyển động cuộn mượt tự nhiên với mức tiêu thụ tài nguyên tối giản.",
      },
      architecture: [
        {
          en: "Implemented low-level mouse input hooks in Rust to intercept scroll events efficiently with minimal latency.",
          vi: "Triển khai low-level input hook bằng Rust để bắt sự kiện cuộn chuột hiệu quả với độ trễ tối thiểu.",
        },
        {
          en: "Built a custom animation algorithm in Rust that translates discrete wheel ticks into continuous, natural scrolling across desktop applications.",
          vi: "Xây dựng thuật toán chuyển động riêng bằng Rust biến các nấc cuộn rời rạc thành chuyển động mượt xuyên suốt trên các ứng dụng Windows.",
        },
        {
          en: "Added per-application exclusion and tuning rules through a Tauri 2 + React interface, alongside ongoing GitHub issue triage and community releases.",
          vi: "Bổ sung cơ chế loại trừ và cấu hình riêng cho từng ứng dụng qua giao diện Tauri 2 + React, duy trì hỗ trợ cộng đồng mã nguồn mở trên GitHub.",
        },
      ],
      craftNotes: {
        en: "Actively maintained with {downloads} GitHub release downloads and continuous community issue triage.",
        vi: "Duy trì phát hành đều đặn với {downloads} lượt tải trên GitHub Releases và tiếp nhận phản hồi trực tiếp từ cộng đồng.",
      },
    },
  },
  {
    slug: "property-management",
    figureCode: "FIG. II",
    title: "Property Management Platform",
    category: "work",
    period: { en: "Feb 2025–Apr 2026", vi: "02/2025–04/2026" },
    role: { en: "PHP Developer · C3TEK", vi: "Lập trình viên PHP · C3TEK" },
    summary: {
      en: "Production Laravel 12 backend for rental owners and property managers covering contract lifecycles, queued billing & tiered utility jobs, 4-tier RBAC, and Redis-backed query optimization.",
      vi: "Hệ thống backend Laravel 12 phục vụ chủ nhà và đơn vị vận hành bất động sản: quản lý vòng đời hợp đồng, xử lý hóa đơn & điện nước lũy tiến qua hàng đợi, phân quyền 4 cấp và tối ưu MySQL/Redis.",
    },
    technologies: ["Laravel 12", "PHP 8+", "MySQL", "Redis", "Queues", "RBAC", "PDF Export"],
    sourceStatus: {
      en: "Proprietary enterprise codebase at C3TEK (no public repository)",
      vi: "Hệ thống nội bộ doanh nghiệp tại C3TEK (không công khai mã nguồn)",
    },
    architectureTitle: {
      en: "Contract Lifecycle, Queued Billing & 4-Tier Access",
      vi: "Vòng đời hợp đồng, hàng đợi hóa đơn & phân quyền 4 tầng",
    },
    architectureNodes: [
      {
        id: "rbac-gate",
        code: "R1",
        label: { en: "4-Tier RBAC Boundary", vi: "Phân quyền RBAC 4 vai trò" },
        detail: {
          en: "Enforces strict data scoping across Owner, Admin, Manager, and Sales roles on every REST endpoint.",
          vi: "Kiểm soát phạm vi truy cập dữ liệu chặt chẽ giữa 4 vai trò Owner, Admin, Manager và Sales trên từng REST API.",
        },
        metricOrTag: "4 Roles · Policy",
      },
      {
        id: "contract-api",
        code: "R2",
        label: { en: "Contract & Booking Core", vi: "Nghiệp vụ hợp đồng & đặt phòng" },
        detail: {
          en: "Manages room booking, lease states, renewals, and payment tracking built collaboratively in a 6-person agile team.",
          vi: "Quản lý đặt phòng trực tuyến, trạng thái hợp đồng thuê, gia hạn và đối soát thanh toán trong nhóm Agile 6 thành viên.",
        },
        metricOrTag: "Laravel 12 · PHP 8+",
      },
      {
        id: "queue-billing",
        code: "R3",
        label: { en: "Queued Utility & Invoices", vi: "Queue hóa đơn & điện nước bậc thang" },
        detail: {
          en: "Offloads monthly invoice generation, tiered utility math, and automated PDF statements to asynchronous Laravel Queues.",
          vi: "Đưa tác vụ tính phí tiện ích theo bậc thang, lập hóa đơn hàng tháng và xuất PDF sang Laravel Queues chạy bất đồng bộ.",
        },
        metricOrTag: "Async Workers",
      },
      {
        id: "data-tuning",
        code: "R4",
        label: { en: "MySQL Index & Redis Layer", vi: "Tối ưu MySQL & bộ đệm Redis" },
        detail: {
          en: "Eliminates N+1 bottlenecks via Eloquent eager loading, composite indexes, and Redis caching for hot contract reads.",
          vi: "Xử lý triệt để truy vấn N+1 bằng eager loading, composite index trên MySQL và lưu đệm dữ liệu hợp đồng trên Redis.",
        },
        metricOrTag: "MySQL · Redis",
      },
    ],
    caseStudy: {
      context: {
        en: "Property managers and rental owners needed a dependable platform to coordinate online room bookings, multi-stage lease contracts, monthly tiered utility billing, and role-restricted financial statements without API timeouts during billing cycles.",
        vi: "Đơn vị quản lý và chủ nhà cần một nền tảng ổn định để vận hành đặt phòng, quản lý hợp đồng thuê nhiều giai đoạn, tính hóa đơn điện nước theo bậc thang hàng tháng và xuất chứng từ theo đúng phân quyền mà không gây nghẽn luồng API chính.",
      },
      architecture: [
        {
          en: "Designed RESTful APIs and core domain logic in Laravel 12 and PHP 8+ for end-to-end contract lifecycle management and payment tracking.",
          vi: "Thiết kế RESTful API và logic nghiệp vụ cốt lõi bằng Laravel 12 và PHP 8+ cho quản lý vòng đời hợp đồng và theo dõi thanh toán.",
        },
        {
          en: "Moved monthly invoice batches and tiered utility calculations onto asynchronous Laravel Queues, and integrated automated PDF generation for contracts and billing statements.",
          vi: "Chuyển toàn bộ việc lập hóa đơn định kỳ và tính giá tiện ích lũy tiến sang Laravel Queues bất đồng bộ, tích hợp xuất PDF tự động cho hợp đồng và bảng kê.",
        },
        {
          en: "Resolved N+1 query bottlenecks with Eloquent eager loading, MySQL composite indexes, and Redis caching while enforcing 4-tier RBAC across Owner, Admin, Manager, and Sales.",
          vi: "Khắc phục bài toán N+1 query bằng eager loading, composite index và Redis cache; đồng thời áp dụng phân quyền RBAC 4 tầng (Owner, Admin, Manager, Sales).",
        },
      ],
      craftNotes: {
        en: "Developed in District 10, Ho Chi Minh City at C3TEK within a 6-member cross-functional agile team.",
        vi: "Phát triển tại C3TEK (Quận 10, TP. Hồ Chí Minh) trong đội ngũ Agile liên chức năng gồm 6 thành viên.",
      },
    },
  },
  {
    slug: "medical-booking",
    figureCode: "FIG. III",
    title: "Medical Appointment Booking",
    category: "thesis",
    period: { en: "2025", vi: "2025" },
    role: { en: "Backend Developer · Graduation Thesis", vi: "Lập trình viên Backend · Đồ án tốt nghiệp" },
    summary: {
      en: "Full-stack healthcare scheduling platform featuring Spring Boot REST APIs, JWT authentication, patient record & specialty management, and VNPay online payment verification.",
      vi: "Hệ thống đặt lịch khám bệnh trực tuyến xây dựng với Spring Boot và React: quản lý hồ sơ bệnh nhân, danh mục chuyên khoa, lịch hẹn xác thực JWT và thanh toán VNPay.",
    },
    technologies: ["Spring Boot", "React", "MySQL", "VNPay", "JWT", "REST APIs"],
    href: "https://github.com/quangtruong2003/luanvan-fullstack",
    sourceStatus: {
      en: "Public full-stack thesis repository on GitHub",
      vi: "Kho mã nguồn đồ án full-stack công khai trên GitHub",
    },
    architectureTitle: {
      en: "Appointment Scheduling & VNPay Settlement Flow",
      vi: "Luồng đặt lịch khám & đối soát thanh toán VNPay",
    },
    architectureNodes: [
      {
        id: "jwt-auth",
        code: "M1",
        label: { en: "JWT Identity & Records", vi: "Xác thực JWT & hồ sơ bệnh nhân" },
        detail: {
          en: "Secures patient profiles, medical service catalogs, and practitioner schedules behind stateless JWT guards.",
          vi: "Bảo vệ hồ sơ bệnh nhân, danh mục dịch vụ khám và lịch bác sĩ thông qua cơ chế xác thực JWT.",
        },
        metricOrTag: "Spring Security · JWT",
      },
      {
        id: "slot-booking",
        code: "M2",
        label: { en: "Slot Reservation Engine", vi: "Điều phối khung giờ hẹn" },
        detail: {
          en: "Validates practitioner availability and structures relational MySQL schemas for conflict-free booking slots.",
          vi: "Kiểm tra lịch trống theo chuyên khoa và tổ chức quan hệ dữ liệu MySQL nhằm tránh trùng lặp khung giờ khám.",
        },
        metricOrTag: "Spring Boot · MySQL",
      },
      {
        id: "vnpay-bridge",
        code: "M3",
        label: { en: "VNPay Payment Callback", vi: "Tích hợp cổng VNPay" },
        detail: {
          en: "Generates signed checkout URLs and verifies return checksums before committing paid appointment status.",
          vi: "Khởi tạo phiên thanh toán có chữ ký số và kiểm tra chữ ký phản hồi từ VNPay trước khi chốt trạng thái lịch khám.",
        },
        metricOrTag: "VNPay Checksum",
      },
      {
        id: "react-portal",
        code: "M4",
        label: { en: "Patient & Clinic UI", vi: "Cổng giao diện bệnh nhân" },
        detail: {
          en: "Connects a React web client to structured REST endpoints for browsing specialties, booking, and reviewing history.",
          vi: "Kết nối giao diện React với hệ thống REST API giúp tra cứu dịch vụ, đặt lịch và theo dõi lịch sử khám.",
        },
        metricOrTag: "React Client",
      },
    ],
    caseStudy: {
      context: {
        en: "Built as an Information Technology graduation project at SaiGon Technology University, addressing fragmented clinic booking workflows where patients lacked clear schedule visibility and online payment confirmation.",
        vi: "Thực hiện trong khuôn khổ đồ án tốt nghiệp ngành Công nghệ Thông tin tại Đại học Công nghệ Sài Gòn, giải quyết bài toán đặt lịch khám thủ công thiếu trực quan về khung giờ trống và xác nhận phí khám trực tuyến.",
      },
      architecture: [
        {
          en: "Architected relational MySQL schemas and Spring Boot RESTful APIs covering patient records, medical services, and appointment lifecycles.",
          vi: "Thiết kế cơ sở dữ liệu quan hệ MySQL và hệ thống RESTful API trên Spring Boot cho hồ sơ bệnh nhân, dịch vụ y tế và trạng thái cuộc hẹn.",
        },
        {
          en: "Implemented stateless JWT authentication and role checks separating patient actions from clinic administration.",
          vi: "Triển khai xác thực JWT tách biệt rõ quyền thao tác của bệnh nhân và quản trị viên phòng khám.",
        },
        {
          en: "Integrated VNPay payment flows with callback verification to keep appointment payment states consistent.",
          vi: "Tích hợp quy trình thanh toán qua VNPay kèm bước kiểm tra callback đảm bảo tính nhất quán cho giao dịch đặt khám.",
        },
      ],
      craftNotes: {
        en: "Demonstrates cross-stack backend adaptability across Java/Spring Boot alongside core PHP/Laravel specialization.",
        vi: "Thể hiện khả năng nắm bắt kiến trúc backend đa nền tảng (Java/Spring Boot song song với thế mạnh cốt lõi PHP/Laravel).",
      },
    },
  },
  {
    slug: "chatbot",
    figureCode: "FIG. IV",
    title: "ChatBot",
    category: "personal",
    period: { en: "2024–2025", vi: "2024–2025" },
    role: { en: "Android Developer · Personal Project", vi: "Phát triển Android · Dự án cá nhân" },
    summary: {
      en: "Native Android conversational AI client written in Kotlin with Firebase authentication, real-time cloud synchronization, and persistent multi-session chat history.",
      vi: "Ứng dụng hội thoại AI gốc trên Android viết bằng Kotlin, tích hợp Firebase đồng bộ thời gian thực và lưu trữ lịch sử trò chuyện trên đám mây.",
    },
    technologies: ["Kotlin", "Android SDK", "Firebase", "Cloud Sync"],
    href: "https://github.com/quangtruong2003/ChatBot",
    sourceStatus: {
      en: "Public Android Kotlin repository on GitHub",
      vi: "Kho mã nguồn Kotlin Android công khai trên GitHub",
    },
    architectureTitle: {
      en: "Native Android Stream & Firebase Cloud Persistence",
      vi: "Luồng hội thoại Android gốc & đồng bộ đám mây Firebase",
    },
    architectureNodes: [
      {
        id: "kotlin-ui",
        code: "C1",
        label: { en: "Kotlin Native Thread UI", vi: "Giao diện hội thoại Kotlin" },
        detail: {
          en: "Renders responsive message streams, prompt composer states, and session switching natively on Android SDK.",
          vi: "Hiển thị luồng tin nhắn mượt mà, trạng thái nhập liệu và chuyển đổi phiên trò chuyện trực tiếp trên Android SDK.",
        },
        metricOrTag: "Kotlin · Android",
      },
      {
        id: "ai-exchange",
        code: "C2",
        label: { en: "Conversational Request Pipe", vi: "Điều phối truy vấn AI" },
        detail: {
          en: "Dispatches structured user prompts and handles asynchronous response states and network retries cleanly.",
          vi: "Gửi truy vấn hội thoại có cấu trúc, quản lý trạng thái chờ phản hồi bất đồng bộ và xử lý lỗi kết nối.",
        },
        metricOrTag: "Async Dispatch",
      },
      {
        id: "firebase-sync",
        code: "C3",
        label: { en: "Real-Time Firebase Sync", vi: "Đồng bộ thời gian thực Firebase" },
        detail: {
          en: "Persists message turns to Firebase in real time so conversation threads remain intact across app restarts.",
          vi: "Đồng bộ từng lượt hội thoại lên Firebase theo thời gian thực, bảo toàn mạch trò chuyện khi mở lại ứng dụng.",
        },
        metricOrTag: "Firebase Realtime",
      },
      {
        id: "session-archive",
        code: "C4",
        label: { en: "Cloud History Index", vi: "Lưu trữ lịch sử đa phiên" },
        detail: {
          en: "Organizes past threads per authenticated user for instant retrieval and continuation.",
          vi: "Phân loại các cuộc trò chuyện cũ theo tài khoản người dùng để tra cứu và tiếp tục mạch hội thoại nhanh chóng.",
        },
        metricOrTag: "Cloud History",
      },
    ],
    caseStudy: {
      context: {
        en: "Created to explore native mobile client architecture in Kotlin and seamless cloud-backed state persistence for AI-assisted conversations on Android devices.",
        vi: "Xây dựng nhằm nghiên cứu sâu kiến trúc ứng dụng di động native bằng Kotlin kết hợp đồng bộ trạng thái đám mây cho trải nghiệm hội thoại AI trên thiết bị Android.",
      },
      architecture: [
        {
          en: "Built the native Android interface and conversation state management in Kotlin using Android SDK components.",
          vi: "Xây dựng giao diện Android gốc và quản lý vòng đời trạng thái hội thoại bằng Kotlin và Android SDK.",
        },
        {
          en: "Integrated Firebase for user session persistence and real-time cloud synchronization of chat histories.",
          vi: "Tích hợp Firebase để quản lý phiên người dùng và đồng bộ hóa lịch sử trò chuyện theo thời gian thực trên cloud.",
        },
      ],
      craftNotes: {
        en: "Open-sourced on GitHub with clean Kotlin project organization.",
        vi: "Mã nguồn mở hoàn toàn trên GitHub với cấu trúc dự án Kotlin rõ ràng, dễ đọc.",
      },
    },
  },
];

export const CAPABILITIES: CapabilityGroup[] = [
  {
    id: "backend-workflows",
    plateCode: "PLATE A",
    title: { en: "Backend workflows", vi: "Nghiệp vụ backend" },
    summary: {
      en: "Maintainable RESTful APIs, contract lifecycles, asynchronous queue workers, and multi-role access boundaries built with SOLID principles.",
      vi: "Thiết kế RESTful API dễ bảo trì, vòng đời hợp đồng, xử lý hàng đợi bất đồng bộ và phân quyền nhiều tầng theo nguyên lý SOLID.",
    },
    architectureFocus: {
      en: "Request validation → Domain services → Queued jobs → 4-tier RBAC",
      vi: "Xác thực đầu vào → Tầng nghiệp vụ → Hàng đợi nền → Phân quyền RBAC",
    },
    technologies: [
      "PHP 8+",
      "Laravel 12",
      "Filament",
      "Spring Boot",
      "RESTful APIs",
      "Queues",
      "RBAC",
      "OOP & SOLID",
    ],
  },
  {
    id: "data-performance",
    plateCode: "PLATE B",
    title: { en: "Data performance", vi: "Hiệu năng dữ liệu" },
    summary: {
      en: "Relational schema design, N+1 elimination via eager loading, composite indexing, and Redis caching for responsive high-volume workflows.",
      vi: "Thiết kế lược đồ quan hệ, triệt tiêu N+1 bằng eager loading, đánh composite index và tối ưu bộ đệm Redis cho luồng dữ liệu lớn.",
    },
    architectureFocus: {
      en: "Schema normalization → Composite indexes → Eager loading → Redis cache",
      vi: "Chuẩn hóa bảng → Composite index → Eager loading → Đệm Redis",
    },
    technologies: [
      "MySQL",
      "Redis",
      "Eloquent ORM",
      "Schema Design",
      "Query Optimization",
      "Python",
    ],
  },
  {
    id: "product-integrations",
    plateCode: "PLATE C",
    title: { en: "Product integrations & native tools", vi: "Tích hợp sản phẩm & công cụ hệ thống" },
    summary: {
      en: "Connecting backends to WordPress inventory pipelines, VNPay payment gateways, PDF generators, React interfaces, and Rust/Tauri Windows utilities.",
      vi: "Kết nối backend với đồng bộ kho WordPress, cổng thanh toán VNPay, xuất chứng từ PDF, giao diện React và tiện ích Windows bằng Rust/Tauri.",
    },
    architectureFocus: {
      en: "External webhooks & sync → Payment verification → Native desktop & mobile clients",
      vi: "Đồng bộ đa nền tảng → Đối soát thanh toán → Ứng dụng Desktop & Android",
    },
    technologies: [
      "TypeScript",
      "React",
      "WordPress",
      "VNPay",
      "Rust",
      "Tauri 2",
      "Kotlin",
      "Firebase",
      "Git & GitLab",
    ],
  },
];

export const EXPERIENCES: ExperienceEntry[] = [
  {
    id: "penalty",
    ledgerCode: "ROLE 01",
    company: "Penalty Co., Ltd.",
    location: { en: "District 10, Ho Chi Minh City", vi: "Quận 10, TP. Hồ Chí Minh" },
    role: { en: "Full Stack Developer", vi: "Lập trình viên Full Stack" },
    period: { en: "Apr–Sep 2026", vi: "04/2026–09/2026" },
    summary: {
      en: "Maintained, refactored, and modernized internal PHP/Laravel web applications with a focus on administrative efficiency and data import reliability.",
      vi: "Bảo trì, tái cấu trúc và nâng cấp hệ thống web PHP/Laravel nội bộ, tối ưu hiệu suất vận hành quản trị và độ ổn định khi nhập dữ liệu lớn.",
    },
    contributions: [
      {
        en: "Architected an automated bulk product upload system integrating custom Laravel backend logic with WordPress platforms for seamless inventory synchronization.",
        vi: "Thiết kế và phát triển hệ thống tải sản phẩm hàng loạt tự động, tích hợp logic backend Laravel với nền tảng WordPress giúp đồng bộ tồn kho xuyên suốt.",
      },
      {
        en: "Redesigned and modernized administrative UI/UX workflows while refactoring legacy PHP/Laravel modules for long-term maintainability.",
        vi: "Cải tiến giao diện và luồng thao tác quản trị (UI/UX), đồng thời tái cấu trúc các phân hệ PHP/Laravel giúp mã nguồn sạch và dễ bảo trì hơn.",
      },
      {
        en: "Optimized database queries and backend batch processing to handle large-scale catalog imports smoothly without degrading server response.",
        vi: "Tối ưu truy vấn cơ sở dữ liệu và tiến trình xử lý hàng loạt ở backend để vận hành mượt các đợt nhập dữ liệu quy mô lớn.",
      },
    ],
    technologies: ["PHP 8+", "Laravel", "WordPress", "MySQL", "REST APIs"],
  },
  {
    id: "c3tek",
    ledgerCode: "ROLE 02",
    company: "C3TEK Digital Marketing Solutions",
    location: { en: "District 10, Ho Chi Minh City", vi: "Quận 10, TP. Hồ Chí Minh" },
    role: { en: "PHP Developer", vi: "Lập trình viên PHP" },
    period: { en: "Feb 2025–Apr 2026", vi: "02/2025–04/2026" },
    summary: {
      en: "Engineered core backend workflows for a multi-role Property Management Application serving rental owners and operations managers.",
      vi: "Phát triển kiến trúc backend cốt lõi cho nền tảng Quản lý Bất động sản phục vụ chủ nhà và đội ngũ vận hành cho thuê.",
    },
    contributions: [
      {
        en: "Designed RESTful APIs and business logic in Laravel 12 and PHP 8+ for contract lifecycle management, room booking, and payment tracking in a 6-person agile team.",
        vi: "Xây dựng RESTful API và nghiệp vụ cốt lõi bằng Laravel 12, PHP 8+ cho quản lý hợp đồng, đặt phòng trực tuyến và theo dõi thanh toán trong nhóm Agile 6 người.",
      },
      {
        en: "Built asynchronous Laravel Queue workers for monthly invoice generation, tiered utility calculations, and automated PDF statement exports.",
        vi: "Xây dựng hệ thống hàng đợi bất đồng bộ (Laravel Queues) xử lý lập hóa đơn hàng tháng, tính điện nước lũy tiến và xuất file PDF tự động.",
      },
      {
        en: "Eliminated N+1 queries using Eloquent eager loading, composite MySQL indexes, and Redis caching; implemented 4-tier RBAC across Owner, Admin, Manager, and Sales.",
        vi: "Giải quyết triệt để lỗi N+1 query bằng eager loading, composite index và Redis cache; triển khai phân quyền RBAC 4 cấp (Owner, Admin, Manager, Sales).",
      },
    ],
    technologies: ["Laravel 12", "PHP 8+", "MySQL", "Redis", "Queues", "RBAC", "PDF"],
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return PROJECTS.find((item) => item.slug === slug);
}
