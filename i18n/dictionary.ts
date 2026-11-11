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
  };
  hero: {
    role: string;
    location: string;
    headlineStart: string;
    headlineAccent: string;
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
    education: string;
  };
  skills: {
    title: string;
    subtitle: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    subtitle: string;
    work: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    processLabel: string;
    seeMore: string;
    viewSource: string;
    viewWebsite: string;
    category: {
      work: string;
      thesis: string;
      personal: string;
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
    viewAll: string;
    retry: string;
  };
  contact: {
    eyebrow: string;
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
    mailFallback: string;
    sendError: string;
    orFind: string;
  };
  footer: {
    tagline: string;
    navigate: string;
    copyright: string;
    backToTop: string;
  };
}

export const vi: Dictionary = {
  nav: {
    skip: "Bỏ qua đến nội dung",
    openMenu: "Mở menu điều hướng",
    closeMenu: "Đóng menu điều hướng",
    work: "Dự án",
    about: "Giới thiệu",
    capabilities: "Năng lực",
    experience: "Kinh nghiệm",
    openSource: "Mã nguồn mở",
    contact: "Liên hệ",
  },
  hero: {
    role: "Kỹ sư PHP",
    location: "TP. Hồ Chí Minh, Việt Nam",
    headlineStart: "Backend PHP.",
    headlineAccent: "Tiện ích Windows.",
    bio: "Tôi xây dựng API Laravel dễ bảo trì, tối ưu quy trình dữ liệu và phát triển tiện ích Windows bằng Rust.",
    viewProjects: "Xem dự án tiêu biểu",
    viewCV: "Xem CV",
    proofLabel: "Dự án mã nguồn mở",
    proofCaption: "lượt tải",
    viewProject: "Xem dự án",
  },
  about: {
    title: "Tư duy sản phẩm, nền tảng backend.",
    subtitle: "Tôi quan tâm đến API đáng tin cậy, luồng dữ liệu và công cụ giải quyết việc cụ thể.",
    bio1: "Công việc của tôi xoay quanh PHP 8+, Laravel, REST API, MySQL và Redis. Tôi tập trung vào những phần ít thấy nhưng quyết định độ tin cậy: tác vụ nền, phân quyền và hiệu năng dữ liệu.",
    bio2: "Tại Penalty, tôi bảo trì ứng dụng PHP/Laravel và xây dựng hệ thống tải sản phẩm hàng loạt tích hợp WordPress. Trước đó tại C3TEK, tôi phát triển quy trình hợp đồng, xử lý hóa đơn qua Laravel Queues, và tối ưu MySQL bằng eager loading, composite index và Redis. SmoothScroll, tiện ích cuộn chuột Windows mã nguồn mở do tôi phát triển, đã vượt 30.000 lượt tải.",
    education: "Công nghệ Thông tin · Đại học Công nghệ Sài Gòn · 2021–2025",
  },
  skills: {
    title: "Năng lực kỹ thuật",
    subtitle: "Từ API và dữ liệu đến tích hợp sản phẩm và phần mềm desktop.",
  },
  experience: {
    eyebrow: "Vai trò đã đảm nhiệm",
    title: "Kinh nghiệm làm việc",
    subtitle: "Hai vai trò tập trung vào ứng dụng PHP và quy trình dữ liệu.",
    work: "Công việc",
  },
  projects: {
    eyebrow: "Dự án",
    title: "Sản phẩm và hệ thống backend",
    subtitle: "Tiện ích Windows, nền tảng quản lý bất động sản, hệ thống đặt lịch khám và ứng dụng Android.",
    processLabel: "Luồng xử lý cuộn",
    seeMore: "Xem thêm hoạt động mã nguồn mở",
    viewSource: "Xem mã nguồn",
    viewWebsite: "Mở website",
    category: {
      work: "Công việc",
      thesis: "Đồ án",
      personal: "Cá nhân",
    },
  },
  openSource: {
    title: "Mã nguồn mở",
    subtitle: "Một số dự án được chọn từ GitHub.",
    loading: "Đang tải repository…",
    error: "Chưa thể tải repository. Bạn vẫn có thể xem trực tiếp trên GitHub.",
    empty: "Hiện chưa có repository công khai để hiển thị.",
    stars: "sao",
    forks: "fork",
    viewAll: "Xem GitHub",
    retry: "Thử tải lại",
  },
  contact: {
    eyebrow: "Liên hệ",
    title: "Bạn đang cần cải thiện một hệ thống?",
    subtitle: "Trao đổi về backend, một vai trò mới hoặc một công cụ hữu ích.",
    email: "Email",
    phone: "Điện thoại",
    linkedin: "LinkedIn",
    github: "GitHub",
    location: "Địa điểm",
    sendMessage: "Gửi tin nhắn",
    nameLabel: "Tên",
    emailLabel: "Email",
    messageLabel: "Nội dung",
    namePlaceholder: "Tên của bạn",
    emailPlaceholder: "email@cuaban.com",
    messagePlaceholder: "Bạn muốn trao đổi về điều gì?",
    sending: "Đang gửi…",
    sent: "Đã gửi tin nhắn",
    sentMessage: "Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi sớm nhất có thể.",
    mailFallback: "Ứng dụng email của bạn sẽ mở cùng nội dung đã soạn. Nếu không, hãy gửi email trực tiếp đến địa chỉ bên cạnh.",
    sendError: "Gửi chưa thành công. Vui lòng thử lại hoặc liên hệ trực tiếp qua email.",
    orFind: "Hoặc kết nối qua",
  },
  footer: {
    tagline: "Kỹ sư PHP xây dựng backend Laravel, API và quy trình dữ liệu tại TP. Hồ Chí Minh.",
    navigate: "Điều hướng",
    copyright: "© 2026 Nguyễn Quang Trường",
    backToTop: "Lên đầu trang",
  },
};

