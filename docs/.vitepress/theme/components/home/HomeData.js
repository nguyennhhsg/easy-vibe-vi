import stage2LovartCover from '../../../../vi-vn/stage-2/frontend/lovart-assets/images/image1.png'
import stage2FigmaCover from '../../../../vi-vn/stage-2/frontend/figma-mastergo/images/image8.png'
import stage2DesignToCodeCover from '../../../../vi-vn/stage-2/frontend/design-to-code/images/image42.png'
import stage2SupabaseCover from '../../../../vi-vn/stage-2/backend/database-supabase/images/image1.png'
import stage2ZeaburCover from '../../../../vi-vn/stage-2/backend/zeabur-deployment/images/image1.png'
import stage2DifyCover from '../../../../vi-vn/stage-2/ai-capabilities/dify-knowledge-base/images/image1.png'
import stage3ElectronCover from '../../../../vi-vn/stage-3/cross-platform/electron-voice-to-text/images/image3.png'
import stage3AgentTeamsCover from '../../../../vi-vn/stage-3/core-skills/agent-teams/images/home-cover.svg'
import stage3LongRunningCover from '../../../../vi-vn/stage-3/core-skills/long-running-tasks/images/home-cover.svg'
import stage3PersonalBrandCover from '../../../../vi-vn/stage-3/personal-brand/personal-website-blog/images/image1.png'

export const locales = [
  { code: 'zh-cn', text: '简体中文' },
  { code: 'en', text: 'English' },
  { code: 'ja-jp', text: '日本語' },
  { code: 'zh-tw', text: '繁體中文' },
  { code: 'ko-kr', text: '한국어' },
  { code: 'es-es', text: 'Español' },
  { code: 'fr-fr', text: 'Français' },
  { code: 'de-de', text: 'Deutsch' },
  { code: 'ar-sa', text: 'العربية' },
  { code: 'vi-vn', text: 'Tiếng Việt' }
]

export const stage1Cards = [
  {
    title: 'AI Product Manager',
    desc: 'Từ ý tưởng đến nguyên mẫu độ trung thực cao, bạn chỉ cần biết nói.',
    sub: 'Phù hợp với người không có nền tảng kỹ thuật',
    color: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
    icon: '🎨',
    link: '/vi-vn/stage-1/learning-map/'
  },
  {
    title: 'Nhập môn qua game',
    desc: 'Tạo Snake, Tetris và phá bỏ nỗi sợ code.',
    sub: 'Vừa chơi vừa học',
    color: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
    icon: '🎮',
    link: '/vi-vn/stage-1/ai-capabilities-through-games/'
  },
  {
    title: 'Vibe Coding',
    desc: 'Nắm vững cốt lõi lập trình thời AI: Prompt Engineering và quản lý ngữ cảnh.',
    sub: 'Tư duy cốt lõi',
    color: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
    icon: '💡',
    link: '/vi-vn/stage-1/introduction-to-ai-ide/'
  }
]

export const stage2Cards = [
  {
    imageColor: '#E0C3FC',
    image: stage2LovartCover,
    imageAlt: 'Ảnh chụp giao diện Lovart asset production Agent',
    link: '/vi-vn/stage-2/frontend/lovart-assets/'
  },
  {
    imageColor: '#D8C4F8',
    image: stage2FigmaCover,
    imageAlt: 'Ảnh chụp công cụ thiết kế Figma và MasterGo',
    link: '/vi-vn/stage-2/frontend/figma-mastergo/'
  },
  {
    imageColor: '#C7DDFB',
    image: stage2DesignToCodeCover,
    imageAlt: 'Ảnh minh họa chuyển bản thiết kế thành code',
    link: '/vi-vn/stage-2/frontend/design-to-code/'
  },
  {
    imageColor: '#8EC5FC',
    image: stage2SupabaseCover,
    imageAlt: 'Ảnh chụp bảng điều khiển cơ sở dữ liệu Supabase',
    link: '/vi-vn/stage-2/backend/database-supabase/'
  },
  {
    imageColor: '#96E6A1',
    image: stage2ZeaburCover,
    imageAlt: 'Ảnh chụp quy trình triển khai Zeabur',
    link: '/vi-vn/stage-2/backend/zeabur-deployment/'
  },
  {
    imageColor: '#A7F3D0',
    image: stage2DifyCover,
    imageAlt: 'Ảnh chụp workbench knowledge base của Dify',
    link: '/vi-vn/stage-2/ai-capabilities/dify-knowledge-base/'
  }
]

