'use client';

import { useState } from 'react';
import { CreditCard, Wallet, DollarSign, X } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  amount: number;
  businessId: string;
  userId: string;
  onSuccess?: () => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  bookingId,
  amount,
  businessId,
  userId,
  onSuccess,
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [useBonuses, setUseBonuses] = useState(false);
  const [bonusAmount, setBonusAmount] = useState(0);

  if (!isOpen) return null;

  const paymentMethods = [
    {
      id: 'YOOKASSA',
      name: 'Банковская карта',
      icon: CreditCard,
      description: 'Visa, Mastercard, МИР',
    },
    {
      id: 'CASH',
      name: 'Наличные',
      icon: Wallet,
      description: 'Оплата на месте',
    },
  ];

  const handlePayment = async () => {
    if (!selectedMethod) return;

    setIsProcessing(true);

    try {
      const finalAmount = useBonuses ? amount - bonusAmount : amount;

      const response = await fetch('http://localhost:4000/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          amount: finalAmount,
          method: selectedMethod,
          userId,
          businessId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        if (result.paymentUrl) {
          // Перенаправляем на страницу оплаты
          window.location.href = result.paymentUrl;
        } else {
          // Оплата наличными - просто закрываем модалку
          onSuccess?.();
          onClose();
        }
      } else {
        alert('Ошибка при создании платежа: ' + result.error);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Произошла ошибка при оплате');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Оплата записи</h2>

        <div className="mb-6 p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Сумма к оплате:</span>
            <span className="text-2xl font-bold text-purple-600">
              {amount} ₽
            </span>
          </div>
          
          {useBonuses && bonusAmount > 0 && (
            <div className="mt-2 pt-2 border-t border-purple-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Списание бонусов:</span>
                <span className="text-green-600 font-semibold">
                  -{bonusAmount} ₽
                </span>
              </div>
              <div className="flex items-center justify-between mt-1 font-bold">
                <span>Итого:</span>
                <span className="text-purple-600">
                  {amount - bonusAmount} ₽
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={useBonuses}
              onChange={(e) => setUseBonuses(e.target.checked)}
              className="w-4 h-4 text-purple-600"
            />
            <DollarSign className="w-5 h-5 text-purple-600" />
            <span className="text-sm">
              Использовать бонусы (доступно: 0 ₽)
            </span>
          </label>
        </div>

        <div className="space-y-3 mb-6">
          <p className="text-sm font-medium text-gray-700">Способ оплаты:</p>
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selectedMethod === method.id
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6 text-purple-600" />
                  <div className="text-left flex-1">
                    <p className="font-medium">{method.name}</p>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </div>
                  {selectedMethod === method.id && (
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={handlePayment}
          disabled={!selectedMethod || isProcessing}
          className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? 'Обработка...' : 'Оплатить'}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Нажимая "Оплатить", вы соглашаетесь с условиями оплаты
        </p>
      </div>
    </div>
  );
}
