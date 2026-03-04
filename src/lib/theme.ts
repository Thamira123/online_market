const KEY = "theme_mode"

export type ThemeMode = "light" | "dark"

export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement // <html>
  if (mode === "dark") root.classList.add("dark")
  else root.classList.remove("dark")

  localStorage.setItem(KEY, mode)
}

export function getTheme(): ThemeMode {
  const saved = localStorage.getItem(KEY)
  return saved === "dark" ? "dark" : "light"
}

export function toggleTheme(): ThemeMode {
  const next: ThemeMode = getTheme() === "dark" ? "light" : "dark"
  applyTheme(next)
  return next
}