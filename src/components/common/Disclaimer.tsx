import React from 'react';

interface DisclaimerProps {
  className?: string;
}

export default function Disclaimer({ className = '' }: DisclaimerProps) {
  return (
    <div className={`rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800/50 p-6 ${className}`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0 mt-0.5">⚠️</span>
        <div className="flex-1">
          <h3 className="text-red-800 dark:text-red-300 font-bold text-sm mb-2">重要提示</h3>
          <div className="text-red-700 dark:text-red-300 text-xs leading-relaxed space-y-2">
            <p>
              <strong>本测试仅供自我了解使用，不构成任何医学诊断、心理诊断或治疗建议。</strong>
            </p>
            <p>
              本平台不提供医疗诊断、治疗或咨询服务。如需专业帮助，请咨询医疗机构或心理健康从业者。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


