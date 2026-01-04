'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { containsSensitiveWords } from '@/lib/data/sensitive-words';

interface NicknameInputProps {
  onSubmit: (nickname: string) => void;
  onBack: () => void;
  backUrl: string;
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
}

/**
 * 公共昵称输入组件
 * 支持动态验证和颜色变化
 */
export default function NicknameInput({
  onSubmit,
  onBack,
  backUrl,
  title = '输入昵称',
  subtitle = '请输入您的昵称（3-15位字母和数字）',
  isLoading = false,
}: NicknameInputProps) {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  // 验证昵称：3-15位字母或字母+数字，不能是纯数字
  const validateNickname = (value: string): boolean => {
    const regex = /^[a-zA-Z0-9]{3,15}$/;
    const hasLetter = /[a-zA-Z]/.test(value);
    return regex.test(value) && hasLetter;
  };

  // 验证规则
  const validationRules = useMemo(() => {
    const value = nickname.trim();
    return {
      length: {
        label: '长度：3-15 个字符',
        valid: value.length >= 3 && value.length <= 15,
      },
      lettersAndNumbers: {
        label: '只能包含字母（a-z, A-Z）和数字（0-9）',
        valid: /^[a-zA-Z0-9]*$/.test(value),
      },
      hasLetter: {
        label: '必须包含至少一个字母（不能是纯数字）',
        valid: /[a-zA-Z]/.test(value),
      },
      noSpecialChars: {
        label: '不能包含空格、特殊字符或中文',
        valid: !/[^\x00-\x7F]/.test(value) && !/\s/.test(value),
      },
      noProfanity: {
        label: '昵称内容合法（无违禁词）',
        valid: !containsSensitiveWords(value),
      }
    };
  }, [nickname]);

  // 是否所有规则都符合
  const isValid = useMemo(() => {
    return Object.values(validationRules).every(rule => rule.valid) && nickname.trim().length > 0;
  }, [validationRules, nickname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nickname.trim()) {
      setError('请输入昵称');
      return;
    }

    if (!validateNickname(nickname.trim())) {
      setError('昵称必须为3-15位字母或字母+数字组成，不能是纯数字');
      return;
    }

    if (containsSensitiveWords(nickname.trim())) {
      setError('昵称包含不适宜的词汇，请修改');
      return;
    }

    onSubmit(nickname.trim());
  };

  return (
    <Card className="border-slate-100 dark:border-slate-800">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-primary text-4xl">person</span>
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white tracking-tight">
          {title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          {subtitle || '请输入您的昵称（3-15位字母或字母+数字，不能是纯数字）'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="nickname" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            昵称
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setError('');
            }}
            placeholder="请输入3-15位字母或字母+数字"
            maxLength={15}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            昵称将用于生成您的测试报告，仅用于标识，不会泄露您的个人信息
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2"
            disabled={!isValid || isLoading}
            isLoading={isLoading}
          >
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            {isLoading ? '处理中...' : '下一步'}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto flex items-center justify-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            返回
          </Button>
        </div>
      </form>

      {/* 提示信息 - 动态颜色 */}
      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-start gap-3 text-sm">
          <span className="material-symbols-outlined text-[18px] mt-0.5 text-slate-500 dark:text-slate-400">info</span>
          <div className="flex-1">
            <p className="font-medium mb-1 text-slate-900 dark:text-slate-100">昵称要求</p>
            <ul className="space-y-1.5">
              {Object.entries(validationRules).map(([key, rule]) => {
                const isActive = nickname.trim().length > 0;
                const colorClass = isActive
                  ? rule.valid
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                  : 'text-slate-500 dark:text-slate-400';

                return (
                  <li key={key} className={`flex items-center gap-2 transition-colors ${colorClass}`}>
                    <span className="material-symbols-outlined text-[16px]">
                      {isActive && rule.valid ? 'check_circle' : isActive ? 'cancel' : 'radio_button_unchecked'}
                    </span>
                    <span>{rule.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}

