export type Language = "vi" | "en";

export interface Dictionary {
  nav: {
    skip: string;
    openMenu: string;
    closeMenu: string;
    work: string;
    about: string;
    capabilities: string;
    experience: string;
    openSource: string;
    contact: string;
    home: string;
  };
  hero: {
    role: string;
    location: string;
    headline: string;
    bio: string;
    viewProjects: string;
    viewCV: string;
    proofLabel: string;
    proofCaption: string;
    viewProject: string;
  };
  about: {
    title: string;
    subtitle: string;
    bio1: string;
    bio2: string;
    educationSchool: string;
    educationMeta: string;
    engineLabel: string;
  };
  skills: {
    title: string;
    subtitle: string;
    focusLabel: string;
    stackLabel: string;
  };
  experience: {
    title: string;
    subtitle: string;
    contributionsLabel: string;
  };
  projects: {
    title: string;
    subtitle: string;
    openDossier: string;
    viewSource: string;
    viewWebsite: string;
    seeMore: string;
    category: {
      work: string;
      thesis: string;
      personal: string;
    };
    lab: {
      title: string;
      rawLabel: string;
      smoothLabel: string;
      triggerBurst: string;
      presets: {
        crisp: string;
        balanced: string;
        silky: string;
      };
    };
    dossier: {
      backToWork: string;
      contextHeading: string;
      architectureHeading: string;
      interactiveBlueprintHeading: string;
      craftHeading: string;
      sourceStatusLabel: string;
      prevFolio: string;
      nextFolio: string;
    };
  };
  openSource: {
    title: string;
    subtitle: string;
    loading: string;
    error: string;
    empty: string;
    stars: string;
    forks: string;
    downloads: string;
    latestRelease: string;
    flagshipLabel: string;
    telemetryHeading: string;
    viewRepo: string;
    viewReleases: string;
    viewWebsite: string;
    viewAll: string;
    retry: string;
    highlights: [string, string, string, string];
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    location: string;
    sendMessage: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sending: string;
    sent: string;
    sentMessage: string;
    sendAnother: string;
    mailFallback: string;
    sendError: string;
    orFind: string;
  };
  footer: {
    tagline: string;
    navigate: string;
    copyright: string;
    backToTop: string;
    colophon: string;
  };
}

