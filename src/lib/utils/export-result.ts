/**
 * 测评结果导出和分享工具
 * 
 * 确保导出的图片与页面显示完全一致：
 * 1. 使用原始元素的实际宽度和样式
 * 2. 保持所有边框、圆角、阴影
 * 3. 确保所有内容（图表、文字、装饰元素）完整显示
 * 4. 等待所有资源加载完成
 */

import html2canvas from 'html2canvas';

// 导出配置
const EXPORT_CONFIG = {
  scale: 2,   // 2倍图，保证清晰度
  padding: 40, // 内边距
  defaultWidth: 1200, // 默认强制使用桌面端宽度
};

/**
 * 准备克隆元素用于导出
 * @param elementId 目标元素ID
 * @param forceWidth 强制宽度 (可选)
 * @returns 克隆的容器（包含克隆体），如果失败返回 null
 */
async function prepareCloneForExport(elementId: string, forceWidth: number = EXPORT_CONFIG.defaultWidth): Promise<HTMLElement | null> {
  const originalElement = document.getElementById(elementId);
  if (!originalElement) {
    console.error('❌ 找不到需要导出的元素');
    return null;
  }

  // 1. 获取原始元素的实际尺寸和样式
  const computedStyle = window.getComputedStyle(originalElement);

  // 使用强制宽度，或者原始宽度（取大值）
  const actualWidth = forceWidth;
  // 高度设为 auto，让内容自适应

  // 2. 创建隐藏的沙箱容器
  const sandbox = document.createElement('div');
  sandbox.id = 'export-sandbox';
  sandbox.style.position = 'absolute';
  sandbox.style.top = '0';
  sandbox.style.left = '0';
  sandbox.style.width = `${actualWidth + EXPORT_CONFIG.padding * 2}px`;
  sandbox.style.zIndex = '-9999';
  sandbox.style.visibility = 'visible';
  sandbox.style.backgroundColor = computedStyle.backgroundColor || '#ffffff';

  // 复制当前页面的 dark mode 类
  if (document.documentElement.classList.contains('dark')) {
    sandbox.classList.add('dark');
    if (computedStyle.backgroundColor === 'rgba(0, 0, 0, 0)' || computedStyle.backgroundColor === 'transparent') {
      sandbox.style.backgroundColor = '#0f172a'; // dark mode 背景色 (slate-900)
    }
  }

  // 3. 克隆目标元素
  const clone = originalElement.cloneNode(true) as HTMLElement;

  // 4. 重置克隆元素的样式，强制应用桌面端宽度
  clone.style.margin = '0 auto'; // 居中
  clone.style.width = `${actualWidth}px`; // 强制宽度
  clone.style.height = 'auto';
  clone.style.maxWidth = 'none';
  clone.style.minWidth = `${actualWidth}px`; // 确保网格布局不塌缩
  clone.style.maxHeight = 'none';
  clone.style.minHeight = 'auto';
  clone.style.overflow = 'visible';
  clone.style.transform = 'none';
  clone.style.animation = 'none';
  clone.style.transition = 'none';
  clone.style.position = 'relative';
  clone.style.boxSizing = 'border-box';
  clone.style.visibility = 'visible';
  clone.style.opacity = '1';

  // 关键：强制移除可能导致移动端布局的类（可选，依赖 Tailwind 响应式则不需要）
  // 但我们需要确保克隆容器足够宽，触发 lg: 样式

  // 保留原始背景色
  if (computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && computedStyle.backgroundColor !== 'transparent') {
    clone.style.backgroundColor = computedStyle.backgroundColor;
  }

  // 5. 处理 Canvas 元素
  const originalCanvases = originalElement.querySelectorAll('canvas');
  const clonedCanvases = clone.querySelectorAll('canvas');
  originalCanvases.forEach((orig, index) => {
    const dest = clonedCanvases[index];
    if (dest) {
      const ctx = dest.getContext('2d');
      if (ctx) {
        // 重绘 canvas 时可能需要重新调整大小，这里简单复制
        dest.width = orig.width;
        dest.height = orig.height;
        ctx.drawImage(orig, 0, 0);
      }
    }
  });

  // 6. 处理 input/textarea 值
  const originalInputs = originalElement.querySelectorAll('input, textarea');
  const clonedInputs = clone.querySelectorAll('input, textarea');
  originalInputs.forEach((orig, index) => {
    const dest = clonedInputs[index] as HTMLInputElement | HTMLTextAreaElement;
    if (dest) {
      dest.value = (orig as HTMLInputElement | HTMLTextAreaElement).value;
    }
  });

  // 7. 递归处理所有子元素，强制展开
  const allElements = clone.querySelectorAll('*');
  allElements.forEach((el) => {
    const htmlEl = el as HTMLElement;
    // 移除可能限制宽度的样式
    // htmlEl.style.maxWidth = 'none'; 
    // htmlEl.style.width = 'auto'; // 不建议全局重置，可能会破坏 grid
  });

  // 8. 将克隆体放入包装器
  const wrapper = document.createElement('div');
  wrapper.style.padding = `${EXPORT_CONFIG.padding}px`;
  wrapper.style.boxSizing = 'border-box';
  wrapper.style.width = '100%';
  wrapper.style.display = 'flex';
  wrapper.style.justifyContent = 'center';
  wrapper.style.backgroundColor = sandbox.style.backgroundColor;

  wrapper.appendChild(clone);
  sandbox.appendChild(wrapper);
  document.body.appendChild(sandbox);

  // 9. 等待资源加载
  // 9.1 等待图片加载
  const images = Array.from(clone.querySelectorAll('img'));
  await Promise.all(images.map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(resolve => {
      img.onload = resolve;
      img.onerror = resolve;
      setTimeout(resolve, 1000);
    });
  }));

  // 9.2 等待字体加载
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  // 9.3 等待 SVG 图表完全渲染 (Recharts)
  // Recharts 需要时间在新的宽容器中重绘
  // 触发一次 window resize 事件可能有助于触发重绘，但这是沙箱。
  // 我们多等一会儿。
  await new Promise(resolve => setTimeout(resolve, 800));

  return sandbox;
}

