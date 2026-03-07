import Link from 'next/link';
import { FileText, ArrowLeft, Building2, Users, Shield, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function TermsOfService() {
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
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Условия пользования
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Правила и условия использования системы управления бизнесом Q-Link
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
                <h2 className="text-lg font-semibold text-blue-900 mb-2">Добро пожаловать в Q-Link</h2>
                <p className="text-blue-800">
                  Используя систему управления бизнесом Q-Link, вы соглашаетесь с данными условиями пользования. 
                  Пожалуйста, внимательно ознакомьтесь с ними перед началом работы с платформой.
                </p>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700">
                
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">1</span>
                    </span>
                    Общие положения
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p><strong className="text-blue-600">Q-Link</strong> — это веб-платформа для управления бизнес-процессами, включающая управление клиентами, сотрудниками, услугами, записями и аналитикой.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p><strong className="text-blue-600">Пользователь</strong> — физическое или юридическое лицо, использующее сервисы Q-Link для ведения бизнеса.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p><strong className="text-blue-600">Услуги</strong> — все функции и возможности, предоставляемые платформой Q-Link.</p>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">2</span>
                    </span>
                    Регистрация и аккаунт
                  </h2>
                  <div className="grid gap-6">
                    <div className="p-6 border border-gray-200 rounded-xl">
                      <Users className="w-8 h-8 text-blue-600 mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Создание аккаунта</h3>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Предоставление достоверной информации при регистрации</li>
                        <li>• Поддержание актуальности контактных данных</li>
                        <li>• Один аккаунт на одну организацию</li>
                        <li>• Ответственность за безопасность пароля</li>
                      </ul>
                    </div>
                    <div className="p-6 border border-gray-200 rounded-xl">
                      <Shield className="w-8 h-8 text-blue-600 mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Безопасность</h3>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Немедленное уведомление о компрометации аккаунта</li>
                        <li>• Запрет на передачу доступа третьим лицам</li>
                        <li>• Использование надежных паролей</li>
                        <li>• Регулярное обновление данных безопасности</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">3</span>
                    </span>
                    Разрешенное использование
                  </h2>
                  <div className="grid gap-4">
                    <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p><strong>Управление бизнесом:</strong> Использование всех функций для ведения законной коммерческой деятельности.</p>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p><strong>Клиентская база:</strong> Управление информацией о клиентах с их согласия.</p>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p><strong>Аналитика:</strong> Использование отчетов и аналитики для улучшения бизнес-процессов.</p>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p><strong>Интеграции:</strong> Подключение к внешним сервисам через официальные API.</p>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </span>
                    Запрещенные действия
                  </h2>
                  <div className="grid gap-4">
                    <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p><strong>Нарушение безопасности:</strong> Попытки взлома, обхода защиты или несанкционированного доступа к данным.</p>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p><strong>Спам и злоупотребления:</strong> Массовая рассылка нежелательных сообщений через платформу.</p>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p><strong>Незаконная деятельность:</strong> Использование для мошенничества, отмывания денег или других преступлений.</p>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p><strong>Перепродажа:</strong> Коммерческое распространение доступа к платформе без разрешения.</p>
                    </div>
                  </div>
                </section>
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">4</span>
                    </span>
                    Тарифы и оплата
                  </h2>
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <Clock className="w-8 h-8 text-blue-600 mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-3">Условия оплаты</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>Бесплатный пробный период 14 дней для новых пользователей</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>Ежемесячная или годовая подписка с автоматическим продлением</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>Возможность отмены подписки в любое время</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>Возврат средств в течение 30 дней при неудовлетворенности сервисом</span>
                      </li>
                    </ul>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">5</span>
                    </span>
                    Интеллектуальная собственность
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Права Q-Link</h4>
                      <p className="text-sm text-gray-600">Все права на программное обеспечение, дизайн, торговые марки и контент принадлежат Q-Link</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Права пользователя</h4>
                      <p className="text-sm text-gray-600">Вы сохраняете права на свои данные и контент, загруженный в систему</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Лицензия на использование</h4>
                      <p className="text-sm text-gray-600">Предоставляется ограниченная лицензия на использование сервиса согласно тарифному плану</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Обратная связь</h4>
                      <p className="text-sm text-gray-600">Предложения по улучшению могут быть использованы Q-Link без дополнительной компенсации</p>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">6</span>
                    </span>
                    Доступность сервиса
                  </h2>
                  <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-3">Гарантии доступности</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Время работы:</strong> Стремимся обеспечить 99.9% доступности сервиса</li>
                      <li>• <strong>Техническое обслуживание:</strong> Плановые работы проводятся с предварительным уведомлением</li>
                      <li>• <strong>Резервное копирование:</strong> Ежедневное создание резервных копий данных</li>
                      <li>• <strong>Поддержка:</strong> Техническая поддержка в рабочие дни с 9:00 до 18:00 МСК</li>
                    </ul>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">7</span>
                    </span>
                    Ответственность и ограничения
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Ответственность пользователя</h4>
                      <p className="text-sm text-gray-600">Пользователь несет полную ответственность за содержание загружаемых данных и соблюдение применимого законодательства.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Ограничение ответственности Q-Link</h4>
                      <p className="text-sm text-gray-600">Q-Link не несет ответственности за косвенные убытки, потерю прибыли или данных, возникшие в результате использования сервиса.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Форс-мажор</h4>
                      <p className="text-sm text-gray-600">Q-Link не несет ответственности за невыполнение обязательств из-за обстоятельств непреодолимой силы.</p>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">8</span>
                    </span>
                    Прекращение использования
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">По инициативе пользователя</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Отмена подписки в любое время</li>
                        <li>• Экспорт данных в течение 30 дней</li>
                        <li>• Удаление аккаунта по запросу</li>
                      </ul>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">По инициативе Q-Link</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• При нарушении условий использования</li>
                        <li>• При неоплате услуг более 30 дней</li>
                        <li>• Уведомление за 7 дней до блокировки</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">9</span>
                    </span>
                    Изменения условий
                  </h2>
                  <div className="p-6 bg-blue-50 rounded-xl">
                    <p className="text-blue-800 mb-4">
                      Q-Link оставляет за собой право изменять данные условия пользования. 
                      О существенных изменениях мы уведомим вас заранее.
                    </p>
                    <ul className="space-y-2 text-blue-700 text-sm">
                      <li>• Уведомление по email за 30 дней до вступления изменений в силу</li>
                      <li>• Публикация обновленных условий на сайте</li>
                      <li>• Право отказаться от услуг при несогласии с изменениями</li>
                    </ul>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">10</span>
                    </span>
                    Контакты и поддержка
                  </h2>
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <p className="text-gray-700 mb-4">
                      По всем вопросам, связанным с условиями пользования Q-Link, обращайтесь к нам:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>Техническая поддержка:</strong></p>
                        <p><a href="mailto:support@q-link.tech" className="text-blue-600 hover:text-blue-800">support@q-link.tech</a></p>
                      </div>
                      <div>
                        <p><strong>Юридические вопросы:</strong></p>
                        <p><a href="mailto:legal@q-link.tech" className="text-blue-600 hover:text-blue-800">legal@q-link.tech</a></p>
                      </div>
                      <div>
                        <p><strong>Вопросы по оплате:</strong></p>
                        <p><a href="mailto:billing@q-link.tech" className="text-blue-600 hover:text-blue-800">billing@q-link.tech</a></p>
                      </div>
                      <div>
                        <p><strong>Общие вопросы:</strong></p>
                        <p><a href="mailto:info@q-link.tech" className="text-blue-600 hover:text-blue-800">info@q-link.tech</a></p>
                      </div>
                    </div>
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
                <div className="flex space-x-4">
                  <Link 
                    href="/privacy" 
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Политика конфиденциальности
                  </Link>
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
    </div>
  );
}