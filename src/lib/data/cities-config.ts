/**
 * 34个城市配置信息
 * 基于中国省会城市及行政中心的性格特征定义
 */

export interface CityConfig {
  id: string;
  name: string;
  nickname?: string; // 城市昵称
  tags: string[]; // 城市特色标签
  personalityTypes: string[]; // 性格类型标签
  description: string; // 简短描述
  detailedFeatures: string[]; // 详细特征
  matchingThresholds: {
    [mbtiType: string]: number; // MBTI类型匹配阈值
  };
  colorTheme: {
    primary: string;
    secondary: string;
    accent?: string;
  };
}

export const CITIES_CONFIG: Record<string, CityConfig> = {
  // 四大直辖市
  北京: {
    id: 'beijing',
    name: '北京',
    nickname: '帝都',
    tags: ['权威型', '有格局', '政治中心', '文化底蕴'],
    personalityTypes: ['权威型', '进取型', '文化型'],
    description: '大格局、有野心，适合在权力中心感受历史厚重的人',
    detailedFeatures: [
      '政治文化中心，机会多样',
      '历史文化底蕴深厚',
      '生活成本较高但发展空间大',
      '适合追求事业成就的进取型人才'
    ],
    matchingThresholds: {
      'ENTJ': 85, 'ENFJ': 80, 'ESTJ': 82, 'ESFJ': 75,
      'ENTP': 78, 'ENFP': 72, 'ESTP': 70, 'ESFP': 68,
      'INTJ': 80, 'INFJ': 75, 'ISTJ': 78, 'ISFJ': 70,
      'INTP': 72, 'INFP': 68, 'ISTP': 65, 'ISFP': 62
    },
    colorTheme: {
      primary: '#C41E3A', // 中国红
      secondary: '#F5F5DC', // 米色
      accent: '#FFD700' // 金色
    }
  },

  上海: {
    id: 'shanghai',
    name: '上海',
    nickname: '魔都',
    tags: ['精致型', '国际化', '时尚前沿', '商业中心'],
    personalityTypes: ['精致型', '现代型', '社交型'],
    description: '追求品质生活，注重外在形象，有国际化视野',
    detailedFeatures: [
      '国际金融中心，商业繁荣',
      '时尚潮流前沿，生活品质高',
      '多元文化融合，包容性强',
      '适合追求精致生活的都市丽人'
    ],
    matchingThresholds: {
      'ENTJ': 88, 'ENFJ': 85, 'ESTJ': 82, 'ESFJ': 78,
      'ENTP': 80, 'ENFP': 75, 'ESTP': 85, 'ESFP': 82,
      'INTJ': 75, 'INFJ': 70, 'ISTJ': 72, 'ISFJ': 68,
      'INTP': 68, 'INFP': 65, 'ISTP': 70, 'ISFP': 65
    },
    colorTheme: {
      primary: '#0066CC', // 商务蓝
      secondary: '#F0F8FF', // 浅蓝
      accent: '#FFD700' // 金色
    }
  },

  天津: {
    id: 'tianjin',
    name: '天津',
    nickname: '津门',
    tags: ['务实型', '包容开放', '港口城市', '相声文化'],
    personalityTypes: ['务实型', '幽默型', '传统型'],
    description: '务实包容，有浓厚的市井文化和幽默感',
    detailedFeatures: [
      '北方重要港口，经济发达',
      '相声文化浓厚，生活有趣',
      '房价相对适中，生活压力小',
      '适合追求稳定生活的实用主义者'
    ],
    matchingThresholds: {
      'ENTJ': 75, 'ENFJ': 78, 'ESTJ': 82, 'ESFJ': 80,
      'ENTP': 75, 'ENFP': 78, 'ESTP': 80, 'ESFP': 82,
      'INTJ': 70, 'INFJ': 72, 'ISTJ': 78, 'ISFJ': 75,
      'INTP': 68, 'INFP': 70, 'ISTP': 72, 'ISFP': 70
    },
    colorTheme: {
      primary: '#4682B4', // 钢青色
      secondary: '#F0F8FF',
      accent: '#FFA500' // 橙色
    }
  },

  重庆: {
    id: 'chongqing',
    name: '重庆',
    nickname: '山城',
    tags: ['豪爽型', '火锅之都', '夜生活', '直爽性格'],
    personalityTypes: ['豪爽型', '社交型', '享受型'],
    description: '性格直爽豪迈，享受火锅和夜生活的快乐',
    detailedFeatures: [
      '火锅文化浓厚，夜生活丰富',
      '立体城市，独特地貌',
      '人情味浓厚，性格直爽',
      '适合喜欢热闹、重视友情的人'
    ],
    matchingThresholds: {
      'ENTJ': 78, 'ENFJ': 80, 'ESTJ': 75, 'ESFJ': 85,
      'ENTP': 82, 'ENFP': 88, 'ESTP': 90, 'ESFP': 92,
      'INTJ': 65, 'INFJ': 70, 'ISTJ': 68, 'ISFJ': 75,
      'INTP': 70, 'INFP': 75, 'ISTP': 72, 'ISFP': 78
    },
    colorTheme: {
      primary: '#DC143C', // 深红色
      secondary: '#FFE4B5',
      accent: '#FF6347' // 番茄红
    }
  },

  // 华北地区省会
  石家庄: {
    id: 'shijiazhuang',
    name: '石家庄',
    nickname: '石门',
    tags: ['踏实型', '中转枢纽', '发展潜力', '宜居城市'],
    personalityTypes: ['踏实型', '稳定型', '发展型'],
    description: '踏实稳重，具有发展潜力的交通枢纽城市',
    detailedFeatures: [
      '交通便利，区位优势明显',
      '生活成本适中，压力较小',
      '发展潜力大，机会较多',
      '适合追求稳定发展的务实派'
    ],
    matchingThresholds: {
      'ENTJ': 72, 'ENFJ': 70, 'ESTJ': 80, 'ESFJ': 78,
      'ENTP': 68, 'ENFP': 70, 'ESTP': 72, 'ESFP': 75,
      'INTJ': 75, 'INFJ': 72, 'ISTJ': 82, 'ISFJ': 80,
      'INTP': 70, 'INFP': 68, 'ISTP': 75, 'ISFP': 72
    },
    colorTheme: {
      primary: '#228B22', // 森林绿
      secondary: '#F0FFF0',
      accent: '#32CD32' // 酸橙绿
    }
  },

  太原: {
    id: 'taiyuan',
    name: '太原',
    nickname: '龙城',
    tags: ['厚重型', '煤炭之都', '历史文化', '能源基地'],
    personalityTypes: ['厚重型', '传统型', '实业型'],
    description: '历史厚重，以能源工业为支撑的传统工业城市',
    detailedFeatures: [
      '历史文化底蕴深厚',
      '能源工业发达，就业稳定',
      '生活节奏适中，压力不大',
      '适合重视传统文化的稳健型人才'
    ],
    matchingThresholds: {
      'ENTJ': 70, 'ENFJ': 68, 'ESTJ': 78, 'ESFJ': 75,
      'ENTP': 65, 'ENFP': 68, 'ESTP': 70, 'ESFP': 72,
      'INTJ': 78, 'INFJ': 75, 'ISTJ': 85, 'ISFJ': 80,
      'INTP': 75, 'INFP': 72, 'ISTP': 78, 'ISFP': 75
    },
    colorTheme: {
      primary: '#2F4F4F', // 深石板灰
      secondary: '#F5F5F5',
      accent: '#FFD700' // 金色
    }
  },

  // 东北地区省会
  沈阳: {
    id: 'shenyang',
    name: '沈阳',
    nickname: '盛京',
    tags: ['豪迈型', '工业基地', '东北文化', '直爽性格'],
    personalityTypes: ['豪迈型', '直率型', '传统型'],
    description: '东北老工业基地，性格豪迈直爽，有深厚的工业文化',
    detailedFeatures: [
      '工业基础雄厚，制造业发达',
      '东北文化浓厚，人情味浓',
      '生活成本较低，节奏适中',
      '适合重视人际关系的豪爽型人才'
    ],
    matchingThresholds: {
      'ENTJ': 75, 'ENFJ': 78, 'ESTJ': 80, 'ESFJ': 82,
      'ENTP': 72, 'ENFP': 80, 'ESTP': 85, 'ESFP': 88,
      'INTJ': 70, 'INFJ': 72, 'ISTJ': 78, 'ISFJ': 80,
      'INTP': 68, 'INFP': 70, 'ISTP': 75, 'ISFP': 78
    },
    colorTheme: {
      primary: '#B22222', // 火砖红
      secondary: '#FFE4E1',
      accent: '#FF4500' // 橙红色
    }
  },

  长春: {
    id: 'changchun',
    name: '长春',
    nickname: '春城',
    tags: ['汽车城', '电影城', '绿色生态', '文化教育'],
    personalityTypes: ['文化型', '绿色型', '教育型'],
    description: '汽车工业发达，文化教育资源丰富，生态环境良好',
    detailedFeatures: [
      '汽车工业发达，就业机会多',
      '高等教育资源丰富',
      '绿化率高，生态环境好',
      '适合重视教育和环境的知识型人才'
    ],
    matchingThresholds: {
      'ENTJ': 72, 'ENFJ': 75, 'ESTJ': 78, 'ESFJ': 80,
      'ENTP': 78, 'ENFP': 82, 'ESTP': 72, 'ESFP': 78,
      'INTJ': 80, 'INFJ': 82, 'ISTJ': 75, 'ISFJ': 78,
      'INTP': 85, 'INFP': 80, 'ISTP': 70, 'ISFP': 75
    },
    colorTheme: {
      primary: '#32CD32', // 酸橙绿
      secondary: '#F0FFF0',
      accent: '#228B22' // 森林绿
    }
  },

  哈尔滨: {
    id: 'harbin',
    name: '哈尔滨',
    nickname: '冰城',
    tags: ['浪漫型', '异域风情', '冰雪文化', '音乐之城'],
    personalityTypes: ['浪漫型', '艺术型', '异域型'],
    description: '充满异域风情的冰雪之城，音乐文化浓厚',
    detailedFeatures: [
      '冰雪旅游资源丰富',
      '俄式建筑风情独特',
      '音乐文化底蕴深厚',
      '适合追求浪漫情调的艺术气质人才'
    ],
    matchingThresholds: {
      'ENTJ': 70, 'ENFJ': 80, 'ESTJ': 68, 'ESFJ': 75,
      'ENTP': 82, 'ENFP': 88, 'ESTP': 75, 'ESFP': 85,
      'INTJ': 72, 'INFJ': 85, 'ISTJ': 65, 'ISFJ': 72,
      'INTP': 78, 'INFP': 90, 'ISTP': 68, 'ISFP': 88
    },
    colorTheme: {
      primary: '#4169E1', // 皇室蓝
      secondary: '#E6F3FF',
      accent: '#87CEEB' // 天空蓝
    }
  },

  // 华东地区省会
  南京: {
    id: 'nanjing',
    name: '南京',
    nickname: '金陵',
    tags: ['历史文化', '教育重镇', '包容开放', '古都新韵'],
    personalityTypes: ['文化型', '教育型', '历史型'],
    description: '六朝古都，历史文化底蕴深厚，教育资源丰富',
    detailedFeatures: [
      '历史文化名城，古迹众多',
      '高等教育资源丰富',
      '长三角核心城市，发展机会多',
      '适合重视文化底蕴的知识分子'
    ],
    matchingThresholds: {
      'ENTJ': 78, 'ENFJ': 82, 'ESTJ': 75, 'ESFJ': 78,
      'ENTP': 80, 'ENFP': 85, 'ESTP': 72, 'ESFP': 75,
      'INTJ': 85, 'INFJ': 88, 'ISTJ': 80, 'ISFJ': 82,
      'INTP': 88, 'INFP': 85, 'ISTP': 72, 'ISFP': 78
    },
    colorTheme: {
      primary: '#800080', // 紫色
      secondary: '#F8F8FF',
      accent: '#DDA0DD' // 梅红色
    }
  },

  杭州: {
    id: 'hangzhou',
    name: '杭州',
    nickname: '人间天堂',
    tags: ['浪漫文艺', '互联网之都', '西湖美景', '诗意生活'],
    personalityTypes: ['浪漫型', '文艺型', '科技型'],
    description: '文艺清新，有情调有品味，追求诗意生活',
    detailedFeatures: [
      '西湖美景，自然环境优美',
      '互联网产业发达，创新氛围浓',
      '生活品质高，文艺气息浓厚',
      '适合追求诗意生活的文艺青年'
    ],
    matchingThresholds: {
      'ENTJ': 75, 'ENFJ': 85, 'ESTJ': 70, 'ESFJ': 80,
      'ENTP': 85, 'ENFP': 92, 'ESTP': 72, 'ESFP': 82,
      'INTJ': 78, 'INFJ': 90, 'ISTJ': 68, 'ISFJ': 75,
      'INTP': 80, 'INFP': 95, 'ISTP': 65, 'ISFP': 90
    },
    colorTheme: {
      primary: '#32D74B', // 西湖绿
      secondary: '#F0F9FF',
      accent: '#BF5AF2' // 紫薇色
    }
  },

  合肥: {
    id: 'hefei',
    name: '合肥',
    nickname: '科教城',
    tags: ['科教兴城', '创新发展', '宜居宜业', '潜力之城'],
    personalityTypes: ['科技型', '发展型', '宜居型'],
    description: '科教资源丰富，创新发展迅速，是一座充满潜力的城市',
    detailedFeatures: [
      '科教资源丰富，创新氛围浓',
      '发展速度快，机会较多',
      '生活成本适中，压力不大',
      '适合追求科技创新的年轻人'
    ],
    matchingThresholds: {
      'ENTJ': 80, 'ENFJ': 78, 'ESTJ': 75, 'ESFJ': 72,
      'ENTP': 88, 'ENFP': 82, 'ESTP': 75, 'ESFP': 78,
      'INTJ': 90, 'INFJ': 80, 'ISTJ': 78, 'ISFJ': 75,
      'INTP': 92, 'INFP': 78, 'ISTP': 80, 'ISFP': 72
    },
    colorTheme: {
      primary: '#1E90FF', // 道奇蓝
      secondary: '#F0F8FF',
      accent: '#00CED1' // 暗绿松石色
    }
  },

  福州: {
    id: 'fuzhou',
    name: '福州',
    nickname: '榕城',
    tags: ['温润如玉', '海滨城市', '宜居生活', '闽都文化'],
    personalityTypes: ['温润型', '海滨型', '文化型'],
    description: '温润的海滨城市，闽都文化深厚，生活节奏舒缓',
    detailedFeatures: [
      '气候温和，环境宜居',
      '海滨城市，风景优美',
      '闽都文化底蕴深厚',
      '适合追求温润生活的文雅之士'
    ],
    matchingThresholds: {
      'ENTJ': 72, 'ENFJ': 80, 'ESTJ': 70, 'ESFJ': 85,
      'ENTP': 75, 'ENFP': 88, 'ESTP': 78, 'ESFP': 90,
      'INTJ': 75, 'INFJ': 88, 'ISTJ': 78, 'ISFJ': 90,
      'INTP': 72, 'INFP': 85, 'ISTP': 70, 'ISFP': 92
    },
    colorTheme: {
      primary: '#20B2AA', // 浅海绿
      secondary: '#F0FFFF',
      accent: '#48D1CC' // 中绿松石色
    }
  },

  南昌: {
    id: 'nanchang',
    name: '南昌',
    nickname: '英雄城',
    tags: ['革命传统', '赣文化', '宜居城市', '发展潜力'],
    personalityTypes: ['传统型', '英雄型', '发展型'],
    description: '英雄城市，革命传统深厚，具有良好的发展潜力',
    detailedFeatures: [
      '革命传统教育基地',
      '赣文化底蕴深厚',
      '生活成本低，幸福指数高',
      '适合重视传统文化的稳健派'
    ],
    matchingThresholds: {
      'ENTJ': 75, 'ENFJ': 78, 'ESTJ': 82, 'ESFJ': 80,
      'ENTP': 70, 'ENFP': 75, 'ESTP': 78, 'ESFP': 82,
      'INTJ': 78, 'INFJ': 80, 'ISTJ': 85, 'ISFJ': 88,
      'INTP': 72, 'INFP': 75, 'ISTP': 78, 'ISFP': 82
    },
    colorTheme: {
      primary: '#DC143C', // 深红色
      secondary: '#FFFFE0',
      accent: '#FF6347' // 番茄红
    }
  },

  济南: {
    id: 'jinan',
    name: '济南',
    nickname: '泉城',
    tags: ['泉水之城', '齐鲁文化', '山水城市', '文化底蕴'],
    personalityTypes: ['文化型', '自然型', '传统型'],
    description: '泉水之城，齐鲁文化深厚，山水相依的文化名城',
    detailedFeatures: [
      '泉水众多，自然景观独特',
      '齐鲁文化发源地',
      '山水城市，环境优美',
      '适合重视文化传统的雅士'
    ],
    matchingThresholds: {
      'ENTJ': 75, 'ENFJ': 82, 'ESTJ': 78, 'ESFJ': 85,
      'ENTP': 78, 'ENFP': 85, 'ESTP': 72, 'ESFP': 80,
      'INTJ': 82, 'INFJ': 88, 'ISTJ': 85, 'ISFJ': 90,
      'INTP': 80, 'INFP': 88, 'ISTP': 75, 'ISFP': 88
    },
    colorTheme: {
      primary: '#4682B4', // 钢青色
      secondary: '#F0F8FF',
      accent: '#87CEEB' // 天空蓝
    }
  },

  // 华中地区省会
  郑州: {
    id: 'zhengzhou',
    name: '郑州',
    nickname: '商都',
    tags: ['交通枢纽', '商贸中心', '中原文化', '发展迅速'],
    personalityTypes: ['商贸型', '枢纽型', '发展型'],
    description: '中原腹地的交通枢纽，商贸发达，发展迅速',
    detailedFeatures: [
      '全国重要的交通枢纽',
      '商贸物流业发达',
      '发展速度快，机会多',
      '适合追求商业成功的实干家'
    ],
    matchingThresholds: {
      'ENTJ': 88, 'ENFJ': 78, 'ESTJ': 92, 'ESFJ': 80,
      'ENTP': 85, 'ENFP': 75, 'ESTP': 90, 'ESFP': 82,
      'INTJ': 78, 'INFJ': 70, 'ISTJ': 88, 'ISFJ': 78,
      'INTP': 72, 'INFP': 68, 'ISTP': 82, 'ISFP': 72
    },
    colorTheme: {
      primary: '#B8860B', // 暗金色
      secondary: '#FFF8DC',
      accent: '#DAA520' // 金麒麟色
    }
  },

  武汉: {
    id: 'wuhan',
    name: '武汉',
    nickname: '江城',
    tags: ['九省通衢', '教育重镇', '江湖文化', '火炉城市'],
    personalityTypes: ['豪爽型', '教育型', '通衢型'],
    description: '九省通衢，教育资源丰富，具有浓厚的江湖文化',
    detailedFeatures: [
      '地理位置优越，交通便利',
      '高等教育资源全国领先',
      '江湖文化浓厚，性格豪爽',
      '适合重视教育和发展机遇的人才'
    ],
    matchingThresholds: {
      'ENTJ': 85, 'ENFJ': 88, 'ESTJ': 82, 'ESFJ': 85,
      'ENTP': 90, 'ENFP': 92, 'ESTP': 88, 'ESFP': 90,
      'INTJ': 82, 'INFJ': 85, 'ISTJ': 78, 'ISFJ': 80,
      'INTP': 88, 'INFP': 82, 'ISTP': 78, 'ISFP': 80
    },
    colorTheme: {
      primary: '#4169E1', // 皇室蓝
      secondary: '#F0F8FF',
      accent: '#1E90FF' // 道奇蓝
    }
  },

  长沙: {
    id: 'changsha',
    name: '长沙',
    nickname: '星城',
    tags: ['吃货天堂', '娱乐之都', '湖湘文化', '性价比高'],
    personalityTypes: ['吃货型', '娱乐型', '性价比型'],
    description: '美食遍地，娱乐业发达，生活成本低，性价比极高',
    detailedFeatures: [
      '湘菜美食，夜宵文化浓厚',
      '娱乐产业发达，夜生活丰富',
      '房价相对较低，生活压力小',
      '适合爱吃爱玩、追求性价比的人'
    ],
    matchingThresholds: {
      'ENTJ': 78, 'ENFJ': 85, 'ESTJ': 75, 'ESFJ': 90,
      'ENTP': 85, 'ENFP': 95, 'ESTP': 92, 'ESFP': 98,
      'INTJ': 70, 'INFJ': 75, 'ISTJ': 72, 'ISFJ': 82,
      'INTP': 75, 'INFP': 80, 'ISTP': 78, 'ISFP': 88
    },
    colorTheme: {
      primary: '#FF4500', // 橙红色
      secondary: '#FFE4B5',
      accent: '#FF6347' // 番茄红
    }
  },

  // 华南地区省会
  广州: {
    id: 'guangzhou',
    name: '广州',
    nickname: '羊城',
    tags: ['务实进取', '美食天堂', '包容开放', '商贸中心'],
    personalityTypes: ['务实型', '商贸型', '包容型'],
    description: '务实低调又充满生活智慧，商贸发达，包容开放',
    detailedFeatures: [
      '商贸历史悠久，经济发达',
      '粤菜文化，早茶文化浓厚',
      '包容性强，外来人口多',
      '适合追求事业与生活平衡的务实派'
    ],
    matchingThresholds: {
      'ENTJ': 82, 'ENFJ': 85, 'ESTJ': 88, 'ESFJ': 92,
      'ENTP': 80, 'ENFP': 85, 'ESTP': 90, 'ESFP': 88,
      'INTJ': 78, 'INFJ': 80, 'ISTJ': 85, 'ISFJ': 88,
      'INTP': 75, 'INFP': 78, 'ISTP': 82, 'ISFP': 85
    },
    colorTheme: {
      primary: '#228B22', // 森林绿
      secondary: '#F0FFF0',
      accent: '#32CD32' // 酸橙绿
    }
  },

  海口: {
    id: 'haikou',
    name: '海口',
    nickname: '椰城',
    tags: ['热带风情', '海岛生活', '慢节奏', '度假氛围'],
    personalityTypes: ['度假型', '热带型', '慢节奏型'],
    description: '热带海岛城市，生活节奏缓慢，充满度假氛围',
    detailedFeatures: [
      '热带气候，四季如春',
      '海岛风情，自然环境优美',
      '生活节奏慢，压力小',
      '适合追求慢生活的休闲派'
    ],
    matchingThresholds: {
      'ENTJ': 65, 'ENFJ': 78, 'ESTJ': 68, 'ESFJ': 82,
      'ENTP': 75, 'ENFP': 90, 'ESTP': 82, 'ESFP': 95,
      'INTJ': 70, 'INFJ': 85, 'ISTJ': 72, 'ISFJ': 88,
      'INTP': 78, 'INFP': 92, 'ISTP': 75, 'ISFP': 95
    },
    colorTheme: {
      primary: '#00CED1', // 暗绿松石色
      secondary: '#F0FFFF',
      accent: '#20B2AA' // 浅海绿
    }
  },

  // 西南地区省会
  成都: {
    id: 'chengdu',
    name: '成都',
    nickname: '天府之国',
    tags: ['巴适生活', '慢节奏', '美食之都', '文艺范儿'],
    personalityTypes: ['巴适型', '慢节奏型', '文艺型'],
    description: '生活压力小，自然环境好，适合追求安逸、注重生活品质的人',
    detailedFeatures: [
      '生活节奏慢，"巴适"文化浓厚',
      '美食众多，火锅、茶文化发达',
      '文艺氛围浓，创意产业发达',
      '适合追求诗意生活的文艺青年'
    ],
    matchingThresholds: {
      'ENTJ': 70, 'ENFJ': 82, 'ESTJ': 68, 'ESFJ': 85,
      'ENTP': 78, 'ENFP': 95, 'ESTP': 75, 'ESFP': 92,
      'INTJ': 75, 'INFJ': 92, 'ISTJ': 70, 'ISFJ': 88,
      'INTP': 82, 'INFP': 98, 'ISTP': 72, 'ISFP': 95
    },
    colorTheme: {
      primary: '#FF6B35', // 川味橙红
      secondary: '#FFF4E6', // 茶馆米色
      accent: '#34C759' // 竹叶绿
    }
  },

  贵阳: {
    id: 'guiyang',
    name: '贵阳',
    nickname: '爽爽的贵阳',
    tags: ['气候宜人', '山地城市', '避暑胜地', '生态环境'],
    personalityTypes: ['生态型', '宜居型', '山地型'],
    description: '气候凉爽宜人，生态环境优美的山地城市',
    detailedFeatures: [
      '气候凉爽，是天然的避暑胜地',
      '生态环境优美，空气质量好',
      '生活成本低，房价适中',
      '适合追求生态宜居环境的人群'
    ],
    matchingThresholds: {
      'ENTJ': 72, 'ENFJ': 80, 'ESTJ': 75, 'ESFJ': 85,
      'ENTP': 78, 'ENFP': 88, 'ESTP': 75, 'ESFP': 85,
      'INTJ': 82, 'INFJ': 90, 'ISTJ': 80, 'ISFJ': 92,
      'INTP': 85, 'INFP': 95, 'ISTP': 78, 'ISFP': 92
    },
    colorTheme: {
      primary: '#228B22', // 森林绿
      secondary: '#F0FFF0',
      accent: '#32CD32' // 酸橙绿
    }
  },

  昆明: {
    id: 'kunming',
    name: '昆明',
    nickname: '春城',
    tags: ['四季如春', '花都', '民族风情', '宜居城市'],
    personalityTypes: ['春城型', '花都型', '民族型'],
    description: '四季如春的花都，民族文化丰富，气候宜人',
    detailedFeatures: [
      '四季如春，气候宜人',
      '花卉产业发达，城市美丽',
      '多民族文化融合，风情独特',
      '适合追求宜居环境的养生派'
    ],
    matchingThresholds: {
      'ENTJ': 75, 'ENFJ': 88, 'ESTJ': 72, 'ESFJ': 90,
      'ENTP': 80, 'ENFP': 92, 'ESTP': 78, 'ESFP': 95,
      'INTJ': 78, 'INFJ': 95, 'ISTJ': 75, 'ISFJ': 92,
      'INTP': 82, 'INFP': 98, 'ISTP': 72, 'ISFP': 98
    },
    colorTheme: {
      primary: '#FF69B4', // 热粉红
      secondary: '#FFF0F5',
      accent: '#FFB6C1' // 浅粉红
    }
  },

  // 西北地区省会
  西安: {
    id: 'xian',
    name: '西安',
    nickname: '长安',
    tags: ['历史古都', '文化底蕴', '十三朝古都', '丝路起点'],
    personalityTypes: ['历史型', '文化型', '古都型'],
    description: '历史底蕴深厚，工作生活平衡，适合重视文化传统的人',
    detailedFeatures: [
      '历史文化名城，古迹众多',
      '教育资源丰富，文化氛围浓厚',
      '生活成本适中，节奏不快',
      '适合重视历史文化的知识分子'
    ],
    matchingThresholds: {
      'ENTJ': 78, 'ENFJ': 85, 'ESTJ': 80, 'ESFJ': 82,
      'ENTP': 82, 'ENFP': 88, 'ESTP': 75, 'ESFP': 80,
      'INTJ': 90, 'INFJ': 95, 'ISTJ': 88, 'ISFJ': 85,
      'INTP': 92, 'INFP': 90, 'ISTP': 78, 'ISFP': 85
    },
    colorTheme: {
      primary: '#B8860B', // 暗金色
      secondary: '#FFF8DC',
      accent: '#DAA520' // 金麒麟色
    }
  },

  兰州: {
    id: 'lanzhou',
    name: '兰州',
    nickname: '金城',
    tags: ['丝路重镇', '黄河文化', '拉面之都', '西北门户'],
    personalityTypes: ['丝路型', '文化型', '美食型'],
    description: '丝绸之路重要节点，黄河文化深厚，拉面文化独特',
    detailedFeatures: [
      '丝绸之路重要节点城市',
      '黄河穿城而过，景色独特',
      '兰州拉面闻名全国',
      '适合重视文化传统的西北汉子'
    ],
    matchingThresholds: {
      'ENTJ': 78, 'ENFJ': 80, 'ESTJ': 85, 'ESFJ': 88,
      'ENTP': 75, 'ENFP': 82, 'ESTP': 88, 'ESFP': 85,
      'INTJ': 80, 'INFJ': 82, 'ISTJ': 90, 'ISFJ': 92,
      'INTP': 78, 'INFP': 80, 'ISTP': 85, 'ISFP': 88
    },
    colorTheme: {
      primary: '#CD853F', // 秘鲁色
      secondary: '#FFF8DC',
      accent: '#D2691E' // 巧克力色
    }
  },

  西宁: {
    id: 'xining',
    name: '西宁',
    nickname: '夏都',
    tags: ['高原城市', '避暑胜地', '多民族', '生态环境'],
    personalityTypes: ['高原型', '生态型', '民族型'],
    description: '高原避暑城市，多民族聚居，生态环境优美',
    detailedFeatures: [
      '高原气候，夏季凉爽宜人',
      '多民族文化交融',
      '生态环境保护良好',
      '适合追求纯净生活的自然派'
    ],
    matchingThresholds: {
      'ENTJ': 70, 'ENFJ': 82, 'ESTJ': 75, 'ESFJ': 88,
      'ENTP': 78, 'ENFP': 90, 'ESTP': 72, 'ESFP': 85,
      'INTJ': 85, 'INFJ': 95, 'ISTJ': 82, 'ISFJ': 92,
      'INTP': 88, 'INFP': 98, 'ISTP': 78, 'ISFP': 95
    },
    colorTheme: {
      primary: '#4682B4', // 钢青色
      secondary: '#F0F8FF',
      accent: '#87CEEB' // 天空蓝
    }
  },

  // 自治区首府
  呼和浩特: {
    id: 'huhehaote',
    name: '呼和浩特',
    nickname: '青城',
    tags: ['草原文化', '奶制品', '蒙古风情', '绿色生态'],
    personalityTypes: ['草原型', '生态型', '民族型'],
    description: '草原文化浓厚，蒙古族风情独特，绿色生态环境',
    detailedFeatures: [
      '草原文化底蕴深厚',
      '奶制品和羊肉美食',
      '蒙古族风情浓郁',
      '适合向往草原自由的豪迈之士'
    ],
    matchingThresholds: {
      'ENTJ': 75, 'ENFJ': 80, 'ESTJ': 82, 'ESFJ': 90,
      'ENTP': 80, 'ENFP': 88, 'ESTP': 90, 'ESFP': 95,
      'INTJ': 72, 'INFJ': 82, 'ISTJ': 78, 'ISFJ': 85,
      'INTP': 75, 'INFP': 88, 'ISTP': 82, 'ISFP': 90
    },
    colorTheme: {
      primary: '#228B22', // 森林绿
      secondary: '#F0FFF0',
      accent: '#32CD32' // 酸橙绿
    }
  },

  南宁: {
    id: 'nanning',
    name: '南宁',
    nickname: '绿城',
    tags: ['绿城', '东盟门户', '壮族文化', '南国风情'],
    personalityTypes: ['绿色型', '国际型', '民族型'],
    description: '绿树成荫的南国城市，东盟合作门户，壮族文化浓厚',
    detailedFeatures: [
      '绿化覆盖率高，环境优美',
      '中国-东盟合作门户',
      '壮族文化特色鲜明',
      '适合追求绿色生活的南国风情派'
    ],
    matchingThresholds: {
      'ENTJ': 78, 'ENFJ': 88, 'ESTJ': 75, 'ESFJ': 92,
      'ENTP': 82, 'ENFP': 95, 'ESTP': 85, 'ESFP': 98,
      'INTJ': 72, 'INFJ': 88, 'ISTJ': 75, 'ISFJ': 90,
      'INTP': 78, 'INFP': 92, 'ISTP': 75, 'ISFP': 95
    },
    colorTheme: {
      primary: '#32CD32', // 酸橙绿
      secondary: '#F0FFF0',
      accent: '#228B22' // 森林绿
    }
  },

  拉萨: {
    id: 'lasa',
    name: '拉萨',
    nickname: '日光城',
    tags: ['圣洁之城', '藏族文化', '雪域高原', '精神净土'],
    personalityTypes: ['圣洁型', '精神型', '高原型'],
    description: '雪域高原的圣洁之城，藏族文化深厚，是心灵的净土',
    detailedFeatures: [
      '藏族文化底蕴深厚',
      '宗教氛围浓厚，心灵净土',
      '高原风光，自然环境独特',
      '适合追求精神净化的修行者'
    ],
    matchingThresholds: {
      'ENTJ': 65, 'ENFJ': 85, 'ESTJ': 68, 'ESFJ': 82,
      'ENTP': 72, 'ENFP': 90, 'ESTP': 70, 'ESFP': 85,
      'INTJ': 88, 'INFJ': 98, 'ISTJ': 78, 'ISFJ': 88,
      'INTP': 85, 'INFP': 100, 'ISTP': 75, 'ISFP': 95
    },
    colorTheme: {
      primary: '#4169E1', // 皇室蓝
      secondary: '#F8F8FF',
      accent: '#9370DB' // 中紫色
    }
  },

  银川: {
    id: 'yinchuan',
    name: '银川',
    nickname: '塞上江南',
    tags: ['塞上江南', '回族文化', '黄河文明', '沙漠绿洲'],
    personalityTypes: ['江南型', '民族型', '绿洲型'],
    description: '塞上江南，回族文化浓厚，沙漠中的绿洲城市',
    detailedFeatures: [
      '塞上江南，水资源丰富',
      '回族文化特色鲜明',
      '沙漠绿洲，风光独特',
      '适合追求独特风情的文化探索者'
    ],
    matchingThresholds: {
      'ENTJ': 72, 'ENFJ': 85, 'ESTJ': 78, 'ESFJ': 90,
      'ENTP': 78, 'ENFP': 88, 'ESTP': 80, 'ESFP': 92,
      'INTJ': 80, 'INFJ': 92, 'ISTJ': 85, 'ISFJ': 95,
      'INTP': 82, 'INFP': 95, 'ISTP': 78, 'ISFP': 92
    },
    colorTheme: {
      primary: '#20B2AA', // 浅海绿
      secondary: '#F0FFFF',
      accent: '#48D1CC' // 中绿松石色
    }
  },

  乌鲁木齐: {
    id: 'wulumuqi',
    name: '乌鲁木齐',
    nickname: '乌市',
    tags: ['丝路重镇', '多民族', '边疆风情', '资源丰富'],
    personalityTypes: ['边疆型', '多元型', '资源型'],
    description: '丝绸之路重镇，多民族聚居，边疆风情独特',
    detailedFeatures: [
      '丝绸之路经济带核心区',
      '多民族文化交融',
      '边疆风情浓郁独特',
      '适合追求多元文化的冒险家'
    ],
    matchingThresholds: {
      'ENTJ': 82, 'ENFJ': 85, 'ESTJ': 88, 'ESFJ': 85,
      'ENTP': 90, 'ENFP': 92, 'ESTP': 95, 'ESFP': 90,
      'INTJ': 78, 'INFJ': 88, 'ISTJ': 82, 'ISFJ': 85,
      'INTP': 85, 'INFP': 90, 'ISTP': 88, 'ISFP': 88
    },
    colorTheme: {
      primary: '#B8860B', // 暗金色
      secondary: '#FFF8DC',
      accent: '#DAA520' // 金麒麟色
    }
  }
};

// 验证配置完整性
export const CITY_NAMES = Object.keys(CITIES_CONFIG);
export const CITY_COUNT = CITY_NAMES.length;

// 获取城市配置
export const getCityConfig = (cityName: string): CityConfig | null => {
  return CITIES_CONFIG[cityName] || null;
};

// 获取所有城市列表
export const getAllCities = (): CityConfig[] => {
  return Object.values(CITIES_CONFIG);
};