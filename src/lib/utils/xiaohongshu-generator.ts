/**
 * 小红书风格分享图生成器
 * 基于Canvas API实现简单而美观的分享图生成
 */

import { getCityConfig } from '@/lib/data/cities-config';
import type { CityPersonalityResult } from '@/types';

interface ShareImageConfig {
  width: number;
  height: number;
  padding: number;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontSize: {
    title: number;
    subtitle: number;
    body: number;
    small: number;
  };
}

// 默认配置
const DEFAULT_CONFIG: ShareImageConfig = {
  width: 750,
  height: 1000,
  padding: 40,
  backgroundColor: '#ffffff',
  textColor: '#333333',
  accentColor: '#6366f1',
  fontSize: {
    title: 32,
    subtitle: 24,
    body: 18,
    small: 14
  }
};

/**
 * 生成城市性格测试分享图
 */
export const generateCityPersonalityShareImage = async (
  result: CityPersonalityResult,
  nickname: string = '匿名用户'
): Promise<string> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('无法创建Canvas上下文');
  }

  const config = DEFAULT_CONFIG;
  const cityConfig = getCityConfig(result.matchedCity);
  
  // 设置画布大小
  canvas.width = config.width;
  canvas.height = config.height;

  // 使用城市主色调作为背景渐变
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  const primaryColor = cityConfig?.colorTheme?.primary || config.accentColor;
  const secondaryColor = cityConfig?.colorTheme?.secondary || '#f8fafc';
  
  gradient.addColorStop(0, secondaryColor);
  gradient.addColorStop(1, '#ffffff');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 设置文本渲染属性
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  let currentY = config.padding;

  // 1. 标题区域
  ctx.fillStyle = primaryColor;
  ctx.font = `bold ${config.fontSize.title}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  ctx.fillText('🏙️ 我的城市性格', config.padding, currentY);
  currentY += config.fontSize.title + 20;

  // 2. 用户信息
  ctx.fillStyle = config.textColor;
  ctx.font = `${config.fontSize.small}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  ctx.fillText(`测试者：${nickname}`, config.padding, currentY);
  currentY += config.fontSize.small + 30;

  // 3. 核心结果卡片背景
  const cardPadding = 30;
  const cardY = currentY;
  const cardHeight = 200;
  
  // 绘制卡片背景
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 4;
  roundRect(ctx, config.padding, cardY, canvas.width - config.padding * 2, cardHeight, 16);
  ctx.fill();
  
  // 清除阴影
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // 4. 城市名称（大字）
  ctx.fillStyle = primaryColor;
  ctx.font = `bold ${config.fontSize.title + 8}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(
    result.matchedCity, 
    canvas.width / 2, 
    cardY + cardPadding
  );

  // 5. MBTI类型和匹配度
  ctx.textAlign = 'center';
  ctx.fillStyle = config.textColor;
  ctx.font = `${config.fontSize.subtitle}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  ctx.fillText(
    `${result.mbtiType} · ${result.matchPercentage}% 匹配`, 
    canvas.width / 2, 
    cardY + cardPadding + 50
  );

  // 6. 城市昵称或描述
  if (cityConfig?.nickname) {
    ctx.fillStyle = '#666666';
    ctx.font = `${config.fontSize.body}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.fillText(
      cityConfig.nickname,
      canvas.width / 2,
      cardY + cardPadding + 85
    );
  }

  currentY = cardY + cardHeight + 40;

  // 7. 性格标签
  ctx.textAlign = 'left';
  ctx.fillStyle = config.textColor;
  ctx.font = `bold ${config.fontSize.body}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  ctx.fillText('我的性格标签：', config.padding, currentY);
  currentY += config.fontSize.body + 15;

  // 绘制标签
  const tagPadding = 12;
  const tagMargin = 8;
  let tagX = config.padding;
  let tagY = currentY;
  
  ctx.font = `${config.fontSize.small}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  
  result.personalityTags.forEach((tag, index) => {
    const tagWidth = ctx.measureText(tag).width + tagPadding * 2;
    
    // 换行检查
    if (tagX + tagWidth > canvas.width - config.padding) {
      tagX = config.padding;
      tagY += 35;
    }
    
    // 绘制标签背景
    ctx.fillStyle = primaryColor + '20'; // 20% 透明度
    roundRect(ctx, tagX, tagY, tagWidth, 28, 14);
    ctx.fill();
    
    // 绘制标签文字
    ctx.fillStyle = primaryColor;
    ctx.textAlign = 'center';
    ctx.fillText(
      tag, 
      tagX + tagWidth / 2, 
      tagY + 8
    );
    
    tagX += tagWidth + tagMargin;
  });

  currentY = tagY + 50;

  // 8. 城市特色（如果有）
  if (cityConfig?.tags && cityConfig.tags.length > 0) {
    ctx.textAlign = 'left';
    ctx.fillStyle = config.textColor;
    ctx.font = `bold ${config.fontSize.body}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.fillText(`${result.matchedCity}的特色：`, config.padding, currentY);
    currentY += config.fontSize.body + 15;

    // 显示前4个城市标签
    const cityTags = cityConfig.tags.slice(0, 4);
    tagX = config.padding;
    tagY = currentY;
    
    ctx.font = `${config.fontSize.small}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    
    cityTags.forEach(tag => {
      const tagWidth = ctx.measureText(tag).width + tagPadding * 2;
      
      // 换行检查
      if (tagX + tagWidth > canvas.width - config.padding) {
        tagX = config.padding;
        tagY += 35;
      }
      
      // 绘制标签背景
      ctx.fillStyle = '#10b981' + '20'; // 绿色，20% 透明度
      roundRect(ctx, tagX, tagY, tagWidth, 28, 14);
      ctx.fill();
      
      // 绘制标签文字
      ctx.fillStyle = '#059669';
      ctx.textAlign = 'center';
      ctx.fillText(
        tag, 
        tagX + tagWidth / 2, 
        tagY + 8
      );
      
      tagX += tagWidth + tagMargin;
    });
  }

  // 9. 底部水印
  ctx.textAlign = 'center';
  ctx.fillStyle = '#999999';
  ctx.font = `${config.fontSize.small}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  ctx.fillText(
    '城市性格测试 · 发现你的命定之城',
    canvas.width / 2,
    canvas.height - 60
  );
  
  ctx.fillText(
    '快来测测你的城市性格吧～',
    canvas.width / 2,
    canvas.height - 30
  );

  return canvas.toDataURL('image/png', 0.9);
};

/**
 * 绘制圆角矩形
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * 下载分享图
 */
export const downloadShareImage = (dataURL: string, filename: string = '城市性格测试结果') => {
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * 分享图片（如果支持Web Share API）
 */
export const shareGeneratedImage = async (dataURL: string, text: string = '我的城市性格测试结果') => {
  if (navigator.share) {
    try {
      // 将dataURL转换为Blob
      const response = await fetch(dataURL);
      const blob = await response.blob();
      const file = new File([blob], '城市性格测试结果.png', { type: 'image/png' });
      
      await navigator.share({
        text,
        files: [file]
      });
      
      return true;
    } catch (error) {
      console.error('Share failed:', error);
      // 降级到下载
      downloadShareImage(dataURL);
      return false;
    }
  } else {
    // 不支持Web Share API，直接下载
    downloadShareImage(dataURL);
    return false;
  }
};