export const vi: Dictionary = {
  nav: {
    skip: "Bỏ qua đến nội dung chính",
    openMenu: "Mở bảng điều hướng",
    closeMenu: "Đóng bảng điều hướng",
    work: "Dự án",
    about: "Giới thiệu",
    capabilities: "Năng lực",
    experience: "Kinh nghiệm",
    openSource: "Mã nguồn mở",
    contact: "Liên hệ",
    home: "Trang chính",
  },
  hero: {
    role: "Kỹ sư PHP & Hệ thống",
    location: "TP. Hồ Chí Minh, Việt Nam",
    headline: "Backend PHP.\nTiện ích Windows.",
    bio: "Tôi xây dựng RESTful API Laravel 12 dễ bảo trì, tối ưu hiệu năng MySQL/Redis cho nghiệp vụ dữ liệu lớn và phát triển phần mềm desktop Windows bằng Rust.",
    viewProjects: "Xem hồ sơ dự án",
    viewCV: "Xem & tải CV",
    proofLabel: "SmoothScroll",
    proofCaption: "lượt tải GitHub Releases",
    viewProject: "Xem chi tiết",
  },
  about: {
    title: "Tư duy sản phẩm trên nền tảng backend vững chắc.",
    subtitle: "Tôi tập trung vào những tầng ít phô trương nhưng quyết định độ tin cậy và độ mượt của toàn hệ thống.",
    bio1: "Công việc hằng ngày của tôi xoay quanh PHP 8+, Laravel 12, RESTful API, MySQL và Redis. Tôi ưu tiên cấu trúc mã tuân thủ SOLID, ranh giới phân quyền rõ ràng và hàng đợi bất đồng bộ để giữ phản hồi ổn định khi lưu lượng tăng cao.",
    bio2: "Tại Penalty, tôi bảo trì hệ thống PHP/Laravel nội bộ và kiến trúc luồng tải sản phẩm hàng loạt đồng bộ trực tiếp với kho WordPress. Trước đó tại C3TEK, tôi phát triển nghiệp vụ hợp đồng, hàng đợi hóa đơn điện nước lũy tiến và tối ưu N+1 bằng eager loading, composite index cùng Redis. Ngoài giờ làm việc, tôi xây dựng SmoothScroll — tiện ích Windows mã nguồn mở bằng Rust & Tauri 2 với {downloads} lượt tải trên GitHub Releases.",
    educationSchool: "Đại học Công nghệ Sài Gòn (STU)",
    educationMeta: "Kỹ sư Công nghệ Thông tin · Quận 8, TP.HCM · 2021–2025",
    engineLabel: "Hệ thống & Hạ tầng · TP. Hồ Chí Minh",
  },
  skills: {
    title: "Ba trụ cột năng lực kỹ thuật",
    subtitle: "Từ kiến trúc API, tối ưu truy vấn dữ liệu đến tích hợp cổng thanh toán và phần mềm native.",
    focusLabel: "Chuỗi kiến trúc trọng tâm",
    stackLabel: "Công nghệ sử dụng",
  },
  experience: {
    title: "Kinh nghiệm thực chiến",
    subtitle: "Hai vai trò tập trung sâu vào ứng dụng PHP/Laravel, đồng bộ dữ liệu và tối ưu truy vấn sản xuất.",
    contributionsLabel: "Đóng góp kỹ thuật chính",
  },
  projects: {
    title: "Sản phẩm & kiến trúc tiêu biểu",
    subtitle: "Bốn hồ sơ kỹ thuật trải dài từ tiện ích hệ thống Rust/Tauri, nền tảng bất động sản Laravel 12 đến cổng đặt lịch y tế và ứng dụng Android.",
    openDossier: "Xem hồ sơ chi tiết",
    viewSource: "Mã nguồn GitHub",
    viewWebsite: "Trang chủ sản phẩm",
    seeMore: "Xem số liệu mã nguồn mở trực tiếp",
    category: {
      work: "Thực tế doanh nghiệp",
      thesis: "Đồ án tốt nghiệp",
      personal: "Dự án cá nhân",
    },
    lab: {
      title: "Bộ đo xung cuộn 120 Hz",
      rawLabel: "Win32 gốc (bậc thang)",
      smoothLabel: "SmoothScroll (Rust)",
      triggerBurst: "Phát xung cuộn",
      presets: {
        crisp: "Dứt khoát",
        balanced: "Cân bằng",
        silky: "Mượt sâu",
      },
    },
    dossier: {
      backToWork: "Quay lại danh sách dự án",
      contextHeading: "Bối cảnh & bài toán thực tế",
      architectureHeading: "Kiến trúc & quyết định kỹ thuật",
      interactiveBlueprintHeading: "Sơ đồ luồng xử lý",
      craftHeading: "Ghi chú vận hành",
      sourceStatusLabel: "Trạng thái mã nguồn",
      prevFolio: "Dự án trước",
      nextFolio: "Dự án tiếp theo",
    },
  },
  openSource: {
    title: "Mã nguồn mở tiêu biểu",
    subtitle: "Số liệu lượt tải, phiên bản phát hành và tương tác đồng bộ trực tiếp theo thời gian thực từ GitHub.",
    loading: "Đang đồng bộ số liệu trực tiếp của SmoothScroll từ GitHub…",
    error: "Chưa thể kết nối GitHub lúc này. Bạn vẫn có thể mở trực tiếp trang dự án trên GitHub.",
    empty: "Hiện chưa có dữ liệu repository để hiển thị.",
    stars: "Lượt sao",
    forks: "Nhánh fork",
    downloads: "Tổng lượt tải bản phát hành",
    latestRelease: "Phiên bản mới nhất",
    flagshipLabel: "Tiện ích hệ thống Windows 10/11",
    telemetryHeading: "Số liệu trực tiếp từ GitHub Releases",
    viewRepo: "Mã nguồn & README",
    viewReleases: "Tải bản cài đặt",
    viewWebsite: "smoothscroll.top",
    viewAll: "Hồ sơ GitHub",
    retry: "Thử đồng bộ lại",
    highlights: [
      "Low-level Win32 mouse-wheel hook",
      "Nội suy vận tốc mượt 120 Hz bằng Rust",
      "Cấu hình & loại trừ riêng từng ứng dụng",
      "Không thu thập dữ liệu (Zero telemetry)",
    ],
  },
  contact: {
    title: "Trao đổi về hệ thống backend hoặc hợp tác sản phẩm mới.",
    subtitle: "Liên hệ trực tiếp về cơ hội PHP/Laravel Backend, tối ưu hiệu năng dữ liệu hoặc phát triển phần mềm công cụ.",
    email: "Thư điện tử",
    phone: "Điện thoại",
    linkedin: "LinkedIn",
    github: "GitHub",
    location: "Khu vực",
    sendMessage: "Gửi tin nhắn",
    nameLabel: "Họ và tên",
    emailLabel: "Địa chỉ email",
    messageLabel: "Nội dung trao đổi",
    namePlaceholder: "Nguyễn Văn A",
    emailPlaceholder: "ten@congty.com",
    messagePlaceholder: "Chia sẻ ngắn gọn về vị trí, hệ thống hoặc dự án bạn đang quan tâm…",
    sending: "Đang gửi…",
    sent: "Đã nhận tin nhắn",
    sentMessage: "Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi qua email trong thời gian sớm nhất.",
    sendAnother: "Gửi tin nhắn khác",
    mailFallback: "Trình gửi thư trên thiết bị của bạn đang được mở kèm nội dung vừa nhập. Nếu chưa mở, bạn có thể gửi trực tiếp tới địa chỉ email bên cạnh.",
    sendError: "Quá trình gửi gặp gián đoạn. Vui lòng thử lại hoặc gửi email trực tiếp.",
    orFind: "Kênh kết nối trực tiếp",
  },
  footer: {
    tagline: "Kỹ sư PHP xây dựng hệ thống Laravel, REST API, tối ưu MySQL/Redis và tiện ích desktop Rust tại TP. Hồ Chí Minh.",
    navigate: "Điều hướng",
    copyright: "© 2026 Nguyễn Quang Trường",
    backToTop: "Lên đầu trang",
    colophon: "Next.js 16 · React View Transitions · Tailwind CSS",
  },
};

