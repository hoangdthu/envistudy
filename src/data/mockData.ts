export const modules = [
  {
    id: 'wastewater',
    title: 'Hệ thống xử lý nước thải',
    description: 'Tìm hiểu về các quy trình xử lý nước thải sinh hoạt và công nghiệp.',
    icon: 'Droplets',
    color: 'blue',
    theory: `
      ### 1. Tổng quan
      Xử lý nước thải là quá trình loại bỏ các chất ô nhiễm ra khỏi nước thải để nước sau xử lý đạt tiêu chuẩn xả thải.
      
      ### 2. Các bậc xử lý
      - **Xử lý sơ bộ:** Loại bỏ rác, cát, dầu mỡ.
      - **Xử lý bậc 1:** Lắng sơ cấp để loại bỏ chất rắn lơ lửng.
      - **Xử lý bậc 2:** Xử lý sinh học (Aerotank, bể lọc sinh học) để loại bỏ chất hữu cơ hòa tan (BOD).
      - **Xử lý bậc 3:** Khử trùng, loại bỏ Nitơ, Phốt pho.
    `,
    steps: [
      { id: 'screening', name: 'Song chắn rác', description: 'Loại bỏ rác có kích thước lớn để bảo vệ máy bơm và thiết bị.' },
      { id: 'sedimentation1', name: 'Bể lắng 1', description: 'Lắng các chất rắn lơ lửng bằng trọng lực.' },
      { id: 'aerotank', name: 'Bể Aerotank', description: 'Xử lý sinh học hiếu khí bằng bùn hoạt tính.' },
      { id: 'sedimentation2', name: 'Bể lắng 2', description: 'Tách bùn hoạt tính ra khỏi nước sạch.' },
      { id: 'disinfection', name: 'Khử trùng', description: 'Tiêu diệt vi khuẩn có hại bằng Clo hoặc UV.' }
    ]
  },
  {
    id: 'air-pollution',
    title: 'Hệ thống xử lý khí thải',
    description: 'Các công nghệ hấp thụ, hấp phụ và xử lý bụi trong không khí.',
    icon: 'Wind',
    color: 'emerald',
    theory: `
      ### 1. Phân loại khí thải
      Khí thải bao gồm bụi (PM10, PM2.5) và các khí độc hại (SOx, NOx, CO, VOCs).
      
      ### 2. Công nghệ xử lý
      - **Xử lý bụi:** Xyclon, túi lọc vải, lọc bụi tĩnh điện.
      - **Xử lý khí độc:** Tháp hấp thụ (dùng chất lỏng), tháp hấp phụ (dùng than hoạt tính).
    `,
    steps: [
      { id: 'cyclone', name: 'Xyclon', description: 'Tách bụi bằng lực ly tâm.' },
      { id: 'scrubber', name: 'Tháp hấp thụ', description: 'Dùng dung dịch để hấp thụ các khí độc hại.' },
      { id: 'adsorption', name: 'Tháp hấp phụ', description: 'Dùng than hoạt tính để giữ lại các phân tử khí.' }
    ]
  },
  {
    id: 'solid-waste',
    title: 'Quản lý chất thải rắn',
    description: 'Quy trình thu gom, phân loại và xử lý chất thải rắn đô thị và công nghiệp.',
    icon: 'Trash2',
    color: 'orange',
    theory: `
      ### 1. Phân loại tại nguồn
      Chất thải hữu cơ, chất thải tái chế và chất thải còn lại.
      
      ### 2. Phương pháp xử lý
      - **Chôn lấp vệ sinh:** Phổ biến nhưng cần kiểm soát nước rỉ rác.
      - **Ủ phân compost:** Dành cho rác hữu cơ.
      - **Thiêu đốt:** Giảm thể tích rác, có thể thu hồi năng lượng.
    `,
    steps: [
      { id: 'collection', name: 'Thu gom', description: 'Tập kết rác từ các nguồn thải.' },
      { id: 'sorting', name: 'Phân loại', description: 'Tách rác tái chế và rác hữu cơ.' },
      { id: 'incineration', name: 'Thiêu đốt', description: 'Đốt rác ở nhiệt độ cao để giảm thể tích.' }
    ]
  }
];

export const quizzes = [
  {
    id: 'wastewater-quiz',
    moduleId: 'wastewater',
    title: 'Trắc nghiệm Xử lý nước thải',
    questions: [
      {
        id: 1,
        question: 'Bể Aerotank thuộc bậc xử lý nào?',
        options: ['Xử lý sơ bộ', 'Xử lý bậc 1', 'Xử lý bậc 2', 'Xử lý bậc 3'],
        answer: 2,
        explanation: 'Bể Aerotank là công trình xử lý sinh học hiếu khí, thuộc bậc xử lý bậc 2.'
      },
      {
        id: 2,
        question: 'Chỉ số BOD5 dùng để đo lường cái gì?',
        options: ['Hàm lượng chất rắn lơ lửng', 'Hàm lượng chất hữu cơ dễ phân hủy sinh học', 'Hàm lượng oxy hòa tan', 'Độ kiềm của nước'],
        answer: 1,
        explanation: 'BOD5 (Biochemical Oxygen Demand) đo lượng oxy cần thiết để vi sinh vật oxy hóa chất hữu cơ trong 5 ngày.'
      },
      {
        id: 3,
        question: 'Tính hiệu suất xử lý nếu đầu vào BOD là 200mg/L và đầu ra là 20mg/L?',
        options: ['80%', '85%', '90%', '95%'],
        answer: 2,
        explanation: 'Hiệu suất = (200 - 20) / 200 * 100 = 90%.'
      }
    ]
  }
];
