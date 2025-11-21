'use client';

import { useState } from 'react';
import { Download, FileText, FileSpreadsheet, FileJson, Loader } from 'lucide-react';

interface ExportDataProps {
  businessId: string;
}

export default function ExportData({ businessId }: ExportDataProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState('BOOKINGS');
  const [exportFormat, setExportFormat] = useState('EXCEL');

  const exportTypes = [
    { value: 'BOOKINGS', label: 'Записи' },
    { value: 'CLIENTS', label: 'Клиенты' },
    { value: 'REVENUE', label: 'Финансы' },
    { value: 'ANALYTICS', label: 'Аналитика' },
    { value: 'FULL', label: 'Полный экспорт' },
  ];

  const exportFormats = [
    { value: 'EXCEL', label: 'Excel', icon: FileSpreadsheet },
    { value: 'CSV', label: 'CSV', icon: FileText },
    { value: 'JSON', label: 'JSON', icon: FileJson },
  ];

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const response = await fetch('http://localhost:4000/api/export/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId,
          type: exportType,
          format: exportFormat,
        }),
      });

      const exportRecord = await response.json();

      // Проверяем статус экспорта
      const checkStatus = setInterval(async () => {
        const statusRes = await fetch(
          `http://localhost:4000/api/export/${exportRecord.id}`
        );
        const status = await statusRes.json();

        if (status.status === 'COMPLETED') {
          clearInterval(checkStatus);
          setIsExporting(false);
          
          // Скачиваем файл
          window.open(`http://localhost:4000${status.fileUrl}`, '_blank');
        } else if (status.status === 'FAILED') {
          clearInterval(checkStatus);
          setIsExporting(false);
          alert('Ошибка при экспорте данных');
        }
      }, 2000);

      // Таймаут на 60 секунд
      setTimeout(() => {
        clearInterval(checkStatus);
        setIsExporting(false);
      }, 60000);
    } catch (error) {
      console.error('Export error:', error);
      alert('Произошла ошибка при экспорте');
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Download className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-bold">Экспорт данных</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Что экспортировать:
          </label>
          <select
            value={exportType}
            onChange={(e) => setExportType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {exportTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Формат файла:
          </label>
          <div className="grid grid-cols-3 gap-3">
            {exportFormats.map((format) => {
              const Icon = format.icon;
              return (
                <button
                  key={format.value}
                  onClick={() => setExportFormat(format.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    exportFormat === format.value
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-1 text-purple-600" />
                  <p className="text-sm font-medium">{format.label}</p>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isExporting ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Экспортируем...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Экспортировать
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Файл будет автоматически скачан после завершения экспорта
        </p>
      </div>
    </div>
  );
}
