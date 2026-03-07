import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  MapPin,
  Zap,
  Bell,
  Search,
  Calendar,
  CheckCircle,
  Users,
  Scissors,
  Stethoscope,
  Dumbbell,
  Car,
  ShoppingBag,
  Home as HomeIcon,
  MessageSquare,
  Calculator,
  BarChart3,
  Wallet,
  Gift,
  Smartphone,
  FileText,
  CreditCard,
  Globe,
  Settings,
  ArrowRight,
  Sparkle,
  Heart,
  Activity,
  Wrench,
  Coffee,
  Music,
  Star,
  Smile,
  Droplet,
  Flame,
  Palette,
  Brush,
  Pill,
  Syringe,
  Thermometer,
  HeartPulse,
  Trophy,
  Target,
  Medal,
  Bike,
  Fuel,
  Gauge,
  Hammer,
  Drill,
  Lightbulb,
  Tv,
  Gamepad2,
  Film,
  Camera,
  Popcorn,
} from 'lucide-react';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import ScrollReveal from '@/components/ScrollReveal';
import BusinessCard from '@/components/BusinessCard';
import { BusinessCardsProvider } from '@/components/BusinessCardsContext';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <AnimateOnScroll />
      {/* Header */}
      <header className="container mx-auto px-4 py-6 relative z-50">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Qlink" 
              width={120} 
              height={120}
              className="h-12 w-auto object-contain"
              priority
              quality={100}
              unoptimized
            />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition">
              Возможности
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition">
              Как работает
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition">
              Тарифы
            </a>
            <Link
              href="/login"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition relative z-10 cursor-pointer"
            >
              Войти
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Автоматизация записи для вашего бизнеса</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Увеличьте выручку на{' '}
              <span className="animate-gradient">45% с Qlink</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Современная система онлайн-записи для салонов красоты, барбершопов, медицинских центров и других сервисных бизнесов. Автоматизируйте запись клиентов и увеличьте прибыль.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <Link
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer"
              >
                Подключить бизнес
              </Link>
              <Link
                href="#pricing"
                className="px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-600 transition cursor-pointer"
              >
                Посмотреть тарифы
              </Link>
            </div>
            <div className="flex items-center space-x-6 pt-4">
              <div>
                <div className="text-3xl font-bold text-gray-800">+45%</div>
                <div className="text-sm text-gray-600">Рост выручки</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">-60%</div>
                <div className="text-sm text-gray-600">Пропущенных звонков</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">1000+</div>
                <div className="text-sm text-gray-600">Довольных клиентов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800">24/7</div>
                <div className="text-sm text-gray-600">Работает система</div>
              </div>
            </div>
          </div>
          <div className="relative flex justify-center md:justify-end">
            <div className="relative space-y-4 w-full max-w-xl">
              {/* Badge */}
              <div className="flex justify-center md:justify-end animate-fade-in pointer-events-none select-none">
                <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-semibold shadow-lg">
                  <Zap className="w-5 h-5" />
                  <span>Запись в 3 клика</span>
                </div>
              </div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 space-y-6 w-full animate-modal-appear pointer-events-none select-none">
              <div className="flex items-center space-x-4 animate-slide-in-1">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex-shrink-0 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <div>
                  <div className="font-semibold text-lg">Салон "Красота"</div>
                  <div className="text-sm text-gray-600">Москва, Тверская</div>
                </div>
              </div>
              <div className="space-y-3 animate-slide-in-2">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-transparent">
                  <span className="text-gray-700">Стрижка женская</span>
                  <span className="font-semibold">1500 ₽</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-transparent animate-click-2">
                  <span className="text-gray-700">Окрашивание</span>
                  <span className="font-semibold">3000 ₽</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 animate-slide-in-3">
                {['10:00', '11:00', '12:00', '14:00', '15:00', '16:00'].map(
                  (time, index) => (
                    <div
                      key={time}
                      className={`py-3 rounded-xl font-medium bg-blue-50 text-blue-600 text-center ${
                        index === 3 ? 'animate-click-3' : ''
                      }`}
                    >
                      {time}
                    </div>
                  )
                )}
              </div>
              <div className="w-full py-4 rounded-xl font-semibold animate-slide-in-4 animate-button-activate bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-center">
                Записаться
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white"></div>
        <div className="container mx-auto px-4 relative">
          <ScrollReveal>
            <div className="text-center mb-20">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                Преимущества для бизнеса
              </div>
              <h2 className="text-5xl font-bold mb-6">
                Всё для роста вашего бизнеса
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Автоматизируйте запись клиентов и увеличьте прибыль с помощью современных инструментов
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            <ScrollReveal delay={100}>
              <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
              <div className="relative p-8 bg-white rounded-3xl border-2 border-gray-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <MapPin className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Онлайн-запись 24/7
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Клиенты записываются сами в любое время. Вы больше не теряете заявки из-за пропущенных звонков.
                </p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Подробнее</span>
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
                <div className="relative p-8 bg-white rounded-3xl border-2 border-gray-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Zap className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Автоматические напоминания
                  </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Система сама напомнит клиентам о записи через Telegram, SMS или Push. Снижение no-show до 80%.
                </p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Подробнее</span>
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
                <div className="relative p-8 bg-white rounded-3xl border-2 border-gray-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <BarChart3 className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Аналитика и отчеты
                  </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Полная статистика по записям, выручке и загрузке. Принимайте решения на основе данных.
                </p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Подробнее</span>
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            </ScrollReveal>
          </div>

          {/* Stats */}
          <ScrollReveal delay={400}>
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                1000+
              </div>
              <div className="text-gray-600">Заведений</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <div className="text-gray-600">Записей</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                4.9
              </div>
              <div className="text-gray-600">Рейтинг</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-gray-600">Поддержка</div>
            </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Free Trial Banner */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
                <div className="relative z-10 text-center text-white">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
                    <Gift className="w-4 h-4" />
                    <span>Специальное предложение</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    Попробуйте бесплатно 7 дней
                  </h3>
                  <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                    Полный доступ ко всем функциям без ограничений. Без привязки карты. Отмените в любой момент.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                      href="/register"
                      className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition transform hover:scale-105 shadow-xl"
                    >
                      Начать бесплатный период
                    </Link>
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Без карты</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>7 дней бесплатно</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Отмена в 1 клик</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Business Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">
                Подходит{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  для любого бизнеса
                </span>
              </h2>
              <p className="text-xl text-gray-600">в сфере услуг</p>
            </div>
          </ScrollReveal>
          <BusinessCardsProvider>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <BusinessCard delay={100} index={0}>
              <div className="group/card p-6 bg-gray-50 hover:bg-white rounded-2xl border-2 border-transparent hover:border-blue-200 transition-all duration-300 cursor-pointer relative overflow-visible">
              {/* Peeking icons - behind the card */}
              <Sparkle className="absolute -top-3 -right-3 w-6 h-6 text-blue-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <Heart className="absolute -bottom-2 -left-2 w-5 h-5 text-pink-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-75 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <Palette className="absolute top-2 -right-4 w-5 h-5 text-purple-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-100 group-hover/card:translate-x-0 translate-x-4 -z-10" />
              <Brush className="absolute -bottom-3 right-8 w-4 h-4 text-rose-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-150 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <Star className="absolute top-1/2 -left-4 w-4 h-4 text-yellow-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-200 group-hover/card:translate-x-0 -translate-x-4 -z-10" />
              <Smile className="absolute -top-4 left-8 w-5 h-5 text-amber-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-50 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 bg-white group-hover/card:bg-gradient-to-br group-hover/card:from-blue-600 group-hover/card:to-cyan-500 rounded-xl flex items-center justify-center transition-all duration-300">
                  <Scissors className="w-6 h-6 text-gray-700 group-hover/card:text-white transition-colors" />
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  Красота
                </span>
              </div>
            </div>
            </BusinessCard>
            <BusinessCard delay={200} index={1}>
              <div className="group/card p-6 bg-gray-50 hover:bg-white rounded-2xl border-2 border-transparent hover:border-blue-200 transition-all duration-300 cursor-pointer relative overflow-visible">
              {/* Peeking icons - behind the card */}
              <Activity className="absolute -top-2 -right-2 w-6 h-6 text-red-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-100 group-hover/card:translate-x-0 translate-x-4 -z-10" />
              <HeartPulse className="absolute top-1/2 -left-3 w-5 h-5 text-rose-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-150 group-hover/card:translate-x-0 -translate-x-4 -z-10" />
              <Pill className="absolute -bottom-3 -right-3 w-5 h-5 text-blue-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-75 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <Syringe className="absolute -top-4 left-6 w-4 h-4 text-cyan-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-200 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <Thermometer className="absolute bottom-2 -left-4 w-4 h-4 text-orange-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-50 group-hover/card:translate-x-0 -translate-x-4 -z-10" />
              <Heart className="absolute -bottom-2 right-10 w-5 h-5 text-pink-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-125 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 bg-white group-hover/card:bg-gradient-to-br group-hover/card:from-blue-600 group-hover/card:to-cyan-500 rounded-xl flex items-center justify-center transition-all duration-300">
                  <Stethoscope className="w-6 h-6 text-gray-700 group-hover/card:text-white transition-colors" />
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  Медицина
                </span>
              </div>
            </div>
            </BusinessCard>
            <BusinessCard delay={300} index={2}>
              <div className="group/card p-6 bg-gray-50 hover:bg-white rounded-2xl border-2 border-transparent hover:border-blue-200 transition-all duration-300 cursor-pointer relative overflow-visible">
              {/* Peeking icons - behind the card */}
              <Zap className="absolute -top-3 right-4 w-6 h-6 text-yellow-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-200 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <Sparkle className="absolute -bottom-2 -right-2 w-5 h-5 text-cyan-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-75 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <Trophy className="absolute -top-4 -left-3 w-5 h-5 text-amber-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-100 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <Target className="absolute bottom-2 -left-4 w-4 h-4 text-red-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-150 group-hover/card:translate-x-0 -translate-x-4 -z-10" />
              <Medal className="absolute -bottom-3 left-8 w-5 h-5 text-orange-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-50 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <Flame className="absolute top-1/2 -right-4 w-5 h-5 text-rose-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-125 group-hover/card:translate-x-0 translate-x-4 -z-10" />
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 bg-white group-hover/card:bg-gradient-to-br group-hover/card:from-blue-600 group-hover/card:to-cyan-500 rounded-xl flex items-center justify-center transition-all duration-300">
                  <Dumbbell className="w-6 h-6 text-gray-700 group-hover/card:text-white transition-colors" />
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  Спорт
                </span>
              </div>
            </div>
            </BusinessCard>
            <BusinessCard delay={400} index={3}>
              <div className="group/card p-6 bg-gray-50 hover:bg-white rounded-2xl border-2 border-transparent hover:border-blue-200 transition-all duration-300 cursor-pointer relative overflow-visible">
              {/* Peeking icons - behind the card */}
              <Wrench className="absolute top-2 -left-3 w-5 h-5 text-slate-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-100 group-hover/card:translate-x-0 -translate-x-4 -z-10" />
              <Zap className="absolute -bottom-3 right-6 w-6 h-6 text-orange-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-200 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <Fuel className="absolute -top-3 -right-3 w-5 h-5 text-green-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-75 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <Gauge className="absolute -bottom-2 -left-3 w-5 h-5 text-blue-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-150 group-hover/card:translate-x-0 -translate-x-4 -z-10" />
              <Bike className="absolute -top-4 left-10 w-4 h-4 text-cyan-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-50 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <Settings className="absolute bottom-3 -right-4 w-4 h-4 text-gray-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-125 group-hover/card:translate-x-0 translate-x-4 -z-10" />
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 bg-white group-hover/card:bg-gradient-to-br group-hover/card:from-blue-600 group-hover/card:to-cyan-500 rounded-xl flex items-center justify-center transition-all duration-300">
                  <Car className="w-6 h-6 text-gray-700 group-hover/card:text-white transition-colors" />
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  Авто
                </span>
              </div>
            </div>
            </BusinessCard>
            <BusinessCard delay={500} index={4}>
              <div className="group/card p-6 bg-gray-50 hover:bg-white rounded-2xl border-2 border-transparent hover:border-blue-200 transition-all duration-300 cursor-pointer relative overflow-visible">
              {/* Peeking icons - behind the card */}
              <Coffee className="absolute -top-2 -left-2 w-5 h-5 text-amber-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-150 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <Wrench className="absolute -bottom-2 right-4 w-6 h-6 text-slate-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <Hammer className="absolute -top-4 right-8 w-5 h-5 text-orange-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-100 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <Drill className="absolute bottom-2 -left-4 w-4 h-4 text-yellow-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-75 group-hover/card:translate-x-0 -translate-x-4 -z-10" />
              <Lightbulb className="absolute top-1/2 -right-4 w-5 h-5 text-yellow-300 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-200 group-hover/card:translate-x-0 translate-x-4 -z-10" />
              <Droplet className="absolute -bottom-3 -left-3 w-4 h-4 text-blue-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-50 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white group-hover/card:bg-gradient-to-br group-hover/card:from-blue-600 group-hover/card:to-cyan-500 rounded-xl flex items-center justify-center transition-all duration-300">
                  <ShoppingBag className="w-6 h-6 text-gray-700 group-hover/card:text-white transition-colors" />
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  Бытовые услуги
                </span>
              </div>
            </div>
            </BusinessCard>
            <BusinessCard delay={600} index={5}>
              <div className="group/card p-6 bg-gray-50 hover:bg-white rounded-2xl border-2 border-transparent hover:border-blue-200 transition-all duration-300 cursor-pointer relative overflow-visible">
              {/* Peeking icons - behind the card */}
              <Music className="absolute -top-3 right-2 w-6 h-6 text-purple-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-100 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <Sparkle className="absolute bottom-2 -left-3 w-5 h-5 text-indigo-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-200 group-hover/card:translate-x-0 -translate-x-4 -z-10" />
              <Coffee className="absolute -bottom-2 -right-2 w-5 h-5 text-pink-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <Gamepad2 className="absolute -top-4 -left-3 w-5 h-5 text-green-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-75 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <Film className="absolute top-2 -right-4 w-5 h-5 text-red-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-150 group-hover/card:translate-x-0 translate-x-4 -z-10" />
              <Camera className="absolute -bottom-3 left-6 w-4 h-4 text-blue-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-50 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <Popcorn className="absolute bottom-1/2 -left-4 w-4 h-4 text-yellow-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-125 group-hover/card:translate-x-0 -translate-x-4 -z-10" />
              <Tv className="absolute -top-2 left-12 w-5 h-5 text-cyan-400 opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-175 group-hover/card:translate-y-0 translate-y-4 -z-10" />
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white group-hover/card:bg-gradient-to-br group-hover/card:from-blue-600 group-hover/card:to-cyan-500 rounded-xl flex items-center justify-center transition-all duration-300">
                  <HomeIcon className="w-6 h-6 text-gray-700 group-hover/card:text-white transition-colors" />
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  Досуг и отдых
                </span>
              </div>
            </div>
            </BusinessCard>
          </div>
          </BusinessCardsProvider>
          <div className="text-center">
            <button className="text-gray-600 hover:text-blue-600 font-semibold flex items-center mx-auto group">
              <span>Посмотреть все типы бизнеса</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* All-in-One Ecosystem */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Сотни задач.{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Одна экосистема
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Всё необходимое для управления бизнесом
            </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="group p-6 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Онлайн-запись</h3>
                </div>
              </div>
            </div>
            <div className="group p-6 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <MessageSquare className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Уведомления</h3>
                </div>
              </div>
            </div>
            <div className="group p-6 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <Calculator className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Финансовый учёт
                  </h3>
                </div>
              </div>
            </div>
            <div className="group p-6 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <BarChart3 className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Статистика и аналитика
                  </h3>
                </div>
              </div>
            </div>
            <div className="group p-6 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <Users className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Клиентская база
                  </h3>
                </div>
              </div>
            </div>
            <div className="group p-6 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <CreditCard className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Расчет зарплат</h3>
                </div>
              </div>
            </div>
            <div className="group p-6 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <Wallet className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Складской учёт</h3>
                </div>
              </div>
            </div>
            <div className="group p-6 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <Gift className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Программы лояльности
                  </h3>
                </div>
              </div>
            </div>
            <div className="group p-6 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <Globe className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Управление сетью
                  </h3>
                </div>
              </div>
            </div>
            <div className="group p-6 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <Smartphone className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Мобильное приложение
                  </h3>
                </div>
              </div>
            </div>
            <div className="group p-6 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <FileText className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Электронный журнал
                  </h3>
                </div>
              </div>
            </div>
            <div className="group p-6 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <Settings className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Интеграции</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-500">и многое другое</p>
          </div>
        </div>
      </section>

      {/* For Business Owners */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <ScrollReveal className="reveal-left">
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Увеличьте доход
                </span>{' '}
                уже сейчас
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Освободите свое время от рутины, сотрудников — от
                дополнительных задач, а бизнес — от ошибок.
              </p>
              <Link
                href="/register"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Попробовать 7 дней бесплатно
              </Link>
            </ScrollReveal>
            <ScrollReveal className="reveal-right">
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-center space-x-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-2xl"></div>
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl"></div>
                  <div className="w-20 h-32 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl"></div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                    +45%
                  </div>
                  <div className="text-gray-600">Рост выручки</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-cyan-100 text-cyan-600 rounded-full text-sm font-semibold mb-4">
              Процесс
            </div>
            <h2 className="text-5xl font-bold mb-6">Как это работает?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Три простых шага до вашей записи
            </p>
            </div>
          </ScrollReveal>
          <div className="relative">
            <div className="grid md:grid-cols-3 gap-12 relative">
              <ScrollReveal delay={100}>
                <div className="text-center group">
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <Search className="w-12 h-12 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-blue-600 text-blue-600 font-bold">
                    1
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Найдите заведение</h3>
                <p className="text-gray-600 leading-relaxed">
                  Используйте карту или поиск для выбора подходящего места
                  рядом с вами
                </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="text-center group">
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <Calendar className="w-12 h-12 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-cyan-500 text-cyan-500 font-bold">
                    2
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Выберите время</h3>
                <p className="text-gray-600 leading-relaxed">
                  Посмотрите доступные слоты и выберите удобное для вас время
                </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="text-center group">
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-blue-600 text-blue-600 font-bold">
                    3
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Подтвердите запись</h3>
                <p className="text-gray-600 leading-relaxed">
                  Укажите телефон и получите мгновенное подтверждение
                </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-20">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                Тарифы
              </div>
              <h2 className="text-5xl font-bold mb-6">
                Выберите подходящий тариф
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Прозрачные цены без скрытых платежей. Первые 7 дней бесплатно
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <ScrollReveal delay={100}>
              <div className="relative bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Стартовый</h3>
                  <p className="text-gray-600">Для небольших салонов</p>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold">2 990</span>
                    <span className="text-gray-600 ml-2">₽/мес</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">До 100 записей в месяц</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">1 сотрудник</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">SMS напоминания</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Базовая аналитика</span>
                  </li>
                </ul>
                <Link
                  href="/register"
                  className="block w-full py-3 text-center bg-gray-100 text-gray-800 rounded-xl font-semibold hover:bg-gray-200 transition"
                >
                  Попробовать бесплатно
                </Link>
              </div>
            </ScrollReveal>

            {/* Professional Plan */}
            <ScrollReveal delay={200}>
              <div className="relative bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-8 text-white transform scale-105 shadow-2xl">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
                  Популярный
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Профессиональный</h3>
                  <p className="text-blue-100">Для растущего бизнеса</p>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold">5 990</span>
                    <span className="text-blue-100 ml-2">₽/мес</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                    <span>Неограниченные записи</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                    <span>До 5 сотрудников</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                    <span>SMS + Telegram + Push</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                    <span>Расширенная аналитика</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                    <span>Приоритетная поддержка</span>
                  </li>
                </ul>
                <Link
                  href="/register"
                  className="block w-full py-3 text-center bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition"
                >
                  Начать сейчас
                </Link>
              </div>
            </ScrollReveal>

            {/* Enterprise Plan */}
            <ScrollReveal delay={300}>
              <div className="relative bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Корпоративный</h3>
                  <p className="text-gray-600">Для сетей и франшиз</p>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold">По запросу</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Всё из Professional</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Неограниченно сотрудников</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Мультифилиальность</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">API интеграции</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Персональный менеджер</span>
                  </li>
                </ul>
                <Link
                  href="/register"
                  className="block w-full py-3 text-center bg-gray-100 text-gray-800 rounded-xl font-semibold hover:bg-gray-200 transition"
                >
                  Связаться с нами
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <ScrollReveal className="reveal-scale">
            <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Начните прямо сейчас
            </h2>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              Присоединяйтесь к тысячам пользователей, которые уже оценили
              удобство онлайн-записи с Qlink
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/map"
                className="group px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
              >
                <span>Найти заведение</span>
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href="/register"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold border-2 border-white/30 hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                Для владельцев бизнеса
              </Link>
            </div>
            <div className="flex items-center justify-center space-x-8 text-white/80">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Без комиссий</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Быстрая настройка</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>24/7 поддержка</span>
              </div>
            </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-400">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Q</span>
                </div>
                <span className="text-2xl font-bold text-white">Qlink</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
                Современная платформа для онлайн-записи в салоны красоты,
                барбершопы и другие заведения
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-500 rounded-xl flex items-center justify-center transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-500 rounded-xl flex items-center justify-center transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6 text-lg">Продукт</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    Возможности
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    Как работает
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    Тарифы
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6 text-lg">Компания</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    О нас
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    Блог
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    Контакты
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6 text-lg">
                Поддержка
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    Помощь
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    Документация
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2025 Qlink. Все права защищены.
            </p>
            <div className="flex flex-wrap gap-4 mt-4 md:mt-0 text-sm">
              <a href="/privacy" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Условия использования
              </a>
              <a href="/offer" className="hover:text-white transition-colors">
                Публичная оферта
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