/**
 * 清理沙箱
 */
function cleanupSandbox() {
  const sandbox = document.getElementById('export-sandbox');
  if (sandbox) {
    document.body.removeChild(sandbox);
  }
}

/**
 * 生成图片 Canvas (核心公共逻辑)
 * @param elementId 目标元素ID
 * @returns Promise<{ canvas: HTMLCanvasElement, cleanup: () => void } | null>
 */
async function generateImageCanvas(elementId: string): Promise<{ canvas: HTMLCanvasElement, cleanup: () => void } | null> {
  // 1. 准备环境 (强制桌面宽度)
  const forceWidth = EXPORT_CONFIG.defaultWidth;
  const sandbox = await prepareCloneForExport(elementId, forceWidth);

  if (!sandbox) return null;

  // 定义清理函数
  const cleanup = () => {
    const sb = document.getElementById('export-sandbox');
    if (sb && sb.parentNode) {
      sb.parentNode.removeChild(sb);
    }
  };

  try {
    // 2. 计算包含 padding 的总尺寸
    const totalWidth = forceWidth + EXPORT_CONFIG.padding * 2;
    const totalHeight = sandbox.offsetHeight;

    // 3. 配置 html2canvas
    const options: any = {
      backgroundColor: sandbox.style.backgroundColor,
      scale: EXPORT_CONFIG.scale,
      useCORS: true,
      allowTaint: true,
      logging: false,
      foreignObjectRendering: true, // 启用以支持 SVG 渲染
      width: totalWidth,
      height: totalHeight,
      windowWidth: totalWidth, // 关键：告诉 html2canvas 视口是这么宽，触发 media queries
      windowHeight: totalHeight,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      onclone: (clonedDoc: Document) => {
        // 确保 Material Symbols 字体正确加载
        const style = clonedDoc.createElement('style');
        style.textContent = `
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
          * {
            font-family: inherit;
          }
          /* 强制 Tailwind lg 断点生效 */
          @media (min-width: 1024px) {
            .lg\\:grid-cols-2 {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }
        `;
        clonedDoc.head.appendChild(style);
      },
    };

    // 4. 执行截图
    const canvas = await html2canvas(sandbox, options);
    return { canvas, cleanup };

  } catch (error) {
    console.error('❌ 生成 Canvas 失败:', error);
    cleanup();
    return null;
  }
}

/**
 * 导出结果为图片
 * @param elementId 目标元素ID
 * @param filename 文件名
 */
export async function exportAsImage(
  elementId: string,
  filename: string = '测评结果.png'
): Promise<boolean> {
  try {
    console.log('📸 开始导出图片:', { elementId, filename });

    const result = await generateImageCanvas(elementId);
    if (!result) return false;

    const { canvas, cleanup } = result;

    // 导出 Blob
    canvas.toBlob((blob) => {
      if (!blob) {
        console.error('❌ 生成图片 Blob 失败');
        cleanup();
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      console.log('✅ 图片下载成功');

      cleanup();
    }, 'image/png');

    return true;

  } catch (error) {
    console.error('❌ 导出图片过程中发生错误:', error);
    return false;
  }
}

/**
 * 分享图片（使用 Web Share API）
 * 复用同样的导出逻辑
 */
export async function shareImage(
  elementId: string,
  title: string,
  text: string
): Promise<boolean> {
  try {
    console.log('📤 开始分享图片:', { elementId });

    const result = await generateImageCanvas(elementId);
    if (!result) return false;

    const { canvas, cleanup } = result;

    // 转换并分享
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        cleanup(); // 这里的 cleanup 可以提前执行，因为 blob 已经生成

        if (!blob) {
          console.error('❌ 分享时生成图片失败');
          resolve(false);
          return;
        }

        const file = new File([blob], 'result.png', { type: 'image/png' });

        try {
          // 移动端分享
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title,
              text,
              files: [file]
            });
            console.log('✅ 分享成功');
            resolve(true);
          } else {
            // 电脑端或不支持分享的浏览器 -> 降级为下载
            console.warn('⚠️ 设备不支持分享文件，降级为下载');
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = '测评结果.png';
            link.click();
            URL.revokeObjectURL(url);
            resolve(true);
          }
        } catch (shareError) {
          // 用户取消分享不报错
          if ((shareError as Error).name !== 'AbortError') {
            console.error('❌ 分享操作出错:', shareError);
          }
          resolve(false);
        }
      }, 'image/png');
    });

  } catch (error) {
    console.error('❌ 分享过程异常:', error);
    return false;
  }
}