export const stage3Cards = [
  {
    title: 'Ứng dụng desktop đa nền tảng',
    desc: 'Dùng Electron tạo ứng dụng desktop chuyển giọng nói thành văn bản, một lần code chạy được trên Windows, macOS và Linux.',
    tag: 'Stage 3',
    visualType: 'phone',
    image: stage3ElectronCover,
    imageAlt: 'Ảnh xem trước ứng dụng desktop voice-to-text bằng Electron',
    link: '/vi-vn/stage-3/cross-platform/electron-voice-to-text/'
  },
  {
    title: 'Đội ngũ AI Agent',
    desc: 'Dùng Claude Agent Teams để lập nhóm phát triển AI, nhiều agent phối hợp hoàn thành các task lớn.',
    tag: 'Advanced',
    visualType: 'ai',
    image: stage3AgentTeamsCover,
    imageAlt: 'Ảnh bìa luồng phối hợp của Claude Agent Teams',
    link: '/vi-vn/stage-3/core-skills/agent-teams/'
  },
  {
    title: 'Chạy ổn định lâu dài',
    desc: 'Dùng script vòng lặp và plugin Ralph để quản lý task dài hơi, để Claude Code chạy xuyên đêm hoàn thành công việc ổn định.',
    tag: 'Architecture',
    visualType: 'arch',
    image: stage3LongRunningCover,
    imageAlt: 'Ảnh bìa Claude Code chạy dài hạn và task lặp',
    link: '/vi-vn/stage-3/core-skills/long-running-tasks/'
  },
  {
    title: 'Thương hiệu cá nhân và đầu ra',
    desc: 'Xây dựng website cá nhân và blog kỹ thuật để dự án và kinh nghiệm của bạn được lưu lại lâu dài và tiếp cận nhiều người hơn.',
    tag: 'Brand',
    visualType: 'brand',
    image: stage3PersonalBrandCover,
    imageAlt: 'Ảnh chụp ví dụ website cá nhân và blog học thuật',
    imageClass: 'prod-image--personal-brand',
    link: '/vi-vn/stage-3/personal-brand/personal-website-blog/'
  }
]

export const appendixCards = [
  {
    title: 'Trí tuệ nhân tạo',
    desc: 'LLM, Agent, RAG — đi sâu vào nguyên lý cốt lõi của AI.',
    tag: 'AI',
    link: '/vi-vn/appendix/8-artificial-intelligence/ai-history'
  },
  {
    title: 'Prompt Engineering',
    desc: 'Nắm vững kỹ thuật trò chuyện hiệu quả với AI, khai mở tiềm năng.',
    tag: 'AI',
    link: '/vi-vn/appendix/8-artificial-intelligence/prompt-engineering'
  },
  {
    title: 'Mô hình ngôn ngữ lớn',
    desc: 'Giải thích dễ hiểu nguyên lý hoạt động và ứng dụng của LLM.',
    tag: 'AI',
    link: '/vi-vn/appendix/8-artificial-intelligence/llm-principles'
  },
  {
    title: 'AI Agent',
    desc: 'Khám phá kiến trúc AI có khả năng tự ra quyết định và thực thi.',
    tag: 'AI',
    link: '/vi-vn/appendix/8-artificial-intelligence/ai-agents'
  },
  {
    title: 'Nền tảng frontend',
    desc: 'HTML/CSS/JS — ba trụ cột, môn học bắt buộc khi nhập môn.',
    tag: 'Frontend',
    link: '/vi-vn/appendix/3-browser-and-frontend/javascript-deep-dive'
  },
  {
    title: 'Lịch sử tiến hóa frontend',
    desc: 'Hiểu hành trình của tech stack frontend, nắm bắt xu hướng.',
    tag: 'Frontend',
    link: '/vi-vn/appendix/3-browser-and-frontend/frontend-frameworks'
  },
  {
    title: 'Kiến trúc backend',
    desc: 'Từ monolith đến microservices, khám phá hành trình kiến trúc.',
    tag: 'Backend',
    link: '/vi-vn/appendix/4-server-and-backend/backend-layered-architecture'
  },
  {
    title: 'Ngôn ngữ backend',
    desc: 'So sánh đặc điểm các ngôn ngữ backend phổ biến để chọn stack tốt nhất.',
    tag: 'Backend',
    link: '/vi-vn/appendix/4-server-and-backend/backend-languages'
  },
  {
    title: 'Nguyên lý database',
    desc: 'Hiểu nguyên lý cốt lõi của cơ sở dữ liệu, làm chủ nghệ thuật lưu trữ dữ liệu.',
    tag: 'Database',
    link: '/vi-vn/appendix/5-data/database-fundamentals'
  },
  {
    title: 'Thiết kế API',
    desc: 'Kiến thức nền về thiết kế và phát triển API.',
    tag: 'API',
    link: '/vi-vn/appendix/4-server-and-backend/api-intro'
  },
  {
    title: 'Git Version Control',
    desc: 'Hiểu sâu nguyên lý Git và các cách dùng nâng cao.',
    tag: 'General',
    link: '/vi-vn/appendix/2-development-tools/git-version-control'
  },
  {
    title: 'Mạng máy tính',
    desc: 'Kiến thức nền tảng về giao thức mạng và nguyên lý truyền thông.',
    tag: 'General',
    link: '/vi-vn/appendix/1-computer-fundamentals/computer-networks'
  }
]