export const en: Dictionary = {
  nav: {
    skip: "Skip to main content",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    work: "Work",
    about: "About",
    capabilities: "Capabilities",
    experience: "Experience",
    openSource: "Open source",
    contact: "Contact",
    home: "Home",
  },
  hero: {
    role: "PHP & Systems Engineer",
    location: "Ho Chi Minh City, Vietnam",
    headline: "PHP backends.\nWindows tools.",
    bio: "I architect maintainable Laravel 12 APIs, tune MySQL and Redis data pipelines, and build native Windows utilities in Rust.",
    viewProjects: "Explore projects",
    viewCV: "Inspect & download CV",
    proofLabel: "SmoothScroll",
    proofCaption: "GitHub release downloads",
    viewProject: "Open dossier",
  },
  about: {
    title: "Product thinking anchored in backend reliability.",
    subtitle: "I focus on the unseen layers that keep software fast, predictable, and maintainable under real load.",
    bio1: "My daily craft centers on PHP 8+, Laravel 12, RESTful APIs, MySQL, and Redis. I care deeply about SOLID boundaries, role-based access control, background queue workers, and query plans that stay fast as data grows.",
    bio2: "At Penalty, I maintained internal PHP/Laravel web systems and built an automated bulk product upload pipeline synchronized with WordPress inventory. Previously at C3TEK, I engineered lease contract workflows, queued monthly invoice and tiered utility jobs, and eliminated N+1 bottlenecks with eager loading, composite indexes, and Redis. Outside client systems, I maintain SmoothScroll—an open-source Rust and Tauri 2 Windows utility with {downloads} GitHub release downloads.",
    educationSchool: "SaiGon Technology University (STU)",
    educationMeta: "B.Eng. Information Technology · District 8, HCMC · 2021–2025",
    engineLabel: "Systems & Backend Architecture · HCMC",
  },
  skills: {
    title: "Three pillars of technical capability",
    subtitle: "Spanning domain APIs, relational query performance, payment gateways, and native desktop software.",
    focusLabel: "Primary execution chain",
    stackLabel: "Languages & tools",
  },
  experience: {
    title: "Production experience",
    subtitle: "Two engineering roles centered on PHP/Laravel applications, batch synchronization, and data-intensive workflows.",
    contributionsLabel: "Key deliverables",
  },
  projects: {
    title: "Selected products & architectures",
    subtitle: "Four engineering dossiers spanning a Rust/Tauri Windows utility, a Laravel 12 property platform, a Spring Boot healthcare portal, and a Kotlin Android client.",
    openDossier: "Open dossier",
    viewSource: "GitHub source",
    viewWebsite: "Live website",
    seeMore: "View live GitHub repository telemetry",
    category: {
      work: "Enterprise Work",
      thesis: "Graduation Thesis",
      personal: "Personal Craft",
    },
    lab: {
      title: "120 Hz Wheel Impulse Monitor",
      rawLabel: "Raw Win32 (stepped)",
      smoothLabel: "SmoothScroll (Rust)",
      triggerBurst: "Fire wheel burst",
      presets: {
        crisp: "Crisp",
        balanced: "Balanced",
        silky: "Silky",
      },
    },
    dossier: {
      backToWork: "Back to projects",
      contextHeading: "Problem space & context",
      architectureHeading: "Architecture & technical decisions",
      interactiveBlueprintHeading: "System flow diagram",
      craftHeading: "Delivery notes",
      sourceStatusLabel: "Source availability",
      prevFolio: "Previous project",
      nextFolio: "Next project",
    },
  },
  openSource: {
    title: "Featured open source",
    subtitle: "Live release downloads, version tags, and repository metrics synced directly from GitHub.",
    loading: "Syncing live SmoothScroll telemetry from GitHub…",
    error: "GitHub telemetry is temporarily unreachable. You can still inspect SmoothScroll directly on GitHub.",
    empty: "Repository telemetry is unavailable right now.",
    stars: "Stars",
    forks: "Forks",
    downloads: "Total release downloads",
    latestRelease: "Latest release",
    flagshipLabel: "Windows 10/11 Desktop Utility",
    telemetryHeading: "Live GitHub Releases telemetry",
    viewRepo: "Repository & README",
    viewReleases: "Download release",
    viewWebsite: "smoothscroll.top",
    viewAll: "GitHub profile",
    retry: "Retry sync",
    highlights: [
      "Low-level Win32 mouse-wheel hook",
      "Velocity-based 120 Hz Rust easing engine",
      "Per-app profiles & game-mode bypass",
      "Lightweight Tauri 2 shell · zero telemetry",
    ],
  },
  contact: {
    title: "Working on a backend system that needs care?",
    subtitle: "Reach out regarding PHP/Laravel engineering roles, database & queue optimization, or practical software tools.",
    email: "Email",
    phone: "Phone",
    linkedin: "LinkedIn",
    github: "GitHub",
    location: "Location",
    sendMessage: "Send message",
    nameLabel: "Your name",
    emailLabel: "Email address",
    messageLabel: "Project or role details",
    namePlaceholder: "Jane Doe",
    emailPlaceholder: "jane@company.com",
    messagePlaceholder: "Tell me about the system, team, or role you have in mind…",
    sending: "Sending…",
    sent: "Message received",
    sentMessage: "Thank you for reaching out. I’ll respond to your email as soon as possible.",
    sendAnother: "Write another message",
    mailFallback: "Your mail client is opening with your drafted message. If it didn’t open automatically, use the direct email address beside this form.",
    sendError: "Delivery failed. Please try again or reach out directly via email.",
    orFind: "Direct channels",
  },
  footer: {
    tagline: "PHP engineer building maintainable Laravel backends, data pipelines, and Rust Windows software in Ho Chi Minh City.",
    navigate: "Navigation",
    copyright: "© 2026 Nguyen Quang Truong",
    backToTop: "Back to top",
    colophon: "Next.js 16 · React View Transitions · Tailwind CSS",
  },
};
