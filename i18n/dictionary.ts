export type Language = "vi" | "en";

export interface Dictionary {
  nav: {
    about: string;
    skills: string;
    experience: string;
    projects: string;
    contact: string;
    available: string;
  };
  hero: {
    eyebrow: string;
    greeting: string;
    name: string;
    role: string;
    bio: string;
    viewProjects: string;
    downloadCV: string;
    yearsExp: string;
    projectsBuilt: string;
    technologies: string;
    scroll: string;
  };
  about: {
    eyebrow: string;
    title: string;
    subtitle: string;
    bio1: string;
    bio2: string;
    years: string;
    yearsLabel: string;
    projects: string;
    projectsLabel: string;
    tech: string;
    techLabel: string;
    languages: string;
    languagesLabel: string;
    softSkills: string;
  };
  skills: {
    eyebrow: string;
    title: string;
    subtitle: string;
    coreLabel: string;
    familiarLabel: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    subtitle: string;
    work: string;
    project: string;
  };
  exp_c3tek_loc: string;
  exp_medical_loc: string;
  exp_chatbot_loc: string;
  exp_c3tek_desc: { vi: string; en: string };
  exp_medical_desc: { vi: string; en: string };
  exp_chatbot_desc: { vi: string; en: string };
  projects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewAll: string;
    seeMore: string;
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
    orFind: string;
  };
  footer: {
    tagline: string;
    navigate: string;
    getInTouch: string;
    copyright: string;
  };
}

