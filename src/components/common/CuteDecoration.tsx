'use client';

import { useEffect, useState } from 'react';

/**
 * 随机可爱装饰元素
 */
export default function CuteDecoration() {
  const [decorations, setDecorations] = useState<Array<{ emoji: string; x: number; y: number; size: number; rotation: number }>>([]);

  useEffect(() => {
    // 随机生成装饰元素，避免遮挡文字内容
    // 只在边缘区域放置装饰元素
    const emojis = ['✨', '🌟', '💫', '⭐', '🎉', '🎊', '💖', '🌸', '🌺', '🌻', '🦋', '🐝', '🌈', '☁️', '⭐️'];
    const newDecorations = Array.from({ length: 6 }, () => {
      // 只在边缘 10% 的区域放置装饰元素
      const isEdge = Math.random() > 0.5;
      let x, y;
      if (isEdge) {
        // 左右边缘
        x = Math.random() < 0.5 ? Math.random() * 8 : 92 + Math.random() * 8; // 0-8% 或 92-100%
        y = Math.random() * 100;
      } else {
        // 上下边缘
        x = Math.random() * 100;
        y = Math.random() < 0.5 ? Math.random() * 8 : 92 + Math.random() * 8; // 0-8% 或 92-100%
      }
      return {
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x,
        y,
        size: 12 + Math.random() * 8, // 12-20px，减小尺寸
        rotation: Math.random() * 360,
      };
    });
    setDecorations(newDecorations);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" style={{ willChange: 'auto' }}>
      {decorations.map((dec, index) => (
        <span
          key={index}
          className="absolute"
          style={{
            left: `${dec.x}%`,
            top: `${dec.y}%`,
            fontSize: `${dec.size}px`,
            transform: `translate(-50%, -50%) rotate(${dec.rotation}deg)`,
            opacity: 0.2 + Math.random() * 0.3, // 0.2-0.5，降低透明度
            zIndex: 0,
            willChange: 'auto',
          }}
        >
          {dec.emoji}
        </span>
      ))}
    </div>
  );
}

