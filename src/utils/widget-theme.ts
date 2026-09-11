export const WIDGET_ROOT_ATTR = 'data-ordify-chat'

export type WidgetSurfaceTheme = 'light'

export function resolveWidgetTheme(
  _requested?: 'light' | 'dark' | 'auto'
): WidgetSurfaceTheme {
  return 'light'
}
