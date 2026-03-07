import Link from 'next/link';
import { Shield, ArrowLeft, Building2, Users, Calendar, BarChart3 } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Q-Link
              </span>
            </div>
            <Link 
              href="/" 
              className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>На главную</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Политика конфиденциальности
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Мы серьезно относимся к защите ваших персональных данных в системе управления бизнесом Q-Link
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Последнее обновление: 7 марта 2026 г.
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="p-8 lg:p-12">
              
              {/* Introduction */}
              <div className="mb-10 p-6 bg-blue-50 rounded-xl border-l-4 border-blue-600">
                <h2 className="text-lg font-semibold text-blue-900 mb-2">О Q-Link</h2>
                <p className="text-blue-800">
                  Q-Link — это комплексная система управления бизнесом, которая помогает компаниям эффективно управлять клиентами, 
                  сотрудниками, услугами и аналитикой. Мы обеспечиваем высокий уровень защиты всех данных наших пользователей.
                </p>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700">
                
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">1</span>
                    </span>
                    Основные определения
                  </h2>
                  <div className="grid gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p><strong className="text-blue-600">Персональные данные</strong> — любая информация, относящаяся к определенному физическому лицу (ФИО, телефон, email, должность).</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p><strong className="text-blue-600">Обработка данных</strong> — сбор, запись, систематизация, накопление, хранение, уточнение, использование, передача, блокирование, удаление персональных данных.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p><strong className="text-blue-600">Q-Link (Оператор)</strong> — система управления бизнесом, осуществляющая обработку персональных данных пользователей.</p>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">2</span>
                    </span>
                    Какие данные мы собираем
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 border border-gray-200 rounded-xl">
                      <Users className="w-8 h-8 text-blue-600 mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Данные пользователей</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• ФИО и контактная информация</li>
                        <li>• Email и номер телефона</li>
                        <li>• Должность и роль в системе</li>
                      </ul>
                    </div>
                    <div className="p-6 border border-gray-200 rounded-xl">
                      <Calendar className="w-8 h-8 text-blue-600 mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Бизнес-данные</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Информация о клиентах</li>
                        <li>• Записи на услуги</li>
                        <li>• Данные о сотрудниках</li>
                      </ul>
                    </div>
                  </div>
                </section>
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">3</span>
                    </span>
                    Цели обработки данных
                  </h2>
                  <div className="grid gap-4">
                    <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p><strong>Предоставление услуг:</strong> Обеспечение работы системы управления бизнесом, создание и управление записями клиентов.</p>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p><strong>Аналитика и отчетность:</strong> Формирование статистики и аналитических отчетов для улучшения бизнес-процессов.</p>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p><strong>Техническая поддержка:</strong> Обеспечение стабильной работы системы и решение технических вопросов.</p>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p><strong>Уведомления:</strong> Отправка важных уведомлений о записях, изменениях в системе.</p>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">4</span>
                    </span>
                    Защита данных
                  </h2>
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <BarChart3 className="w-8 h-8 text-blue-600 mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-3">Меры безопасности</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>Шифрование данных при передаче и хранении</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>Контроль доступа и аутентификация пользователей</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>Регулярное резервное копирование</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>Мониторинг безопасности 24/7</span>
                      </li>
                    </ul>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">5</span>
                    </span>
                    Ваши права
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Право на доступ</h4>
                      <p className="text-sm text-gray-600">Получение информации о ваших персональных данных в системе</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Право на исправление</h4>
                      <p className="text-sm text-gray-600">Внесение изменений в неточные или неполные данные</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Право на удаление</h4>
                      <p className="text-sm text-gray-600">Запрос на удаление ваших персональных данных</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Право на ограничение</h4>
                      <p className="text-sm text-gray-600">Ограничение обработки ваших данных в определенных случаях</p>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">6</span>
                    </span>
                    Контактная информация
                  </h2>
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <p className="text-gray-700 mb-4">
                      По всем вопросам, касающимся обработки персональных данных в системе Q-Link, 
                      вы можете обратиться к нам:
                    </p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Email:</strong> <a href="mailto:privacy@q-link.tech" className="text-blue-600 hover:text-blue-800">privacy@q-link.tech</a></p>
                      <p><strong>Техподдержка:</strong> <a href="mailto:support@q-link.tech" className="text-blue-600 hover:text-blue-800">support@q-link.tech</a></p>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">7</span>
                    </span>
                    Изменения в политике
                  </h2>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800">
                      Мы можем периодически обновлять данную политику конфиденциальности. 
                      О существенных изменениях мы уведомим вас через систему Q-Link или по электронной почте. 
                      Рекомендуем регулярно просматривать эту страницу для получения актуальной информации.
                    </p>
                  </div>
                </section>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-8 py-6 lg:px-12">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="text-sm text-gray-500">
                  © 2026 Q-Link. Все права защищены.
                </div>
                <Link 
                  href="/" 
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Вернуться на главную</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}