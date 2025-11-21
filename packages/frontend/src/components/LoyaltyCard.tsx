'use client';

import { useState, useEffect } from 'react';
import { Gift, TrendingUp, History } from 'lucide-react';

interface LoyaltyData {
  bonusPoints: number;
  totalSpent: number;
}

interface LoyaltyHistoryItem {
  id: string;
  type: string;
  points: number;
  description: string;
  createdAt: string;
}

export default function LoyaltyCard({ userId }: { userId: string }) {
  const [data, setData] = useState<LoyaltyData | null>(null);
  const [history, setHistory] = useState<LoyaltyHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchLoyaltyData();
  }, [userId]);

  const fetchLoyaltyData = async () => {
    try {
      const [balanceRes, historyRes] = await Promise.all([
        fetch(`http://localhost:4000/api/loyalty/balance/${userId}`),
        fetch(`http://localhost:4000/api/loyalty/history/${userId}?limit=10`),
      ]);

      const balance = await balanceRes.json();
      const historyData = await historyRes.json();

      setData(balance);
      setHistory(historyData);
    } catch (error) {
      console.error('Failed to fetch loyalty data:', error);
    }
  };

  if (!data) {
    return (
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 text-white animate-pulse">
        <div className="h-8 bg-white/20 rounded w-1/2 mb-4" />
        <div className="h-12 bg-white/20 rounded w-3/4" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Gift className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Программа лояльности</h3>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <History className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-purple-200 text-sm mb-1">Ваши бонусы</p>
            <p className="text-4xl font-bold">{data.bonusPoints} ₽</p>
            <p className="text-purple-200 text-xs mt-1">
              1 бонус = 1 рубль при оплате
            </p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/20">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-200" />
              <div>
                <p className="text-xs text-purple-200">Всего потрачено</p>
                <p className="font-semibold">{data.totalSpent.toLocaleString()} ₽</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white/10 rounded-lg">
          <p className="text-sm">
            💡 Получайте 5% кэшбэк с каждой записи и используйте бонусы для оплаты!
          </p>
        </div>
      </div>

      {showHistory && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="font-semibold mb-4">История начислений</h4>
          <div className="space-y-3">
            {history.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                История пуста
              </p>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      {item.description || 'Операция'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                  <div
                    className={`font-semibold ${
                      item.points > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {item.points > 0 ? '+' : ''}
                    {item.points} ₽
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
