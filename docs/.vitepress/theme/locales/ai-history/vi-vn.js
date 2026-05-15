// AI History – Vietnamese locale
export default {
  // AiEvolutionDemo
  aiEvolution: {
    eras: [
      { label: 'Nền tảng lý thuyết', years: '1940s-50s' },
      { label: 'Làn sóng thứ nhất', years: '1960s-70s' },
      { label: '❄️ Mùa đông I', years: '1974-80' },
      { label: 'Làn sóng thứ hai', years: '1980s' },
      { label: '❄️ Mùa đông II', years: '1987-93' },
      { label: 'ML trỗi dậy', years: '1990s-2000s' },
      { label: 'Deep Learning', years: '2010s' },
      { label: 'Kỷ nguyên LLM', years: '2018+' }
    ],
    legend: {
      wave: 'Làn sóng công nghệ',
      winter: '❄️ Mùa đông AI',
      llm: 'Kỷ nguyên LLM'
    }
  },

  // DiscriminativeVsGenerativeDemo
  schools: {
    repLabel: 'Đại diện',
    items: [
      {
        name: 'Chủ nghĩa ký hiệu (Symbolism)',
        idea: 'Trí tuệ = suy luận ký hiệu / luật If-Then',
        rep: 'Hệ chuyên gia, Deep Blue',
        status: '→ Hợp nhất với Connectionism (neuro-symbolic AI)'
      },
      {
        name: 'Chủ nghĩa liên kết (Connectionism)',
        idea: 'Trí tuệ = mạng neural network + dữ liệu khổng lồ',
        rep: 'AlphaGo, dòng GPT',
        status: '→ Dẫn dắt kỷ nguyên LLM, là xu thế chủ đạo hiện nay'
      },
      {
        name: 'Chủ nghĩa hành vi (Behaviorism)',
        idea: 'Trí tuệ = tương tác với môi trường / RL',
        rep: 'AlphaGo (phần RL)',
        status: '→ Hợp nhất với Connectionism (deep RL)'
      }
    ]
  },

  // FoundationDemo
  foundation: {
    label: 'Ý tưởng cốt lõi của Symbolism — mã hoá tri thức thành luật',
    lines: [
      {
        parts: [
          { kw: 'IF' },
          { text: '  nhiệt độ > 38.5°C  ' },
          { kw: 'AND' },
          { text: '  số bạch cầu > 11000' }
        ]
      },
      {
        indent: true,
        parts: [
          { kw: 'THEN' },
          { text: '  chẩn đoán = ' },
          { str: '"nhiễm khuẩn"' }
        ]
      },
      {
        parts: [
          { kw: 'IF' },
          { text: '  chẩn đoán = ' },
          { str: '"nhiễm khuẩn"' },
          { text: '  ' },
          { kw: 'AND' },
          { text: '  không dị ứng penicillin' }
        ]
      },
      {
        indent: true,
        parts: [
          { kw: 'THEN' },
          { text: '  phác đồ điều trị = ' },
          { str: '"penicillin 400mg / hai lần mỗi ngày"' }
        ]
      }
    ],
    comment:
      '// Hệ chuyên gia y tế đời đầu MYCIN (1977) gồm hơn 450 luật như thế này',
    caption:
      'Chuyên gia con người dịch kinh nghiệm thành các luật IF-THEN, máy đối chiếu và thực thi từng luật một'
  },

  // PerceptronDemo
  perceptron: {
    features: ['Đặc trưng x₁', 'Đặc trưng x₂'],
    biasLabel: 'Bias',
    activated: 'Kích hoạt',
    silent: 'Im lặng',
    caption:
      '① Đặc trưng đầu vào ② Nhân với weight (độ quan trọng) ③ Tổng + bias ④ Vượt ngưỡng thì kích hoạt xuất 1, ngược lại xuất 0'
  },

  // BackpropagationDemo
  backprop: {
    steps: [
      {
        icon: '➡️',
        name: 'Forward pass',
        desc: 'Dữ liệu chảy qua mạng và cho ra dự đoán'
      },
      {
        icon: '📐',
        name: 'Tính loss',
        desc: 'So dự đoán với đáp án đúng, tính ra loss'
      },
      {
        icon: '⬅️',
        name: 'Backpropagation',
        desc: 'Truy ngược từng tầng để xác định trách nhiệm của mỗi weight'
      },
      {
        icon: '⚙️',
        name: 'Cập nhật weight',
        desc: 'Điều chỉnh theo trách nhiệm để giảm sai số lần sau'
      }
    ],
    lossLabel: 'Loss (sai số) giảm dần qua các epoch huấn luyện:',
    axisHigh: 'Cao',
    axisLow: 'Thấp',
    axisEpochs: 'Số epoch huấn luyện'
  },

  // NeuralNetworkVisualizationDemo
  neuralNet: {
    layers: [
      { name: 'Tầng đầu vào', desc: 'Pixel thô / tín hiệu số' },
      {
        name: 'Tầng ẩn (có thể xếp chồng nhiều tầng)',
        desc: 'Tầng thấp nhận diện cạnh → tầng giữa nhận diện hình dạng → tầng cao nhận diện khái niệm ngữ nghĩa'
      },
      { name: 'Tầng đầu ra', desc: 'Kết quả phân loại hoặc dự đoán cuối cùng' }
    ]
  },

  // AttentionMechanismDemo
  attention: {
    colLabel: 'Phân bổ attention khi xử lý «{word}»:',
    sentence: ['Minh', 'đưa', 'quả táo', 'cho', 'anh ấy', 'của', 'mẹ'],
    focusIdx: 4,
    weights: [0.65, 0.05, 0.1, 0.1, 0.05, 0.03, 0.02],
    caption:
      '«Anh ấy» nằm giữa câu, nhưng mô hình hướng 65% attention chính xác về «Minh» ở đầu câu, vượt khoảng cách để xác định đại từ chỉ ai'
  },

  // GPTEvolutionDemo
  gptEvolution: [
    {
      name: 'GPT-1',
      year: '2018',
      params: '117 triệu',
      barWidth: '2%',
      key: 'Xác lập paradigm tiền huấn luyện + tinh chỉnh'
    },
    {
      name: 'GPT-2',
      year: '2019',
      params: '1,5 tỉ',
      barWidth: '6%',
      key: 'Khái quát hoá Zero-shot'
    },
    {
      name: 'GPT-3',
      year: '2020',
      params: '175 tỉ',
      barWidth: '45%',
      key: '⚡ Nổi lên! Học trong ngữ cảnh'
    },
    {
      name: 'GPT-4',
      year: '2023',
      params: '~1,8 nghìn tỉ',
      barWidth: '100%',
      key: 'Đa phương thức + suy luận phức tạp'
    }
  ],

  // AIErasComparisonDemo
  erasComparison: {
    header: '🌟 Bức tranh toàn cảnh các giai đoạn phát triển và paradigm cốt lõi của AI',
    driverLabel: 'Động lực',
    mechanismLabel: 'Cơ chế cốt lõi',
    examplesLabel: 'Đại diện tiêu biểu',
    eras: [
      {
        name: 'Kỷ nguyên hệ luật',
        time: '1960s - 1980s',
        driver: 'Con người mã hoá tri thức bằng tay',
        mechanism: 'Suy luận logic If-Then',
        examples: ['Dendral', 'Deep Blue']
      },
      {
        name: 'ML cổ điển',
        time: '1990s - 2000s',
        driver: 'Đặc trưng thủ công + thống kê',
        mechanism: 'Tìm biên quyết định bằng toán học',
        examples: ['SVM', 'Random Forest']
      },
      {
        name: 'Cuộc cách mạng Deep Learning',
        time: '2010s',
        driver: 'Big data + năng lực tính toán GPU',
        mechanism: 'Neural network tự trích xuất đặc trưng',
        examples: ['AlexNet (CNN)', 'AlphaGo (RL)']
      },
      {
        name: 'Mô hình ngôn ngữ lớn (LLM)',
        time: '2018 - hiện nay',
        driver: 'Dữ liệu không gán nhãn khổng lồ + sức mạnh tính toán',
        mechanism: 'Dự đoán token tiếp theo + tri thức nổi lên',
        examples: ['GPT-4', 'Claude 3']
      },
      {
        name: 'Agentic AI',
        time: 'Hiện tại - tương lai',
        driver: 'Bộ não LLM + cảm nhận môi trường',
        mechanism: 'Tự lập kế hoạch + gọi công cụ',
        examples: ['AI lập trình viên', 'AI hiện thân (embodied AI)']
      }
    ]
  }
}
