import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ExplosionTransitionProps {
  onComplete: () => void;
}

export default function ExplosionTransition({ onComplete }: ExplosionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fragmentSize = 40; // 碎片大小

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const mainContent = document.querySelector('#root') as HTMLElement; // 修复类型
    if (!mainContent) return;

    // 创建一个临时的canvas来捕获页面内容
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    // 设置canvas大小为视口大小
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // 将页面内容转换为图片
    const html2canvas = async () => {
      // 先隐藏爆炸容器以免被截图
      container.style.visibility = 'hidden';
      
      // 将页面内容绘制到canvas
      context.fillStyle = getComputedStyle(document.body).backgroundColor;
      context.fillRect(0, 0, width, height);
      
      // 使用foreignObject来渲染HTML内容
      const data = `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'>
        <foreignObject width='100%' height='100%'>
          <div xmlns='http://www.w3.org/1999/xhtml'>
            ${mainContent.innerHTML}
          </div>
        </foreignObject>
      </svg>`;
      
      const img = new Image();
      const blob = new Blob([data], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      return new Promise<void>((resolve) => {
        img.onload = () => {
          context.drawImage(img, 0, 0);
          URL.revokeObjectURL(url);
          container.style.visibility = 'visible';
          resolve();
        };
        img.src = url;
      });
    };

    // 创建碎片
    const createFragments = () => {
      const cols = Math.ceil(width / fragmentSize);
      const rows = Math.ceil(height / fragmentSize);
      const fragments: HTMLDivElement[] = [];

      // 隐藏原始内容
      mainContent.style.visibility = 'hidden';

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const fragment = document.createElement('div');
          
          // 计算这个碎片在canvas中的位置
          const x = j * fragmentSize;
          const y = i * fragmentSize;
          
          // 从canvas中获取对应区域的图像数据
          const imageData = context.getImageData(x, y, fragmentSize, fragmentSize);
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = fragmentSize;
          tempCanvas.height = fragmentSize;
          const tempContext = tempCanvas.getContext('2d');
          if (tempContext) {
            tempContext.putImageData(imageData, 0, 0);
          }

          // 设置碎片样式
          fragment.style.cssText = `
            position: absolute;
            width: ${fragmentSize}px;
            height: ${fragmentSize}px;
            left: ${x}px;
            top: ${y}px;
            background-image: url(${tempCanvas.toDataURL()});
            background-size: cover;
            transform-origin: center;
            transition: all 1.5s cubic-bezier(0.5, 0, 0.75, 0);
            backface-visibility: hidden;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
          `;
          
          container.appendChild(fragment);
          fragments.push(fragment);
        }
      }
      return fragments;
    };

    // 执行爆炸动画
    const explode = (fragments: HTMLDivElement[]) => {
      requestAnimationFrame(() => {
        fragments.forEach((fragment) => {
          const delay = Math.random() * 0.5;
          const angle = Math.random() * Math.PI * 2;
          const force = 1000 + Math.random() * 1500;
          const rotateX = -180 + Math.random() * 360;
          const rotateY = -180 + Math.random() * 360;
          const rotateZ = -180 + Math.random() * 360;

          fragment.style.transition = `all 1.5s cubic-bezier(0.5, 0, 0.75, 0) ${delay}s`;
          fragment.style.transform = `
            translate3d(${Math.cos(angle) * force}px, 
                       ${Math.sin(angle) * force}px, 
                       ${Math.random() * 1000}px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            rotateZ(${rotateZ}deg)
            scale(0)
          `;
          fragment.style.opacity = '0';
          fragment.style.boxShadow = '0 0 20px rgba(255,255,255,0.5)';
        });

        // 动画完成后清理
        setTimeout(() => {
          container.innerHTML = '';
          mainContent.style.visibility = 'visible';
          onComplete();
        }, 2500);
      });
    };

    // 执行整个过程
    const runEffect = async () => {
      await html2canvas();
      const fragments = createFragments();
      explode(fragments);
    };

    runEffect();

    return () => {
      container.innerHTML = '';
      mainContent.style.visibility = 'visible';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden perspective-1000">
      <div ref={containerRef} className="relative w-full h-full transform-style-3d" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute inset-0 bg-white"
      />
    </div>
  );
} 