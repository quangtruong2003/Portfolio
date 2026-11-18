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
    homeAtelier: string;
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
    stageLabel: string;
    overviewLabel: string;
    explodeStrata: string;
    assembleStrata: string;
    pulseRotor: string;
    strataHint: string;
    layers: [string, string, string];
  };
  about: {
    title: string;
    subtitle: string;
    bio1: string;
    bio2: string;
    educationLabel: string;
    educationSchool: string;
    educationMeta: string;
    pressNote: string;
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
    work: string;
    contributionsLabel: string;
  };
  projects: {
    title: string;
    subtitle: string;
    scrollHint: string;
    openDossier: string;
    viewSource: string;
    viewWebsite: string;
    seeMore: string;
    interactiveNodeHint: string;
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
      caption: string;
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
  cursor: {
    open: string;
    inspect: string;
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
    homeAtelier: "Trang chính",
  },
  hero: {
    role: "Kỹ sư PHP & Hệ thống",
    location: "TP. Hồ Chí Minh, Việt Nam",
    headline: "Backend PHP.\nTiện ích Windows.",
    bio: "Tôi xây dựng RESTful API Laravel 12 dễ bảo trì, tối ưu hiệu năng MySQL/Redis cho nghiệp vụ dữ liệu lớn và chế tác phần mềm desktop Windows bằng Rust.",
    viewProjects: "Khám phá hồ sơ dự án",
    viewCV: "Xem & tải CV",
    proofLabel: "Sản phẩm mã nguồn mở",
    proofCaption: "lượt tải GitHub Releases",
    viewProject: "Mở hồ sơ SmoothScroll",
    stageLabel: "Tác phẩm Động học Tương tác · 4 Chương Kỹ thuật",
    overviewLabel: "Tự động chuyển chương",
    explodeStrata: "Tự chuyển chương",
    assembleStrata: "Đang tự chuyển",
    pulseRotor: "Tạo sóng xung lực",
    strataHint: "Rê chuột uốn dải lụa, lăn con lăn tạo xung hoặc chọn từng chương dự án",
    layers: [
      "I · SmoothScroll",
      "II · Laravel 12",
      "III · MySQL/Redis",
    ],
  },
  about: {
    title: "Tư duy sản phẩm trên nền tảng backend vững chắc.",
    subtitle: "Tôi tập trung vào những tầng ít phô trương nhưng quyết định độ tin cậy của toàn hệ thống.",
    bio1: "Công việc hằng ngày của tôi xoay quanh PHP 8+, Laravel 12, RESTful API, MySQL và Redis. Tôi ưu tiên cấu trúc mã tuân thủ SOLID, ranh giới phân quyền rõ ràng, xử lý hàng đợi bất đồng bộ để giữ phản hồi nhanh và ổn định.",
    bio2: "Tại Penalty, tôi bảo trì hệ thống PHP/Laravel nội bộ và kiến trúc luồng tải sản phẩm hàng loạt đồng bộ trực tiếp với kho WordPress. Trước đó tại C3TEK, tôi phát triển nghiệp vụ hợp đồng, hàng đợi hóa đơn điện nước lũy tiến và tối ưu N+1 bằng eager loading, composite index cùng Redis. Ngoài giờ làm việc, tôi phát triển SmoothScroll — tiện ích Windows mã nguồn mở viết bằng Rust & Tauri 2 với {downloads} lượt tải trên GitHub Releases.",
    educationLabel: "Nền tảng học vấn",
    educationSchool: "Đại học Công nghệ Sài Gòn (STU)",
    educationMeta: "Kỹ sư Công nghệ Thông tin · Quận 8, TP.HCM · 2021–2025",
    pressNote: "Bản in kỹ thuật · HCMC",
  },
  skills: {
    title: "Ba trụ cột năng lực kỹ thuật",
    subtitle: "Từ kiến trúc API, tối ưu truy vấn dữ liệu đến tích hợp cổng thanh toán và phần mềm native.",
    focusLabel: "Chuỗi kiến trúc trọng tâm",
    stackLabel: "Công nghệ & công cụ sử dụng",
  },
  experience: {
    title: "Hồ sơ kinh nghiệm thực chiến",
    subtitle: "Hai vai trò tập trung sâu vào ứng dụng PHP/Laravel, đồng bộ dữ liệu và tối ưu truy vấn sản xuất.",
    work: "Đơn vị công tác",
    contributionsLabel: "Đóng góp kỹ thuật chính",
  },
  projects: {
    title: "Tác phẩm & hệ thống tiêu biểu",
    subtitle: "Bốn hồ sơ kỹ thuật trải dài từ tiện ích hệ thống Rust/Tauri, nền tảng bất động sản Laravel 12 đến cổng đặt lịch y tế và ứng dụng Android.",
    scrollHint: "Cuộn để lật ngang từng bản vẽ hoặc chọn trực tiếp trên thanh chỉ mục",
    openDossier: "Mở bản vẽ chi tiết",
    viewSource: "Mã nguồn GitHub",
    viewWebsite: "Trang chủ sản phẩm",
    seeMore: "Xem tiếp kho lưu trữ mã nguồn mở",
    interactiveNodeHint: "Chọn từng mắt xích để xem cơ chế xử lý",
    category: {
      work: "Thực tế doanh nghiệp",
      thesis: "Đồ án tốt nghiệp",
      personal: "Dự án cá nhân",
    },
    lab: {
      title: "Bàn thử xung cuộn trực tiếp",
      rawLabel: "Win32 gốc (bậc thang)",
      smoothLabel: "SmoothScroll (nội suy Rust)",
      triggerBurst: "Phát chuỗi xung cuộn",
      presets: {
        crisp: "Dứt khoát",
        balanced: "Cân bằng",
        silky: "Mượt sâu",
      },
      caption: "Cuộn con lăn ngay trên khung giấy này hoặc bấm nút để so sánh quỹ đạo bước nhảy thô với đường cong vận tốc mượt.",
    },
    dossier: {
      backToWork: "Quay lại danh mục dự án",
      contextHeading: "Bối cảnh & bài toán thực tế",
      architectureHeading: "Kiến trúc & quyết định kỹ thuật",
      interactiveBlueprintHeading: "Sơ đồ luồng xử lý tương tác",
      craftHeading: "Ghi chú vận hành & hoàn thiện",
      sourceStatusLabel: "Trạng thái mã nguồn",
      prevFolio: "Hồ sơ trước",
      nextFolio: "Hồ sơ tiếp theo",
    },
  },
  openSource: {
    title: "Dự án mã nguồn mở tiêu biểu",
    subtitle: "Số liệu lượt tải, phiên bản phát hành và tương tác đồng bộ trực tiếp theo thời gian thực từ GitHub.",
    loading: "Đang đồng bộ số liệu trực tiếp của SmoothScroll từ GitHub…",
    error: "Chưa thể kết nối GitHub lúc này. Bạn vẫn có thể mở trực tiếp trang dự án trên GitHub.",
    empty: "Hiện chưa có dữ liệu repository để hiển thị.",
    stars: "lượt sao",
    forks: "nhánh fork",
    downloads: "tổng lượt tải bản phát hành",
    latestRelease: "Bản phát hành mới nhất",
    flagshipLabel: "Tiện ích hệ thống chủ lực · Windows 10/11",
    telemetryHeading: "Số liệu thời gian thực (GitHub & Releases)",
    viewRepo: "Mã nguồn & README",
    viewReleases: "Tải bản cài đặt",
    viewWebsite: "Trang chủ smoothscroll.top",
    viewAll: "Mở hồ sơ GitHub",
    retry: "Thử đồng bộ lại",
    highlights: [
      "Low-level Win32 mouse-wheel hook",
      "Nội suy vận tốc mượt 120 Hz bằng Rust",
      "Cấu hình & loại trừ riêng từng ứng dụng",
      "Không thu thập dữ liệu (Zero telemetry)",
    ],
  },
  contact: {
    title: "Cần củng cố một hệ thống backend hoặc hợp tác sản phẩm mới?",
    subtitle: "Trao đổi trực tiếp về cơ hội nghề nghiệp PHP/Backend, tối ưu hiệu năng dữ liệu hoặc ý tưởng phần mềm công cụ.",
    email: "Thư điện tử",
    phone: "Điện thoại",
    linkedin: "LinkedIn",
    github: "GitHub",
    location: "Khu vực",
    sendMessage: "Gửi thư trao đổi",
    nameLabel: "Họ và tên",
    emailLabel: "Địa chỉ email",
    messageLabel: "Nội dung trao đổi",
    namePlaceholder: "Nguyễn Văn A",
    emailPlaceholder: "ten@congty.com",
    messagePlaceholder: "Chia sẻ ngắn gọn về vị trí, hệ thống hoặc dự án bạn đang quan tâm…",
    sending: "Đang chuyển thư…",
    sent: "Đã ghi nhận thư liên hệ",
    sentMessage: "Cảm ơn bạn đã gửi lời nhắn. Tôi sẽ phản hồi qua email trong thời gian sớm nhất.",
    sendAnother: "Soạn thư mới",
    mailFallback: "Trình gửi thư trên thiết bị của bạn đang được mở kèm nội dung vừa nhập. Nếu chưa mở, bạn có thể gửi trực tiếp tới địa chỉ email bên cạnh.",
    sendError: "Quá trình gửi gặp gián đoạn. Vui lòng thử lại hoặc gửi email trực tiếp.",
    orFind: "Kênh kết nối trực tiếp",
  },
  footer: {
    tagline: "Kỹ sư PHP phát triển hệ thống Laravel, REST API, tối ưu MySQL/Redis và tiện ích desktop Rust tại TP. Hồ Chí Minh.",
    navigate: "Mục lục hồ sơ",
    copyright: "© 2026 Nguyễn Quang Trường",
    backToTop: "Trở về đầu trang",
    colophon: "Chế tác trên nền giấy cắt lớp & chuyển cảnh View Transitions · Next.js 16",
  },
  cursor: {
    open: "Mở hồ sơ",
    inspect: "Tương tác",
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
    homeAtelier: "Atelier Home",
  },
  hero: {
    role: "PHP & Systems Engineer",
    location: "Ho Chi Minh City, Vietnam",
    headline: "PHP backends.\nWindows tools.",
    bio: "I architect maintainable Laravel 12 APIs, tune MySQL and Redis data pipelines, and build native Windows utilities in Rust.",
    viewProjects: "Explore project folios",
    viewCV: "Inspect & download CV",
    proofLabel: "Open-source utility",
    proofCaption: "GitHub release downloads",
    viewProject: "Open SmoothScroll dossier",
    stageLabel: "Interactive Kinetic Art · 4 Engineering Chapters",
    overviewLabel: "Auto-cycle acts",
    explodeStrata: "Auto-cycle acts",
    assembleStrata: "Auto-cycling",
    pulseRotor: "Send wave pulse",
    strataHint: "Sweep pointer through the silk field, scroll wheel, or select a chapter",
    layers: [
      "I · SmoothScroll",
      "II · Laravel 12",
      "III · MySQL/Redis",
    ],
  },
  about: {
    title: "Product thinking anchored in backend reliability.",
    subtitle: "I focus on the unseen layers that keep software fast, predictable, and maintainable under real load.",
    bio1: "My daily craft centers on PHP 8+, Laravel 12, RESTful APIs, MySQL, and Redis. I care deeply about SOLID boundaries, role-based access control, background queue workers, and query plans that stay fast as data grows.",
    bio2: "At Penalty, I maintained internal PHP/Laravel web systems and built an automated bulk product upload pipeline synchronized with WordPress inventory. Previously at C3TEK, I engineered lease contract workflows, queued monthly invoice and tiered utility jobs, and eliminated N+1 bottlenecks with eager loading, composite indexes, and Redis. Outside client systems, I maintain SmoothScroll—an open-source Rust and Tauri 2 Windows utility with {downloads} GitHub release downloads.",
    educationLabel: "Academic foundation",
    educationSchool: "SaiGon Technology University (STU)",
    educationMeta: "B.Eng. Information Technology · District 8, HCMC · 2021–2025",
    pressNote: "Architectural Press Plate · HCMC",
  },
  skills: {
    title: "Three pillars of technical capability",
    subtitle: "Spanning domain APIs, relational query performance, payment gateways, and native desktop software.",
    focusLabel: "Primary execution chain",
    stackLabel: "Verified languages & tools",
  },
  experience: {
    title: "Production work ledger",
    subtitle: "Two engineering roles centered on PHP/Laravel applications, batch synchronization, and data-intensive workflows.",
    work: "Organization",
    contributionsLabel: "Key engineering deliverables",
  },
  projects: {
    title: "Selected products & backend architectures",
    subtitle: "Four documented folios spanning a Rust/Tauri Windows utility, a Laravel 12 property platform, a Spring Boot healthcare portal, and a Kotlin Android client.",
    scrollHint: "Scroll to glide across the folio rail or jump directly via the index strip",
    openDossier: "Open full dossier",
    viewSource: "GitHub source",
    viewWebsite: "Live website",
    seeMore: "Inspect live GitHub repositories below",
    interactiveNodeHint: "Select any pipeline stage to inspect its role",
    category: {
      work: "Enterprise Work",
      thesis: "Graduation Thesis",
      personal: "Personal Craft",
    },
    lab: {
      title: "Live wheel-impulse comparator",
      rawLabel: "Raw Win32 (stepped)",
      smoothLabel: "SmoothScroll (Rust spring)",
      triggerBurst: "Fire wheel burst",
      presets: {
        crisp: "Crisp",
        balanced: "Balanced",
        silky: "Silky",
      },
      caption: "Scroll directly over this paper pad or trigger a burst to compare coarse 120-delta notches against velocity-smoothed integration.",
    },
    dossier: {
      backToWork: "Back to project folios",
      contextHeading: "Problem space & operational context",
      architectureHeading: "System architecture & key decisions",
      interactiveBlueprintHeading: "Interactive pipeline schematic",
      craftHeading: "Delivery & craft notes",
      sourceStatusLabel: "Source availability",
      prevFolio: "Previous folio",
      nextFolio: "Next folio",
    },
  },
  openSource: {
    title: "Featured GitHub repository",
    subtitle: "Live release downloads, version telemetry, and community metrics fetched directly from GitHub.",
    loading: "Syncing live SmoothScroll telemetry from GitHub…",
    error: "GitHub telemetry is temporarily unreachable. You can still inspect SmoothScroll directly on GitHub.",
    empty: "Repository telemetry is unavailable right now.",
    stars: "GitHub stars",
    forks: "forks",
    downloads: "total release downloads",
    latestRelease: "Latest published build",
    flagshipLabel: "Flagship Desktop Utility · Windows 10/11",
    telemetryHeading: "Live telemetry (GitHub & Releases)",
    viewRepo: "Repository & README",
    viewReleases: "GitHub Releases",
    viewWebsite: "Visit smoothscroll.top",
    viewAll: "Open GitHub profile",
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
    location: "Base",
    sendMessage: "Dispatch message",
    nameLabel: "Your name",
    emailLabel: "Email address",
    messageLabel: "Project or role details",
    namePlaceholder: "Jane Doe",
    emailPlaceholder: "jane@company.com",
    messagePlaceholder: "Tell me about the system, team, or role you have in mind…",
    sending: "Dispatching…",
    sent: "Correspondence recorded",
    sentMessage: "Thank you for reaching out. I’ll respond to your email as soon as possible.",
    sendAnother: "Write another note",
    mailFallback: "Your mail client is opening with your drafted message. If it didn’t open automatically, use the direct email address beside this form.",
    sendError: "Delivery failed. Please try again or reach out directly via email.",
    orFind: "Direct channels",
  },
  footer: {
    tagline: "PHP engineer building maintainable Laravel backends, data pipelines, and Rust Windows software in Ho Chi Minh City.",
    navigate: "Folio index",
    copyright: "© 2026 Nguyen Quang Truong",
    backToTop: "Return to top",
    colophon: "Set on layered cotton-rag CSS & React View Transitions · Next.js 16",
  },
  cursor: {
    open: "Open folio",
    inspect: "Interact",
  },
};