export const en: Dictionary = {
  nav: {
    skip: "Skip to content",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    work: "Work",
    about: "About",
    capabilities: "Capabilities",
    experience: "Experience",
    openSource: "Open source",
    contact: "Contact",
  },
  hero: {
    role: "PHP Engineer",
    location: "Ho Chi Minh City, Vietnam",
    headlineStart: "PHP backends.",
    headlineAccent: "Windows tools.",
    bio: "I build maintainable Laravel APIs, optimize data workflows, and develop Windows utilities in Rust.",
    viewProjects: "Explore selected work",
    viewCV: "View CV",
    proofLabel: "Open-source project",
    proofCaption: "downloads",
    viewProject: "View project",
  },
  about: {
    title: "Product thinking, backend foundations.",
    subtitle: "I care about reliable APIs, data workflows, and tools that solve a specific job.",
    bio1: "My work centers on PHP 8+, Laravel, REST APIs, MySQL, and Redis. I focus on the parts users rarely see but rely on: background jobs, access boundaries, and data performance.",
    bio2: "At Penalty, I maintained PHP/Laravel applications and built a bulk product upload system integrated with WordPress. Before that, at C3TEK, I developed contract workflows, queued invoice processing, and optimized MySQL with eager loading, composite indexes, and Redis. SmoothScroll, my open-source Windows scrolling utility, has passed 30,000 downloads.",
    education: "Information Technology · SaiGon Technology University · 2021–2025",
  },
  skills: {
    title: "Technical capabilities",
    subtitle: "From APIs and data to product integrations and desktop software.",
  },
  experience: {
    eyebrow: "Selected roles",
    title: "Work experience",
    subtitle: "Two roles focused on PHP applications and data-heavy workflows.",
    work: "Work",
  },
  projects: {
    eyebrow: "Projects",
    title: "Products and backend systems",
    subtitle: "A Windows utility, a property platform, a healthcare booking system, and an Android app.",
    processLabel: "Scroll pipeline",
    seeMore: "Explore more open-source work",
    viewSource: "View source",
    viewWebsite: "Visit website",
    category: {
      work: "Work",
      thesis: "Thesis",
      personal: "Personal",
    },
  },
  openSource: {
    title: "Open source",
    subtitle: "A selected set of projects from GitHub.",
    loading: "Loading repositories…",
    error: "Repositories are unavailable right now. You can still visit GitHub directly.",
    empty: "There are no public repositories to show yet.",
    stars: "stars",
    forks: "forks",
    viewAll: "View GitHub",
    retry: "Try again",
  },
  contact: {
    eyebrow: "Contact",
    title: "Working on a system that needs improving?",
    subtitle: "Reach out about backend work, a role, or a useful tool idea.",
    email: "Email",
    phone: "Phone",
    linkedin: "LinkedIn",
    github: "GitHub",
    location: "Location",
    sendMessage: "Send message",
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "What would you like to discuss?",
    sending: "Sending…",
    sent: "Message sent",
    sentMessage: "Thank you for reaching out. I’ll reply as soon as I can.",
    mailFallback: "Your email app should open with the message drafted. If it does not, email me directly at the address shown beside the form.",
    sendError: "Your message could not be sent. Please try again or contact me by email.",
    orFind: "Or connect on",
  },
  footer: {
    tagline: "PHP engineer building Laravel backends, APIs, and data workflows in Ho Chi Minh City.",
    navigate: "Navigate",
    copyright: "© 2026 Nguyen Quang Truong",
    backToTop: "Back to top",
  },
};
