'use client';

import { useState } from 'react';
import Button from './Button';

interface ActivationCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVerify: (code: string) => Promise<boolean>;
    title?: string;
    description?: string;
}

export default function ActivationCodeModal({
    isOpen,
    onClose,
    onVerify,
    title = '解锁完整报告',
    description = '请输入激活码以查看详细的测评分析与改善建议。',
}: ActivationCodeModalProps) {
    const [code, setCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState('');
    const [showQRCodePreview, setShowQRCodePreview] = useState(false);

    if (!isOpen) return null;

    const handleVerify = async () => {
        if (!code.trim()) {
            setError('请输入激活码');
            return;
        }

        setIsVerifying(true);
        setError('');

        try {
            const success = await onVerify(code.trim());
            if (!success) {
                setError('激活码无效或已过期，请核对后重试');
            } else {
                // 验证成功，通常父组件会处理后续逻辑（如关闭弹窗、提交数据）
            }
        } catch (err) {
            setError('验证过程中发生错误，请稍后重试');
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 relative">
                    {/* 顶部装饰 */}
                    <div className="h-3 bg-gradient-to-r from-primary to-purple-500" />

                    {/* 关闭按钮 */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors group"
                        aria-label="关闭"
                    >
                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white text-[20px]">
                            close
                        </span>
                    </button>

                    <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-3xl text-primary">lock_open</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            {title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                激活码 / 序列号
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-slate-400">key</span>
                                </div>
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => {
                                        setCode(e.target.value);
                                        setError('');
                                    }}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400"
                                    placeholder="在此输入您的激活码"
                                    autoFocus
                                />
                            </div>
                            {error && (
                                <div className="mt-2 flex items-center gap-1.5 text-red-600 text-sm animate-in slide-in-from-top-1">
                                    <span className="material-symbols-outlined text-[18px]">error</span>
                                    {error}
                                </div>
                            )}
                        </div>

                        <Button
                            className="w-full py-3.5 text-lg font-medium shadow-lg shadow-primary/20"
                            onClick={handleVerify}
                            isLoading={isVerifying}
                            disabled={isVerifying}
                            size="lg"
                        >
                            立即解锁
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-100 dark:border-slate-700"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-slate-800 px-2 text-slate-400">或者</span>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                还没有激活码？
                            </p>
                            <div className="flex flex-col items-center gap-3">
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <span className="text-red-500 text-lg">📱</span>
                                    用小红书扫码获取激活码
                                </p>
                                <div 
                                    className="bg-white p-3 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow group relative"
                                    onClick={() => setShowQRCodePreview(true)}
                                >
                                    <img 
                                        src="/images/xhsxz.png" 
                                        alt="小红书二维码" 
                                        className="w-40 h-40 object-contain"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl transition-colors flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity text-3xl">
                                            zoom_in
                                        </span>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    扫描二维码关注小红书「心智研习社」<br />
                                    <span className="text-primary">点击图片可放大</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            {/* 二维码图片预览模态框 */}
            {showQRCodePreview && (
                <div 
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setShowQRCodePreview(false)}
                >
                    <div className="relative animate-in zoom-in-95 duration-200">
                        {/* 关闭按钮 */}
                        <button
                            onClick={() => setShowQRCodePreview(false)}
                            className="absolute -top-12 right-0 flex items-center gap-2 text-white hover:text-slate-200 transition-colors"
                        >
                            <span className="text-sm font-medium">关闭</span>
                            <span className="material-symbols-outlined text-2xl">close</span>
                        </button>
                        
                        {/* 原图大小的二维码 */}
                        <div className="bg-white p-6 rounded-2xl shadow-2xl">
                            <img 
                                src="/images/xhsxz.png" 
                                alt="小红书二维码 - 原图" 
                                className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain"
                                onClick={(e) => e.stopPropagation()}
                            />
                            <p className="text-center text-slate-600 text-sm mt-4">
                                扫描二维码关注小红书「心智研习社」获取激活码
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
