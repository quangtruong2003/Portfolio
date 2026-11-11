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
    available: string;
  };
  hero: {
    role: string;
    location: string;
    headlineStart: string;
    headlineAccent: string;
    bio: string;
    viewProjects: string;
    viewCV: string;
    availability: string;
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
    project: string;
    thesis: string;
    viewSource: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    seeMore: string;
    viewAll: string;
    viewSource: string;
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
    available: "Sẵn sàng đón nhận cơ hội",
  },
  hero: {
    role: "Kỹ sư phần mềm",
    location: "TP. Hồ Chí Minh, Việt Nam",
    headlineStart: "Phần mềm,",
    headlineAccent: "làm thật kỹ.",
    bio: "Tập trung vào hệ thống backend, tự động hóa hữu ích và phần mềm desktop, với sự chăm chút cho từng chi tiết.",
    viewProjects: "Xem dự án tiêu biểu",
    viewCV: "Xem CV",
    availability: "Sẵn sàng đón nhận cơ hội",
  },
  about: {
    title: "Làm kỹ, làm có chủ đích.",
    subtitle: "Tôi xây dựng phần mềm hướng đến sự rõ ràng, tin cậy và hữu ích trong sử dụng hằng ngày.",
    bio1: "Tôi tốt nghiệp ngành Công nghệ Thông tin tại Đại học Công nghệ Sài Gòn (2021–2025). Công việc của tôi trải rộng từ hệ thống backend với Laravel, thiết kế API và cơ sở dữ liệu đến ứng dụng desktop viết bằng Rust.",
    bio2: "Tại C3TEK, tôi tham gia phát triển các luồng quản lý hợp đồng, hóa đơn và phân quyền cho nền tảng bất động sản. Ngoài công việc, tôi xây dựng SmoothScroll, một tiện ích desktop đa nền tảng. Trước đó, tôi thực hiện hệ thống đặt lịch khám và ứng dụng chatbot Android.",
    education: "Công nghệ Thông tin · Đại học Công nghệ Sài Gòn · 2021–2025",
  },
  skills: {
    title: "Năng lực kỹ thuật",
    subtitle: "Những lĩnh vực tôi đã làm việc qua các sản phẩm thực tế và dự án cá nhân.",
  },
  experience: {
    eyebrow: "Kinh nghiệm",
    title: "Công việc và dự án",
    subtitle: "Các vai trò và sản phẩm tôi đã tham gia xây dựng trong backend, desktop và ứng dụng di động.",
    work: "Công việc",
    project: "Dự án cá nhân",
    thesis: "Đồ án",
    viewSource: "Xem mã nguồn",
  },
  projects: {
    eyebrow: "Dự án",
    title: "Một số sản phẩm tiêu biểu",
    subtitle: "Từ nền tảng quản lý đến tiện ích desktop, mỗi dự án giải quyết một nhu cầu cụ thể.",
    seeMore: "Xem thêm hoạt động mã nguồn mở",
    viewAll: "Mở GitHub",
    viewSource: "Xem mã nguồn",
    category: {
      work: "Công việc",
      thesis: "Đồ án",
      personal: "Cá nhân",
    },
  },
  openSource: {
    title: "Mã nguồn mở",
    subtitle: "Một vài repository công khai gần đây trên GitHub.",
    loading: "Đang tải repository…",
    error: "Chưa thể tải repository. Bạn vẫn có thể xem trực tiếp trên GitHub.",
    empty: "Hiện chưa có repository công khai để hiển thị.",
    stars: "sao",
    forks: "fork",
    viewAll: "Xem GitHub",
  },
  contact: {
    eyebrow: "Liên hệ",
    title: "Cùng xây điều gì đó hữu ích.",
    subtitle: "Nếu bạn muốn trao đổi về một dự án, công việc hoặc ý tưởng, hãy gửi lời nhắn.",
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
    tagline: "Kỹ sư phần mềm làm việc với hệ thống backend và ứng dụng desktop, tại TP. Hồ Chí Minh.",
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
    available: "Open to opportunities",
  },
  hero: {
    role: "Software Engineer",
    location: "Ho Chi Minh City, Vietnam",
    headlineStart: "Software,",
    headlineAccent: "made with care.",
    bio: "Focused on backend systems, practical automation, and desktop software, with care for the details.",
    viewProjects: "Explore selected work",
    viewCV: "View CV",
    availability: "Open to opportunities",
  },
  about: {
    title: "Built with intention.",
    subtitle: "I work toward software that is clear, dependable, and useful in everyday use.",
    bio1: "I studied Information Technology at SaiGon Technology University (2021–2025). My work spans Laravel backend systems, API and database design, and desktop software built with Rust.",
    bio2: "At C3TEK, I helped build contract, billing, and access-control workflows for a property platform. Outside work, I build SmoothScroll, a cross-platform desktop utility. Earlier projects include a medical booking system and an Android chatbot.",
    education: "Information Technology · SaiGon Technology University · 2021–2025",
  },
  skills: {
    title: "Technical capabilities",
    subtitle: "Areas I have worked in across shipped products and personal projects.",
  },
  experience: {
    eyebrow: "Experience",
    title: "Work and projects",
    subtitle: "Selected roles and products across backend engineering, desktop software, and mobile applications.",
    work: "Work",
    project: "Personal project",
    thesis: "Thesis",
    viewSource: "View source",
  },
  projects: {
    eyebrow: "Projects",
    title: "Selected work",
    subtitle: "From a property platform to a desktop utility, each project addresses a specific need.",
    seeMore: "Explore more open-source work",
    viewAll: "Open GitHub",
    viewSource: "View source",
    category: {
      work: "Work",
      thesis: "Thesis",
      personal: "Personal",
    },
  },
  openSource: {
    title: "Open source",
    subtitle: "A few recent public repositories from GitHub.",
    loading: "Loading repositories…",
    error: "Repositories are unavailable right now. You can still visit GitHub directly.",
    empty: "There are no public repositories to show yet.",
    stars: "stars",
    forks: "forks",
    viewAll: "View GitHub",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let’s build something useful.",
    subtitle: "For a project, a role, or an idea you would like to discuss, send me a note.",
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
    tagline: "Software engineer working across backend systems and desktop software, based in Ho Chi Minh City.",
    navigate: "Navigate",
    copyright: "© 2026 Nguyen Quang Truong",
    backToTop: "Back to top",
  },
};
