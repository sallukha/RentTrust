import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';

/**
 * Checks if the application is running inside a native iOS / Android wrapper
 */
export const isNativeMobile = (): boolean => {
  return Capacitor.isNativePlatform();
};

export const getPlatformName = (): 'ios' | 'android' | 'web' => {
  return Capacitor.getPlatform() as 'ios' | 'android' | 'web';
};

/**
 * Trigger subtle haptic impact feedback
 */
export const triggerHaptic = async (style: ImpactStyle = ImpactStyle.Light) => {
  if (Capacitor.isPluginAvailable('Haptics')) {
    try {
      await Haptics.impact({ style });
    } catch {
      // Graceful fallback on web or unsupported platforms
    }
  }
};

/**
 * Trigger notification vibration for success / error
 */
export const triggerNotificationHaptic = async (type: NotificationType = NotificationType.Success) => {
  if (Capacitor.isPluginAvailable('Haptics')) {
    try {
      await Haptics.notification({ type });
    } catch {
      // Graceful fallback
    }
  }
};

/**
 * Configure native mobile status bar to match theme
 */
export const syncNativeStatusBar = async (isDark: boolean) => {
  if (Capacitor.isPluginAvailable('StatusBar')) {
    try {
      await StatusBar.setStyle({
        style: isDark ? Style.Dark : Style.Light,
      });
      if (Capacitor.getPlatform() === 'android') {
        await StatusBar.setBackgroundColor({
          color: isDark ? '#0f172a' : '#ffffff',
        });
      }
    } catch {
      // Web safe
    }
  }
};
