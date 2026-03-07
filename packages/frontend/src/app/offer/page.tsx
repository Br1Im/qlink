import Link from 'next/link';
import { FileCheck, ArrowLeft, Building2, Scale, CreditCard, Users } from 'lucide-react';

export default function PublicOffer() {
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
              <FileCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Пользовательское соглашение
            </h1>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              (Публичная оферта)
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Договор на оказание услуг системы управления бизнесом Q-Link
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Дата публикации: 7 марта 2026 г.
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="p-8 lg:p-12">
              
              {/* Introduction */}
              <div className="mb-10 p-6 bg-blue-50 rounded-xl border-l-4 border-blue-600">
                <Scale className="w-8 h-8 text-blue-600 mb-3" />
                <h2 className="text-lg font-semibold text-blue-900 mb-2">Правовая информация</h2>
                <p className="text-blue-800">
                  Настоящая публичная оферта является официальным предложением о заключении договора 
                  на оказание услуг системы управления бизнесом Q-Link. Использование сервиса означает 
                  полное согласие с условиями данного соглашения.
                </p>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700">
                
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">1</span>
                    </span>
                    Термины и определения
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p><strong>1.1. Оферта</strong> – настоящее Пользовательское соглашение (Публичная оферта).</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p><strong>1.2. Сервис</strong> – веб-платформа Q-Link, доступная по адресу q-link.tech, предназначенная для управления бизнес-процессами.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p><strong>1.3. Пользователь (Заказчик)</strong> – физическое или юридическое лицо, акцептовавшее настоящую Оферту.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p><strong>1.4. Исполнитель</strong> – владелец и оператор сервиса Q-Link.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p><strong>1.5. Услуги</strong> – комплекс функций системы управления бизнесом: управление клиентами, сотрудниками, услугами, записями, аналитика.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p><strong>1.6. Акцепт Оферты</strong> – регистрация в Сервисе и/или оплата подписки. Акцепт означает полное согласие с условиями Оферты.</p>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">2</span>
                    </span>
                    Предмет Оферты
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p><strong>2.1.</strong> Исполнитель обязуется предоставить Пользователю доступ к Сервису Q-Link и оказывать услуги по управлению бизнес-процессами в соответствии с выбранным тарифным планом, а Пользователь обязуется принять и оплатить Услуги согласно условиям настоящей Оферты.</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p><strong>2.2.</strong> Сервис Q-Link предоставляет следующие основные функции:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Управление базой клиентов</li>
                        <li>Система онлайн-записи</li>
                        <li>Управление сотрудниками и услугами</li>
                        <li>Аналитика и отчетность</li>
                        <li>Календарь и планирование</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </span>
                    Порядок оплаты и предоставления Услуг
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p><strong>3.1.</strong> Стоимость Услуг определяется действующими тарифными планами, размещенными на сайте q-link.tech.</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p><strong>3.2.</strong> Новым пользователям предоставляется бесплатный пробный период 14 (четырнадцать) дней с полным доступом ко всем функциям Сервиса.</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p><strong>3.3.</strong> Оплата производится на условиях 100% предоплаты через доступные платежные системы (банковские карты, электронные кошельки, банковские переводы).</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p><strong>3.4.</strong> Доступ к Сервису предоставляется автоматически после подтверждения оплаты, как правило, в течение 5-15 минут.</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p><strong>3.5.</strong> Подписка продлевается автоматически на аналогичный период, если Пользователь не отменил автопродление в личном кабинете за 24 часа до окончания текущего периода.</p>
                    </div>
                  </div>
                </section>
                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-red-600 font-bold">4</span>
                    </span>
                    Условия возврата и отмены
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p><strong>4.1.</strong> Пользователь имеет право отменить подписку в любое время через личный кабинет. При отмене подписки доступ к Сервису сохраняется до окончания оплаченного периода.</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p><strong>4.2.</strong> Возврат денежных средств возможен в следующих случаях:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li><strong>Технические неполадки:</strong> Если Сервис недоступен более 48 часов подряд по вине Исполнителя</li>
                        <li><strong>Неудовлетворенность сервисом:</strong> В течение 30 дней с момента первой оплаты (не распространяется на продления)</li>
                        <li><strong>Двойная оплата:</strong> При ошибочном списании средств</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <p><strong>4.3.</strong> Возврат средств НЕ производится в случаях:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Нарушения Пользователем условий настоящей Оферты</li>
                        <li>Отказа от услуг после 30 дней использования</li>
                        <li>Технических проблем на стороне Пользователя</li>
                        <li>Изменения потребностей бизнеса Пользователя</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p><strong>4.4.</strong> Возврат средств производится в течение 10 рабочих дней на тот же способ оплаты, который использовался при покупке.</p>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-blue-600" />
                    </span>
                    Права и обязанности сторон
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">5.1. Исполнитель обязан:</h3>
                      <div className="space-y-2">
                        <div className="p-3 bg-green-50 rounded-lg text-sm">
                          • Предоставить доступ к Сервису в соответствии с тарифным планом
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg text-sm">
                          • Обеспечивать работоспособность Сервиса 99.5% времени
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg text-sm">
                          • Оказывать техническую поддержку в рабочие дни
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg text-sm">
                          • Обеспечивать безопасность и конфиденциальность данных
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg text-sm">
                          • Уведомлять об изменениях в Сервисе за 7 дней
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">5.2. Пользователь обязан:</h3>
                      <div className="space-y-2">
                        <div className="p-3 bg-blue-50 rounded-lg text-sm">
                          • Своевременно оплачивать Услуги согласно тарифу
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg text-sm">
                          • Предоставлять достоверную информацию при регистрации
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg text-sm">
                          • Соблюдать условия использования Сервиса
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg text-sm">
                          • Не нарушать права третьих лиц
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg text-sm">
                          • Обеспечивать безопасность своего аккаунта
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-orange-600 font-bold">6</span>
                    </span>
                    Ответственность и форс-мажор
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <p><strong>6.1.</strong> Исполнитель не несет ответственности за убытки, возникшие вследствие неправильного использования Сервиса Пользователем или действий третьих лиц.</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <p><strong>6.2.</strong> Максимальная ответственность Исполнителя ограничивается суммой, уплаченной Пользователем за последний месяц использования Сервиса.</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <p><strong>6.3.</strong> Стороны освобождаются от ответственности при наступлении обстоятельств непреодолимой силы (форс-мажор), включая:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Стихийные бедствия и природные катаклизмы</li>
                        <li>Военные действия, террористические акты</li>
                        <li>Решения органов государственной власти</li>
                        <li>Глобальные сбои интернет-инфраструктуры</li>
                        <li>Кибератаки на критически важные системы</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-bold">7</span>
                    </span>
                    Разрешение споров
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p><strong>7.1.</strong> Все споры и разногласия решаются путем переговоров. Для связи со службой поддержки используйте:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Email: <a href="mailto:support@q-link.tech" className="text-blue-600 hover:text-blue-800">support@q-link.tech</a></li>
                        <li>Форма обратной связи в личном кабинете</li>
                        <li>Чат-поддержка на сайте (в рабочие часы)</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p><strong>7.2.</strong> Срок рассмотрения обращений составляет до 3 рабочих дней с момента получения.</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p><strong>7.3.</strong> В случае невозможности урегулирования спора путем переговоров, он подлежит рассмотрению в суде по месту нахождения Исполнителя в соответствии с действующим законодательством Российской Федерации.</p>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-bold">8</span>
                    </span>
                    Срок действия и изменение Оферты
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                      <p><strong>8.1.</strong> Настоящая Оферта вступает в силу с момента ее публикации на сайте q-link.tech и действует до момента ее отзыва Исполнителем.</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                      <p><strong>8.2.</strong> Исполнитель оставляет за собой право вносить изменения в настоящую Оферту. Изменения вступают в силу через 7 дней после публикации новой версии на сайте.</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                      <p><strong>8.3.</strong> Продолжение использования Сервиса после внесения изменений означает согласие Пользователя с новыми условиями.</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                      <p><strong>8.4.</strong> При несогласии с изменениями Пользователь имеет право расторгнуть договор, уведомив об этом Исполнителя до вступления изменений в силу.</p>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-gray-600 font-bold">9</span>
                    </span>
                    Заключительные положения
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p><strong>9.1.</strong> Настоящая Оферта регулируется и толкуется в соответствии с законодательством Российской Федерации.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p><strong>9.2.</strong> Если какое-либо положение Оферты будет признано недействительным, остальные положения сохраняют свою силу.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p><strong>9.3.</strong> Акцептуя настоящую Оферту, Пользователь подтверждает, что ознакомился с <Link href="/privacy" className="text-blue-600 hover:text-blue-800">Политикой конфиденциальности</Link> и <Link href="/terms" className="text-blue-600 hover:text-blue-800">Условиями пользования</Link>.</p>
                    </div>
                    <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 mt-6">
                      <p className="text-blue-800 font-semibold mb-2">Контактная информация Исполнителя:</p>
                      <div className="text-blue-700 text-sm space-y-1">
                        <p>Сервис: Q-Link (q-link.tech)</p>
                        <p>Email: <a href="mailto:legal@q-link.tech" className="text-blue-600 hover:text-blue-800">legal@q-link.tech</a></p>
                        <p>Поддержка: <a href="mailto:support@q-link.tech" className="text-blue-600 hover:text-blue-800">support@q-link.tech</a></p>
                        <p>Дата последнего обновления: 7 марта 2026 г.</p>
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
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/privacy" 
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Политика конфиденциальности
                  </Link>
                  <Link 
                    href="/terms" 
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Условия пользования
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