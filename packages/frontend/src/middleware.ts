// ВРЕМЕННО ОТКЛЮЧЕНО: Middleware вызывает ошибку в Docker
// Будет включено после исправления проблемы с prerender-manifest.js

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Временно пропускаем все запросы без проверки
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$).*)',
  ],
};