export const vi: Dictionary = {
  nav: {
    about: "Giới Thiệu",
    skills: "Kỹ Năng",
    experience: "Kinh Nghiệm",
    projects: "Dự Án",
    contact: "Liên Hệ",
    available: "Đang tìm cơ hội",
  },
  hero: {
    eyebrow: "Đang tìm cơ hội",
    greeting: "Xin chào,",
    name: "Nguyễn Quang Trường",
    role: "Junior PHP Developer",
    bio: "Chuyên gia backend với niềm đam mê kiến trúc hệ thống scalable, xây dựng API mạnh mẽ bằng Laravel và PHP 8+. Tôi tin rằng code sạch là nền tảng của mọi sản phẩm xuất sắc.",
    viewProjects: "Xem Dự Án",
    downloadCV: "Tải CV",
    yearsExp: "1+",
    projectsBuilt: "3+",
    technologies: "10+",
    scroll: "Cuộn xuống",
  },
  about: {
    eyebrow: "Về Tôi",
    title: "Viết Code với Mục Đích",
    subtitle: "Tôi là một lập trình viên backend với niềm đam mê xây dựng hệ thống không chỉ hoạt động tốt mà còn thanh lịch — kiến trúc mở rộng được và code mà người khác thích đọc.",
    bio1: "Đang theo học Công nghệ Thông tin tại Đại học Công nghệ Sài Gòn, tôi chuyên về phát triển backend với PHP và Laravel. Hành trình bắt đầu từ sự tò mò về cách hệ thống vận hành bên trong, và sự tò mò đó đã phát triển thành niềm đam mê thực sự với việc xây dựng kiến trúc server-side mạnh mẽ, có thể bảo trì.",
    bio2: "Tôi đã làm việc qua toàn bộ vòng đời của các ứng dụng thực tế — từ thiết kế database schema đến viết RESTful APIs, triển khai authentication, billing workflows và tự động tạo document. Dù là hệ thống đặt lịch khám với tích hợp thanh toán VNPay hay nền tảng quản lý bất động sản với nhiều role người dùng, tôi tiếp cận mỗi dự án như một tác phẩm đáng để làm đúng.",
    years: "1+",
    yearsLabel: "Năm Xây Dựng",
    projects: "3+",
    projectsLabel: "Dự Án Lớn",
    tech: "10+",
    techLabel: "Công Nghệ",
    languages: "2",
    languagesLabel: "Ngôn Ngữ",
    softSkills: "Kỹ Năng Mềm",
  },
  skills: {
    eyebrow: "Kỹ Năng Kỹ Thuật",
    title: "Những Công Cụ Tôi Sử Dụng",
    subtitle: "Một stack tập trung vào backend. Mỗi công cụ được chọn vì lý do — không chỉ để biết nó.",
    coreLabel: "Công nghệ cốt lõi",
    familiarLabel: "Đã dùng trong sản xuất",
  },
  experience: {
    eyebrow: "Kinh Nghiệm",
    title: "Nơi Tôi Đã Làm Việc & Xây Dựng",
    subtitle: "Từ enterprise Laravel backends đến các thí nghiệm Android cá nhân — mỗi dự án dạy tôi điều mới về việc xây dựng phần mềm có ý nghĩa.",
    work: "Toàn thời gian",
    project: "Dự Án Cá Nhân",
  },
  exp_c3tek_loc: "Quận 10, TP. Hồ Chí Minh",
  exp_medical_loc: "TP. Hồ Chí Minh",
  exp_chatbot_loc: "TP. Hồ Chí Minh",
  exp_c3tek_desc: {
    vi: "Vai trò full-time xây dựng và duy trì nền tảng quản lý bất động sản phục vụ quản lý và chủ nhà.",
    en: "Full-time role building and maintaining a property management platform used by property managers and rental owners.",
  },
  exp_medical_desc: {
    vi: "Nền tảng đặt lịch khám y tế full-stack với backend Spring Boot và frontend React, tích hợp thanh toán VNPay.",
    en: "Full-stack medical appointment booking platform with Spring Boot backend and React frontend, featuring secure payment integration.",
  },
  exp_chatbot_desc: {
    vi: "Ứng dụng Android AI hội thoại xây dựng với Kotlin, tái hiện các tính năng tương tác của ChatGPT với Firebase.",
    en: "Android conversational AI application replicating core interactive features of ChatGPT, built with Kotlin and Firebase.",
  },
  projects: {
    eyebrow: "Dự Án",
    title: "Những Thứ Tôi Đã Xây Dựng",
    subtitle: "Từ hệ thống production đến các dự án đam mê — mỗi cái đều đẩy tôi học điều mới và ship thứ tôi tự hào.",
    viewAll: "Xem Tất Cả trên GitHub",
    seeMore: "Muốn xem thêm?",
  },
  contact: {
    eyebrow: "Liên Hệ",
    title: "Hãy Xây Dựng Điều Gì Đó Cùng Nhau",
    subtitle: "Dù bạn có dự án trong đầu, muốn hợp tác, hay chỉ muốn chào hỏi — hộp thư của tôi luôn mở.",
    email: "Email",
    phone: "Điện thoại",
    linkedin: "LinkedIn",
    github: "GitHub",
    location: "Địa chỉ",
    sendMessage: "Gửi Tin Nhắn",
    nameLabel: "Tên",
    emailLabel: "Email",
    messageLabel: "Nội dung",
    namePlaceholder: "Tên của bạn",
    emailPlaceholder: "email@cuaban.com",
    messagePlaceholder: "Kể về dự án, ý tưởng, hoặc chỉ là chào hỏi...",
    sending: "Đang gửi...",
    sent: "Đã gửi!",
    sentMessage: "Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi sớm nhất có thể.",
    orFind: "Hoặc tìm tôi tại",
  },
  footer: {
    tagline: "Junior PHP Developer xây dựng hệ thống backend scalable với Laravel. Đến từ TP. Hồ Chí Minh, Việt Nam.",
    navigate: "Điều hướng",
    getInTouch: "Liên hệ",
    copyright: "© 2026 Nguyễn Quang Trường. Làm với tâm.",
  },
};

