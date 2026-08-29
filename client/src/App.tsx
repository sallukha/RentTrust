import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { RegistrationProvider } from './context/RegistrationContext';
import { AuthProvider } from './context/AuthContext';
import { ScreenContainer } from './components/ScreenContainer';
import { DesktopCompanion } from './components/DesktopCompanion';
import { TermsModal } from './components/TermsModal';
import { ForgotPasswordModal } from './components/ForgotPasswordModal';
import { isNativeMobile } from './utils/capacitor';

const MainApp: React.FC = () => {
  const isNative = isNativeMobile();

  return (
    <div className={`${isNative ? 'h-[100dvh] max-h-[100dvh] overflow-hidden' : 'min-h-screen'} bg-slate-100/90 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-center items-center transition-colors duration-200 selection:bg-teal-500 selection:text-white ${isNative ? 'p-0' : 'py-6 sm:py-10 px-4 sm:px-6'}`}>
      {/* Background ambient lighting (Web only) */}
      {!isNative && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-400/10 dark:bg-teal-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl" />
        </div>
      )}

      <main className={`w-full relative z-10 flex flex-col ${isNative ? 'h-full flex-1 min-h-0' : 'max-w-5xl'}`}>
        {isNative ? (
          <ScreenContainer />
        ) : (
          /* Fluid Modern Responsive Layout for Web (Single screen on mobile, 2-column hero on desktop) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 xl:col-span-6">
              <DesktopCompanion />
            </div>
            <div className="lg:col-span-6 xl:col-span-6 flex justify-center">
              <ScreenContainer />
            </div>
          </div>
        )}
      </main>

      {/* Dynamic Terms & Privacy Modal */}
      <TermsModal />

      {/* Forgot Password Recovery Modal */}
      <ForgotPasswordModal />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RegistrationProvider>
          <MainApp />
        </RegistrationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