export const en: Dictionary = {
  nav: {
    about: "About",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    contact: "Contact",
    available: "Open to opportunities",
  },
  hero: {
    eyebrow: "Open to opportunities",
    greeting: "Hello,",
    name: "Nguyen Quang Truong",
    role: "Junior PHP Developer",
    bio: "Backend specialist with a passion for scalable system architecture, building robust APIs with Laravel and PHP 8+. I believe clean code is the foundation of every great product.",
    viewProjects: "View Projects",
    downloadCV: "Download CV",
    yearsExp: "1+",
    projectsBuilt: "3+",
    technologies: "10+",
    scroll: "Scroll",
  },
  about: {
    eyebrow: "About Me",
    title: "Crafting Code with Purpose",
    subtitle: "I'm a backend-focused developer with a deep love for building systems that are not just functional, but elegant — architecture that scales and code that others enjoy reading.",
    bio1: "Currently studying Information Technology at SaiGon Technology University, I specialize in backend development with PHP and Laravel. My journey started with curiosity about how systems work under the hood, and that curiosity has grown into a genuine passion for building robust, maintainable server-side architecture.",
    bio2: "I've worked across the full lifecycle of real applications — from designing database schemas and writing RESTful APIs, to implementing authentication, billing workflows, and automated document generation. Whether it's a medical booking system integrated with VNPay or a property management platform serving multiple user roles, I approach each project as a craft worth doing right.",
    years: "1+",
    yearsLabel: "Years Building",
    projects: "3+",
    projectsLabel: "Major Projects",
    tech: "10+",
    techLabel: "Technologies",
    languages: "2",
    languagesLabel: "Languages",
    softSkills: "Soft Skills",
  },
  skills: {
    eyebrow: "Technical Skills",
    title: "The Tools I Work With",
    subtitle: "A focused stack centered on backend excellence. Every tool is chosen for a reason — not just for the sake of knowing it.",
    coreLabel: "Core technologies I use daily",
    familiarLabel: "Familiar — used in production",
  },
  experience: {
    eyebrow: "Experience",
    title: "Where I've Worked & Built",
    subtitle: "From enterprise Laravel backends to personal Android experiments — each project taught me something new about building software that matters.",
    work: "Full-time",
    project: "Personal Project",
  },
  exp_c3tek_loc: "District 10, Ho Chi Minh City",
  exp_medical_loc: "Ho Chi Minh City",
  exp_chatbot_loc: "Ho Chi Minh City",
  exp_c3tek_desc: {
    vi: "Vai trò full-time xây dựng và duy trì nền tảng quản lý bất động sản phục vụ quản lý và chủ nhà.",
    en: "Full-time role building and maintaining a property management platform used by property managers and rental owners.",
  },
  exp_medical_desc: {
    vi: "Nền tảng đặt lịch khám y tế full-stack với backend Spring Boot và frontend React, tích hợp thanh toán VNPay.",
    en: "Full-stack medical appointment booking platform with Spring Boot backend and React frontend, featuring secure payment integration.",
  },
  exp_chatbot_desc: {
    vi: "Ứng dụng Android AI hội thoại xây dựng với Kotlin, tái hiện các tính năng tương tác của ChatGPT với Firebase.",
    en: "Android conversational AI application replicating core interactive features of ChatGPT, built with Kotlin and Firebase.",
  },
  projects: {
    eyebrow: "Projects",
    title: "Things I've Built",
    subtitle: "From production systems to passion projects — each one pushed me to learn something new and ship something I'm proud of.",
    viewAll: "View All on GitHub",
    seeMore: "Want to see more of my work?",
  },
  contact: {
    eyebrow: "Get in Touch",
    title: "Let's Build Something Together",
    subtitle: "Whether you have a project in mind, want to collaborate, or just want to say hello — my inbox is always open.",
    email: "Email",
    phone: "Phone",
    linkedin: "LinkedIn",
    github: "GitHub",
    location: "Location",
    sendMessage: "Send Message",
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    namePlaceholder: "Your name",
    emailPlaceholder: "your@email.com",
    messagePlaceholder: "Tell me about your project, idea, or just say hello...",
    sending: "Sending...",
    sent: "Message Sent!",
    sentMessage: "Thank you for reaching out. I'll get back to you soon.",
    orFind: "Or find me on",
  },
  footer: {
    tagline: "Junior PHP Developer crafting scalable backend systems with Laravel. Based in Ho Chi Minh City, Vietnam.",
    navigate: "Navigate",
    getInTouch: "Get in Touch",
    copyright: "© 2026 Nguyen Quang Truong. Crafted with care.",
  },
};
